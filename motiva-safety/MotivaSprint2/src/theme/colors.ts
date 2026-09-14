/**
 * Paleta do Motiva Safety.
 *
 * A marca usa azul-marinho para superfícies institucionais (header, splash, ícone)
 * e azul de ação para tudo que é clicável. As cores semânticas de risco ficam
 * reservadas para verde/âmbar/vermelho, por isso a cor de ação nunca é verde nem
 * âmbar: evita que um botão comum seja lido como classificação de risco.
 */
export const colors = {
  // Superfícies institucionais
  navy900: "#0B2545",
  navy800: "#123A6B",
  navy700: "#1B4B87",

  // Ação
  blue600: "#2563EB",
  blue500: "#3B82F6",
  blue100: "#DBEAFE",
  blue50: "#EFF6FF",

  // Neutros
  white: "#FFFFFF",
  slate50: "#F8FAFC",
  slate100: "#F1F5F9",
  slate200: "#E2E8F0",
  slate300: "#CBD5E1",
  slate400: "#94A3B8",
  slate500: "#64748B",
  slate600: "#475569",
  slate700: "#334155",
  slate800: "#1E293B",
  slate900: "#0F172A",

  // Semânticas
  green600: "#16A34A",
  green500: "#22C55E",
  green100: "#DCFCE7",
  green50: "#F0FDF4",

  amber600: "#D97706",
  amber500: "#F59E0B",
  amber100: "#FEF3C7",
  amber50: "#FFFBEB",

  red600: "#DC2626",
  red500: "#EF4444",
  red100: "#FEE2E2",
  red50: "#FEF2F2",

  transparent: "transparent",
} as const;

/** Papéis semânticos: as telas consomem estes nomes, não os tons crus acima. */
export const palette = {
  background: colors.slate100,
  surface: colors.white,
  surfaceMuted: colors.slate50,
  border: colors.slate200,
  borderStrong: colors.slate300,

  headerBackground: colors.navy900,
  headerText: colors.white,
  headerTextMuted: "#A8C0DE",

  textPrimary: colors.slate900,
  textSecondary: colors.slate600,
  textMuted: colors.slate400,
  textInverse: colors.white,

  action: colors.blue600,
  actionPressed: "#1D4ED8",
  actionSoft: colors.blue50,
  actionSoftText: "#1D4ED8",

  danger: colors.red600,
  dangerSoft: colors.red50,
  success: colors.green600,
  successSoft: colors.green50,
} as const;
