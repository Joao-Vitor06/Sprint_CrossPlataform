/**
 * Modelo de domínio do Motiva Safety.
 *
 * Uma ocorrência é um problema de segurança encontrado em um trecho de rodovia
 * (vegetação alta, buraco no pavimento, sinalização danificada, etc.) registrado
 * por um operador de campo e acompanhado por um supervisor até a resolução.
 */

export type NivelRisco = "baixo" | "medio" | "alto";

export type StatusOcorrencia = "aberta" | "em_analise" | "resolvida";

export type TipoOcorrencia =
  | "vegetacao"
  | "pavimento"
  | "sinalizacao"
  | "iluminacao"
  | "animal"
  | "drenagem"
  | "obstaculo"
  | "acostamento";

/** Sentido do trecho, na nomenclatura usada pelas concessionárias de São Paulo. */
export type SentidoRodovia = "capital" | "interior";

/** Cada mudança de status vira um evento, formando a linha do tempo da ocorrência. */
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
  /** Referência textual do ponto, como "Trevo de Louveira, pista sul". */
  referencia: string;
  risco: NivelRisco;
  status: StatusOcorrencia;
  responsavel: string;
  criadaEm: string;
  atualizadaEm: string;
  fotoUri?: string;
  latitude?: number;
  longitude?: number;
  historico: EventoHistorico[];
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
  risco: NivelRisco;
  responsavel: string;
  fotoUri?: string;
  latitude?: number;
  longitude?: number;
};

export type FiltroRisco = NivelRisco | "todos";
export type FiltroStatus = StatusOcorrencia | "todos";
export type Ordenacao = "recentes" | "antigas" | "risco" | "km";
