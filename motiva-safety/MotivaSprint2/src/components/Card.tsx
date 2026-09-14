import { ReactNode } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

import { palette, radius, shadows, spacing } from "../theme";
import { AppText } from "./AppText";

type Props = {
  children: ReactNode;
  /** Cabeçalho opcional em caixa alta, usado para seccionar a tela de detalhe. */
  titulo?: string;
  style?: ViewStyle;
  semPadding?: boolean;
};

/** Superfície branca elevada. Base visual de praticamente todo bloco do app. */
export function Card({ children, titulo, style, semPadding = false }: Props) {
  return (
    <View style={[styles.card, !semPadding && styles.padding, style]}>
      {titulo ? (
        <AppText variant="overline" color={palette.textMuted} style={styles.titulo}>
          {titulo}
        </AppText>
      ) : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: palette.border,
    ...shadows.sm,
  },
  padding: {
    padding: spacing.lg,
  },
  titulo: {
    marginBottom: spacing.md,
  },
});
