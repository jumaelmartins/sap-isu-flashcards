import test from "node:test";
import assert from "node:assert/strict";
import { CARDS, CATEGORIES } from "../js/cards.js";
import { addDays, nextBox, applyAttempt, todayLocal, isValidDateString } from "../js/leitner.js";
import {
  defaultState, validateState, loadState, saveState, removeState, buildExport, parseImport, STORAGE_KEY,
} from "../js/state.js";
import {
  startSession, revealOptions, chooseOption, selfAssess, nextCard, endSession, selectReviewQueue,
  homeStats, summarize, completedAttempts, sessionLength,
} from "../js/engine.js";

const fakeStorage = () => {
  const m = new Map();
  return {
    m,
    getItem: (k) => (m.has(k) ? m.get(k) : null),
    setItem: (k, v) => m.set(k, String(v)),
    removeItem: (k) => m.delete(k),
  };
};
const seeded = (seed = 1) => () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
const deps = (iso = "2026-03-10T10:00:00", seed = 7) => ({ now: new Date(iso), rng: seeded(seed) });
const roundtrip = (s) => JSON.parse(JSON.stringify(s));

// ---------- baralho ----------
test("baralho: 53 cartões, ids únicos, categorias e contagens do spec", () => {
  assert.equal(CARDS.length, 53);
  assert.equal(new Set(CARDS.map((c) => c.id)).size, 53);
  CARDS.forEach((c, i) => {
    assert.equal(c.number, i + 1);
    assert.equal(c.id, `sap-isu-${String(i + 1).padStart(3, "0")}`);
    assert.deepEqual(c.source, { file: "Flashcards_SAP_ISU.pdf", cardNumber: i + 1 });
  });
  const expected = { "Visão geral": 7, "Dados mestre": 11, "Meter to Cash": 15, "Move-In e Move-Out": 6, "Configuração tarifária": 8, "Incidente e FI-CA": 6 };
  for (const cat of CATEGORIES) assert.equal(CARDS.filter((c) => c.category === cat).length, expected[cat], cat);
});

test("baralho: 4 alternativas únicas, exatamente uma correta, sem 'todas/nenhuma'", () => {
  for (const c of CARDS) {
    assert.equal(c.options.length, 4, c.id);
    assert.equal(new Set(c.options.map((o) => o.id)).size, 4, c.id);
    assert.equal(new Set(c.options.map((o) => o.text)).size, 4, `${c.id} alternativas duplicadas`);
    assert.equal(c.options.filter((o) => o.id === c.correctOptionId).length, 1, c.id);
    for (const o of c.options) assert.ok(!/todas as anteriores|nenhuma das anteriores/i.test(o.text), c.id);
  }
});

test("baralho: exemplo do cartão 12 idêntico ao spec", () => {
  const c = CARDS[11];
  assert.equal(c.question, "O que liga o comercial ao técnico?");
  assert.equal(c.options.find((o) => o.id === c.correctOptionId).text, "O Contrato, ligando a Conta Contrato à Instalação.");
});

// ---------- Leitner ----------
test("Leitner: exemplos obrigatórios do spec", () => {
  const card = (box) => ({ box, dueDate: null, lastReviewed: null, counts: { recall: 0, recognition: 0, error: 0 } });
  const run = (box, correct, knew) => applyAttempt(card(box), { correct, knew }, "2026-03-10");
  let r = run(1, true, true);
  assert.deepEqual([r.boxAfter, r.dueDate], [2, "2026-03-13"]);
  r = run(3, true, false);
  assert.deepEqual([r.boxAfter, r.dueDate], [3, "2026-03-17"]);
  r = run(4, false, true);
  assert.deepEqual([r.boxAfter, r.dueDate], [1, "2026-03-11"]);
  r = run(5, true, true);
  assert.deepEqual([r.boxAfter, r.dueDate], [5, "2026-04-09"]);
});

test("Leitner: reconhecimento nunca promove; erro sempre volta à caixa 1; limites", () => {
  for (let b = 1; b <= 5; b++) {
    assert.equal(nextBox(b, true, false), b);
    assert.equal(nextBox(b, false, true), 1);
    assert.equal(nextBox(b, false, false), 1);
    assert.equal(nextBox(b, true, true), Math.min(b + 1, 5));
  }
});

