import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { ROWS, CATEGORIES } from "./cards.src.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const cards = ROWS.map(([number, category, question, fullAnswer, correct, w1, w2, w3]) => {
  const id = `sap-isu-${String(number).padStart(3, "0")}`;
  const texts = [correct, w1, w2, w3];
  const options = texts.map((text, i) => ({ id: `${id}-o${i + 1}`, text }));
  return {
    id,
    number,
    category,
    question,
    fullAnswer,
    options,
    correctOptionId: options[0].id,
    source: { file: "Flashcards_SAP_ISU.pdf", cardNumber: number },
  };
});

const out =
  "// Gerado por tools/build-cards.mjs a partir de tools/cards.src.mjs. Não editar à mão.\n" +
  `export const DECK_VERSION = 1;\n` +
  `export const CATEGORIES = ${JSON.stringify(CATEGORIES, null, 2)};\n` +
  `export const CARDS = ${JSON.stringify(cards, null, 2)};\n`;

writeFileSync(join(root, "js", "cards.js"), out, "utf8");
console.log(`js/cards.js: ${cards.length} cartões`);
