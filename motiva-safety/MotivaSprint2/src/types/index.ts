/**
 * Modelo de domínio do Motiva Safety.
 *
 * O produto é especializado no monitoramento de vegetação na faixa de domínio
 * das rodovias: altura, limite operacional, prioridade e histórico de intervenção.
 */

export type NivelRisco = "baixo" | "medio" | "alto";
export type StatusOcorrencia = "aberta" | "em_analise" | "resolvida";

export type TipoOcorrencia =
  | "vegetacao_alta"
  | "vegetacao_sinalizacao"
  | "vegetacao_acostamento"
  | "vegetacao_drenagem";

export type SentidoRodovia = "capital" | "interior";

export type TipoIntervencao =
  | "inspecao"
  | "rocada_programada"
  | "rocada_executada"
  | "poda"
  | "liberacao";

export type IntervencaoVegetacao = {
  id: string;
  tipo: TipoIntervencao;
  em: string;
  equipe: string;
  alturaAntesCm?: number;
  alturaDepoisCm?: number;
  observacao?: string;
};

export type EventoHistorico = {
  id: string;
  status: StatusOcorrencia;
  em: string;
  por: string;
  nota?: string;
};

export type Ocorrencia = {
  id: string;
  protocolo: string;
  titulo: string;
  descricao: string;
  tipo: TipoOcorrencia;
  rodovia: string;
  km: number;
  sentido: SentidoRodovia;
  referencia: string;
  /** Altura medida da vegetação no trecho, em centímetros. */
  alturaAtualCm: number;
  /** Limite operacional de altura definido para o trecho, em centímetros. */
  limiteCm: number;
  risco: NivelRisco;
  status: StatusOcorrencia;
  responsavel: string;
  criadaEm: string;
  atualizadaEm: string;
  fotoUri?: string;
  latitude?: number;
  longitude?: number;
  historico: EventoHistorico[];
  intervencoes: IntervencaoVegetacao[];
};

export type DadosFormularioOcorrencia = {
  titulo: string;
  descricao: string;
  tipo: TipoOcorrencia;
  rodovia: string;
  km: string;
  sentido: SentidoRodovia;
  referencia: string;
  alturaAtualCm: string;
  limiteCm: string;
  risco: NivelRisco;
  responsavel: string;
  fotoUri?: string;
  latitude?: number;
  longitude?: number;
};

export type FiltroRisco = NivelRisco | "todos";
export type FiltroStatus = StatusOcorrencia | "todos";
export type Ordenacao = "recentes" | "antigas" | "risco" | "km";
