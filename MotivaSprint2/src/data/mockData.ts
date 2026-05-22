import { Ocorrencia } from "../types";

// ─── Dados Mockados – Motiva ───────────────────────────────────────────────
// Simulam ocorrências reais de uma equipe de motoboys

export const ocorrenciasMock: Ocorrencia[] = [
  {
    id: 1,
    titulo: "Pneu furado em serviço",
    descricao:
      "Motoboy relatou pneu traseiro furado durante entrega no centro da cidade. Precisou interromper o serviço e aguardar suporte.",
    local: "Av. Paulista, 1578 – São Paulo/SP",
    risco: "medio",
    data: "2025-05-10",
    responsavel: "Carlos Souza",
    status: "resolvida",
  },
  {
    id: 2,
    titulo: "Quase colisão em cruzamento",
    descricao:
      "Veículo particular avançou o sinal vermelho e quase colidiu com a moto. Motoboy conseguiu desviar a tempo. Situação de alto risco registrada para acompanhamento.",
    local: "Rua Augusta com R. Caio Prado – São Paulo/SP",
    risco: "alto",
    data: "2025-05-12",
    responsavel: "Marcos Lima",
    status: "em_analise",
  },
  {
    id: 3,
    titulo: "Capacete com fivela danificada",
    descricao:
      "Equipamento de proteção apresentou defeito na fivela de fixação. Motoboy identificou antes de sair em serviço.",
    local: "Filial Centro – Deposito Geral",
    risco: "baixo",
    data: "2025-05-14",
    responsavel: "Ana Paula",
    status: "resolvida",
  },
  {
    id: 4,
    titulo: "Chuva forte sem EPIs adequados",
    descricao:
      "Equipe foi enviada em entrega durante tempestade sem capa de chuva disponível. Solicitação de EPIs feita ao gestor.",
    local: "Região da Zona Sul – São Paulo/SP",
    risco: "alto",
    data: "2025-05-15",
    responsavel: "Ricardo Ferreira",
    status: "aberta",
  },
  {
    id: 5,
    titulo: "Falha no rastreador do veículo",
    descricao:
      "Sistema de rastreamento apresentou falha durante o turno da tarde. Motoboy ficou sem monitoramento por 2 horas.",
    local: "Zona Leste – São Paulo/SP",
    risco: "medio",
    data: "2025-05-18",
    responsavel: "Felipe Nunes",
    status: "em_analise",
  },
];
