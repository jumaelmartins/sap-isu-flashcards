// Gerado por tools/build-cards.mjs a partir de tools/cards.src.mjs. Não editar à mão.
export const DECK_VERSION = 1;
export const CATEGORIES = [
  "Visão geral",
  "Dados mestre",
  "Meter to Cash",
  "Move-In e Move-Out",
  "Configuração tarifária",
  "Incidente e FI-CA"
];
export const CARDS = [
  {
    "id": "sap-isu-001",
    "number": 1,
    "category": "Visão geral",
    "question": "O que é o SAP IS-U?",
    "fullAnswer": "Industry Solution for Utilities: a solução da SAP para energia, água, gás e saneamento. Roda sobre o SAP ERP / S/4HANA.",
    "options": [
      {
        "id": "sap-isu-001-o1",
        "text": "Industry Solution for Utilities, a solução da SAP para energia, água, gás e saneamento, sobre o ERP / S/4HANA."
      },
      {
        "id": "sap-isu-001-o2",
        "text": "Integrated System for Users, a solução da SAP para atendimento ao cliente de qualquer setor, sobre o SAP CRM."
      },
      {
        "id": "sap-isu-001-o3",
        "text": "Industry Solution for Utilities, um sistema legado da SAP para energia e gás, que roda isolado do ERP."
      },
      {
        "id": "sap-isu-001-o4",
        "text": "Industrial Supply Utility, a solução da SAP para planejamento de produção e estoque de fábricas, sobre o S/4HANA."
      }
    ],
    "correctOptionId": "sap-isu-001-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 1
    }
  },
  {
    "id": "sap-isu-002",
    "number": 2,
    "category": "Visão geral",
    "question": "O que é o CCS?",
    "fullAnswer": "Customer Care & Service: o ciclo comercial dentro do IS-U (cadastro, leitura, faturamento, cobrança, atendimento).",
    "options": [
      {
        "id": "sap-isu-002-o1",
        "text": "Customer Care & Service, o ciclo comercial dentro do IS-U: cadastro, leitura, faturamento, cobrança e atendimento."
      },
      {
        "id": "sap-isu-002-o2",
        "text": "Customer Credit System, o módulo de análise de crédito e score dos clientes dentro do FI-CA."
      },
      {
        "id": "sap-isu-002-o3",
        "text": "Consumption Control & Settlement, o ciclo técnico do IS-U que cuida de medidores, ordens de serviço e manutenção."
      },
      {
        "id": "sap-isu-002-o4",
        "text": "Contract Care Suite, o ciclo contratual dentro do IS-U: criação de contratos, tarifas e cadastro de produtos."
      }
    ],
    "correctOptionId": "sap-isu-002-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 2
    }
  },
  {
    "id": "sap-isu-003",
    "number": 3,
    "category": "Visão geral",
    "question": "Quais são os 5 módulos?",
    "fullAnswer": "DM (medidores e leitura), WM (ordens de serviço), Billing (faturamento), FI-CA (arrecadação e cobrança), CS/CRM (atendimento).",
    "options": [
      {
        "id": "sap-isu-003-o1",
        "text": "DM (medidores e leitura), WM (ordens de serviço), Billing (faturamento), FI-CA (arrecadação e cobrança), CS/CRM (atendimento)."
      },
      {
        "id": "sap-isu-003-o2",
        "text": "DM (medidores e leitura), WM (ordens de serviço), Billing (faturamento), MM (arrecadação e cobrança), SD (atendimento)."
      },
      {
        "id": "sap-isu-003-o3",
        "text": "DM (faturamento e cobrança), WM (medidores e leitura), Billing (ordens de serviço), FI-CA (atendimento), CS/CRM (arrecadação)."
      },
      {
        "id": "sap-isu-003-o4",
        "text": "DM (ordens de serviço), WM (medidores e leitura), Billing (arrecadação), FI-CA (faturamento e cobrança), CS/CRM (atendimento)."
      }
    ],
    "correctOptionId": "sap-isu-003-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 3
    }
  },
  {
    "id": "sap-isu-004",
    "number": 4,
    "category": "Visão geral",
    "question": "Qual é o ciclo comercial?",
    "fullAnswer": "Atendimento › Dados mestre › Leitura › Faturamento › Arrecadação › Cobrança.",
    "options": [
      {
        "id": "sap-isu-004-o1",
        "text": "Atendimento › Dados mestre › Leitura › Faturamento › Arrecadação › Cobrança."
      },
      {
        "id": "sap-isu-004-o2",
        "text": "Dados mestre › Atendimento › Faturamento › Leitura › Cobrança › Arrecadação."
      },
      {
        "id": "sap-isu-004-o3",
        "text": "Atendimento › Leitura › Dados mestre › Faturamento › Arrecadação › Cobrança."
      },
      {
        "id": "sap-isu-004-o4",
        "text": "Atendimento › Dados mestre › Leitura › Faturamento › Cobrança › Arrecadação."
      }
    ],
    "correctOptionId": "sap-isu-004-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 4
    }
  },
  {
    "id": "sap-isu-005",
    "number": 5,
    "category": "Visão geral",
    "question": "Transação x report x função?",
    "fullAnswer": "Transação abre uma tela. Report é programa ABAP, roda em lote/background. Função/RFC é componente reutilizável usado em integrações.",
    "options": [
      {
        "id": "sap-isu-005-o1",
        "text": "Transação abre uma tela. Report é programa ABAP e roda em lote/background. Função/RFC é componente reutilizável de integrações."
      },
      {
        "id": "sap-isu-005-o2",
        "text": "Transação é programa ABAP e roda em lote/background. Report abre uma tela. Função/RFC é componente reutilizável de integrações."
      },
      {
        "id": "sap-isu-005-o3",
        "text": "Transação abre uma tela. Report é componente reutilizável de integrações. Função/RFC é programa ABAP e roda em lote/background."
      },
      {
        "id": "sap-isu-005-o4",
        "text": "Transação é componente reutilizável de integrações. Report abre uma tela. Função/RFC é programa ABAP e roda em lote/background."
      }
    ],
    "correctOptionId": "sap-isu-005-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 5
    }
  },
  {
    "id": "sap-isu-006",
    "number": 6,
    "category": "Visão geral",
    "question": "Por que processamento em massa?",
    "fullAnswer": "Pelo volume: o lote é dividido em intervalos e cada um roda num job paralelo.",
    "options": [
      {
        "id": "sap-isu-006-o1",
        "text": "Pelo volume: o lote é dividido em intervalos e cada intervalo roda num job paralelo."
      },
      {
        "id": "sap-isu-006-o2",
        "text": "Pela segurança: cada cliente é processado em sequência numa fila única, para evitar bloqueios de dados."
      },
      {
        "id": "sap-isu-006-o3",
        "text": "Pela regulação: a norma exige que todas as faturas sejam emitidas no mesmo instante, por um único job."
      },
      {
        "id": "sap-isu-006-o4",
        "text": "Pela exceção: só clientes com anomalia entram no lote, que roda em tela, um contrato por vez."
      }
    ],
    "correctOptionId": "sap-isu-006-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 6
    }
  },
  {
    "id": "sap-isu-007",
    "number": 7,
    "category": "Visão geral",
    "question": "Dado mestre x transacional?",
    "fullAnswer": "Mestre existia ANTES do processo (estável). Transacional foi CRIADO pelo processo (leituras, faturas, pagamentos).",
    "options": [
      {
        "id": "sap-isu-007-o1",
        "text": "Mestre existia ANTES do processo (estável). Transacional foi CRIADO pelo processo (leituras, faturas, pagamentos)."
      },
      {
        "id": "sap-isu-007-o2",
        "text": "Mestre foi CRIADO pelo processo (leituras, faturas, pagamentos). Transacional existia ANTES do processo (estável)."
      },
      {
        "id": "sap-isu-007-o3",
        "text": "Mestre muda a cada processo (leituras, faturas). Transacional é estável e cadastrado uma única vez (clientes, instalações)."
      },
      {
        "id": "sap-isu-007-o4",
        "text": "Mestre existia ANTES do processo (estável). Transacional é a cópia arquivada do mestre, guardada após o encerramento do processo."
      }
    ],
    "correctOptionId": "sap-isu-007-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 7
    }
  },
  {
    "id": "sap-isu-008",
    "number": 8,
    "category": "Dados mestre",
    "question": "Qual o nível mais alto da estrutura técnica?",
    "fullAnswer": "Objeto de Ligação (o prédio, a casa, a torre).",
    "options": [
      {
        "id": "sap-isu-008-o1",
        "text": "Objeto de Ligação (o prédio, a casa, a torre)."
      },
      {
        "id": "sap-isu-008-o2",
        "text": "Local de Consumo (a unidade que consome, como cada apartamento)."
      },
      {
        "id": "sap-isu-008-o3",
        "text": "Local de Instalação (o ponto onde o medidor fica fisicamente)."
      },
      {
        "id": "sap-isu-008-o4",
        "text": "Instalação (a unidade com categoria de tarifa e unidade de leitura)."
      }
    ],
    "correctOptionId": "sap-isu-008-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 8
    }
  },
  {
    "id": "sap-isu-009",
    "number": 9,
    "category": "Dados mestre",
    "question": "Objeto de Ligação x Local de Consumo?",
    "fullAnswer": "Objeto de Ligação é o prédio. Local de Consumo é cada apartamento medido separadamente.",
    "options": [
      {
        "id": "sap-isu-009-o1",
        "text": "Objeto de Ligação é o prédio. Local de Consumo é cada apartamento medido separadamente."
      },
      {
        "id": "sap-isu-009-o2",
        "text": "Objeto de Ligação é cada apartamento medido separadamente. Local de Consumo é o prédio."
      },
      {
        "id": "sap-isu-009-o3",
        "text": "Objeto de Ligação é o medidor. Local de Consumo é o prédio inteiro, medido em conjunto."
      },
      {
        "id": "sap-isu-009-o4",
        "text": "Objeto de Ligação é o prédio. Local de Consumo é o ponto físico onde o medidor fica instalado."
      }
    ],
    "correctOptionId": "sap-isu-009-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 9
    }
  },
  {
    "id": "sap-isu-010",
    "number": 10,
    "category": "Dados mestre",
    "question": "Local de Consumo x Local de Instalação?",
    "fullAnswer": "Local de Consumo é a unidade que consome. Local de Instalação é onde o medidor fica fisicamente.",
    "options": [
      {
        "id": "sap-isu-010-o1",
        "text": "Local de Consumo é a unidade que consome. Local de Instalação é onde o medidor fica fisicamente."
      },
      {
        "id": "sap-isu-010-o2",
        "text": "Local de Consumo é onde o medidor fica fisicamente. Local de Instalação é a unidade que consome."
      },
      {
        "id": "sap-isu-010-o3",
        "text": "Local de Consumo é o prédio que recebe a ligação. Local de Instalação é a unidade que consome."
      },
      {
        "id": "sap-isu-010-o4",
        "text": "Local de Consumo é a conta do cliente. Local de Instalação é onde o medidor fica fisicamente."
      }
    ],
    "correctOptionId": "sap-isu-010-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 10
    }
  },
  {
    "id": "sap-isu-011",
    "number": 11,
    "category": "Dados mestre",
    "question": "Qual objeto é o coração do faturamento?",
    "fullAnswer": "A Instalação: guarda categoria de tarifa, unidade de leitura, tensão, baixa renda.",
    "options": [
      {
        "id": "sap-isu-011-o1",
        "text": "A Instalação: guarda categoria de tarifa, unidade de leitura, tensão e baixa renda."
      },
      {
        "id": "sap-isu-011-o2",
        "text": "O Contrato: guarda forma de pagamento, bloqueios de cobrança e data de início do fornecimento."
      },
      {
        "id": "sap-isu-011-o3",
        "text": "A Conta Contrato: guarda forma de pagamento, bloqueios de cobrança e categoria de tarifa."
      },
      {
        "id": "sap-isu-011-o4",
        "text": "O Equipamento: guarda número de série, fabricante, tensão e categoria de tarifa do medidor."
      }
    ],
    "correctOptionId": "sap-isu-011-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 11
    }
  },
  {
    "id": "sap-isu-012",
    "number": 12,
    "category": "Dados mestre",
    "question": "O que liga o comercial ao técnico?",
    "fullAnswer": "O Contrato, que liga a Conta Contrato à Instalação.",
    "options": [
      {
        "id": "sap-isu-012-o1",
        "text": "O Contrato, ligando a Conta Contrato à Instalação."
      },
      {
        "id": "sap-isu-012-o2",
        "text": "O Parceiro de Negócios, ligando diretamente o cliente ao medidor."
      },
      {
        "id": "sap-isu-012-o3",
        "text": "A Ordem de Leitura, ligando a Conta Contrato ao Local de Consumo."
      },
      {
        "id": "sap-isu-012-o4",
        "text": "O Documento de Impressão, ligando o cliente ao equipamento."
      }
    ],
    "correctOptionId": "sap-isu-012-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 12
    }
  },
  {
    "id": "sap-isu-013",
    "number": 13,
    "category": "Dados mestre",
    "question": "Para que serve a Conta Contrato?",
    "fullAnswer": "Agrupa contratos com o mesmo pagamento e cobrança. Guarda bloqueios de cobrança e de faturamento.",
    "options": [
      {
        "id": "sap-isu-013-o1",
        "text": "Agrupa contratos com o mesmo pagamento e cobrança. Guarda bloqueios de cobrança e de faturamento."
      },
      {
        "id": "sap-isu-013-o2",
        "text": "Agrupa instalações do mesmo prédio. Guarda a categoria de tarifa e a unidade de leitura."
      },
      {
        "id": "sap-isu-013-o3",
        "text": "Agrupa medidores com o mesmo registrador. Guarda as leituras e os bloqueios de cálculo."
      },
      {
        "id": "sap-isu-013-o4",
        "text": "Agrupa clientes com o mesmo endereço. Guarda os dados de cadastro do Parceiro de Negócios."
      }
    ],
    "correctOptionId": "sap-isu-013-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 13
    }
  },
  {
    "id": "sap-isu-014",
    "number": 14,
    "category": "Dados mestre",
    "question": "Quando nasce o Contrato?",
    "fullAnswer": "No Move-In (ou na troca de titularidade).",
    "options": [
      {
        "id": "sap-isu-014-o1",
        "text": "No Move-In, ou na troca de titularidade."
      },
      {
        "id": "sap-isu-014-o2",
        "text": "No Move-Out, quando a instalação é desligada do cliente."
      },
      {
        "id": "sap-isu-014-o3",
        "text": "Na criação da Instalação, junto com o Equipamento."
      },
      {
        "id": "sap-isu-014-o4",
        "text": "No faturamento, quando o documento de impressão é gerado."
      }
    ],
    "correctOptionId": "sap-isu-014-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 14
    }
  },
  {
    "id": "sap-isu-015",
    "number": 15,
    "category": "Dados mestre",
    "question": "Ordem de criação técnica?",
    "fullAnswer": "ES55 Objeto de Ligação › ES60 Local de Consumo › ES65 Local de Instalação › Equipamento › ES30 Instalação.",
    "options": [
      {
        "id": "sap-isu-015-o1",
        "text": "ES55 Objeto de Ligação › ES60 Local de Consumo › ES65 Local de Instalação › Equipamento › ES30 Instalação."
      },
      {
        "id": "sap-isu-015-o2",
        "text": "ES55 Objeto de Ligação › ES65 Local de Instalação › ES60 Local de Consumo › Equipamento › ES30 Instalação."
      },
      {
        "id": "sap-isu-015-o3",
        "text": "ES60 Local de Consumo › ES55 Objeto de Ligação › ES65 Local de Instalação › ES30 Instalação › Equipamento."
      },
      {
        "id": "sap-isu-015-o4",
        "text": "ES55 Objeto de Ligação › ES60 Local de Consumo › ES65 Local de Instalação › ES30 Instalação › Equipamento."
      }
    ],
    "correctOptionId": "sap-isu-015-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 15
    }
  },
  {
    "id": "sap-isu-016",
    "number": 16,
    "category": "Dados mestre",
    "question": "Transações do PN e da Conta Contrato?",
    "fullAnswer": "PN: BP / FPP1 / FPP2 / FPP3. Conta Contrato: CAA1 / CAA2 / CAA3.",
    "options": [
      {
        "id": "sap-isu-016-o1",
        "text": "PN: BP / FPP1 / FPP2 / FPP3. Conta Contrato: CAA1 / CAA2 / CAA3."
      },
      {
        "id": "sap-isu-016-o2",
        "text": "PN: CAA1 / CAA2 / CAA3. Conta Contrato: BP / FPP1 / FPP2 / FPP3."
      },
      {
        "id": "sap-isu-016-o3",
        "text": "PN: BP / ES21 / ES22 / ES30. Conta Contrato: CAA1 / CAA2 / CAA3."
      },
      {
        "id": "sap-isu-016-o4",
        "text": "PN: BP / FPP1 / FPP2 / FPP3. Conta Contrato: ES30 / ES31 / ES32."
      }
    ],
    "correctOptionId": "sap-isu-016-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 16
    }
  },
  {
    "id": "sap-isu-017",
    "number": 17,
    "category": "Dados mestre",
    "question": "Transações do Contrato e da Instalação?",
    "fullAnswer": "Contrato: ES21 modificar, ES22 exibir. Instalação: ES30 criar, ES31 modificar, ES32 exibir.",
    "options": [
      {
        "id": "sap-isu-017-o1",
        "text": "Contrato: ES21 modificar, ES22 exibir. Instalação: ES30 criar, ES31 modificar, ES32 exibir."
      },
      {
        "id": "sap-isu-017-o2",
        "text": "Contrato: ES30 criar, ES31 modificar, ES32 exibir. Instalação: ES21 modificar, ES22 exibir."
      },
      {
        "id": "sap-isu-017-o3",
        "text": "Contrato: ES21 exibir, ES22 modificar. Instalação: ES30 criar, ES31 exibir, ES32 modificar."
      },
      {
        "id": "sap-isu-017-o4",
        "text": "Contrato: ES21 modificar, ES22 exibir. Instalação: ES30 modificar, ES31 criar, ES32 exibir."
      }
    ],
    "correctOptionId": "sap-isu-017-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 17
    }
  },
  {
    "id": "sap-isu-018",
    "number": 18,
    "category": "Dados mestre",
    "question": "Tabelas: PN, Conta Contrato, Contrato, Instalação?",
    "fullAnswer": "BUT000, FKKVK, EVER, EANL / EANLH.",
    "options": [
      {
        "id": "sap-isu-018-o1",
        "text": "BUT000, FKKVK, EVER, EANL / EANLH."
      },
      {
        "id": "sap-isu-018-o2",
        "text": "BUT000, EVER, FKKVK, EANL / EANLH."
      },
      {
        "id": "sap-isu-018-o3",
        "text": "FKKVK, BUT000, EANL / EANLH, EVER."
      },
      {
        "id": "sap-isu-018-o4",
        "text": "BUT000, FKKVK, EANL / EANLH, EVER."
      }
    ],
    "correctOptionId": "sap-isu-018-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 18
    }
  },
  {
    "id": "sap-isu-019",
    "number": 19,
    "category": "Meter to Cash",
    "question": "Quais as 5 macroetapas?",
    "fullAnswer": "Criação da ordem de leitura › Entrada de leitura › Cálculo › Faturamento › Gerar impressão.",
    "options": [
      {
        "id": "sap-isu-019-o1",
        "text": "Criação da ordem de leitura › Entrada de leitura › Cálculo › Faturamento › Gerar impressão."
      },
      {
        "id": "sap-isu-019-o2",
        "text": "Entrada de leitura › Criação da ordem de leitura › Cálculo › Faturamento › Gerar impressão."
      },
      {
        "id": "sap-isu-019-o3",
        "text": "Criação da ordem de leitura › Entrada de leitura › Faturamento › Cálculo › Gerar impressão."
      },
      {
        "id": "sap-isu-019-o4",
        "text": "Criação da ordem de leitura › Entrada de leitura › Cálculo › Gerar impressão › Faturamento."
      }
    ],
    "correctOptionId": "sap-isu-019-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 19
    }
  },
  {
    "id": "sap-isu-020",
    "number": 20,
    "category": "Meter to Cash",
    "question": "Transações do Meter to Cash em ordem?",
    "fullAnswer": "EL01 › EL28 › EL27 › EA00 › EA05 › EA19 › EA05 › EA40/EA60 › FPE3 › FPVA.",
    "options": [
      {
        "id": "sap-isu-020-o1",
        "text": "EL01 › EL28 › EL27 › EA00 › EA05 › EA19 › EA05 › EA40/EA60 › FPE3 › FPVA."
      },
      {
        "id": "sap-isu-020-o2",
        "text": "EL01 › EL27 › EL28 › EA00 › EA05 › EA19 › EA05 › EA40/EA60 › FPE3 › FPVA."
      },
      {
        "id": "sap-isu-020-o3",
        "text": "EL01 › EL28 › EL27 › EA19 › EA05 › EA00 › EA05 › EA40/EA60 › FPE3 › FPVA."
      },
      {
        "id": "sap-isu-020-o4",
        "text": "EL01 › EL28 › EL27 › EA00 › EA05 › EA19 › EA05 › FPE3 › EA40/EA60 › FPVA."
      }
    ],
    "correctOptionId": "sap-isu-020-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 20
    }
  },
  {
    "id": "sap-isu-021",
    "number": 21,
    "category": "Meter to Cash",
    "question": "O que define as datas de leitura e faturamento?",
    "fullAnswer": "Unidade de leitura + conjunto de contratos (calendário). Tabelas TE417 / TE418.",
    "options": [
      {
        "id": "sap-isu-021-o1",
        "text": "Unidade de leitura + conjunto de contratos (calendário). Tabelas TE417 / TE418."
      },
      {
        "id": "sap-isu-021-o2",
        "text": "Categoria de tarifa + tipo de tarifa (calendário). Tabelas ETTAF / EKDI."
      },
      {
        "id": "sap-isu-021-o3",
        "text": "Unidade de leitura + conta contrato (calendário). Tabelas FKKVK / EVER."
      },
      {
        "id": "sap-isu-021-o4",
        "text": "Unidade de leitura + conjunto de contratos (calendário). Tabelas EABL / EABLG."
      }
    ],
    "correctOptionId": "sap-isu-021-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 21
    }
  },
  {
    "id": "sap-isu-022",
    "number": 22,
    "category": "Meter to Cash",
    "question": "O que nasce junto com a ordem de leitura (EL01)?",
    "fullAnswer": "A ordem de cálculo (ETRG) e os documentos de leitura (EABL / EABLG). Uma ordem por registrador.",
    "options": [
      {
        "id": "sap-isu-022-o1",
        "text": "A ordem de cálculo (ETRG) e os documentos de leitura (EABL / EABLG). Uma ordem por registrador."
      },
      {
        "id": "sap-isu-022-o2",
        "text": "O documento de cálculo (ERCH) e os documentos de leitura (EABL / EABLG). Uma ordem por contrato."
      },
      {
        "id": "sap-isu-022-o3",
        "text": "A ordem de cálculo (ETRG) e o documento de impressão (ERDK). Uma ordem por conta contrato."
      },
      {
        "id": "sap-isu-022-o4",
        "text": "O documento de impressão (ERDK) e o documento FI-CA (DFKKOP). Uma ordem por instalação."
      }
    ],
    "correctOptionId": "sap-isu-022-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 22
    }
  },
  {
    "id": "sap-isu-023",
    "number": 23,
    "category": "Meter to Cash",
    "question": "Onde se insere o resultado de leitura?",
    "fullAnswer": "EL28.",
    "options": [
      {
        "id": "sap-isu-023-o1",
        "text": "EL28."
      },
      {
        "id": "sap-isu-023-o2",
        "text": "EL27."
      },
      {
        "id": "sap-isu-023-o3",
        "text": "EL01."
      },
      {
        "id": "sap-isu-023-o4",
        "text": "EA00."
      }
    ],
    "correctOptionId": "sap-isu-023-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 23
    }
  },
  {
    "id": "sap-isu-024",
    "number": 24,
    "category": "Meter to Cash",
    "question": "O que faz a EL27?",
    "fullAnswer": "Trata leitura implausível: rejeitar, ajustar ou liberar.",
    "options": [
      {
        "id": "sap-isu-024-o1",
        "text": "Trata leitura implausível: rejeitar, ajustar ou liberar."
      },
      {
        "id": "sap-isu-024-o2",
        "text": "Insere o resultado de leitura nas ordens de leitura geradas."
      },
      {
        "id": "sap-isu-024-o3",
        "text": "Cria a ordem de leitura e os documentos de leitura da unidade."
      },
      {
        "id": "sap-isu-024-o4",
        "text": "Trata anomalia de faturamento: liberar ou cancelar, um documento por vez."
      }
    ],
    "correctOptionId": "sap-isu-024-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 24
    }
  },
  {
    "id": "sap-isu-025",
    "number": 25,
    "category": "Meter to Cash",
    "question": "Quando a ordem de cálculo fica calculável?",
    "fullAnswer": "Quando a leitura está plausível.",
    "options": [
      {
        "id": "sap-isu-025-o1",
        "text": "Quando a leitura está plausível."
      },
      {
        "id": "sap-isu-025-o2",
        "text": "Quando a ordem de leitura é criada na EL01."
      },
      {
        "id": "sap-isu-025-o3",
        "text": "Quando a leitura é inserida na EL28, mesmo sem checagem."
      },
      {
        "id": "sap-isu-025-o4",
        "text": "Quando o contrato é criado no Move-In."
      }
    ],
    "correctOptionId": "sap-isu-025-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 25
    }
  },
  {
    "id": "sap-isu-026",
    "number": 26,
    "category": "Meter to Cash",
    "question": "O que a EA00 gera?",
    "fullAnswer": "O documento de cálculo (ERCH): valores líquidos por contrato.",
    "options": [
      {
        "id": "sap-isu-026-o1",
        "text": "O documento de cálculo (ERCH): valores líquidos por contrato."
      },
      {
        "id": "sap-isu-026-o2",
        "text": "O documento de impressão (ERDK): valores com impostos por conta contrato."
      },
      {
        "id": "sap-isu-026-o3",
        "text": "O documento FI-CA (DFKKOP): valores a receber por conta contrato."
      },
      {
        "id": "sap-isu-026-o4",
        "text": "A ordem de cálculo (ETRG): valores previstos por registrador."
      }
    ],
    "correctOptionId": "sap-isu-026-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 26
    }
  },
  {
    "id": "sap-isu-027",
    "number": 27,
    "category": "Meter to Cash",
    "question": "O que a EA19 gera?",
    "fullAnswer": "Documento de impressão (ERDK) + documento FI-CA (DFKKOP). Aplica impostos e taxas da conta contrato.",
    "options": [
      {
        "id": "sap-isu-027-o1",
        "text": "Documento de impressão (ERDK) + documento FI-CA (DFKKOP). Aplica impostos e taxas da conta contrato."
      },
      {
        "id": "sap-isu-027-o2",
        "text": "Documento de cálculo (ERCH) + ordem de cálculo (ETRG). Aplica tarifas e operandos do contrato."
      },
      {
        "id": "sap-isu-027-o3",
        "text": "Documento de impressão (ERDK) + documento de leitura (EABL). Aplica impostos e taxas da instalação."
      },
      {
        "id": "sap-isu-027-o4",
        "text": "Documento de cálculo (ERCH) + documento FI-CA (DFKKOP). Aplica impostos e taxas do contrato."
      }
    ],
    "correctOptionId": "sap-isu-027-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 27
    }
  },
  {
    "id": "sap-isu-028",
    "number": 28,
    "category": "Meter to Cash",
    "question": "Dá para faturar sem documento de cálculo?",
    "fullAnswer": "Não.",
    "options": [
      {
        "id": "sap-isu-028-o1",
        "text": "Não, o faturamento depende do documento de cálculo."
      },
      {
        "id": "sap-isu-028-o2",
        "text": "Sim, se a conta contrato não tiver bloqueio de faturamento."
      },
      {
        "id": "sap-isu-028-o3",
        "text": "Sim, se a leitura estiver plausível e a ordem de leitura criada."
      },
      {
        "id": "sap-isu-028-o4",
        "text": "Sim, desde que o faturamento seja manual (fora de ciclo)."
      }
    ],
    "correctOptionId": "sap-isu-028-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 28
    }
  },
  {
    "id": "sap-isu-029",
    "number": 29,
    "category": "Meter to Cash",
    "question": "Cálculo x faturamento: qual objeto cada um olha?",
    "fullAnswer": "Cálculo (EA00) olha contrato/instalação. Faturamento (EA19) olha conta contrato.",
    "options": [
      {
        "id": "sap-isu-029-o1",
        "text": "Cálculo (EA00) olha contrato/instalação. Faturamento (EA19) olha conta contrato."
      },
      {
        "id": "sap-isu-029-o2",
        "text": "Cálculo (EA00) olha conta contrato. Faturamento (EA19) olha contrato/instalação."
      },
      {
        "id": "sap-isu-029-o3",
        "text": "Cálculo (EA00) olha contrato/instalação. Faturamento (EA19) olha o parceiro de negócios."
      },
      {
        "id": "sap-isu-029-o4",
        "text": "Cálculo (EA00) olha a conta contrato. Faturamento (EA19) olha o objeto de ligação."
      }
    ],
    "correctOptionId": "sap-isu-029-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 29
    }
  },
  {
    "id": "sap-isu-030",
    "number": 30,
    "category": "Meter to Cash",
    "question": "EA40 x EA60?",
    "fullAnswer": "EA40 só visualiza (não marca data). EA60 imprime e marca a data na ERDK. Massa: EA29.",
    "options": [
      {
        "id": "sap-isu-030-o1",
        "text": "EA40 só visualiza (não marca data). EA60 imprime e marca a data na ERDK. Massa: EA29."
      },
      {
        "id": "sap-isu-030-o2",
        "text": "EA40 imprime e marca a data na ERDK. EA60 só visualiza (não marca data). Massa: EA29."
      },
      {
        "id": "sap-isu-030-o3",
        "text": "EA40 só visualiza (não marca data). EA60 imprime e marca a data na ERCH. Massa: EA19."
      },
      {
        "id": "sap-isu-030-o4",
        "text": "EA40 só visualiza e marca a data na ERDK. EA60 imprime sem marcar data. Massa: EA29."
      }
    ],
    "correctOptionId": "sap-isu-030-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 30
    }
  },
  {
    "id": "sap-isu-031",
    "number": 31,
    "category": "Meter to Cash",
    "question": "Como se trata anomalia?",
    "fullAnswer": "EA05, individual: liberar ou cancelar. Não existe liberação em massa.",
    "options": [
      {
        "id": "sap-isu-031-o1",
        "text": "EA05, individual: liberar ou cancelar. Não existe liberação em massa."
      },
      {
        "id": "sap-isu-031-o2",
        "text": "EA05, em massa: liberar ou cancelar vários documentos de uma vez por intervalo."
      },
      {
        "id": "sap-isu-031-o3",
        "text": "EA19, individual: liberar ou reverter. Não existe liberação em massa."
      },
      {
        "id": "sap-isu-031-o4",
        "text": "EL27, individual: rejeitar, ajustar ou liberar. Não existe liberação em massa."
      }
    ],
    "correctOptionId": "sap-isu-031-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 31
    }
  },
  {
    "id": "sap-isu-032",
    "number": 32,
    "category": "Meter to Cash",
    "question": "ZTAT, ZEAT, ZDAM/ZDVM?",
    "fullAnswer": "ZTAT = consumo TUSD. ZEAT = consumo TE. ZDAM/ZDVM = bandeiras.",
    "options": [
      {
        "id": "sap-isu-032-o1",
        "text": "ZTAT = consumo TUSD. ZEAT = consumo TE. ZDAM/ZDVM = bandeiras."
      },
      {
        "id": "sap-isu-032-o2",
        "text": "ZTAT = consumo TE. ZEAT = consumo TUSD. ZDAM/ZDVM = bandeiras."
      },
      {
        "id": "sap-isu-032-o3",
        "text": "ZTAT = consumo TUSD. ZEAT = consumo TE. ZDAM/ZDVM = baixa renda."
      },
      {
        "id": "sap-isu-032-o4",
        "text": "ZTAT = bandeiras. ZEAT = consumo TUSD. ZDAM/ZDVM = consumo TE."
      }
    ],
    "correctOptionId": "sap-isu-032-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 32
    }
  },
  {
    "id": "sap-isu-033",
    "number": 33,
    "category": "Meter to Cash",
    "question": "Quais são os tipos de faturamento?",
    "fullAnswer": "Periódico (cíclico), manual (fora de ciclo, ex.: fraude), final (Move-Out), refaturamento.",
    "options": [
      {
        "id": "sap-isu-033-o1",
        "text": "Periódico (cíclico), manual (fora de ciclo, ex.: fraude), final (Move-Out), refaturamento."
      },
      {
        "id": "sap-isu-033-o2",
        "text": "Periódico (cíclico), manual (fora de ciclo, ex.: fraude), final (Move-In), refaturamento."
      },
      {
        "id": "sap-isu-033-o3",
        "text": "Periódico (fora de ciclo), manual (cíclico, ex.: fraude), final (Move-Out), refaturamento."
      },
      {
        "id": "sap-isu-033-o4",
        "text": "Periódico (cíclico), parcial (fora de ciclo, ex.: fraude), final (Move-Out), reversão."
      }
    ],
    "correctOptionId": "sap-isu-033-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 33
    }
  },
  {
    "id": "sap-isu-034",
    "number": 34,
    "category": "Move-In e Move-Out",
    "question": "O que é Move-In?",
    "fullAnswer": "A ligação: cria o contrato e liga a conta contrato do cliente à instalação.",
    "options": [
      {
        "id": "sap-isu-034-o1",
        "text": "A ligação: cria o contrato e liga a conta contrato do cliente à instalação."
      },
      {
        "id": "sap-isu-034-o2",
        "text": "O desligamento: encerra o contrato e deixa a instalação livre para outro cliente."
      },
      {
        "id": "sap-isu-034-o3",
        "text": "A ligação: cria a instalação e liga o objeto de ligação ao parceiro de negócios."
      },
      {
        "id": "sap-isu-034-o4",
        "text": "A troca de titularidade: encerra o contrato antigo e mantém a conta contrato do cliente anterior."
      }
    ],
    "correctOptionId": "sap-isu-034-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 34
    }
  },
  {
    "id": "sap-isu-035",
    "number": 35,
    "category": "Move-In e Move-Out",
    "question": "O que é Move-Out?",
    "fullAnswer": "O desligamento: o contrato é encerrado (não apagado) e a instalação fica livre.",
    "options": [
      {
        "id": "sap-isu-035-o1",
        "text": "O desligamento: o contrato é encerrado (não apagado) e a instalação fica livre."
      },
      {
        "id": "sap-isu-035-o2",
        "text": "O desligamento: o contrato é apagado do sistema e a instalação fica livre."
      },
      {
        "id": "sap-isu-035-o3",
        "text": "O desligamento: o contrato continua ativo e a instalação passa para o novo titular."
      },
      {
        "id": "sap-isu-035-o4",
        "text": "O desligamento: a conta contrato é encerrada (não apagada) e o contrato fica livre."
      }
    ],
    "correctOptionId": "sap-isu-035-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 35
    }
  },
  {
    "id": "sap-isu-036",
    "number": 36,
    "category": "Move-In e Move-Out",
    "question": "Qual transação faz Move-In e Move-Out no lab?",
    "fullAnswer": "EC60 (abas Solicitação de ligação / Solicitação de desligamento).",
    "options": [
      {
        "id": "sap-isu-036-o1",
        "text": "EC60 (abas Solicitação de ligação / Solicitação de desligamento)."
      },
      {
        "id": "sap-isu-036-o2",
        "text": "ES60 (abas Solicitação de ligação / Solicitação de desligamento)."
      },
      {
        "id": "sap-isu-036-o3",
        "text": "ES21 (abas Solicitação de ligação / Solicitação de desligamento)."
      },
      {
        "id": "sap-isu-036-o4",
        "text": "CAA2 (abas Solicitação de ligação / Solicitação de desligamento)."
      }
    ],
    "correctOptionId": "sap-isu-036-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 36
    }
  },
  {
    "id": "sap-isu-037",
    "number": 37,
    "category": "Move-In e Move-Out",
    "question": "O que informar no Move-In?",
    "fullAnswer": "PN, data de ligação, categoria da conta contrato e leitura de Move-In.",
    "options": [
      {
        "id": "sap-isu-037-o1",
        "text": "PN, data de ligação, categoria da conta contrato e leitura de Move-In."
      },
      {
        "id": "sap-isu-037-o2",
        "text": "PN, data de ligação, categoria de tarifa da instalação e leitura final."
      },
      {
        "id": "sap-isu-037-o3",
        "text": "PN, data de desligamento, categoria da conta contrato e leitura de Move-In."
      },
      {
        "id": "sap-isu-037-o4",
        "text": "PN, data de ligação, conta final e leitura de Move-In."
      }
    ],
    "correctOptionId": "sap-isu-037-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 37
    }
  },
  {
    "id": "sap-isu-038",
    "number": 38,
    "category": "Move-In e Move-Out",
    "question": "O que informar no Move-Out?",
    "fullAnswer": "Data de desligamento, leitura final e conta final (gera a fatura final).",
    "options": [
      {
        "id": "sap-isu-038-o1",
        "text": "Data de desligamento, leitura final e conta final (gera a fatura final)."
      },
      {
        "id": "sap-isu-038-o2",
        "text": "Data de ligação, leitura de Move-In e categoria da conta contrato (gera o contrato)."
      },
      {
        "id": "sap-isu-038-o3",
        "text": "Data de desligamento, leitura final e categoria da conta contrato (gera a fatura final)."
      },
      {
        "id": "sap-isu-038-o4",
        "text": "Data de desligamento, leitura de Move-In e conta final (gera o refaturamento)."
      }
    ],
    "correctOptionId": "sap-isu-038-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 38
    }
  },
  {
    "id": "sap-isu-039",
    "number": 39,
    "category": "Move-In e Move-Out",
    "question": "O que é troca de titularidade?",
    "fullAnswer": "Move-Out do cliente antigo + Move-In do novo, na mesma instalação.",
    "options": [
      {
        "id": "sap-isu-039-o1",
        "text": "Move-Out do cliente antigo + Move-In do novo, na mesma instalação."
      },
      {
        "id": "sap-isu-039-o2",
        "text": "Move-In do cliente antigo + Move-Out do novo, na mesma instalação."
      },
      {
        "id": "sap-isu-039-o3",
        "text": "Move-Out do cliente antigo + Move-In do novo, em instalações diferentes."
      },
      {
        "id": "sap-isu-039-o4",
        "text": "Apenas Move-In do novo cliente, com o contrato do antigo ainda ativo na instalação."
      }
    ],
    "correctOptionId": "sap-isu-039-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 39
    }
  },
  {
    "id": "sap-isu-040",
    "number": 40,
    "category": "Configuração tarifária",
    "question": "Hierarquia dos operandos: quem prevalece?",
    "fullAnswer": "Instalação › Categoria de tarifa › Tarifa. O mais específico vence.",
    "options": [
      {
        "id": "sap-isu-040-o1",
        "text": "Instalação › Categoria de tarifa › Tarifa. O mais específico vence."
      },
      {
        "id": "sap-isu-040-o2",
        "text": "Tarifa › Categoria de tarifa › Instalação. A tarifa sempre vence."
      },
      {
        "id": "sap-isu-040-o3",
        "text": "Categoria de tarifa › Instalação › Tarifa. O mais específico vence."
      },
      {
        "id": "sap-isu-040-o4",
        "text": "Instalação › Tarifa › Categoria de tarifa. O mais específico vence."
      }
    ],
    "correctOptionId": "sap-isu-040-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 40
    }
  },
  {
    "id": "sap-isu-041",
    "number": 41,
    "category": "Configuração tarifária",
    "question": "Tabelas dos operandos por nível?",
    "fullAnswer": "Instalação: ETTIFN. Categoria: ETTAF. Tarifa: EKDI.",
    "options": [
      {
        "id": "sap-isu-041-o1",
        "text": "Instalação: ETTIFN. Categoria: ETTAF. Tarifa: EKDI."
      },
      {
        "id": "sap-isu-041-o2",
        "text": "Instalação: ETTAF. Categoria: ETTIFN. Tarifa: EKDI."
      },
      {
        "id": "sap-isu-041-o3",
        "text": "Instalação: EKDI. Categoria: ETTIFN. Tarifa: ETTAF."
      },
      {
        "id": "sap-isu-041-o4",
        "text": "Instalação: ETTIFN. Categoria: EKDI. Tarifa: ETTAF."
      }
    ],
    "correctOptionId": "sap-isu-041-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 41
    }
  },
  {
    "id": "sap-isu-042",
    "number": 42,
    "category": "Configuração tarifária",
    "question": "Como se determina a tarifa?",
    "fullAnswer": "Categoria (da instalação) + Tipo (do registrador) = Tarifas. Transação EA87.",
    "options": [
      {
        "id": "sap-isu-042-o1",
        "text": "Categoria (da instalação) + Tipo (do registrador) = Tarifas. Transação EA87."
      },
      {
        "id": "sap-isu-042-o2",
        "text": "Categoria (do registrador) + Tipo (da instalação) = Tarifas. Transação EA87."
      },
      {
        "id": "sap-isu-042-o3",
        "text": "Categoria (da instalação) + Tipo (do registrador) = Tarifas. Transação EA89."
      },
      {
        "id": "sap-isu-042-o4",
        "text": "Operando (da instalação) + Preço (do registrador) = Tarifas. Transação EA87."
      }
    ],
    "correctOptionId": "sap-isu-042-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 42
    }
  },
  {
    "id": "sap-isu-043",
    "number": 43,
    "category": "Configuração tarifária",
    "question": "Transações: operando, preço, tarifa, esquema?",
    "fullAnswer": "Operando EA50. Preço EA89. Tarifa EA30. Esquema EA35.",
    "options": [
      {
        "id": "sap-isu-043-o1",
        "text": "Operando EA50. Preço EA89. Tarifa EA30. Esquema EA35."
      },
      {
        "id": "sap-isu-043-o2",
        "text": "Operando EA89. Preço EA50. Tarifa EA30. Esquema EA35."
      },
      {
        "id": "sap-isu-043-o3",
        "text": "Operando EA50. Preço EA89. Tarifa EA35. Esquema EA30."
      },
      {
        "id": "sap-isu-043-o4",
        "text": "Operando EA30. Preço EA50. Tarifa EA89. Esquema EA35."
      }
    ],
    "correctOptionId": "sap-isu-043-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 43
    }
  },
  {
    "id": "sap-isu-044",
    "number": 44,
    "category": "Configuração tarifária",
    "question": "Transações: categoria e tipo de tarifa?",
    "fullAnswer": "Categoria EA53 / EA54 / EA55. Tipo EA56.",
    "options": [
      {
        "id": "sap-isu-044-o1",
        "text": "Categoria EA53 / EA54 / EA55. Tipo EA56."
      },
      {
        "id": "sap-isu-044-o2",
        "text": "Categoria EA56. Tipo EA53 / EA54 / EA55."
      },
      {
        "id": "sap-isu-044-o3",
        "text": "Categoria EA50 / EA53 / EA54. Tipo EA55."
      },
      {
        "id": "sap-isu-044-o4",
        "text": "Categoria EA30 / EA35 / EA87. Tipo EA56."
      }
    ],
    "correctOptionId": "sap-isu-044-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 44
    }
  },
  {
    "id": "sap-isu-045",
    "number": 45,
    "category": "Configuração tarifária",
    "question": "O que é uma variante?",
    "fullAnswer": "Programa que executa um passo da tarifa (ex.: QUANTI01). ABAP na SE37 com prefixo ISU_.",
    "options": [
      {
        "id": "sap-isu-045-o1",
        "text": "Programa que executa um passo da tarifa (ex.: QUANTI01). ABAP na SE37 com prefixo ISU_."
      },
      {
        "id": "sap-isu-045-o2",
        "text": "Valor que define o preço de um passo da tarifa (ex.: QUANTI01). Tabela na SE16 com prefixo ISU_."
      },
      {
        "id": "sap-isu-045-o3",
        "text": "Programa que executa um passo da tarifa (ex.: QUANTI01). Relatório na SE38 com prefixo RFKK_."
      },
      {
        "id": "sap-isu-045-o4",
        "text": "Grupo de operandos que forma um esquema de tarifa (ex.: QUANTI01). ABAP na SE37 com prefixo ISU_."
      }
    ],
    "correctOptionId": "sap-isu-045-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 45
    }
  },
  {
    "id": "sap-isu-046",
    "number": 46,
    "category": "Configuração tarifária",
    "question": "Tipos de operando?",
    "fullAnswer": "AMOUNT, QUANT, DEMAND, FACTOR, INTEGER, FLAG.",
    "options": [
      {
        "id": "sap-isu-046-o1",
        "text": "AMOUNT, QUANT, DEMAND, FACTOR, INTEGER, FLAG."
      },
      {
        "id": "sap-isu-046-o2",
        "text": "AMOUNT, QUANT, DEMAND, FACTOR, STRING, DATE."
      },
      {
        "id": "sap-isu-046-o3",
        "text": "AMOUNT, QUANT, PRICE, FACTOR, INTEGER, FLAG."
      },
      {
        "id": "sap-isu-046-o4",
        "text": "AMOUNT, QUANTITY, DEMAND, RATE, INTEGER, FLAG."
      }
    ],
    "correctOptionId": "sap-isu-046-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 46
    }
  },
  {
    "id": "sap-isu-047",
    "number": 47,
    "category": "Configuração tarifária",
    "question": "O que é classe de cálculo?",
    "fullAnswer": "Valida que os dados mestre do cliente (ex.: categoria de tarifa) são compatíveis. Se não bater, bloqueia o faturamento.",
    "options": [
      {
        "id": "sap-isu-047-o1",
        "text": "Valida que os dados mestre do cliente (ex.: categoria de tarifa) são compatíveis. Se não bater, bloqueia o faturamento."
      },
      {
        "id": "sap-isu-047-o2",
        "text": "Define o preço e o esquema aplicados ao consumo do cliente. Se não houver tarifa, usa a padrão."
      },
      {
        "id": "sap-isu-047-o3",
        "text": "Agrupa clientes por unidade de leitura para o processamento em massa. Se não bater, divide o lote."
      },
      {
        "id": "sap-isu-047-o4",
        "text": "Valida que a leitura inserida é plausível frente ao histórico do cliente. Se não bater, bloqueia o cálculo."
      }
    ],
    "correctOptionId": "sap-isu-047-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 47
    }
  },
  {
    "id": "sap-isu-048",
    "number": 48,
    "category": "Incidente e FI-CA",
    "question": "EA00 deu AJ063. O que é e onde corrige?",
    "fullAnswer": "Contrato com bloqueio de cálculo. Corrige na ES21 (modificar contrato).",
    "options": [
      {
        "id": "sap-isu-048-o1",
        "text": "Contrato com bloqueio de cálculo. Corrige na ES21 (modificar contrato)."
      },
      {
        "id": "sap-isu-048-o2",
        "text": "Conta contrato com bloqueio de faturamento. Corrige na CAA2 (modificar conta contrato)."
      },
      {
        "id": "sap-isu-048-o3",
        "text": "Contrato com bloqueio de cálculo. Corrige na ES22 (exibir contrato)."
      },
      {
        "id": "sap-isu-048-o4",
        "text": "Instalação sem categoria de tarifa. Corrige na ES31 (modificar instalação)."
      }
    ],
    "correctOptionId": "sap-isu-048-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 48
    }
  },
  {
    "id": "sap-isu-049",
    "number": 49,
    "category": "Incidente e FI-CA",
    "question": "EA19 deu EB183. O que é e onde corrige?",
    "fullAnswer": "Conta contrato bloqueada para faturamento. Corrige na CAA2, bloco Criação de fatura.",
    "options": [
      {
        "id": "sap-isu-049-o1",
        "text": "Conta contrato bloqueada para faturamento. Corrige na CAA2, bloco Criação de fatura."
      },
      {
        "id": "sap-isu-049-o2",
        "text": "Contrato com bloqueio de cálculo. Corrige na ES21 (modificar contrato)."
      },
      {
        "id": "sap-isu-049-o3",
        "text": "Conta contrato bloqueada para faturamento. Corrige na CAA3, bloco Criação de fatura."
      },
      {
        "id": "sap-isu-049-o4",
        "text": "Conta contrato bloqueada para cobrança. Corrige na CAA2, bloco Bloqueios de pagamento."
      }
    ],
    "correctOptionId": "sap-isu-049-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 49
    }
  },
  {
    "id": "sap-isu-050",
    "number": 50,
    "category": "Incidente e FI-CA",
    "question": "Num projeto real, basta apagar o bloqueio?",
    "fullAnswer": "Não. Entender por que existe, alinhar com o negócio e usar motivo de liberação. Registrar a tratativa.",
    "options": [
      {
        "id": "sap-isu-050-o1",
        "text": "Não: entender por que existe, alinhar com o negócio, usar motivo de liberação e registrar a tratativa."
      },
      {
        "id": "sap-isu-050-o2",
        "text": "Sim: se o bloqueio impede o faturamento, remover direto na transação e avisar o negócio depois."
      },
      {
        "id": "sap-isu-050-o3",
        "text": "Não: reverter o faturamento do período e refaturar, para que o bloqueio desapareça sozinho."
      },
      {
        "id": "sap-isu-050-o4",
        "text": "Sim: basta apagar, desde que um segundo consultor aprove a remoção na própria transação."
      }
    ],
    "correctOptionId": "sap-isu-050-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 50
    }
  },
  {
    "id": "sap-isu-051",
    "number": 51,
    "category": "Incidente e FI-CA",
    "question": "Estorno antes x depois de faturar?",
    "fullAnswer": "Antes: estorna o cálculo e a ordem de cálculo volta. Depois: reversão da fatura ou reversão total.",
    "options": [
      {
        "id": "sap-isu-051-o1",
        "text": "Antes: estorna o cálculo e a ordem de cálculo volta. Depois: reversão da fatura ou reversão total."
      },
      {
        "id": "sap-isu-051-o2",
        "text": "Antes: reversão da fatura ou reversão total. Depois: estorna o cálculo e a ordem de cálculo volta."
      },
      {
        "id": "sap-isu-051-o3",
        "text": "Antes: estorna o cálculo e a ordem de leitura é apagada. Depois: reversão da fatura ou reversão total."
      },
      {
        "id": "sap-isu-051-o4",
        "text": "Antes: estorna o cálculo e a ordem de cálculo volta. Depois: basta estornar o cálculo de novo."
      }
    ],
    "correctOptionId": "sap-isu-051-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 51
    }
  },
  {
    "id": "sap-isu-052",
    "number": 52,
    "category": "Incidente e FI-CA",
    "question": "Operação principal x suboperação?",
    "fullAnswer": "Principal: conta a receber (quem deve). Sub: receita e código de imposto (do que se trata).",
    "options": [
      {
        "id": "sap-isu-052-o1",
        "text": "Principal: conta a receber (quem deve). Sub: receita e código de imposto (do que se trata)."
      },
      {
        "id": "sap-isu-052-o2",
        "text": "Principal: receita e código de imposto (do que se trata). Sub: conta a receber (quem deve)."
      },
      {
        "id": "sap-isu-052-o3",
        "text": "Principal: conta a receber (quem deve). Sub: bloqueio e motivo de liberação (por que está retido)."
      },
      {
        "id": "sap-isu-052-o4",
        "text": "Principal: documento de impressão (o que foi emitido). Sub: receita e código de imposto (do que se trata)."
      }
    ],
    "correctOptionId": "sap-isu-052-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 52
    }
  },
  {
    "id": "sap-isu-053",
    "number": 53,
    "category": "Incidente e FI-CA",
    "question": "Níveis de cobrança (FPVA)?",
    "fullAnswer": "1: aviso. 2: segunda carta com juros e multa. 3: notificação de suspensão.",
    "options": [
      {
        "id": "sap-isu-053-o1",
        "text": "1: aviso. 2: segunda carta com juros e multa. 3: notificação de suspensão."
      },
      {
        "id": "sap-isu-053-o2",
        "text": "1: segunda carta com juros e multa. 2: aviso. 3: notificação de suspensão."
      },
      {
        "id": "sap-isu-053-o3",
        "text": "1: aviso. 2: notificação de suspensão. 3: segunda carta com juros e multa."
      },
      {
        "id": "sap-isu-053-o4",
        "text": "1: aviso. 2: segunda carta com juros e multa. 3: negativação do cliente e corte imediato."
      }
    ],
    "correctOptionId": "sap-isu-053-o1",
    "source": {
      "file": "Flashcards_SAP_ISU.pdf",
      "cardNumber": 53
    }
  }
];
