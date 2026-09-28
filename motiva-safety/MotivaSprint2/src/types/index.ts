/**
 * Modelo de domínio do Motiva Safety.
 *
 * A aplicação é especializada em monitoramento de vegetação na faixa de domínio
 * das rodovias, registrando altura, limite operacional, prioridade e histórico
 * das intervenções de conservação.
 */

export type NivelRisco = "baixo" | "medio" | "alto";

export type StatusOcorrencia = "aberta" | "em_analise" | "resolvida";

export type TipoOcorrencia =
  | "vegetacao_alta"
  | "vegetacao_sinalizacao"
  | "vegetacao_acostamento"
  | "vegetacao_drenagem";

/** Sentido do trecho monitorado. */
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

/** Cada mudança de status vira um evento, formando o ciclo de atendimento. */
export type EventoHistorico = {
  id: string;
  status: StatusOcorrencia;
  em: string;
  por: string;
  nota?: string;
};

export type Ocorrencia = {
  id: string;
  /** Código curto exibido ao usuário, no formato MTV-0001. */
  protocolo: string;
  titulo: string;
  descricao: string;
  tipo: TipoOcorrencia;
  rodovia: string;
  km: number;
  sentido: SentidoRodovia;
  /** Referência textual do ponto monitorado. */
  referencia: string;
  /** Altura medida pela equipe/câmera, em centímetros. */
  alturaAtualCm: number;
  /** Limite operacional definido para o trecho, em centímetros. */
  limiteCm: number;
  /** Prioridade operacional derivada da condição do trecho. */
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

/** Campos que o operador preenche no formulário. O resto o app gera sozinho. */
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
