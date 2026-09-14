import { ComponentProps } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { palette, radius, shadows, spacing } from "../theme";
import { AppText } from "./AppText";
import { Button } from "./Button";

type Props = {
  visivel: boolean;
  titulo: string;
  descricao: string;
  icone: ComponentProps<typeof Ionicons>["name"];
  cor: string;
  fundoIcone: string;
  rotuloConfirmar: string;
  varianteConfirmar?: ComponentProps<typeof Button>["variante"];
  onConfirmar: () => void;
  onCancelar: () => void;
  carregando?: boolean;
};

/**
 * Confirmação em folha inferior para ações que mudam o estado da ocorrência.
 *
 * Fica dentro do app em vez de usar o alerta do sistema, o que mantém a
 * identidade visual e permite mostrar contexto (ícone e cor do status alvo).
 */
export function ConfirmSheet({
  visivel,
  titulo,
  descricao,
  icone,
  cor,
  fundoIcone,
  rotuloConfirmar,
  varianteConfirmar = "primario",
  onConfirmar,
  onCancelar,
  carregando = false,
}: Props) {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visivel}
      transparent
      animationType="slide"
      onRequestClose={onCancelar}
      statusBarTranslucent
    >
      <Pressable style={styles.fundo} onPress={onCancelar} accessibilityLabel="Fechar" />

      <View style={[styles.folha, { paddingBottom: insets.bottom + spacing.xl }]}>
        <View style={styles.puxador} />

        <View style={[styles.icone, { backgroundColor: fundoIcone }]}>
          <Ionicons name={icone} size={26} color={cor} />
        </View>

        <AppText variant="title" style={styles.titulo}>
          {titulo}
        </AppText>
        <AppText variant="bodySm" color={palette.textSecondary} style={styles.descricao}>
          {descricao}
        </AppText>

        <View style={styles.acoes}>
          <Button
            titulo="Cancelar"
            variante="contorno"
            onPress={onCancelar}
            style={styles.acao}
          />
          <Button
            titulo={rotuloConfirmar}
            variante={varianteConfirmar}
            onPress={onConfirmar}
            carregando={carregando}
            style={styles.acao}
          />
        </View>
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
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    alignItems: "center",
    gap: spacing.sm,
    ...shadows.lg,
  },
  puxador: {
    width: 40,
    height: 4,
    borderRadius: radius.pill,
    backgroundColor: palette.borderStrong,
    marginBottom: spacing.lg,
  },
  icone: {
    width: 60,
    height: 60,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  titulo: {
    textAlign: "center",
  },
  descricao: {
    textAlign: "center",
    marginBottom: spacing.lg,
  },
  acoes: {
    flexDirection: "row",
    gap: spacing.md,
    alignSelf: "stretch",
  },
  acao: {
    flex: 1,
  },
});
