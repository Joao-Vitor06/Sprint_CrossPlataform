import { Text, TextProps, StyleSheet } from "react-native";

import { palette, typography } from "../theme";

type Variante = keyof typeof typography;

type Props = TextProps & {
  variant?: Variante;
  color?: string;
};

/**
 * Todo texto do app passa por aqui.
 *
 * Centralizar a tipografia garante que a fonte Inter e a escala de tamanhos
 * sejam aplicadas de forma idêntica em todas as telas, sem cada arquivo
 * redefinir fontSize e fontWeight na mão.
 */
export function AppText({ variant = "body", color, style, ...rest }: Props) {
  return (
    <Text
      {...rest}
      style={StyleSheet.flatten([
        typography[variant],
        { color: color ?? palette.textPrimary },
        style,
      ])}
    />
  );
}