test("datas: dias de calendário locais (mês, ano bissexto, virada de ano)", () => {
  assert.equal(addDays("2026-01-31", 1), "2026-02-01");
  assert.equal(addDays("2028-02-28", 1), "2028-02-29");
  assert.equal(addDays("2026-12-20", 30), "2027-01-19");
  assert.equal(addDays("2026-03-10", 0), "2026-03-10");
  assert.ok(isValidDateString("2028-02-29"));
  assert.ok(!isValidDateString("2026-02-29"));
  assert.ok(!isValidDateString("2026-13-01"));
});

test("datas: 23:59 e 00:01 usam a data local de cada instante", () => {
  assert.equal(todayLocal(new Date(2026, 2, 10, 23, 59, 59)), "2026-03-10");
  assert.equal(todayLocal(new Date(2026, 2, 11, 0, 0, 1)), "2026-03-11");
});

// ---------- fluxo da sessão ----------
function playCard(state, d, { pick, knew }) {
  assert.ok(revealOptions(state));
  const card = CARDS.find((c) => c.id === state.session.queue[state.session.index]);
  const wrong = card.options.find((o) => o.id !== card.correctOptionId).id;
  assert.ok(chooseOption(state, pick === "right" ? card.correctOptionId : wrong));
  return selfAssess(state, knew, d);
}

test("fluxo: opções/escolha não alteram o Leitner; só Sim/Não consolida, uma vez", () => {
  const state = defaultState();
  const d = deps();
  startSession(state, { mode: "review", category: "all", size: 10 }, d);
  const id = state.session.queue[0];
  revealOptions(state);
  assert.deepEqual(state.cards[id], defaultState().cards[id]);
  const card = CARDS.find((c) => c.id === id);
  chooseOption(state, card.correctOptionId);
  assert.deepEqual(state.cards[id], defaultState().cards[id]);
  assert.equal(state.attempts.length, 0);
  assert.equal(nextCard(state, d), false, "próximo bloqueado antes da autoavaliação");

  assert.ok(selfAssess(state, true, d));
  assert.equal(selfAssess(state, false, d), false, "segunda gravação rejeitada");
  assert.equal(state.attempts.length, 1);
  assert.equal(state.cards[id].box, 2);
  assert.equal(state.cards[id].dueDate, "2026-03-13");
  assert.equal(state.cards[id].counts.recall, 1);
  assert.equal(state.attempts[0].classification, "recall");
});

test("fluxo: recarregar em cada estado mantém tudo e não duplica nem reembaralha", () => {
  let state = defaultState();
  const d = deps();
  startSession(state, { mode: "review", category: "all", size: 10 }, d);
  const order = [...state.session.optionOrder];

  state = validateState(roundtrip(state)).state; // think
  assert.equal(state.session.phase, "think");
  revealOptions(state);
  state = validateState(roundtrip(state)).state; // choose
  assert.equal(state.session.phase, "choose");
  assert.deepEqual(state.session.optionOrder, order);

  const card = CARDS.find((c) => c.id === state.session.queue[0]);
  chooseOption(state, card.options.find((o) => o.id !== card.correctOptionId).id);
  state = validateState(roundtrip(state)).state; // feedback
  assert.equal(state.session.phase, "feedback");
  assert.equal(state.session.pending.correct, false);
  assert.deepEqual(state.session.optionOrder, order);

  selfAssess(state, true, d);
  state = validateState(roundtrip(state)).state; // result
  assert.equal(state.session.phase, "result");
  assert.equal(selfAssess(state, true, d), false);
  assert.equal(state.attempts.length, 1);
  assert.equal(state.cards[card.id].box, 1);
});

test("fluxo: erro volta à caixa 1 qualquer que seja a autoavaliação", () => {
  for (const knew of [true, false]) {
    const state = defaultState();
    const id = "sap-isu-005";
    state.cards[id] = { box: 4, dueDate: "2026-03-01", lastReviewed: "2026-02-15", counts: { recall: 3, recognition: 0, error: 0 } };
    const d = deps();
    startSession(state, { mode: "review", category: "Visão geral", size: "all" }, d);
    while (state.session.queue[state.session.index] !== id) {
      playCard(state, d, { pick: "right", knew: true });
      nextCard(state, d);
    }
    playCard(state, d, { pick: "wrong", knew });
    assert.equal(state.cards[id].box, 1);
    assert.equal(state.cards[id].dueDate, "2026-03-11");
    assert.equal(state.cards[id].counts.error, 1);
  }
});

