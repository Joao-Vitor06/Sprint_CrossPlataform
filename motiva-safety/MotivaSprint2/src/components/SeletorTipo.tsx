import { Pressable, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { TIPO, palette, radius, spacing } from "../theme";
import type { TipoOcorrencia } from "../types";
import { AppText } from "./AppText";

type Props = {
  selecionado: TipoOcorrencia;
  onSelecionar: (tipo: TipoOcorrencia) => void;
};

const TIPOS = Object.keys(TIPO) as TipoOcorrencia[];

/** Grade com os oito tipos de problema que o operador pode registrar. */
export function SeletorTipo({ selecionado, onSelecionar }: Props) {
  return (
    <View style={styles.grade}>
      {TIPOS.map((tipo) => {
        const ativo = tipo === selecionado;
        const config = TIPO[tipo];

        return (
          <Pressable
            key={tipo}
            onPress={() => onSelecionar(tipo)}
            accessibilityRole="button"
            accessibilityState={{ selected: ativo }}
            accessibilityLabel={config.label}
            style={({ pressed }) => [
              styles.item,
              ativo && styles.itemAtivo,
              pressed && styles.pressionado,
            ]}
          >
            <MaterialCommunityIcons
              name={config.icone}
              size={22}
              color={ativo ? palette.action : palette.textMuted}
            />
            <AppText
              variant="caption"
              color={ativo ? palette.actionSoftText : palette.textSecondary}
              numberOfLines={2}
              style={styles.rotulo}
            >
              {config.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grade: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  item: {
    // Quatro por linha em telas largas, duas em telas estreitas.
    flexGrow: 1,
    flexBasis: 78,
    minWidth: 78,
    // Altura fixa para que rótulos de uma e de duas linhas fiquem alinhados.
    minHeight: 82,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xs,
    borderRadius: radius.md,
    borderWidth: 1.5,
    borderColor: palette.border,
    backgroundColor: palette.surface,
  },
  itemAtivo: {
    borderColor: palette.action,
    backgroundColor: palette.actionSoft,
  },
  pressionado: {
    opacity: 0.75,
  },
  rotulo: {
    textAlign: "center",
  },
});
