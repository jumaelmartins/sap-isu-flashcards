# SAP IS-U — Flashcards

Site estático para estudar SAP IS-U / CCS: **pense primeiro, escolha depois, dentro do mesmo cartão**, com revisão espaçada por 5 caixas de Leitner. 53 cartões, sem login, backend ou IA em tempo de uso. O progresso fica no `localStorage` do navegador.

Especificação: [`SPEC_Flashcards_SAP_ISU.md`](SPEC_Flashcards_SAP_ISU.md).

## Executar localmente

Usa módulos ES, então precisa de um servidor estático (não abre por duplo clique):

```bash
python -m http.server 4173   # ou: npx serve .
# http://localhost:4173
```

## Testes

```bash
npm test                      # regras do Leitner, datas, fluxo da sessão, persistência, importação
npm run build:cards           # regenera js/cards.js a partir de tools/cards.src.mjs
```

## Publicar

Hospedagem estática, sem build: qualquer pasta raiz servida por HTTPS. Na Vercel, importe o repositório sem framework e sem comando de build (diretório de saída: raiz).

## Estrutura

| Arquivo | Papel |
| --- | --- |
| `js/cards.js` | Baralho (gerado): 53 cartões com 4 alternativas e IDs estáveis |
| `js/leitner.js` | Caixas, intervalos (1/3/7/14/30 dias) e datas locais |
| `js/engine.js` | Montagem da sessão e transições dos 4 estados |
| `js/state.js` | Estado persistido, validação, importação/exportação |
| `js/app.js` | Interface |
| `tools/` | Fonte editorial do baralho e conferência contra o PDF |

## Pontos do material para revisão

O conteúdo das respostas é o do PDF, sem alteração. Itens que merecem atenção do autor:

- **Cartão 20** lista `EA05` duas vezes (antes e depois da `EA19`) e `FPE3` sem explicação em outro cartão; o cartão 31 descreve `EA05` como tratamento de anomalia.
- **Cartão 32** (`ZTAT`, `ZEAT`, `ZDAM/ZDVM`) são operandos customizados (Z) e o cartão 36 se limita ao “lab”; as alternativas não generalizam esses itens para todo ambiente SAP.
- **Cartão 28**: a alternativa correta (“Não, o faturamento depende do documento de cálculo.”) acrescenta uma justificativa derivada dos cartões 26 e 29; a resposta completa exibida continua sendo apenas “Não.”.
- Alguns distratores usam códigos reais de transação/tabela (ex.: `ES60`, `CAA3`) como alternativas incorretas *no contexto da pergunta*; vale conferir se algum deles pode ser considerado válido no seu ambiente.
