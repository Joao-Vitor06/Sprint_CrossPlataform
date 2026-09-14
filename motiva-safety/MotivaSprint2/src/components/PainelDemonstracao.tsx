import { Modal, Pressable, StyleSheet, Switch, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { colors, palette, radius, shadows, spacing } from "../theme";
import { AppText } from "./AppText";
import { Button } from "./Button";

type Props = {
  visivel: boolean;
  onFechar: () => void;
  simulandoFalha: boolean;
  onAlternarFalha: (ativo: boolean) => void;
  onLimparTudo: () => void;
  onRestaurar: () => void;
  ocupado: boolean;
};

/**
 * Painel de demonstração do protótipo.
 *
 * Enquanto não existe uma API real, é aqui que se força os cenários que o
 * usuário não consegue provocar sozinho: falha de conexão e base sem nenhuma
 * ocorrência. Serve para a apresentação da Sprint e sai do app quando a
 * integração de verdade entrar.
 */
export function PainelDemonstracao({
  visivel,
  onFechar,
  simulandoFalha,
  onAlternarFalha,
  onLimparTudo,
  onRestaurar,
  ocupado,
}: Props) {
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

      <View style={[styles.folha, { paddingBottom: insets.bottom + spacing.lg }]}>
        <View style={styles.puxador} />

        <View style={styles.cabecalho}>
          <View style={styles.icone}>
            <Ionicons name="flask-outline" size={20} color={palette.action} />
          </View>
          <View style={styles.cabecalhoTextos}>
            <AppText variant="subtitle">Modo demonstração</AppText>
            <AppText variant="caption" color={palette.textSecondary}>
              Força os cenários usados na apresentação da Sprint
            </AppText>
          </View>
        </View>

        <View style={styles.linhaSwitch}>
          <View style={styles.linhaTextos}>
            <AppText variant="bodyMedium">Simular falha de conexão</AppText>
            <AppText variant="caption" color={palette.textSecondary}>
              Recarrega na hora e mostra a tela de erro do app
            </AppText>
          </View>
          <Switch
            value={simulandoFalha}
            onValueChange={onAlternarFalha}
            trackColor={{ false: colors.slate300, true: colors.blue500 }}
            thumbColor={colors.white}
            accessibilityLabel="Simular falha de conexão"
          />
        </View>

        <View style={styles.divisor} />

        <View style={styles.acoes}>
          <Button
            titulo="Esvaziar a lista"
            variante="contorno"
            icone="trash-outline"
            onPress={onLimparTudo}
            desabilitado={ocupado}
            larguraTotal
          />
          <Button
            titulo="Restaurar ocorrências de exemplo"
            variante="secundario"
            icone="refresh"
            onPress={onRestaurar}
            desabilitado={ocupado}
            larguraTotal
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
    gap: spacing.lg,
    ...shadows.lg,
  },
  puxador: {
    width: 40,
    height: 4,
    borderRadius: radius.pill,
    backgroundColor: palette.borderStrong,
    alignSelf: "center",
  },
  cabecalho: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  icone: {
    width: 42,
    height: 42,
    borderRadius: radius.md,
    backgroundColor: palette.actionSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  cabecalhoTextos: {
    flex: 1,
    gap: spacing.xxs,
  },
  linhaSwitch: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.lg,
  },
  linhaTextos: {
    flex: 1,
    gap: spacing.xxs,
  },
  divisor: {
    height: 1,
    backgroundColor: palette.border,
  },
  acoes: {
    gap: spacing.md,
  },
});
