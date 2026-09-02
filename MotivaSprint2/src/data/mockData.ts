import { Ocorrencia } from "../types";

// ─── Dados Mockados – Motiva Safety ────────────────────────────────────────
// Cobrem diferentes níveis de risco e status para permitir demonstrações
// de sucesso, análise, resolução e listas filtradas/vazias.

export const ocorrenciasMock: Ocorrencia[] = [
  {
    id: 1,
    titulo: "Pneu furado em serviço",
    descricao:
      "Motoboy relatou pneu traseiro furado durante entrega no centro da cidade. Precisou interromper o serviço e aguardar suporte.",
    local: "Av. Paulista, 1578 – São Paulo/SP",
    risco: "medio",
    data: "2026-08-18",
    responsavel: "Carlos Souza",
    status: "resolvida",
  },
  {
    id: 2,
    titulo: "Quase colisão em cruzamento",
    descricao:
      "Veículo particular avançou o sinal vermelho e quase colidiu com a moto. Motoboy conseguiu desviar a tempo e a ocorrência foi encaminhada para análise.",
    local: "Rua Augusta com R. Caio Prado – São Paulo/SP",
    risco: "alto",
    data: "2026-08-20",
    responsavel: "Marcos Lima",
    status: "em_analise",
  },
  {
    id: 3,
    titulo: "Capacete com fivela danificada",
    descricao:
      "Equipamento de proteção apresentou defeito na fivela de fixação. O motoboy identificou o problema antes de sair em serviço.",
    local: "Filial Centro – Depósito Geral",
    risco: "baixo",
    data: "2026-08-21",
    responsavel: "Ana Paula",
    status: "resolvida",
  },
  {
    id: 4,
    titulo: "Chuva forte sem EPIs adequados",
    descricao:
      "Equipe foi enviada para entrega durante tempestade sem capa de chuva disponível. Solicitação de EPIs feita ao gestor.",
    local: "Região da Zona Sul – São Paulo/SP",
    risco: "alto",
    data: "2026-08-24",
    responsavel: "Ricardo Ferreira",
    status: "aberta",
  },
  {
    id: 5,
    titulo: "Falha no rastreador do veículo",
    descricao:
      "Sistema de rastreamento apresentou falha durante o turno da tarde. O motoboy ficou sem monitoramento por aproximadamente 2 horas.",
    local: "Zona Leste – São Paulo/SP",
    risco: "medio",
    data: "2026-08-25",
    responsavel: "Felipe Nunes",
    status: "em_analise",
  },
  {
    id: 6,
    titulo: "Freio dianteiro com desgaste",
    descricao:
      "Durante a inspeção diária, foi identificado desgaste excessivo no freio dianteiro. O veículo foi retirado temporariamente da operação.",
    local: "Base Operacional Norte – São Paulo/SP",
    risco: "alto",
    data: "2026-08-27",
    responsavel: "Juliana Alves",
    status: "aberta",
  },
  {
    id: 7,
    titulo: "Iluminação traseira inoperante",
    descricao:
      "Lanterna traseira da motocicleta não acendeu durante a verificação de saída. A equipe técnica realizou a substituição da peça.",
    local: "Base Operacional Oeste – São Paulo/SP",
    risco: "medio",
    data: "2026-08-28",
    responsavel: "Rafael Mendes",
    status: "resolvida",
  },
  {
    id: 8,
    titulo: "Piso escorregadio em área de carga",
    descricao:
      "Acúmulo de água na área de carga deixou o piso escorregadio e aumentou o risco de queda na saída dos veículos.",
    local: "Centro de Distribuição Sul – São Paulo/SP",
    risco: "baixo",
    data: "2026-08-30",
    responsavel: "Beatriz Costa",
    status: "em_analise",
  },
];

// Cenários de apoio para testes manuais da Sprint 3.
export const cenariosMock = {
  sucessoCadastro: {
    titulo: "Farol queimado durante inspeção",
    descricao: "Farol dianteiro identificado sem funcionamento antes do início da operação.",
    local: "Base Operacional Centro – São Paulo/SP",
    responsavel: "Daniel Rocha",
    risco: "medio" as const,
  },
  altoRisco: {
    titulo: "Queda durante frenagem de emergência",
    descricao: "Motoboy sofreu queda ao realizar uma frenagem de emergência para evitar colisão.",
    local: "Av. Rebouças – São Paulo/SP",
    responsavel: "Lucas Martins",
    risco: "alto" as const,
  },
  formularioInvalido: {
    titulo: "",
    descricao: "",
    local: "",
    responsavel: "",
    risco: "baixo" as const,
  },
};
