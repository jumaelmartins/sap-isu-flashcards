// Interface: renderiza a tela a partir do estado e chama o motor. Persiste após cada transição.

import { CATEGORIES } from "./cards.js";
import {
  defaultState, loadState, saveState, removeState, buildExport, parseImport, SIZES,
} from "./state.js";
import {
  startSession, revealOptions, chooseOption, selfAssess, nextCard, endSession, clearSession,
  currentCard, completedAttempts, summarize, homeStats, availableQueue, sessionLength,
} from "./engine.js";
import { todayLocal, formatDateBR, CLASSIFICATION_LABEL, INTERVAL_DAYS } from "./leitner.js";

const main = document.getElementById("main");
const bannerEl = document.getElementById("banner");
const liveEl = document.getElementById("live");

function getStorage() {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}
const storage = getStorage();

const loaded = loadState(storage);
let state = loaded.state;
let storageStatus = loaded.status; // ok | unavailable | corrupt | failed
let corruptRaw = loaded.raw;
let corruptErrors = loaded.errors;

let view = !state.session ? "home" : state.session.phase === "done" ? "summary" : "study";
let focusTarget = null;

// ---------- utilidades ----------
function h(tag, props = {}, ...children) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (v === false || v === null || v === undefined) continue;
    if (k === "class") el.className = v;
    else if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
    else if (v === true) el.setAttribute(k, "");
    else el.setAttribute(k, v);
  }
  for (const c of children.flat()) {
    if (c === null || c === undefined || c === false) continue;
    el.append(c instanceof Node ? c : document.createTextNode(String(c)));
  }
  return el;
}

const pct = (r) => (r === null ? "—" : `${Math.round(r * 100)}%`);
const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;
const announce = (msg) => {
  liveEl.textContent = "";
  setTimeout(() => (liveEl.textContent = msg), 30);
};

function persist() {
  if (storageStatus === "corrupt") return; // nunca sobrescreve dados inválidos sem ação explícita
  const ok = saveState(storage, state);
  const next = ok ? "ok" : storageStatus === "unavailable" ? "unavailable" : "failed";
  if (next !== storageStatus) {
    storageStatus = next;
    renderBanner();
  }
}

