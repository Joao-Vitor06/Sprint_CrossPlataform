import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import { palette, radius, spacing } from "../theme";
import { AppText } from "./AppText";

export type Chip<T extends string> = {
  valor: T;
  label: string;
  /** Contador exibido dentro do chip, como "Alto 4". */
  contagem?: number;
  /** Cor de destaque quando o chip está selecionado. Sem isso usa o azul de ação. */
  cor?: string;
};

type Props<T extends string> = {
  opcoes: Chip<T>[];
  selecionado: T;
  onSelecionar: (valor: T) => void;
  /** Permite rolagem horizontal quando há muitos chips. */
  rolavel?: boolean;
};

/** Grupo de filtros em pílula, com apenas uma opção ativa por vez. */
export function FilterChips<T extends string>({
  opcoes,
  selecionado,
  onSelecionar,
  rolavel = false,
}: Props<T>) {
  const conteudo = opcoes.map((opcao) => {
    const ativo = opcao.valor === selecionado;
    const cor = opcao.cor ?? palette.action;

    return (
      <Pressable
        key={opcao.valor}
        onPress={() => onSelecionar(opcao.valor)}
        accessibilityRole="button"
        accessibilityState={{ selected: ativo }}
        accessibilityLabel={opcao.label}
        style={({ pressed }) => [
          styles.chip,
          ativo && { backgroundColor: cor, borderColor: cor },
          pressed && styles.pressionado,
        ]}
      >
        <AppText variant="caption" color={ativo ? palette.textInverse : palette.textSecondary}>
          {opcao.label}
        </AppText>

        {typeof opcao.contagem === "number" ? (
          <View style={[styles.contagem, ativo && styles.contagemAtiva]}>
            <AppText
              variant="caption"
              color={ativo ? palette.textInverse : palette.textMuted}
              style={styles.contagemTexto}
            >
              {opcao.contagem}
            </AppText>
          </View>
        ) : null}
      </Pressable>
    );
  });

  if (!rolavel) {
    return <View style={styles.linha}>{conteudo}</View>;
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.linhaRolavel}
    >
      {conteudo}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  linha: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  linhaRolavel: {
    flexDirection: "row",
    gap: spacing.sm,
    paddingRight: spacing.lg,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs + 2,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.surface,
  },
  pressionado: {
    opacity: 0.75,
  },
  contagem: {
    minWidth: 20,
    paddingHorizontal: spacing.xs,
    paddingVertical: 1,
    borderRadius: radius.pill,
    backgroundColor: palette.background,
    alignItems: "center",
  },
  contagemAtiva: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
  },
  contagemTexto: {
    fontSize: 11,
  },
});
