// Estado persistido: criação, validação (carga e importação), leitura/gravação em localStorage.

import { CARDS, CATEGORIES, DECK_VERSION } from "./cards.js";
import { isValidDateString, classify } from "./leitner.js";

export const STORAGE_KEY = "sap-isu-flashcards:v1";
export const SCHEMA_VERSION = 1;
export const EXPORT_APP = "sap-isu-flashcards";

export const SIZES = [10, 20, "all"];
const MODES = ["review", "free"];
const PHASES = ["think", "choose", "feedback", "result", "done"];

export const cardById = new Map(CARDS.map((c) => [c.id, c]));

export function defaultCardState() {
  return { box: 1, dueDate: null, lastReviewed: null, counts: { recall: 0, recognition: 0, error: 0 } };
}

export function defaultPrefs() {
  return { mode: "review", category: "all", size: 10 };
}

export function defaultState() {
  const cards = {};
  for (const c of CARDS) cards[c.id] = defaultCardState();
  return {
    schemaVersion: SCHEMA_VERSION,
    deckVersion: DECK_VERSION,
    cards,
    attempts: [],
    session: null,
    prefs: defaultPrefs(),
  };
}

const isObj = (v) => v !== null && typeof v === "object" && !Array.isArray(v);
const isInt = (v) => Number.isInteger(v);
const isBox = (v) => isInt(v) && v >= 1 && v <= 5;
const isIso = (v) => typeof v === "string" && v.length > 0 && !Number.isNaN(Date.parse(v));
const isNullOr = (v, fn) => v === null || fn(v);

function validateCardState(id, s, errors) {
  if (!isObj(s)) return errors.push(`cartão ${id}: formato inválido`);
  if (!isBox(s.box)) errors.push(`cartão ${id}: caixa fora de 1–5`);
  if (!isNullOr(s.dueDate, isValidDateString)) errors.push(`cartão ${id}: dueDate inválida`);
  if (!isNullOr(s.lastReviewed, isValidDateString)) errors.push(`cartão ${id}: lastReviewed inválida`);
  const c = s.counts;
  if (!isObj(c) || !["recall", "recognition", "error"].every((k) => isInt(c[k]) && c[k] >= 0)) {
    errors.push(`cartão ${id}: contadores inválidos`);
  }
}

function validateAttempt(a, i, errors, seen) {
  const tag = `tentativa ${i + 1}`;
  if (!isObj(a)) return errors.push(`${tag}: formato inválido`);
  if (typeof a.id !== "string" || !a.id) errors.push(`${tag}: id ausente`);
  else if (seen.has(a.id)) errors.push(`${tag}: id duplicado`);
  else seen.add(a.id);
  if (typeof a.sessionId !== "string" || !a.sessionId) errors.push(`${tag}: sessão ausente`);
  const card = cardById.get(a.cardId);
  if (!card) return errors.push(`${tag}: cartão desconhecido`);
  if (!MODES.includes(a.mode)) errors.push(`${tag}: modo inválido`);
  if (!card.options.some((o) => o.id === a.chosenOptionId)) errors.push(`${tag}: alternativa inválida`);
  if (typeof a.correct !== "boolean" || a.correct !== (a.chosenOptionId === card.correctOptionId)) {
    errors.push(`${tag}: acerto inconsistente`);
  }
  if (typeof a.knew !== "boolean") errors.push(`${tag}: autoavaliação inválida`);
  else if (a.classification !== classify(a.correct, a.knew)) errors.push(`${tag}: classificação inconsistente`);
  if (!isIso(a.completedAt)) errors.push(`${tag}: data de conclusão inválida`);
  if (a.mode === "review") {
    if (!isBox(a.boxBefore) || !isBox(a.boxAfter)) errors.push(`${tag}: caixas inválidas`);
    if (!isValidDateString(a.dueDate)) errors.push(`${tag}: próxima revisão inválida`);
  } else if (a.boxBefore !== null || a.boxAfter !== null || a.dueDate !== null) {
    errors.push(`${tag}: treino livre não deve registrar caixas`);
  }
}

function validateSession(s, errors) {
  if (!isObj(s)) return errors.push("sessão: formato inválido");
  if (typeof s.id !== "string" || !s.id) errors.push("sessão: id ausente");
  if (!MODES.includes(s.mode)) errors.push("sessão: modo inválido");
  if (s.category !== "all" && !CATEGORIES.includes(s.category)) errors.push("sessão: categoria inválida");
  if (!SIZES.includes(s.size)) errors.push("sessão: tamanho inválido");
  if (!isIso(s.startedAt)) errors.push("sessão: início inválido");
  if (typeof s.partial !== "boolean") errors.push("sessão: indicador parcial inválido");
  if (!Array.isArray(s.queue) || s.queue.length === 0) return errors.push("sessão: fila inválida");
  if (new Set(s.queue).size !== s.queue.length || !s.queue.every((id) => cardById.has(id))) {
    return errors.push("sessão: fila com cartões inválidos ou repetidos");
  }
  if (!isInt(s.index) || s.index < 0 || s.index >= s.queue.length) return errors.push("sessão: índice inválido");
  if (!PHASES.includes(s.phase)) return errors.push("sessão: estado do cartão inválido");

  const card = cardById.get(s.queue[s.index]);
  const optionIds = card.options.map((o) => o.id).sort().join("|");
  const needsOrder = ["choose", "feedback", "result"].includes(s.phase);
  if (s.optionOrder !== null) {
    const ok = Array.isArray(s.optionOrder) && [...s.optionOrder].sort().join("|") === optionIds;
    if (!ok) errors.push("sessão: ordem das alternativas inválida");
  } else if (needsOrder) errors.push("sessão: ordem das alternativas ausente");

  const needsPending = s.phase === "feedback" || s.phase === "result";
  if (s.pending !== null) {
    const p = s.pending;
    const ok =
      isObj(p) &&
      typeof p.attemptId === "string" &&
      card.options.some((o) => o.id === p.chosenOptionId) &&
      p.correct === (p.chosenOptionId === card.correctOptionId);
    if (!ok) errors.push("sessão: tentativa pendente inválida");
  } else if (needsPending) errors.push("sessão: tentativa pendente ausente");
  if (!needsPending && s.pending !== null && s.phase !== "done") errors.push("sessão: tentativa pendente fora de lugar");

  if (s.phase === "result") {
    const r = s.result;
    const ok =
      isObj(r) &&
      typeof r.knew === "boolean" &&
      r.classification === classify(s.pending?.correct, r.knew) &&
      (s.mode === "free" ? r.boxBefore === null && r.boxAfter === null && r.dueDate === null
        : isBox(r.boxBefore) && isBox(r.boxAfter) && isValidDateString(r.dueDate));
    if (!ok) errors.push("sessão: resultado inválido");
  } else if (s.result !== null) errors.push("sessão: resultado fora de lugar");
}