function download(filename, text) {
  const url = URL.createObjectURL(new Blob([text], { type: "application/json" }));
  const a = h("a", { href: url, download: filename });
  document.body.append(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ---------- diálogo ----------
const dialog = document.getElementById("dialog");
function ask({ title, body, confirm = "Confirmar", cancel = "Cancelar", danger = false }) {
  return new Promise((resolve) => {
    document.getElementById("dialog-title").textContent = title;
    const bodyEl = document.getElementById("dialog-body");
    bodyEl.replaceChildren(...[].concat(body));
    const ok = document.getElementById("dialog-confirm");
    const no = document.getElementById("dialog-cancel");
    ok.textContent = confirm;
    ok.className = danger ? "btn btn-primary btn-danger-fill" : "btn btn-primary";
    no.textContent = cancel;
    no.hidden = cancel === null;
    const opener = document.activeElement;
    const finish = (value) => {
      dialog.removeEventListener("close", onClose);
      no.onclick = null;
      if (dialog.open) dialog.close();
      if (opener && document.contains(opener)) opener.focus();
      resolve(value);
    };
    const onClose = () => finish(dialog.returnValue === "ok");
    dialog.returnValue = "";
    dialog.addEventListener("close", onClose);
    no.onclick = () => {
      dialog.returnValue = "cancel";
      dialog.close();
    };
    dialog.showModal();
    no.hidden ? ok.focus() : no.focus();
  });
}
const info = (title, body) => ask({ title, body, confirm: "Entendi", cancel: null });

// ---------- banner ----------
function renderBanner() {
  bannerEl.replaceChildren();
  if (storageStatus === "ok") return;
  if (storageStatus === "corrupt") {
    bannerEl.append(
      h("div", { class: "notice bad", role: "alert" },
        h("p", {}, h("strong", {}, "Os dados salvos neste navegador estão inválidos. "),
          "Nada foi apagado e o progresso não será gravado até você decidir. Você pode estudar normalmente nesta sessão."),
        h("p", {}, `Detalhe: ${corruptErrors.slice(0, 3).join("; ")}`),
        h("div", { class: "actions" },
          h("button", { class: "btn", type: "button", onclick: exportCorrupt }, "Exportar conteúdo existente"),
          h("button", { class: "btn btn-danger", type: "button", onclick: resetProgress }, "Reinicializar progresso"))));
    return;
  }
  bannerEl.append(
    h("div", { class: "notice", role: "alert" },
      h("p", {}, h("strong", {}, "O progresso não está sendo salvo. "),
        storageStatus === "unavailable"
          ? "O armazenamento deste navegador está indisponível (modo privado ou bloqueado). "
          : "Não foi possível gravar no armazenamento do navegador. ",
        "Você pode continuar estudando, mas o progresso será perdido ao fechar a página. Use “Exportar progresso” para guardar uma cópia.")));
}

function exportCorrupt() {
  download("sap-isu-flashcards-dados-existentes.json", corruptRaw ?? "");
}

// ---------- ações globais ----------
function go(nextView, focus = null) {
  view = nextView;
  focusTarget = focus;
  render();
}

async function resetProgress() {
  const yes = await ask({
    title: "Redefinir progresso?",
    body: h("p", {}, "Todos os cartões voltam para a caixa 1, disponíveis agora, e o histórico e a sessão atual serão apagados. Não dá para desfazer. Exporte antes se quiser guardar uma cópia."),
    confirm: "Redefinir tudo",
    danger: true,
  });
  if (!yes) return;
  removeState(storage); // apenas a chave deste app
  state = defaultState();
  storageStatus = storage ? "ok" : "unavailable";
  corruptRaw = null;
  persist();
  renderBanner();
  announce("Progresso redefinido.");
  go("home");
}

function exportProgress() {
  const day = todayLocal();
  download(`sap-isu-flashcards-progresso-${day}.json`, JSON.stringify(buildExport(state), null, 2));
  announce("Backup exportado.");
}

async function importProgress(file) {
  if (!file) return;
  const text = await file.text();
  const parsed = parseImport(text);
  if (!parsed.ok) {
    await info("Importação recusada", [
      h("p", {}, "O arquivo é inválido e o progresso atual foi mantido."),
      h("ul", {}, parsed.errors.map((e) => h("li", {}, e))),
    ]);
    return;
  }
  const s = parsed.summary;
  const when = s.exportedAt && !Number.isNaN(Date.parse(s.exportedAt)) ? new Date(s.exportedAt).toLocaleString("pt-BR") : "data desconhecida";
  const yes = await ask({
    title: "Substituir o progresso atual?",
    body: [
      h("p", {}, `Backup de ${when}:`),
      h("ul", {},
        h("li", {}, `${plural(s.reviewed, "cartão já revisado", "cartões já revisados")}`),
        h("li", {}, `${plural(s.attempts, "tentativa no histórico", "tentativas no histórico")}`),
        h("li", {}, s.hasSession ? "com sessão ativa" : "sem sessão ativa")),
      h("p", {}, "O progresso atual deste navegador será substituído."),
    ],
    confirm: "Substituir",
    danger: true,
  });
  if (!yes) return;
  state = parsed.state;
  storageStatus = storage ? "ok" : "unavailable";
  corruptRaw = null;
  persist();
  renderBanner();
  announce("Progresso importado.");
  go(!state.session ? "home" : state.session.phase === "done" ? "summary" : "study");
}

// ---------- tela: início ----------
function renderHome() {
  const prefs = state.prefs;
  const today = todayLocal();
  const stats = homeStats(state, prefs.category, today);
  const queue = availableQueue(state, prefs.mode, prefs.category, today);
  const count = sessionLength(queue.length, prefs.size);
  const active = state.session && state.session.phase !== "done" ? state.session : null;

  const setPref = (key, value, focusId) => {
    state.prefs = { ...state.prefs, [key]: value };
    persist();
    go("home", focusId);
  };

  const review = h("section", { class: "panel", "aria-labelledby": "today-h" },
    h("h2", { id: "today-h" }, prefs.category === "all" ? "Hoje" : `Hoje — ${prefs.category}`),
    h("div", { class: "stats" },
      h("div", {},
        h("div", { class: "stat-main" }, stats.due),
        h("div", {}, "para revisar hoje"),
        h("div", { class: "stat-sub" }, `inclui ${stats.never} ${stats.never === 1 ? "nunca revisado" : "nunca revisados"}`)),
      h("div", {},
        h("div", { class: "stat-main" }, stats.never),
        h("div", {}, "nunca revisados"),
        h("div", { class: "stat-sub" }, `de ${stats.total} cartões neste filtro`))),
    h("ul", { class: "boxes", "aria-label": "Cartões por caixa" },
      stats.boxes.map((n, i) => h("li", {}, h("span", { class: "n" }, n), h("span", { class: "l" }, `Caixa ${i + 1}`)))));

  const categorySelect = h("select", { id: "f-category", onchange: (e) => setPref("category", e.target.value, "f-category") },
    h("option", { value: "all", selected: prefs.category === "all" }, "Todos os temas"),
    CATEGORIES.map((c) => h("option", { value: c, selected: prefs.category === c }, c)));

  const sizeSelect = h("select", { id: "f-size", onchange: (e) => setPref("size", e.target.value === "all" ? "all" : Number(e.target.value), "f-size") },
    SIZES.map((s) => h("option", { value: String(s), selected: prefs.size === s }, s === "all" ? "Todos os disponíveis" : `${s} cartões`)));

  const modeRadio = (value, label) =>
    h("label", {},
      h("input", { type: "radio", name: "mode", value, checked: prefs.mode === value, onchange: () => setPref("mode", value, `mode-${value}`), id: `mode-${value}` }),
      label);

  const startLabel = prefs.mode === "review" ? "Começar revisão" : "Começar treino";
  const startDisabled = queue.length === 0;

  const setup = h("section", { class: "panel", "aria-labelledby": "setup-h" },
    h("h2", { id: "setup-h" }, "Montar sessão"),
    h("fieldset", {}, h("legend", {}, "Modo"),
      h("div", { class: "radios" }, modeRadio("review", "Revisão do dia"), modeRadio("free", "Treino livre"))),
    h("label", { class: "field" }, h("span", {}, "Tema"), categorySelect),
    h("label", { class: "field" }, h("span", {}, "Quantidade de cartões"), sizeSelect),
    prefs.mode === "free"
      ? h("p", { class: "notice", role: "note" }, h("strong", {}, "O treino livre não altera suas caixas nem as datas de revisão."))
      : null,
    prefs.mode === "review" && startDisabled
      ? h("div", { class: "empty" },
          h("p", {}, h("strong", {}, "Tudo revisado por hoje neste tema")),
          stats.nextDue ? h("p", {}, `Próxima revisão disponível em ${formatDateBR(stats.nextDue)}.`) : null,
          h("button", { class: "btn", type: "button", onclick: () => setPref("mode", "free", "mode-free") }, "Ir para o treino livre"))
      : null,
    !startDisabled && prefs.size !== "all" && count < prefs.size
      ? h("p", { class: "hint" }, `Só ${plural(count, "cartão disponível", "cartões disponíveis")}: a sessão terá ${count}.`)
      : null,
    !startDisabled && prefs.size === "all"
      ? h("p", { class: "hint" }, `A sessão terá ${plural(count, "cartão", "cartões")}.`)
      : null,
    h("div", { class: "actions" },
      h("button", {
        class: "btn btn-primary", type: "button", disabled: startDisabled, id: "start",
        onclick: () => startNew(),
      }, startLabel),
      active
        ? h("button", { class: "btn", type: "button", id: "continue", onclick: () => go("study", "question") }, "Continuar sessão")
        : null));

  const hist = summarize(state.attempts.filter((a) => a.mode === "review"));
  const history = h("section", { class: "panel", "aria-labelledby": "hist-h" },
    h("h2", { id: "hist-h" }, "Histórico da revisão programada"),
    hist.total === 0
      ? h("p", { class: "hint" }, "Ainda sem tentativas na revisão programada. O treino livre não entra aqui.")
      : h("dl", { class: "rates" },
          h("dt", {}, "Tentativas concluídas"), h("dd", {}, hist.total),
          h("dt", {}, "Taxa de acerto"), h("dd", {}, pct(hist.accuracy)),
          h("dt", {}, "Taxa de lembrança declarada"), h("dd", {}, pct(hist.recallRate))));

  const backup = h("details", { class: "backup" },
    h("summary", {}, "Backup e redefinição"),
    h("div", { class: "backup-body" },
      h("p", {}, "O progresso fica salvo só neste navegador e neste endereço do site. Não há sincronização entre dispositivos: use exportar e importar para levar o progresso para outro lugar."),
      h("div", { class: "actions" },
        h("button", { class: "btn", type: "button", onclick: exportProgress }, "Exportar progresso"),
        h("button", { class: "btn", type: "button", onclick: () => fileInput.click() }, "Importar progresso"),
        h("button", { class: "btn btn-danger", type: "button", onclick: resetProgress }, "Redefinir progresso"))));
  const fileInput = h("input", {
    type: "file", accept: "application/json,.json", hidden: true, "aria-label": "Arquivo de backup",
    onchange: (e) => { importProgress(e.target.files[0]); e.target.value = ""; },
  });

  main.replaceChildren(review, setup, history, backup, fileInput);
}

async function startNew() {
  if (state.session && state.session.phase !== "done") {
    const yes = await ask({
      title: "Começar uma nova sessão?",
      body: h("p", {}, "Há uma sessão em andamento. Começar outra descarta o que ainda não foi concluído nela (as tentativas já salvas permanecem)."),
      confirm: "Começar nova",
    });
    if (!yes) return;
  }
  const { mode, category, size } = state.prefs;
  const session = startSession(state, { mode, category, size });
  if (!session) return render();
  persist();
  go("study", "question");
}

// ---------- tela: estudo ----------
function renderStudy() {
  const s = state.session;
  const card = currentCard(s);
  const cardState = state.cards[card.id];
  const done = completedAttempts(state, s).length;
  const total = s.queue.length;
  const phase = s.phase;
  const free = s.mode === "free";

  const header = h("div", {},
    h("div", { class: "study-head" },
      h("span", {}, `Cartão ${s.index + 1} de ${total}`),
      h("span", {}, free ? "Treino livre" : "Revisão do dia")),
    h("div", { class: "progress", role: "progressbar", "aria-label": "Progresso da sessão", "aria-valuemin": 0, "aria-valuemax": total, "aria-valuenow": done, "aria-valuetext": `${done} de ${total} concluídos` },
      h("div", { style: `width:${(done / total) * 100}%` })),
    h("div", { class: "tags" },
      h("span", { class: "tag" }, `#${String(card.number).padStart(2, "0")}`),
      h("span", { class: "tag" }, card.category),
      h("span", { class: "tag" }, `Caixa ${cardState.box}`)),
    h("h2", { class: "question", id: "question", tabindex: "-1" }, card.question));

  const body = [];
  if (phase === "think") {
    body.push(
      h("p", { class: "think-help" }, "Tente responder de cabeça ou em voz alta antes de continuar."),
      h("button", { class: "btn btn-primary btn-block", type: "button", id: "reveal", onclick: () => { revealOptions(state); persist(); go("study", "first-option"); } }, "Ver opções"));
  } else {
    body.push(optionsList(s, card, phase));
    if (phase === "feedback" || phase === "result") body.push(...feedbackBlocks(s, card, phase));
  }

  const foot = h("div", { class: "study-foot" },
    h("button", { class: "btn btn-quiet", type: "button", onclick: () => go("home") }, "Voltar ao início (pausar)"),
    h("button", { class: "btn btn-quiet", type: "button", onclick: endEarly }, "Encerrar sessão"));

  main.replaceChildren(h("section", { class: "panel", "aria-labelledby": "question" }, header, ...body, foot));
}

function optionsList(s, card, phase) {
  const locked = phase === "feedback" || phase === "result";
  const chosen = s.pending?.chosenOptionId;
  const items = s.optionOrder.map((optId, i) => {
    const opt = card.options.find((o) => o.id === optId);
    const letter = "ABCD"[i];
    const isCorrect = locked && optId === card.correctOptionId;
    const isWrong = locked && optId === chosen && !isCorrect;
    const mark = !locked ? null
      : isCorrect && optId === chosen ? "✓ Correta — sua escolha"
      : isCorrect ? "✓ Alternativa correta"
      : isWrong ? "✗ Sua escolha (incorreta)" : null;
    const btn = h("button", {
      type: "button",
      class: `option${isCorrect ? " is-correct" : ""}${isWrong ? " is-wrong" : ""}${locked && !isCorrect && !isWrong ? " is-dim" : ""}`,
      disabled: locked,
      "data-option": optId,
      onclick: () => { if (chooseOption(state, optId)) { persist(); go("study", "verdict"); } },
    },
      h("span", { class: "letter", "aria-hidden": "true" }, letter),
      h("span", { class: "body" }, h("span", { class: "sr-only" }, `Alternativa ${letter}: `), opt.text,
        mark ? h("span", { class: "mark" }, mark) : null));
    return h("li", {}, btn);
  });
  return h("ul", { class: "options", "aria-label": "Alternativas" }, items);
}

function feedbackBlocks(s, card, phase) {
  const ok = s.pending.correct;
  const blocks = [
    h("h3", { class: `verdict ${ok ? "ok" : "bad"}`, id: "verdict", tabindex: "-1" },
      h("span", { "aria-hidden": "true" }, ok ? "✓" : "✗"), ok ? "Você acertou!" : "Você errou."),
    h("div", { class: "answer" }, h("h4", {}, "Resposta completa"), h("p", {}, card.fullAnswer)),
  ];

  if (phase === "feedback") {
    blocks.push(h("div", { class: "selfcheck" },
      h("h4", { id: "selfcheck-q" }, "Você já sabia antes de ver as opções?"),
      h("p", { class: "hint", id: "selfcheck-help" }, "Marque Sim somente se já tinha formulado a resposta antes de revelar as alternativas. Se apenas reconheceu a correta ou chutou, marque Não."),
      h("div", { class: "actions", role: "group", "aria-labelledby": "selfcheck-q", "aria-describedby": "selfcheck-help" },
        h("button", { class: "btn", type: "button", onclick: () => assess(true) }, "Sim"),
        h("button", { class: "btn", type: "button", onclick: () => assess(false) }, "Não"))));
    return blocks;
  }

  const r = s.result;
  const last = s.index + 1 >= s.queue.length;
  blocks.push(h("div", { class: "result" },
    h("h4", { class: "sr-only", id: "result-h", tabindex: "-1" }, "Resultado consolidado"),
    h("span", { class: `badge ${r.classification}` }, `${r.classification === "error" ? "✗" : "✓"} ${CLASSIFICATION_LABEL[r.classification]}`),
    h("dl", {},
      h("dt", {}, "Autoavaliação"), h("dd", {}, r.knew ? "Sim, já sabia" : "Não, não sabia"),
      s.mode === "review" ? [
        h("dt", {}, "Caixa"), h("dd", {}, `Caixa ${r.boxBefore} → Caixa ${r.boxAfter}`),
        h("dt", {}, "Próxima revisão"), h("dd", {}, `${formatDateBR(r.dueDate)} (em ${plural(INTERVAL_DAYS[r.boxAfter], "dia", "dias")})`),
      ] : [h("dt", {}, "Treino livre"), h("dd", {}, "caixas e datas não foram alteradas")]),
    h("div", { class: "actions" },
      h("button", { class: "btn btn-primary", type: "button", id: "next", onclick: advance }, last ? "Ver resumo" : "Próximo cartão"))));
  return blocks;
}

function assess(knew) {
  if (!selfAssess(state, knew)) return;
  persist();
  go("study", "result");
}

function advance() {
  if (!nextCard(state)) return;
  persist();
  go(state.session.phase === "done" ? "summary" : "study", "question");
}

async function endEarly() {
  const s = state.session;
  const pending = s.phase === "feedback";
  const yes = await ask({
    title: "Encerrar a sessão?",
    body: h("p", {}, pending
      ? "O cartão atual ainda não teve autoavaliação e será descartado, sem alterar suas caixas. As tentativas já concluídas ficam salvas."
      : "As tentativas já concluídas ficam salvas e você verá um resumo parcial."),
    confirm: "Encerrar",
  });
  if (!yes || !state.session) return;
  endSession(state);
  persist();
  go("summary");
}

// ---------- tela: resumo ----------
function renderSummary() {
  const s = state.session;
  const stats = summarize(completedAttempts(state, s));
  const free = s.mode === "free";
  const n = (value, label) => h("div", {}, h("span", { class: "n" }, value), h("span", { class: "l" }, label));

  const panel = h("section", { class: "panel", "aria-labelledby": "summary-h" },
    h("h2", { id: "summary-h", tabindex: "-1" }, s.partial ? "Resumo parcial da sessão" : "Resumo da sessão"),
    h("p", { class: "hint" },
      `${free ? "Treino livre (caixas e datas não alteradas)" : "Revisão do dia"} · ${plural(stats.total, "cartão concluído", "cartões concluídos")} de ${s.queue.length}`
      + (s.partial ? " · sessão encerrada antes do fim" : "")),
    h("div", { class: "grid3" },
      n(stats.recall, "Acertos com lembrança"), n(stats.recognition, "Acertos por reconhecimento"), n(stats.errors, "Erros")),
    h("dl", { class: "rates" },
      h("dt", {}, "Taxa de acerto"), h("dd", {}, pct(stats.accuracy)),
      h("dt", {}, "Taxa de lembrança declarada"), h("dd", {}, pct(stats.recallRate))),
    !free
      ? h("div", {},
          h("h3", { style: "margin-top:16px;font-size:1rem" }, "Movimento nas caixas"),
          h("div", { class: "grid3" }, n(stats.rose, "Subiram"), n(stats.stayed, "Permaneceram"), n(stats.reset, "Voltaram à caixa 1")))
      : null,
    h("p", { class: "hint" }, "A lembrança é uma autodeclaração, não uma medida objetiva de domínio."),
    h("div", { class: "actions" },
      h("button", { class: "btn", type: "button", onclick: () => { clearSession(state); persist(); go("home"); } }, "Voltar ao início"),
      h("button", { class: "btn btn-primary", type: "button", onclick: () => { clearSession(state); state.prefs = { ...state.prefs, mode: "free" }; persist(); go("home"); } }, "Treinar novamente")));
  main.replaceChildren(panel);
  focusTarget ??= "summary-h";
}

// ---------- render ----------
function render() {
  if (view === "study" && !(state.session && state.session.phase !== "done")) view = state.session ? "summary" : "home";
  if (view === "summary" && !state.session) view = "home";
  if (view === "home") renderHome();
  else if (view === "study") renderStudy();
  else renderSummary();

  const target = focusTarget;
  focusTarget = null;
  if (!target) return;
  const el =
    target === "first-option" ? main.querySelector(".option")
    : target === "result" ? document.getElementById("next")
    : document.getElementById(target);
  if (el) el.focus();
  if (target === "result") announce(`${CLASSIFICATION_LABEL[state.session.result.classification]}. ${state.session.mode === "review" ? `Caixa ${state.session.result.boxBefore} para caixa ${state.session.result.boxAfter}.` : ""}`);
}

renderBanner();
render();
