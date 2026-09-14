import { Pressable, StyleSheet, View } from "react-native";

import { RISCO, palette, radius, spacing } from "../theme";
import type { NivelRisco } from "../types";
import { AppText } from "./AppText";

type Props = {
  selecionado: NivelRisco;
  onSelecionar: (risco: NivelRisco) => void;
};

const NIVEIS: NivelRisco[] = ["baixo", "medio", "alto"];

/**
 * Escolha do nível de risco.
 *
 * A descrição do nível selecionado aparece embaixo porque a classificação define
 * o prazo de atendimento, e o operador precisa saber o que está acionando.
 */
export function SeletorRisco({ selecionado, onSelecionar }: Props) {
  const config = RISCO[selecionado];

  return (
    <View style={styles.container}>
      <View style={styles.linha}>
        {NIVEIS.map((nivel) => {
          const item = RISCO[nivel];
          const ativo = nivel === selecionado;

          return (
            <Pressable
              key={nivel}
              onPress={() => onSelecionar(nivel)}
              accessibilityRole="button"
              accessibilityState={{ selected: ativo }}
              accessibilityLabel={`Risco ${item.label}`}
              style={({ pressed }) => [
                styles.opcao,
                ativo && { borderColor: item.solido, backgroundColor: item.fundo },
                pressed && styles.pressionado,
              ]}
            >
              <View style={[styles.ponto, { backgroundColor: item.solido }]} />
              <AppText
                variant="bodyMedium"
                color={ativo ? item.cor : palette.textSecondary}
              >
                {item.label}
              </AppText>
            </Pressable>
          );
        })}
      </View>

      <View style={[styles.explicacao, { backgroundColor: config.fundo }]}>
        <AppText variant="caption" color={config.cor}>
          {config.descricao}
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  linha: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  opcao: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: palette.border,
    backgroundColor: palette.surface,
  },
  pressionado: {
    opacity: 0.75,
  },
  ponto: {
    width: 10,
    height: 10,
    borderRadius: radius.pill,
  },
  explicacao: {
    borderRadius: radius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
});
