// Regras do Leitner (5 caixas) e datas locais. Sem dependência de DOM.

export const MAX_BOX = 5;
export const INTERVAL_DAYS = { 1: 1, 2: 3, 3: 7, 4: 14, 5: 30 };

const DATE_RE = /^(\d{4})-(\d{2})-(\d{2})$/;

const pad = (n) => String(n).padStart(2, "0");

/** Data local (não UTC) no formato YYYY-MM-DD. */
export function toLocalDateString(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function todayLocal(now = new Date()) {
  return toLocalDateString(now);
}

export function isValidDateString(s) {
  if (typeof s !== "string") return false;
  const m = DATE_RE.exec(s);
  if (!m) return false;
  const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
  const date = new Date(y, mo - 1, d);
  return date.getFullYear() === y && date.getMonth() === mo - 1 && date.getDate() === d;
}

/** Soma dias de calendário a uma data local YYYY-MM-DD (sem UTC, sem milissegundos). */
export function addDays(dateStr, days) {
  const [y, mo, d] = dateStr.split("-").map(Number);
  return toLocalDateString(new Date(y, mo - 1, d + days));
}

export function formatDateBR(dateStr) {
  const [y, mo, d] = dateStr.split("-");
  return `${d}/${mo}/${y}`;
}

export function classify(correct, knew) {
  if (!correct) return "error";
  return knew ? "recall" : "recognition";
}

export const CLASSIFICATION_LABEL = {
  recall: "Acerto com lembrança",
  recognition: "Acerto por reconhecimento",
  error: "Erro",
};

export function nextBox(currentBox, correct, knew) {
  if (!correct) return 1;
  if (knew) return Math.min(currentBox + 1, MAX_BOX);
  return currentBox;
}

/**
 * Aplica uma tentativa concluída a um cartão. A data de revisão usa a caixa
 * RESULTANTE e a data local de conclusão.
 */
export function applyAttempt(cardState, { correct, knew }, completedDate) {
  const boxBefore = cardState.box;
  const boxAfter = nextBox(boxBefore, correct, knew);
  const dueDate = addDays(completedDate, INTERVAL_DAYS[boxAfter]);
  const classification = classify(correct, knew);
  const counts = { ...cardState.counts };
  counts[classification] += 1;
  return {
    boxBefore,
    boxAfter,
    dueDate,
    classification,
    card: { box: boxAfter, dueDate, lastReviewed: completedDate, counts },
  };
}
