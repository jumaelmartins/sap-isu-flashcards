# Spec — Site estático de flashcards SAP IS-U / CCS

## 1. Pedido de implementação

Crie um site estático simples, completo e responsivo para estudar SAP IS-U / CCS e se preparar para entrevistas. Use o PDF `Flashcards_SAP_ISU.pdf`, anexado junto deste spec, como fonte do baralho inicial.

O método central é **pensar primeiro, escolher depois, dentro do mesmo cartão**: primeiro vejo apenas a pergunta e tento responder de cabeça; depois revelo quatro alternativas, escolho uma, recebo a correção e informo se já sabia a resposta antes de ver as opções.

Entregue o site funcional, com os 53 cartões do PDF, alternativas preparadas previamente e progresso persistido no navegador. A simplicidade é uma prioridade: interface direta, sem login, backend, banco remoto, integração SAP ou chamadas a serviços de IA em tempo de uso.

## 2. Conteúdo do baralho

Extraia todas as perguntas e respostas do PDF, preservando a numeração original. Não entregue somente alguns exemplos nem preencha o restante com conteúdo fictício.

| Categoria | Cartões | Quantidade |
| --- | --- | ---: |
| Visão geral | 01–07 | 7 |
| Dados mestre | 08–18 | 11 |
| Meter to Cash | 19–33 | 15 |
| Move-In e Move-Out | 34–39 | 6 |
| Configuração tarifária | 40–47 | 8 |
| Incidente e FI-CA | 48–53 | 6 |
| Total | 01–53 | 53 |

Para cada cartão, armazenar:

- ID estável, baseado na numeração do PDF, como `sap-isu-012`.
- Número original, categoria, pergunta e resposta completa.
- Quatro alternativas com IDs estáveis: uma correta e três incorretas.
- ID da alternativa correta.
- Referência de origem: nome do PDF e número do cartão.

O PDF fornece perguntas e respostas, mas não alternativas. Criar as alternativas durante o desenvolvimento e incluí-las no arquivo de dados; não gerá-las dinamicamente no navegador.

### Qualidade das alternativas

- A correta deve refletir a resposta do PDF sem mudar seu significado.
- As incorretas devem ser plausíveis e tratar do mesmo assunto, sem também poderem ser consideradas corretas.
- Para perguntas sobre sequências, listas ou transações, as quatro alternativas precisam responder à pergunta inteira.
- Evitar alternativas absurdas, duplicadas, sobrepostas, “todas as anteriores” e “nenhuma das anteriores”.
- Manter comprimentos e estruturas semelhantes quando possível, evitando pistas pela redação.
- A resposta completa do PDF é exibida após a escolha, mesmo que a alternativa correta seja mais curta.
- Preservar nomes, códigos, siglas e qualificadores, como “no lab”, que delimitam o contexto.
- Não ampliar orientações específicas do material para afirmar que valem em todo ambiente SAP. Se houver uma inconsistência aparente, sinalizá-la na entrega para revisão, sem alterar silenciosamente o conteúdo.
- Revisar a extração do PDF em duas colunas para não associar a pergunta de um cartão à resposta de outro.

Exemplo de cartão, baseado no cartão 12:

```json
{
  "id": "sap-isu-012",
  "number": 12,
  "category": "Dados mestre",
  "question": "O que liga o comercial ao técnico?",
  "fullAnswer": "O Contrato, que liga a Conta Contrato à Instalação.",
  "options": [
    { "id": "contrato", "text": "O Contrato, ligando a Conta Contrato à Instalação." },
    { "id": "pn", "text": "O Parceiro de Negócios, ligando diretamente o cliente ao medidor." },
    { "id": "ordem", "text": "A Ordem de Leitura, ligando a Conta Contrato ao Local de Consumo." },
    { "id": "impressao", "text": "O Documento de Impressão, ligando o cliente ao equipamento." }
  ],
  "correctOptionId": "contrato",
  "source": { "file": "Flashcards_SAP_ISU.pdf", "cardNumber": 12 }
}
```

Esse exemplo ilustra o formato; implementar também os outros 52 cartões.

## 3. Fluxo obrigatório do cartão

Usar um único componente de cartão, que muda de estado sem navegar para outra página.

### Estado 1 — Pensar

Exibir somente a pergunta como conteúdo de estudo, com número, categoria e caixa atual em uma área discreta. Não mostrar alternativas, resposta, pistas, prévias ou marcação de acerto.

Texto de apoio: **“Tente responder de cabeça ou em voz alta antes de continuar.”**