test("revisão do dia: só novos/vencidos, ordem por atraso e caixa, sem repetição", () => {
  const state = defaultState();
  const today = "2026-03-10";
  for (const c of CARDS) state.cards[c.id] = { box: 3, dueDate: "2026-04-01", lastReviewed: "2026-03-01", counts: { recall: 0, recognition: 0, error: 0 } };
  state.cards["sap-isu-001"] = { ...state.cards["sap-isu-001"], dueDate: "2026-03-10", box: 3 };
  state.cards["sap-isu-002"] = { ...state.cards["sap-isu-002"], dueDate: "2026-03-05", box: 4 };
  state.cards["sap-isu-003"] = { ...state.cards["sap-isu-003"], dueDate: "2026-03-05", box: 2 };
  state.cards["sap-isu-004"] = { box: 1, dueDate: null, lastReviewed: null, counts: { recall: 0, recognition: 0, error: 0 } };
  const q = selectReviewQueue(state, "all", today, seeded(3));
  assert.deepEqual(q.slice(0, 2), ["sap-isu-003", "sap-isu-002"]);
  assert.equal(new Set(q).size, q.length);
  assert.deepEqual([...q].sort(), ["sap-isu-001", "sap-isu-002", "sap-isu-003", "sap-isu-004"]);
  assert.equal(homeStats(state, "all", today).due, 4);
  assert.equal(homeStats(state, "all", today).never, 1);
});

test("treino livre: não altera caixas/datas, não registra caixa fictícia, fica fora do histórico de revisão", () => {
  const state = defaultState();
  const before = roundtrip(state.cards);
  const d = deps();
  startSession(state, { mode: "free", category: "Dados mestre", size: 10 }, d);
  for (let i = 0; i < 3; i++) {
    playCard(state, d, { pick: "right", knew: true });
    nextCard(state, d);
  }
  assert.deepEqual(state.cards, before);
  assert.equal(state.attempts.length, 3);
  assert.ok(state.attempts.every((a) => a.mode === "free" && a.boxBefore === null && a.boxAfter === null && a.dueDate === null));
  assert.ok(validateState(roundtrip(state)).ok);
  const s = summarize(completedAttempts(state));
  assert.equal(s.total, 3);
  assert.equal(s.rose + s.stayed + s.reset, 0);
});

test("sessão: tamanhos, limite maior que disponível e encerramento parcial", () => {
  const state = defaultState();
  const d = deps();
  assert.equal(startSession(state, { mode: "review", category: "all", size: 10 }, d).queue.length, 10);
  assert.equal(startSession(state, { mode: "review", category: "all", size: 20 }, d).queue.length, 20);
  assert.equal(startSession(state, { mode: "review", category: "all", size: "all" }, d).queue.length, 53);
  assert.equal(startSession(state, { mode: "review", category: "Incidente e FI-CA", size: 10 }, d).queue.length, 6);
  assert.equal(sessionLength(6, 10), 6);

  playCard(state, d, { pick: "right", knew: false });
  nextCard(state, d);
  revealOptions(state);
  const card = CARDS.find((c) => c.id === state.session.queue[1]);
  chooseOption(state, card.correctOptionId); // pendente, sem autoavaliação
  endSession(state);
  assert.equal(state.session.phase, "done");
  assert.equal(state.session.partial, true);
  assert.equal(state.session.pending, null);
  assert.equal(state.attempts.length, 1, "tentativa pendente descartada");
  assert.equal(state.cards[card.id].lastReviewed, null, "Leitner intacto");
  assert.ok(validateState(roundtrip(state)).ok);
});

test("revisão sem cartões disponíveis: sessão não inicia e próxima data aparece", () => {
  const state = defaultState();
  for (const c of CARDS) state.cards[c.id] = { box: 2, dueDate: "2026-03-20", lastReviewed: "2026-03-17", counts: { recall: 1, recognition: 0, error: 0 } };
  state.cards["sap-isu-010"].dueDate = "2026-03-15";
  assert.equal(startSession(state, { mode: "review", category: "all", size: 10 }, deps()), null);
  assert.equal(homeStats(state, "all", "2026-03-10").nextDue, "2026-03-15");
  assert.equal(homeStats(state, "all", "2026-03-10").due, 0);
});

