import { ComponentProps, ReactNode } from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { HIT_SLOP, palette, radius, shadows, spacing } from "../theme";
import { AppText } from "./AppText";

type Acao = {
  icone: ComponentProps<typeof Ionicons>["name"];
  rotulo: string;
  onPress: () => void;
};

type Props = {
  titulo: string;
  /** Linha menor acima do título, usada para a marca ou o protocolo. */
  sobretitulo?: string;
  onVoltar?: () => void;
  acoes?: Acao[];
  /** Conteúdo extra encaixado abaixo do título, como busca e filtros. */
  children?: ReactNode;
};

/**
 * Cabeçalho azul-marinho usado nas três telas.
 *
 * Concentra o safe area inset e o botão de voltar em um só lugar, o que mantém
 * o topo idêntico em toda a navegação.
 */
export function ScreenHeader({ titulo, sobretitulo, onVoltar, acoes, children }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top + spacing.sm }]}>
      <View style={styles.linhaTopo}>
        {onVoltar ? (
          <Pressable
            onPress={onVoltar}
            hitSlop={HIT_SLOP}
            accessibilityRole="button"
            accessibilityLabel="Voltar"
            style={({ pressed }) => [styles.botaoIcone, pressed && styles.pressionado]}
          >
            <Ionicons name="arrow-back" size={20} color={palette.headerText} />
          </Pressable>
        ) : null}

        <View style={styles.textos}>
          {sobretitulo ? (
            <AppText variant="overline" color={palette.headerTextMuted}>
              {sobretitulo}
            </AppText>
          ) : null}
          <AppText variant="display" color={palette.headerText} numberOfLines={1}>
            {titulo}
          </AppText>
        </View>

        {acoes?.map((acao) => (
          <Pressable
            key={acao.rotulo}
            onPress={acao.onPress}
            hitSlop={HIT_SLOP}
            accessibilityRole="button"
            accessibilityLabel={acao.rotulo}
            style={({ pressed }) => [styles.botaoIcone, pressed && styles.pressionado]}
          >
            <Ionicons name={acao.icone} size={20} color={palette.headerText} />
          </Pressable>
        ))}
      </View>

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: palette.headerBackground,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    gap: spacing.lg,
    // Sombra e zIndex separam o header do conteúdo que rola por baixo dele.
    ...shadows.md,
    ...Platform.select({ web: { zIndex: 2 }, default: {} }),
  },
  linhaTopo: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    minHeight: 44,
  },
  textos: {
    flex: 1,
    gap: spacing.xxs,
  },
  botaoIcone: {
    width: 38,
    height: 38,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.12)",
  },
  pressionado: {
    opacity: 0.6,
  },
});