Botão principal: **“Ver opções”**.

Não exigir digitação, gravação de voz ou tempo mínimo. O usuário decide quando revelar as opções.

### Estado 2 — Escolher

Manter a pergunta visível e apresentar as quatro alternativas como botões A, B, C e D. Ao clicar em uma alternativa, confirmar imediatamente a escolha, bloquear todas as alternativas e avançar para a correção. Não permitir segunda tentativa no mesmo cartão.

Embaralhar a posição das alternativas a cada nova apresentação, usando seus IDs para corrigir. Manter a ordem estável durante a apresentação atual, inclusive se a página for recarregada.

### Estado 3 — Correção e autoavaliação

Mostrar **“Você acertou!”** ou **“Você errou.”**. Destacar a alternativa correta e, em caso de erro, também a escolhida. Exibir a **resposta completa** em um bloco legível.

Logo abaixo, perguntar exatamente:

**“Você já sabia antes de ver as opções?”**

Botões: **“Sim”** e **“Não”**.

Texto de apoio: “Marque Sim somente se já tinha formulado a resposta antes de revelar as alternativas. Se apenas reconheceu a correta ou chutou, marque Não.”

Perguntar isso tanto após acerto quanto após erro. Em caso de erro, a resposta à autoavaliação não muda a penalidade. A informação é uma autodeclaração; não apresentar o resultado como comprovação objetiva de domínio.

Antes dessa escolha, não atualizar o Leitner nem habilitar “Próximo cartão”. Guardar a escolha da alternativa como uma tentativa pendente.

### Estado 4 — Resultado consolidado

Após Sim ou Não, salvar a tentativa exatamente uma vez e mostrar:

- Classificação: **“Acerto com lembrança”**, **“Acerto por reconhecimento”** ou **“Erro”**.
- Caixa anterior e nova caixa, por exemplo: “Caixa 2 → Caixa 3”.
- Próxima data de revisão.
- Botão **“Próximo cartão”**, ou **“Ver resumo”** no último cartão.

Bloquear alterações na autoavaliação após salvar. Não avançar automaticamente: deixar tempo para ler a explicação.

## 4. Leitner com cinco caixas

Todos os cartões começam na caixa 1, disponíveis imediatamente. O sistema deve usar as regras abaixo, sem promover um cartão apenas porque a alternativa correta foi escolhida.

| Resultado | Movimento |
| --- | --- |
| Acertou e respondeu Sim | Sobe uma caixa, até o máximo de 5 |
| Acertou e respondeu Não | Permanece na caixa atual |
| Errou, independentemente de Sim ou Não | Volta para a caixa 1 |

Na caixa 5, acertar e responder Sim mantém o cartão na caixa 5. Não existe caixa 6, nem remoção definitiva do baralho.

### Intervalos definidos para o MVP

| Caixa após a tentativa | Próxima revisão |
| --- | --- |
| 1 | Em 1 dia |
| 2 | Em 3 dias |
| 3 | Em 7 dias |
| 4 | Em 14 dias |
| 5 | Em 30 dias |

Esses intervalos são uma escolha de produto para esta implementação. Calcular a próxima revisão com base na **caixa resultante** e na data local em que a tentativa foi concluída, inclusive quando o cartão permanece na mesma caixa.

Guardar `dueDate` como data local `YYYY-MM-DD`. Adicionar dias de calendário; não converter para UTC e não usar divisão de milissegundos para determinar a data. Uma revisão fica disponível durante todo o dia previsto e permanece disponível se estiver atrasada.

Exemplos obrigatórios:

- Caixa 1 + acerto + Sim → caixa 2, revisão em 3 dias.
- Caixa 3 + acerto + Não → caixa 3, revisão em 7 dias.
- Caixa 4 + erro + Sim → caixa 1, revisão em 1 dia.
- Caixa 5 + acerto + Sim → caixa 5, revisão em 30 dias.

Pseudocódigo da regra:

```text
se errou:
    novaCaixa = 1
senão se jáSabia:
    novaCaixa = mínimo(caixaAtual + 1, 5)
senão:
    novaCaixa = caixaAtual

próximaRevisão = dataLocalDaConclusão + intervaloDaNovaCaixa
```

## 5. Modos de estudo e montagem da sessão

### Revisão do dia — padrão

Selecionar apenas cartões novos ou com `dueDate` menor ou igual à data local de hoje, respeitando o filtro de categoria. Ordenar pelos mais atrasados, depois pela menor caixa; empates podem ser embaralhados.

