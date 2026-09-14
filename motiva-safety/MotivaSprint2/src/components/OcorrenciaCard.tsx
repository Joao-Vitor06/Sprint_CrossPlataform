import { Pressable, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { resolverFoto } from "../data/fotos";
import { RISCO, SENTIDO, STATUS, TIPO, palette, radius, shadows, spacing } from "../theme";
import type { Ocorrencia } from "../types";
import { formatarKm, formatarTempoRelativo } from "../utils/format";
import { AppText } from "./AppText";
import { StatusBadge } from "./Badge";

type Props = {
  ocorrencia: Ocorrencia;
  onPress: (ocorrencia: Ocorrencia) => void;
};

/**
 * Item da lista de ocorrências.
 *
 * A faixa colorida à esquerda dá o nível de risco de relance, que é a leitura
 * mais importante para o supervisor priorizar o atendimento.
 */
export function OcorrenciaCard({ ocorrencia, onPress }: Props) {
  const risco = RISCO[ocorrencia.risco];
  const tipo = TIPO[ocorrencia.tipo];
  const foto = resolverFoto(ocorrencia.fotoUri);

  return (
    <Pressable
      onPress={() => onPress(ocorrencia)}
      accessibilityRole="button"
      accessibilityLabel={`${ocorrencia.titulo}. Risco ${risco.label}. ${STATUS[ocorrencia.status].label}.`}
      style={({ pressed }) => [styles.card, pressed && styles.pressionado]}
    >
      <View style={[styles.faixaRisco, { backgroundColor: risco.solido }]} />

      <View style={styles.conteudo}>
        <View style={styles.topo}>
          {foto ? (
            <Image
              source={foto}
              style={styles.miniatura}
              contentFit="cover"
              transition={200}
              accessibilityLabel={`Foto da ocorrência ${ocorrencia.protocolo}`}
            />
          ) : (
            <View style={[styles.miniatura, styles.miniaturaVazia]}>
              <Ionicons name="image-outline" size={20} color={palette.textMuted} />
            </View>
          )}

          <View style={styles.cabecalho}>
            <View style={styles.linhaProtocolo}>
              <View style={[styles.pontoTipo, { backgroundColor: risco.fundo }]}>
                <MaterialCommunityIcons name={tipo.icone} size={14} color={risco.cor} />
              </View>
              <AppText variant="caption" color={palette.textMuted}>
                {ocorrencia.protocolo} · {tipo.label}
              </AppText>
            </View>

            <AppText variant="subtitle" numberOfLines={2}>
              {ocorrencia.titulo}
            </AppText>

            <AppText variant="caption" color={palette.textSecondary} numberOfLines={1}>
              {ocorrencia.rodovia} · {formatarKm(ocorrencia.km)} ·{" "}
              {SENTIDO[ocorrencia.sentido].curto}
            </AppText>
          </View>
        </View>

        <View style={styles.rodape}>
          <View style={styles.selos}>
            <View style={[styles.seloRisco, { backgroundColor: risco.fundo }]}>
              <AppText variant="caption" color={risco.cor}>
                {risco.label}
              </AppText>
            </View>
            <StatusBadge status={ocorrencia.status} compacto />
          </View>

          <AppText variant="caption" color={palette.textMuted}>
            {formatarTempoRelativo(ocorrencia.criadaEm)}
          </AppText>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: palette.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: palette.border,
    overflow: "hidden",
    ...shadows.sm,
  },
  pressionado: {
    opacity: 0.85,
    transform: [{ scale: 0.995 }],
  },
  faixaRisco: {
    width: 5,
  },
  conteudo: {
    flex: 1,
    padding: spacing.lg,
    gap: spacing.md,
  },
  topo: {
    flexDirection: "row",
    gap: spacing.md,
  },
  miniatura: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    backgroundColor: palette.background,
  },
  miniaturaVazia: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: palette.border,
  },
  cabecalho: {
    flex: 1,
    gap: spacing.xs,
  },
  linhaProtocolo: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs + 2,
  },
  pontoTipo: {
    width: 22,
    height: 22,
    borderRadius: radius.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  rodape: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: palette.background,
    paddingTop: spacing.md,
  },
  selos: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    flexShrink: 1,
  },
  seloRisco: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xxs,
    borderRadius: radius.pill,
  },
});
