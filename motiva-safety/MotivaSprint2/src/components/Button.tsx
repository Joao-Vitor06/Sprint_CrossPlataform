import { ComponentProps } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { palette, radius, shadows, spacing } from "../theme";
import { AppText } from "./AppText";

type Variante = "primario" | "secundario" | "contorno" | "fantasma" | "perigo" | "sucesso";
type Tamanho = "md" | "lg";

type Props = {
  titulo: string;
  onPress: () => void;
  variante?: Variante;
  tamanho?: Tamanho;
  icone?: ComponentProps<typeof Ionicons>["name"];
  carregando?: boolean;
  desabilitado?: boolean;
  larguraTotal?: boolean;
  style?: ViewStyle;
};

const VARIANTES: Record<Variante, { fundo: string; texto: string; borda?: string }> = {
  primario: { fundo: palette.action, texto: palette.textInverse },
  secundario: { fundo: palette.actionSoft, texto: palette.actionSoftText },
  contorno: { fundo: palette.surface, texto: palette.textSecondary, borda: palette.borderStrong },
  fantasma: { fundo: "transparent", texto: palette.action },
  perigo: { fundo: palette.danger, texto: palette.textInverse },
  sucesso: { fundo: palette.success, texto: palette.textInverse },
};

/** Botão padrão do app, com estado de carregamento e desabilitado embutidos. */
export function Button({
  titulo,
  onPress,
  variante = "primario",
  tamanho = "md",
  icone,
  carregando = false,
  desabilitado = false,
  larguraTotal = false,
  style,
}: Props) {
  const cores = VARIANTES[variante];
  const inativo = desabilitado || carregando;
  const solido = variante === "primario" || variante === "perigo" || variante === "sucesso";

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={titulo}
      accessibilityState={{ disabled: inativo, busy: carregando }}
      disabled={inativo}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        tamanho === "lg" ? styles.lg : styles.md,
        {
          backgroundColor: cores.fundo,
          borderColor: cores.borda ?? "transparent",
          borderWidth: cores.borda ? 1 : 0,
        },
        solido && shadows.sm,
        larguraTotal && styles.larguraTotal,
        pressed && styles.pressionado,
        inativo && styles.inativo,
        style,
      ]}
    >
      {carregando ? (
        <ActivityIndicator size="small" color={cores.texto} />
      ) : (
        <View style={styles.conteudo}>
          {icone ? (
            <Ionicons name={icone} size={tamanho === "lg" ? 19 : 17} color={cores.texto} />
          ) : null}
          <AppText
            variant={tamanho === "lg" ? "subtitle" : "label"}
            color={cores.texto}
            numberOfLines={1}
          >
            {titulo}
          </AppText>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  md: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    minHeight: 46,
  },
  lg: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    minHeight: 54,
  },
  larguraTotal: {
    alignSelf: "stretch",
  },
  conteudo: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  pressionado: {
    opacity: 0.82,
    transform: [{ scale: 0.985 }],
  },
  inativo: {
    opacity: 0.45,
  },
});