No início da sessão, congelar a lista de IDs selecionados. Cada cartão aparece uma única vez nessa sessão. Um erro não deve reinserir automaticamente o cartão na mesma fila.

### Treino livre

Permitir estudar todos os cartões ou uma categoria, independentemente das datas. Usar o mesmo fluxo de quatro estados.

Exibir aviso claro antes de iniciar: **“O treino livre não altera suas caixas nem as datas de revisão.”**

Registrar os resultados dessa sessão para seu resumo, identificados como treino livre, sem misturá-los aos indicadores históricos da revisão programada. Esse modo permite repetir conteúdo na preparação de última hora.

### Duração e interrupção

Oferecer sessões de **10 cartões**, **20 cartões** ou **todos os disponíveis**, com 10 como padrão. Se houver menos cartões que o limite, usar a quantidade disponível e informar isso.

Permitir encerrar uma sessão antes do fim. Manter as tentativas já consolidadas e mostrar um resumo parcial. Uma tentativa sem autoavaliação pode ser descartada ao encerrar explicitamente, sem modificar o Leitner.

## 6. Interface mínima

### Início

- Título: **“SAP IS-U — Flashcards”**.
- Contador de cartões para revisar hoje e de cartões nunca revisados. O contador de hoje inclui os novos; não somar os dois como se fossem grupos separados.
- Distribuição nas cinco caixas em cinco blocos compactos.
- Seletor de categoria: “Todos os temas” e as seis categorias do PDF.
- Seletor do modo e quantidade de cartões.
- Ação principal: **“Começar revisão”**; no treino livre, **“Começar treino”**.
- Se houver sessão interrompida, ação **“Continuar sessão”**.
- Acesso discreto a exportação, importação e redefinição do progresso.

Se não houver revisão disponível no filtro escolhido, mostrar: “Tudo revisado por hoje neste tema”, a próxima data disponível, quando houver, e acesso ao treino livre.

### Estudo

- Indicador “Cartão 3 de 10” e barra de progresso baseada em tentativas concluídas.
- Categoria e caixa em etiquetas discretas.
- Pergunta em destaque; alternativas e resposta conforme o estado.
- Ação secundária “Encerrar sessão”.

### Resumo

- Quantidade de cartões concluídos e indicação de sessão parcial, se aplicável.
- Acertos com lembrança declarada, acertos por reconhecimento e erros, em números separados.
- Taxa de acerto = todos os acertos / tentativas concluídas.
- Taxa de lembrança declarada = acertos com Sim / tentativas concluídas.
- Em revisão programada: cartões que subiram, permaneceram ou voltaram para a caixa 1. Um acerto na caixa 5 conta como permaneceu; um erro na caixa 1 conta como voltou/reiniciou a caixa 1.
- Botões “Voltar ao início” e “Treinar novamente”, este último abrindo treino livre.

Se não houver tentativas concluídas, mostrar taxas como “—”, sem divisão por zero. Não criar pontuação única que trate lembrança e reconhecimento como equivalentes.

### Aparência e acessibilidade

Visual suave e limpo: fundo claro, cartão branco, azul como cor principal, bordas discretas, cantos arredondados e sombra leve. Verde e vermelho apenas para feedback, acompanhados de texto e ícones.

Layout centralizado com largura máxima aproximada de 760 px; alternativas empilhadas, leitura confortável e botões de toque de pelo menos 44 px. Funcionar em celular e desktop sem rolagem horizontal. Não usar imagens decorativas, animações de virar cartão, bibliotecas de gráficos ou elementos que desviem a atenção da pergunta.

Usar botões semânticos, foco visível, navegação por teclado e anúncio acessível da correção. Gerenciar o foco ao revelar opções e ao abrir o próximo cartão. A resposta não deve ficar acessível na árvore de acessibilidade antes da correção.

## 7. Arquitetura e persistência

Preferir **HTML, CSS e JavaScript**, com o baralho em um arquivo de dados local. Se o ambiente já utilizar React, usar componentes simples e gerar uma saída estática equivalente. Não adicionar servidor de aplicação nem dependências desnecessárias.

O site deve funcionar em hospedagem estática por HTTPS. Não prometer funcionamento por duplo clique em `index.html` se houver uso de módulos ou carregamento de JSON por `fetch`.

Persistir em `localStorage`, em uma chave com namespace, por exemplo `sap-isu-flashcards:v1`:

