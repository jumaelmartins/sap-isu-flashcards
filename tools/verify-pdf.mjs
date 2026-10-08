import { readFileSync } from "node:fs";
import { CARDS } from "../js/cards.js";
const norm = (s) => s.replace(/-\s*\n\s*/g, "-").replace(/\s+/g, " ").trim();
const pdf = norm(readFileSync(new URL("./pdf.txt", import.meta.url), "utf8"));
let bad = 0;
for (const c of CARDS) {
  for (const [k, t] of [["resposta", c.fullAnswer], ["pergunta", c.question]]) {
    if (!pdf.includes(norm(t))) { bad++; console.log(`✗ ${c.id} ${k}: ${t}`); }
  }
}
console.log(bad ? `${bad} divergências` : "todas as perguntas e respostas encontradas no PDF");
