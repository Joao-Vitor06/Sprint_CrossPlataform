import { ComponentProps } from "react";
import { Modal, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { palette, radius, shadows, spacing } from "../theme";
import { AppText } from "./AppText";

export type Opcao<T extends string> = {
  valor: T;
  label: string;
  descricao?: string;
  icone?: ComponentProps<typeof Ionicons>["name"];
};

type Props<T extends string> = {
  visivel: boolean;
  titulo: string;
  opcoes: Opcao<T>[];
  selecionado: T;
  onSelecionar: (valor: T) => void;
  onFechar: () => void;
};

/** Folha inferior para escolher uma opção entre várias, como a ordenação da lista. */
export function OptionSheet<T extends string>({
  visivel,
  titulo,
  opcoes,
  selecionado,
  onSelecionar,
  onFechar,
}: Props<T>) {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visivel}
      transparent
      animationType="slide"
      onRequestClose={onFechar}
      statusBarTranslucent
    >
      <Pressable style={styles.fundo} onPress={onFechar} accessibilityLabel="Fechar" />

      <View style={[styles.folha, { paddingBottom: insets.bottom + spacing.xl }]}>
        <View style={styles.puxador} />

        <AppText variant="subtitle" style={styles.titulo}>
          {titulo}
        </AppText>

        <ScrollView bounces={false}>
          {opcoes.map((opcao) => {
            const ativo = opcao.valor === selecionado;
            return (
              <Pressable
                key={opcao.valor}
                onPress={() => {
                  onSelecionar(opcao.valor);
                  onFechar();
                }}
                accessibilityRole="button"
                accessibilityState={{ selected: ativo }}
                style={({ pressed }) => [
                  styles.item,
                  ativo && styles.itemAtivo,
                  pressed && styles.pressionado,
                ]}
              >
                {opcao.icone ? (
                  <Ionicons
                    name={opcao.icone}
                    size={18}
                    color={ativo ? palette.action : palette.textMuted}
                  />
                ) : null}

                <View style={styles.itemTextos}>
                  <AppText
                    variant="bodyMedium"
                    color={ativo ? palette.actionSoftText : palette.textPrimary}
                  >
                    {opcao.label}
                  </AppText>
                  {opcao.descricao ? (
                    <AppText variant="caption" color={palette.textMuted}>
                      {opcao.descricao}
                    </AppText>
                  ) : null}
                </View>

                {ativo ? (
                  <Ionicons name="checkmark-circle" size={20} color={palette.action} />
                ) : null}
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fundo: {
    flex: 1,
    backgroundColor: "rgba(15, 23, 42, 0.5)",
  },
  folha: {
    backgroundColor: palette.surface,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    maxHeight: "70%",
    ...shadows.lg,
  },
  puxador: {
    width: 40,
    height: 4,
    borderRadius: radius.pill,
    backgroundColor: palette.borderStrong,
    alignSelf: "center",
    marginBottom: spacing.lg,
  },
  titulo: {
    marginBottom: spacing.md,
    paddingHorizontal: spacing.xs,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
  },
  itemAtivo: {
    backgroundColor: palette.actionSoft,
  },
  pressionado: {
    opacity: 0.7,
  },
  itemTextos: {
    flex: 1,
    gap: spacing.xxs,
  },
});
