// Motor da sessão: transições de estado puras (sem DOM, sem storage).
// Cada função muda o `state` recebido; quem chama persiste depois, uma vez.

import { CARDS } from "./cards.js";
import { cardById } from "./state.js";
import { applyAttempt, classify, todayLocal } from "./leitner.js";

const defaultDeps = () => ({ now: new Date(), rng: Math.random });

export function shuffle(list, rng = Math.random) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const inCategory = (card, category) => category === "all" || card.category === category;
export const isAvailable = (cs, today) => cs.dueDate === null || cs.dueDate <= today;

/** Revisão do dia: novos ou vencidos; mais atrasados primeiro, depois menor caixa. */
export function selectReviewQueue(state, category, today, rng = Math.random) {
  const pool = CARDS.filter((c) => inCategory(c, category) && isAvailable(state.cards[c.id], today));
  const keyed = shuffle(pool, rng).map((c) => ({ id: c.id, due: state.cards[c.id].dueDate ?? today, box: state.cards[c.id].box }));
  keyed.sort((a, b) => (a.due < b.due ? -1 : a.due > b.due ? 1 : a.box - b.box));
  return keyed.map((k) => k.id);
}

export function selectFreeQueue(category, rng = Math.random) {
  return shuffle(CARDS.filter((c) => inCategory(c, category)).map((c) => c.id), rng);
}

export function availableQueue(state, mode, category, today, rng) {
  return mode === "review" ? selectReviewQueue(state, category, today, rng) : selectFreeQueue(category, rng);
}

export function sessionLength(available, size) {
  return size === "all" ? available : Math.min(size, available);
}

function newOptionOrder(cardId, rng) {
  return shuffle(cardById.get(cardId).options.map((o) => o.id), rng);
}

/** Cria a sessão com a fila congelada. Retorna null se não houver cartões. */
export function startSession(state, { mode, category, size }, deps = defaultDeps()) {
  const today = todayLocal(deps.now);
  const all = availableQueue(state, mode, category, today, deps.rng);
  const queue = all.slice(0, sessionLength(all.length, size));
  if (queue.length === 0) return null;
  const id = `s-${deps.now.getTime().toString(36)}-${Math.floor(deps.rng() * 1e6).toString(36)}`;
  state.prefs = { mode, category, size };
  state.session = {
    id,
    mode,
    category,
    size,
    startedAt: deps.now.toISOString(),
    queue,
    index: 0,
    phase: "think",
    optionOrder: newOptionOrder(queue[0], deps.rng),
    pending: null,
    result: null,
    partial: false,
  };
  return state.session;
}

export const currentCard = (session) => cardById.get(session.queue[session.index]);

/** Estado 1 → 2. Não toca no Leitner. */
export function revealOptions(state) {
  const s = state.session;
  if (!s || s.phase !== "think") return false;
  s.phase = "choose";
  return true;
}

/** Estado 2 → 3. Guarda a escolha como tentativa pendente; uma única tentativa por cartão. */
export function chooseOption(state, optionId) {
  const s = state.session;
  if (!s || s.phase !== "choose") return false;
  const card = currentCard(s);
  if (!card.options.some((o) => o.id === optionId)) return false;
  s.pending = {
    attemptId: `${s.id}:${s.index}`,
    chosenOptionId: optionId,
    correct: optionId === card.correctOptionId,
  };
  s.phase = "feedback";
  return true;
}

/** Estado 3 → 4. Consolida histórico, contadores, caixa e data de uma só vez; idempotente. */
export function selfAssess(state, knew, deps = defaultDeps()) {
  const s = state.session;
  if (!s || s.phase !== "feedback" || !s.pending) return false;
  const { attemptId, chosenOptionId, correct } = s.pending;
  if (state.attempts.some((a) => a.id === attemptId)) return false;

  const card = currentCard(s);
  const completedDate = todayLocal(deps.now);
  const review = s.mode === "review";
  const applied = review ? applyAttempt(state.cards[card.id], { correct, knew }, completedDate) : null;

  const classification = applied ? applied.classification : classify(correct, knew);
  const attempt = {
    id: attemptId,
    sessionId: s.id,
    cardId: card.id,
    mode: s.mode,
    chosenOptionId,
    correct,
    knew,
    classification,
    completedAt: deps.now.toISOString(),
    boxBefore: applied ? applied.boxBefore : null,
    boxAfter: applied ? applied.boxAfter : null,
    dueDate: applied ? applied.dueDate : null,
  };

  state.attempts.push(attempt);
  if (applied) state.cards[card.id] = applied.card;
  s.result = {
    knew,
    classification,
    boxBefore: attempt.boxBefore,
    boxAfter: attempt.boxAfter,
    dueDate: attempt.dueDate,
  };
  s.phase = "result";
  return true;
}

/** Estado 4 → próximo cartão (ou resumo, no último). */
export function nextCard(state, deps = defaultDeps()) {
  const s = state.session;
  if (!s || s.phase !== "result") return false;
  s.pending = null;
  s.result = null;
  if (s.index + 1 >= s.queue.length) {
    s.phase = "done";
    s.optionOrder = null;
    return true;
  }
  s.index += 1;
  s.phase = "think";
  s.optionOrder = newOptionOrder(s.queue[s.index], deps.rng);
  return true;
}

export function completedAttempts(state, session = state.session) {
  return state.attempts.filter((a) => a.sessionId === session.id);
}

/** Encerra antes do fim: descarta tentativa sem autoavaliação e abre o resumo parcial. */
export function endSession(state) {
  const s = state.session;
  if (!s || s.phase === "done") return false;
  const done = completedAttempts(state, s).length;
  s.pending = null;
  s.result = null;
  s.optionOrder = null;
  s.partial = done < s.queue.length;
  s.phase = "done";
  return true;
}

export function clearSession(state) {
  state.session = null;
}

const ratio = (n, d) => (d === 0 ? null : n / d);

export function summarize(attempts) {
  const total = attempts.length;
  const recall = attempts.filter((a) => a.classification === "recall").length;
  const recognition = attempts.filter((a) => a.classification === "recognition").length;
  const errors = attempts.filter((a) => a.classification === "error").length;
  const reviews = attempts.filter((a) => a.mode === "review");
  return {
    total,
    recall,
    recognition,
    errors,
    accuracy: ratio(recall + recognition, total),
    recallRate: ratio(recall, total),
    rose: reviews.filter((a) => a.boxAfter > a.boxBefore).length,
    stayed: reviews.filter((a) => a.correct && a.boxAfter === a.boxBefore).length,
    reset: reviews.filter((a) => !a.correct).length,
  };
}

export function homeStats(state, category, today) {
  const cards = CARDS.filter((c) => inCategory(c, category));
  const boxes = [0, 0, 0, 0, 0];
  let due = 0;
  let never = 0;
  let nextDue = null;
  for (const c of cards) {
    const cs = state.cards[c.id];
    boxes[cs.box - 1] += 1;
    if (cs.lastReviewed === null) never += 1;
    if (isAvailable(cs, today)) due += 1;
    else if (nextDue === null || cs.dueDate < nextDue) nextDue = cs.dueDate;
  }
  return { total: cards.length, due, never, boxes, nextDue };
}
