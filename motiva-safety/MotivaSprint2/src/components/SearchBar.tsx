import { Pressable, StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { HIT_SLOP, palette, radius, semAnelDeFocoWeb, spacing, typography } from "../theme";

type Props = {
  valor: string;
  onChange: (texto: string) => void;
  placeholder?: string;
};

/** Busca por texto livre. O botão de limpar só aparece quando há algo digitado. */
export function SearchBar({ valor, onChange, placeholder = "Buscar" }: Props) {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={18} color={palette.textMuted} />
      <TextInput
        value={valor}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={palette.textMuted}
        style={styles.input}
        returnKeyType="search"
        autoCorrect={false}
        accessibilityLabel="Campo de busca"
      />
      {valor.length > 0 ? (
        <Pressable
          onPress={() => onChange("")}
          hitSlop={HIT_SLOP}
          accessibilityRole="button"
          accessibilityLabel="Limpar busca"
        >
          <Ionicons name="close-circle" size={18} color={palette.textMuted} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: palette.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: palette.border,
    paddingHorizontal: spacing.md,
    height: 44,
  },
  input: {
    flex: 1,
    color: palette.textPrimary,
    padding: 0,
    ...typography.bodyMedium,
    ...semAnelDeFocoWeb,
  },
});
