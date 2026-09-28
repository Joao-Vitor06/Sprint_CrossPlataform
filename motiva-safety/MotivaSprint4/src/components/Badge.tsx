import { ComponentProps } from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { RISCO, STATUS, radius, spacing } from "../theme";
import type { NivelRisco, StatusOcorrencia } from "../types";
import { AppText } from "./AppText";

type BadgeProps = {
  label: string;
  cor: string;
  fundo: string;
  icone?: ComponentProps<typeof Ionicons>["name"];
  compacto?: boolean;
  style?: ViewStyle;
};

/** Etiqueta arredondada usada para risco, status e metadados curtos. */
export function Badge({ label, cor, fundo, icone, compacto = false, style }: BadgeProps) {
  return (
    <View
      style={[
        styles.badge,
        compacto ? styles.compacto : styles.normal,
        { backgroundColor: fundo },
        style,
      ]}
    >
      {icone ? <Ionicons name={icone} size={compacto ? 11 : 13} color={cor} /> : null}
      <AppText variant="caption" color={cor}>
        {label}
      </AppText>
    </View>
  );
}

export function RiscoBadge({
  risco,
  compacto,
  style,
}: {
  risco: NivelRisco;
  compacto?: boolean;
  style?: ViewStyle;
}) {
  const config = RISCO[risco];
  return (
    <Badge
      label={`Risco ${config.label}`}
      cor={config.cor}
      fundo={config.fundo}
      compacto={compacto}
      style={style}
    />
  );
}

export function StatusBadge({
  status,
  compacto,
  style,
}: {
  status: StatusOcorrencia;
  compacto?: boolean;
  style?: ViewStyle;
}) {
  const config = STATUS[status];
  return (
    <Badge
      label={config.label}
      cor={config.cor}
      fundo={config.fundo}
      icone={config.icone}
      compacto={compacto}
      style={style}
    />
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    borderRadius: radius.pill,
    gap: spacing.xs,
  },
  normal: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
  },
  compacto: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
  },
});
