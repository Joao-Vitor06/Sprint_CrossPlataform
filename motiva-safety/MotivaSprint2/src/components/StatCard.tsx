import { ComponentProps } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { palette, radius, spacing } from "../theme";
import { AppText } from "./AppText";

type Props = {
  valor: number;
  label: string;
  cor: string;
  fundo: string;
  icone: ComponentProps<typeof Ionicons>["name"];
  /** Quando informado, o card vira um atalho que aplica o filtro correspondente. */
  onPress?: () => void;
  ativo?: boolean;
};

/** Indicador do painel da lista. Clicar aplica o filtro equivalente. */
export function StatCard({ valor, label, cor, fundo, icone, onPress, ativo = false }: Props) {
  const conteudo = (
    <>
      <View style={[styles.icone, { backgroundColor: fundo }]}>
        <Ionicons name={icone} size={16} color={cor} />
      </View>
      <View style={styles.textos}>
        <AppText variant="title" color={palette.textPrimary}>
          {valor}
        </AppText>
        <AppText variant="caption" color={palette.textSecondary} numberOfLines={1}>
          {label}
        </AppText>
      </View>
    </>
  );

  if (!onPress) {
    return <View style={[styles.card, ativo && { borderColor: cor }]}>{conteudo}</View>;
  }

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityState={{ selected: ativo }}
      accessibilityLabel={`${label}: ${valor}`}
      style={({ pressed }) => [
        styles.card,
        ativo && { borderColor: cor, backgroundColor: fundo },
        pressed && styles.pressionado,
      ]}
    >
      {conteudo}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: palette.surface,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: palette.border,
    padding: spacing.md,
    gap: spacing.sm,
    minHeight: 88,
  },
  pressionado: {
    opacity: 0.8,
  },
  icone: {
    width: 28,
    height: 28,
    borderRadius: radius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  textos: {
    gap: spacing.xxs,
  },
});