/**
 * Valida e normaliza um objeto de estado (carga ou importação).
 * Retorna { ok, errors, state }. `state` só existe quando ok.
 */
export function validateState(raw) {
  const errors = [];
  if (!isObj(raw)) return { ok: false, errors: ["o conteúdo não é um objeto JSON"] };
  if (raw.schemaVersion !== SCHEMA_VERSION) errors.push(`versão de formato não suportada: ${raw.schemaVersion}`);
  if (!isInt(raw.deckVersion)) errors.push("versão do baralho inválida");

  const cards = {};
  if (!isObj(raw.cards)) errors.push("cards: formato inválido");
  else {
    for (const id of Object.keys(raw.cards)) {
      if (!cardById.has(id)) errors.push(`cartão desconhecido: ${id}`);
      else validateCardState(id, raw.cards[id], errors);
    }
  }

  const seen = new Set();
  if (!Array.isArray(raw.attempts)) errors.push("attempts: formato inválido");
  else raw.attempts.forEach((a, i) => validateAttempt(a, i, errors, seen));

  if (raw.session !== null && raw.session !== undefined) validateSession(raw.session, errors);

  const p = raw.prefs;
  if (p !== undefined) {
    const ok =
      isObj(p) &&
      MODES.includes(p.mode) &&
      (p.category === "all" || CATEGORIES.includes(p.category)) &&
      SIZES.includes(p.size);
    if (!ok) errors.push("preferências inválidas");
  }

  if (errors.length) return { ok: false, errors: errors.slice(0, 12) };

  for (const c of CARDS) cards[c.id] = raw.cards[c.id] ? structuredClone(raw.cards[c.id]) : defaultCardState();
  return {
    ok: true,
    errors: [],
    state: {
      schemaVersion: SCHEMA_VERSION,
      deckVersion: DECK_VERSION,
      cards,
      attempts: structuredClone(raw.attempts),
      session: raw.session ? structuredClone(raw.session) : null,
      prefs: p ? { ...p } : defaultPrefs(),
    },
  };
}

/** Lê do storage. status: ok | unavailable | corrupt. Nunca apaga dados inválidos. */
export function loadState(storage) {
  let raw;
  try {
    raw = storage.getItem(STORAGE_KEY);
  } catch {
    return { state: defaultState(), status: "unavailable", raw: null, errors: [] };
  }
  if (raw === null) return { state: defaultState(), status: "ok", raw: null, errors: [] };
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return { state: defaultState(), status: "corrupt", raw, errors: ["JSON ilegível"] };
  }
  const v = validateState(parsed);
  if (!v.ok) return { state: defaultState(), status: "corrupt", raw, errors: v.errors };
  return { state: v.state, status: "ok", raw, errors: [] };
}

/** Grava o estado inteiro em uma única chamada. Retorna true se gravou. */
export function saveState(storage, state) {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

/** Remove apenas a chave deste app. */
export function removeState(storage) {
  try {
    storage.removeItem(STORAGE_KEY);
    return true;
  } catch {
    return false;
  }
}

export function buildExport(state, now = new Date()) {
  return {
    app: EXPORT_APP,
    exportedAt: now.toISOString(),
    schemaVersion: state.schemaVersion,
    deckVersion: state.deckVersion,
    cards: state.cards,
    attempts: state.attempts,
    session: state.session,
    prefs: state.prefs,
  };
}

/** Importação: valida antes de aceitar. Não altera nada por si. */
export function parseImport(text) {
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    return { ok: false, errors: ["o arquivo não é um JSON válido"] };
  }
  if (!isObj(data) || data.app !== EXPORT_APP) return { ok: false, errors: ["o arquivo não é um backup deste aplicativo"] };
  const v = validateState(data);
  if (!v.ok) return v;
  const reviewed = Object.values(v.state.cards).filter((c) => c.lastReviewed !== null).length;
  return {
    ok: true,
    errors: [],
    state: v.state,
    summary: {
      exportedAt: data.exportedAt,
      reviewed,
      attempts: v.state.attempts.length,
      hasSession: v.state.session !== null,
    },
  };
}