- Versão do formato de armazenamento e versão do baralho.
- Para cada cartão: caixa, próxima revisão, última revisão e contadores dos três resultados.
- Histórico das tentativas: ID único, sessão, cartão, modo, alternativa escolhida, acerto, autoavaliação, classificação, instante da conclusão, caixa anterior/resultante e próxima revisão. No treino livre, não registrar uma mudança fictícia de caixa.
- Sessão ativa: modo, filtro, fila congelada, índice, estado do cartão, ordem das alternativas e tentativa pendente.
- Preferências de modo, categoria e tamanho da sessão.

Salvar após cada transição relevante. Ao recarregar, continuar exatamente do estado salvo: pergunta oculta ainda sem opções, opções reveladas, correção aguardando autoavaliação ou resultado já consolidado.

A autoavaliação deve consolidar histórico, contadores, caixa e data em uma única atualização do objeto persistido. Usar um ID de tentativa para impedir gravação duplicada por clique duplo, recarga ou re-renderização. Apenas ver a pergunta, revelar opções ou escolher uma alternativa não altera o Leitner.

Se o armazenamento falhar ou estiver indisponível, manter a sessão utilizável em memória e mostrar um aviso visível de que o progresso não está sendo salvo. Dados inválidos não devem ser apagados silenciosamente; oferecer exportação do conteúdo existente e reinicialização explícita.

O progresso é local ao navegador e endereço do site. Não existe sincronização entre dispositivos; explicar isso brevemente na área de backup.

### Backup e redefinição

- **Exportar progresso:** baixar JSON com versão, data da exportação, histórico, progresso e sessão ativa.
- **Importar progresso:** validar estrutura, tipos, IDs do baralho, caixas entre 1 e 5, datas e estados antes de aceitar. Mostrar um resumo e pedir confirmação para substituir o progresso atual. Uma importação inválida deve deixar os dados atuais intactos.
- **Redefinir progresso:** pedir confirmação explícita; voltar todos os cartões à caixa 1, disponíveis agora, e limpar histórico e sessão. Apagar apenas as chaves deste aplicativo, nunca executar `localStorage.clear()`.

Não incluir editor de cartões ou importação de novos PDFs no MVP. O PDF deve ser convertido para dados durante o desenvolvimento.

## 8. Critérios de aceite

1. O baralho possui exatamente 53 cartões, com IDs únicos, categorias e respostas correspondentes ao PDF.
2. Cada cartão contém quatro alternativas únicas e exatamente uma correta.
3. Inicialmente aparecem a pergunta e seus metadados, sem alternativas nem resposta.
4. “Ver opções” revela quatro alternativas sem revelar a resposta completa.
5. Selecionar uma alternativa bloqueia novas escolhas e mostra a correção e a resposta completa.
6. Sim/Não é obrigatório para consolidar uma tentativa; o próximo cartão fica bloqueado até essa escolha.
7. As três regras de promoção, permanência e retorno funcionam, incluindo os limites das caixas 1 e 5.
8. A data da revisão usa o intervalo da caixa resultante e dias de calendário locais.
9. Reconhecimento nunca promove o cartão; um erro sempre retorna à caixa 1.
10. Recarregar em qualquer estado mantém a sessão e não duplica tentativas nem embaralha novamente as opções atuais.
11. Uma tentativa incompleta não altera o Leitner; uma tentativa concluída é salva uma única vez.
12. Revisão do dia inclui apenas cartões disponíveis; cada cartão aparece uma vez por sessão.
13. Treino livre não altera caixas nem datas, e seus resultados ficam separados dos indicadores de revisão.
14. Filtros, limites de sessão, resumo parcial e estados vazios funcionam corretamente.
15. Taxa de acerto e lembrança declarada são calculadas separadamente, usando apenas tentativas concluídas.
16. Exportar e importar preservam o progresso; importação inválida não sobrescreve dados.
17. Redefinir exige confirmação e não apaga dados de outros aplicativos.
18. Interface funciona em telas de 360 px e desktop, com teclado e sem depender exclusivamente de cores.
19. O build é estático e o uso normal não exige conta, API, backend ou conexão SAP.

Validar especialmente a regra do Leitner, cálculo de datas perto da meia-noite, restauração dos quatro estados e prevenção de dupla gravação.

## 9. Entrega esperada

Entregar o código completo, o baralho preenchido e revisado, instruções curtas para executar/publicar e uma lista breve das verificações realizadas. Priorizar o fluxo de estudo funcionando de ponta a ponta e a integridade do progresso.

Não adicionar recursos além deste escopo para compensar cartões ausentes ou comportamento incompleto.