test("resumo: taxas separadas, sem divisão por zero, subiu/permaneceu/voltou", () => {
  assert.equal(summarize([]).accuracy, null);
  assert.equal(summarize([]).recallRate, null);
  const state = defaultState();
  const d = deps();
  startSession(state, { mode: "review", category: "all", size: 10 }, d);
  playCard(state, d, { pick: "right", knew: true }); nextCard(state, d); // recall, sobe
  playCard(state, d, { pick: "right", knew: false }); nextCard(state, d); // reconhecimento, permanece
  playCard(state, d, { pick: "wrong", knew: true }); // erro na caixa 1 -> reinicia
  const s = summarize(completedAttempts(state));
  assert.deepEqual([s.total, s.recall, s.recognition, s.errors], [3, 1, 1, 1]);
  assert.equal(s.accuracy, 2 / 3);
  assert.equal(s.recallRate, 1 / 3);
  assert.deepEqual([s.rose, s.stayed, s.reset], [1, 1, 1]);
});

// ---------- persistência ----------
test("storage: salva e carrega; reset remove só a chave do app", () => {
  const st = fakeStorage();
  st.setItem("outro-app", "x");
  const state = defaultState();
  const d = deps();
  startSession(state, { mode: "review", category: "all", size: 10 }, d);
  assert.ok(saveState(st, state));
  const loaded = loadState(st);
  assert.equal(loaded.status, "ok");
  assert.deepEqual(loaded.state, state);
  removeState(st);
  assert.equal(st.getItem(STORAGE_KEY), null);
  assert.equal(st.getItem("outro-app"), "x");
});

test("storage: dados inválidos não são apagados e viram status corrupt", () => {
  const st = fakeStorage();
  st.setItem(STORAGE_KEY, "{nao e json");
  let r = loadState(st);
  assert.equal(r.status, "corrupt");
  assert.equal(st.getItem(STORAGE_KEY), "{nao e json");
  const bad = defaultState();
  bad.cards["sap-isu-001"].box = 9;
  st.setItem(STORAGE_KEY, JSON.stringify(bad));
  r = loadState(st);
  assert.equal(r.status, "corrupt");
  assert.ok(st.getItem(STORAGE_KEY).includes('"box":9'));
});

test("storage: indisponível ou falha de gravação não quebra", () => {
  const broken = { getItem() { throw new Error("blocked"); }, setItem() { throw new Error("quota"); }, removeItem() {} };
  assert.equal(loadState(broken).status, "unavailable");
  assert.equal(saveState(broken, defaultState()), false);
});

test("importação: exporta→importa preserva; inválida é rejeitada", () => {
  const state = defaultState();
  const d = deps();
  startSession(state, { mode: "review", category: "all", size: 10 }, d);
  playCard(state, d, { pick: "right", knew: true });
  const text = JSON.stringify(buildExport(state, d.now));
  const ok = parseImport(text);
  assert.ok(ok.ok);
  assert.deepEqual(ok.state, state);
  assert.equal(ok.summary.attempts, 1);

  const tamper = (fn) => { const o = JSON.parse(text); fn(o); return parseImport(JSON.stringify(o)); };
  assert.ok(!parseImport("não é json").ok);
  assert.ok(!parseImport("{}").ok);
  assert.ok(!tamper((o) => { o.cards["sap-isu-001"].box = 6; }).ok);
  assert.ok(!tamper((o) => { o.cards["sap-isu-001"].dueDate = "2026-02-30"; }).ok);
  assert.ok(!tamper((o) => { o.cards["sap-isu-999"] = o.cards["sap-isu-001"]; }).ok);
  assert.ok(!tamper((o) => { o.attempts[0].chosenOptionId = "xyz"; }).ok);
  assert.ok(!tamper((o) => { o.attempts[0].classification = "error"; }).ok);
  assert.ok(!tamper((o) => { o.session.phase = "feedback"; o.session.pending = null; }).ok);
  assert.ok(!tamper((o) => { o.session.queue.push(o.session.queue[0]); }).ok);
  assert.ok(!tamper((o) => { o.session.optionOrder = ["a", "b", "c", "d"]; }).ok);
  assert.ok(!tamper((o) => { o.session.index = 99; }).ok);
});
