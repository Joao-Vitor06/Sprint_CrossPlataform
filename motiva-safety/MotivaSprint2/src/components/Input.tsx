import { useState } from "react";
import {
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors, palette, radius, semAnelDeFocoWeb, spacing, typography } from "../theme";
import { AppText } from "./AppText";

type Props = Omit<TextInputProps, "style"> & {
  label: string;
  /** Mensagem de erro. Quando presente, a borda fica vermelha e o texto aparece abaixo. */
  erro?: string;
  ajuda?: string;
  obrigatorio?: boolean;
  /** Ativa o modo textarea, com altura maior e contador de caracteres. */
  multilinha?: boolean;
  /** Elemento renderizado à direita do campo, como o botão de GPS. */
  acessorio?: React.ReactNode;
  containerStyle?: ViewStyle;
};

/**
 * Campo de formulário com rótulo, validação inline e contador.
 *
 * O erro aparece embaixo do próprio campo, e não em um alerta do sistema, para
 * que o operador veja exatamente qual informação está faltando.
 */
export function Input({
  label,
  erro,
  ajuda,
  obrigatorio = false,
  multilinha = false,
  acessorio,
  containerStyle,
  maxLength,
  value,
  ...rest
}: Props) {
  const [focado, setFocado] = useState(false);
  const temErro = Boolean(erro);

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.linhaLabel}>
        <AppText variant="overline" color={palette.textSecondary}>
          {label}
          {obrigatorio ? <AppText variant="overline" color={palette.danger}>{" *"}</AppText> : null}
        </AppText>

        {multilinha && maxLength ? (
          <AppText variant="caption" color={palette.textMuted}>
            {(value ?? "").length}/{maxLength}
          </AppText>
        ) : null}
      </View>

      <View style={styles.linhaCampo}>
        <TextInput
          {...rest}
          value={value}
          maxLength={maxLength}
          multiline={multilinha}
          textAlignVertical={multilinha ? "top" : "center"}
          placeholderTextColor={palette.textMuted}
          onFocus={(evento) => {
            setFocado(true);
            rest.onFocus?.(evento);
          }}
          onBlur={(evento) => {
            setFocado(false);
            rest.onBlur?.(evento);
          }}
          accessibilityLabel={label}
          style={[
            styles.input,
            multilinha && styles.inputMultilinha,
            focado && styles.inputFocado,
            temErro && styles.inputErro,
          ]}
        />
        {acessorio}
      </View>

      {temErro ? (
        <View style={styles.linhaMensagem}>
          <Ionicons name="alert-circle" size={14} color={palette.danger} />
          <AppText variant="caption" color={palette.danger} style={styles.mensagem}>
            {erro}
          </AppText>
        </View>
      ) : ajuda ? (
        <AppText variant="caption" color={palette.textMuted}>
          {ajuda}
        </AppText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
  },
  linhaLabel: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  linhaCampo: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    backgroundColor: palette.surface,
    borderWidth: 1.5,
    borderColor: palette.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    minHeight: 50,
    color: palette.textPrimary,
    ...typography.body,
    ...semAnelDeFocoWeb,
  },
  inputMultilinha: {
    minHeight: 120,
    paddingTop: spacing.md,
  },
  inputFocado: {
    borderColor: palette.action,
    backgroundColor: colors.blue50,
  },
  inputErro: {
    borderColor: palette.danger,
    backgroundColor: colors.red50,
  },
  linhaMensagem: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  mensagem: {
    flex: 1,
  },
});
