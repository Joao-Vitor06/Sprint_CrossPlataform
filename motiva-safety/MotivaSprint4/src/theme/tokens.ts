import { Platform, TextStyle, ViewStyle } from "react-native";

import { colors } from "./colors";

/** Escala de 4pt. Usar sempre estes valores em padding, margin e gap. */
export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
  huge: 48,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  pill: 999,
} as const;

/**
 * Famílias da Inter carregadas em App.tsx. Se a fonte ainda não carregou,
 * o React Native cai na fonte do sistema sem quebrar o layout.
 */
export const fonts = {
  regular: "Inter_400Regular",
  medium: "Inter_500Medium",
  semibold: "Inter_600SemiBold",
  bold: "Inter_700Bold",
  extrabold: "Inter_800ExtraBold",
} as const;

export const typography = {
  displayLg: {
    fontFamily: fonts.extrabold,
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.5,
  },
  display: {
    fontFamily: fonts.extrabold,
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: -0.4,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 20,
    lineHeight: 26,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: -0.1,
  },
  body: {
    fontFamily: fonts.regular,
    fontSize: 15,
    lineHeight: 22,
  },
  bodyMedium: {
    fontFamily: fonts.medium,
    fontSize: 15,
    lineHeight: 22,
  },
  bodySm: {
    fontFamily: fonts.regular,
    fontSize: 13,
    lineHeight: 19,
  },
  label: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    lineHeight: 18,
  },
  caption: {
    fontFamily: fonts.medium,
    fontSize: 12,
    lineHeight: 16,
  },
  overline: {
    fontFamily: fonts.bold,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
} satisfies Record<string, TextStyle>;

/**
 * Elevação. iOS usa shadow*, Android usa elevation, e a web precisa de boxShadow
 * porque as props de shadow do RN não são suportadas pelo react-native-web novo.
 */
function elevation(y: number, blur: number, opacity: number, level: number): ViewStyle {
  return Platform.select<ViewStyle>({
    web: {
      boxShadow: `0px ${y}px ${blur}px rgba(15, 23, 42, ${opacity})`,
    },
    android: {
      elevation: level,
      shadowColor: colors.slate900,
    },
    default: {
      shadowColor: colors.slate900,
      shadowOffset: { width: 0, height: y },
      shadowOpacity: opacity,
      shadowRadius: blur / 2,
    },
  }) as ViewStyle;
}

export const shadows = {
  none: {} as ViewStyle,
  sm: elevation(1, 4, 0.06, 1),
  md: elevation(3, 12, 0.08, 3),
  lg: elevation(8, 24, 0.12, 8),
} as const;

/** Alvo mínimo de toque recomendado pelas guidelines de acessibilidade. */
export const HIT_SLOP = { top: 8, bottom: 8, left: 8, right: 8 } as const;

/**
 * Remove o anel de foco preto que o navegador desenha nos campos.
 *
 * Só afeta a execução na web. O destaque de foco do app é a borda azul do
 * próprio campo, então o anel padrão ficava duplicado e fora da identidade.
 */
export const semAnelDeFocoWeb = Platform.select<TextStyle>({
  web: { outlineWidth: 0 },
  default: {},
}) as TextStyle;
