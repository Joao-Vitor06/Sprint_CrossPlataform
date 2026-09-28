import type { ComponentProps } from "react";
import type { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import type {
  NivelRisco,
  Ordenacao,
  SentidoRodovia,
  StatusOcorrencia,
  TipoOcorrencia,
} from "../types";
import { colors } from "./colors";

type MdiName = ComponentProps<typeof MaterialCommunityIcons>["name"];
type IoniconName = ComponentProps<typeof Ionicons>["name"];

type VisualConfig = {
  label: string;
  /** Cor do texto e dos ícones sobre o fundo suave. */
  cor: string;
  /** Fundo suave usado em badges e banners. */
  fundo: string;
  /** Cor cheia, para barras e botões sólidos. */
  solido: string;
};

/**
 * Fonte única de verdade para risco, status e tipo.
 *
 * Antes cada tela redeclarava suas próprias cores, o que deixava a lista e o
 * detalhe fora de sincronia. Qualquer ajuste visual agora acontece só aqui.
 */
export const RISCO: Record<NivelRisco, VisualConfig & { ordem: number; descricao: string }> = {
  baixo: {
    label: "Baixo",
    cor: colors.green600,
    fundo: "rgba(34, 197, 94, 0.14)",
    solido: colors.green500,
    ordem: 1,
    descricao: "Sem impacto imediato ao tráfego. Entra na programação de manutenção.",
  },
  medio: {
    label: "Médio",
    cor: colors.amber600,
    fundo: "rgba(245, 158, 11, 0.16)",
    solido: colors.amber500,
    ordem: 2,
    descricao: "Pode agravar se não for tratado. Atendimento em até 72 horas.",
  },
  alto: {
    label: "Alto",
    cor: colors.red600,
    fundo: "rgba(239, 68, 68, 0.14)",
    solido: colors.red500,
    ordem: 3,
    descricao: "Risco imediato de acidente. Aciona a equipe de campo em regime de urgência.",
  },
};

export const STATUS: Record<StatusOcorrencia, VisualConfig & { icone: IoniconName }> = {
  aberta: {
    label: "Aberta",
    cor: "#1D4ED8",
    fundo: "rgba(59, 130, 246, 0.14)",
    solido: colors.blue600,
    icone: "ellipse-outline",
  },
  em_analise: {
    label: "Em análise",
    cor: colors.amber600,
    fundo: "rgba(245, 158, 11, 0.16)",
    solido: colors.amber500,
    icone: "time-outline",
  },
  resolvida: {
    label: "Resolvida",
    cor: colors.green600,
    fundo: "rgba(34, 197, 94, 0.14)",
    solido: colors.green500,
    icone: "checkmark-circle-outline",
  },
};

export const TIPO: Record<TipoOcorrencia, { label: string; icone: MdiName }> = {
  vegetacao_alta: { label: "Vegetação acima do limite", icone: "grass" },
  vegetacao_sinalizacao: { label: "Vegetação encobrindo sinalização", icone: "sign-caution" },
  vegetacao_acostamento: { label: "Vegetação invadindo acostamento", icone: "road-variant" },
  vegetacao_drenagem: { label: "Vegetação sobre drenagem", icone: "water-alert" },
};

export const SENTIDO: Record<SentidoRodovia, { label: string; curto: string }> = {
  capital: { label: "Sentido Capital", curto: "Capital" },
  interior: { label: "Sentido Interior", curto: "Interior" },
};

export const ORDENACAO: Record<Ordenacao, { label: string; icone: IoniconName }> = {
  recentes: { label: "Mais recentes", icone: "arrow-down" },
  antigas: { label: "Mais antigas", icone: "arrow-up" },
  risco: { label: "Maior risco", icone: "flame-outline" },
  km: { label: "Quilômetro", icone: "swap-vertical-outline" },
};

/**
 * Próximos status permitidos a partir do status atual. O detalhe da ocorrência
 * monta seus botões de ação a partir daqui, então o fluxo nunca fica travado
 * nem permite um salto inválido.
 */
export const TRANSICOES: Record<StatusOcorrencia, StatusOcorrencia[]> = {
  aberta: ["em_analise", "resolvida"],
  em_analise: ["resolvida", "aberta"],
  resolvida: ["aberta"],
};

export const ROTULO_TRANSICAO: Record<StatusOcorrencia, { titulo: string; ajuda: string }> = {
  aberta: {
    titulo: "Reabrir ocorrência",
    ajuda: "O problema voltou a aparecer no trecho",
  },
  em_analise: {
    titulo: "Enviar para análise",
    ajuda: "A equipe técnica vai avaliar o trecho",
  },
  resolvida: {
    titulo: "Dar baixa na ocorrência",
    ajuda: "O problema foi corrigido em campo",
  },
};
