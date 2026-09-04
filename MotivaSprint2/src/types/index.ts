// ─── Tipos da Aplicação ────────────────────────────────────────────────────

export type NivelRisco = "baixo" | "medio" | "alto";

export type Ocorrencia = {
  id: number;
  titulo: string;
  descricao: string;
  local: string;
  risco: NivelRisco;
  data: string;
  responsavel: string;
  status: "aberta" | "em_analise" | "resolvida";

  // Evidência da ocorrência
  fotoUri?: string;

  // Localização do dispositivo
  latitude?: number;
  longitude?: number;
};

export type NovaOcorrencia = Omit<Ocorrencia, "id" | "data" | "status">;

// ─── Telas da Navegação ────────────────────────────────────────────────────

export type Tela =
  | "lista"
  | "cadastro"
  | "detalhe";