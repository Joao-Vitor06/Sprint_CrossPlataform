import { ComponentProps, useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors, palette, radius, spacing } from "../theme";
import { AppText } from "./AppText";
import { Button } from "./Button";

type EstadoProps = {
  icone: ComponentProps<typeof Ionicons>["name"];
  titulo: string;
  descricao: string;
  acao?: { titulo: string; onPress: () => void; icone?: ComponentProps<typeof Ionicons>["name"] };
  acaoSecundaria?: { titulo: string; onPress: () => void };
};

/**
 * Lista vazia. Usado tanto quando ainda não existe nenhuma ocorrência quanto
 * quando a busca ou os filtros não retornam resultado, com textos diferentes.
 */
export function EmptyState({ icone, titulo, descricao, acao, acaoSecundaria }: EstadoProps) {
  return (
    <View style={styles.container}>
      <View style={[styles.circulo, { backgroundColor: colors.blue50 }]}>
        <Ionicons name={icone} size={30} color={palette.action} />
      </View>

      <AppText variant="subtitle" style={styles.titulo}>
        {titulo}
      </AppText>
      <AppText variant="bodySm" color={palette.textSecondary} style={styles.descricao}>
        {descricao}
      </AppText>

      {acao ? (
        <Button titulo={acao.titulo} icone={acao.icone} onPress={acao.onPress} style={styles.botao} />
      ) : null}
      {acaoSecundaria ? (
        <Button
          titulo={acaoSecundaria.titulo}
          variante="fantasma"
          onPress={acaoSecundaria.onPress}
        />
      ) : null}
    </View>
  );
}

/** Falha ao carregar os dados, com ação de tentar novamente. */
export function ErrorState({
  titulo,
  descricao,
  onTentarNovamente,
}: {
  titulo: string;
  descricao: string;
  onTentarNovamente: () => void;
}) {
  return (
    <View style={styles.container}>
      <View style={[styles.circulo, { backgroundColor: colors.red50 }]}>
        <Ionicons name="cloud-offline-outline" size={30} color={palette.danger} />
      </View>

      <AppText variant="subtitle" style={styles.titulo}>
        {titulo}
      </AppText>
      <AppText variant="bodySm" color={palette.textSecondary} style={styles.descricao}>
        {descricao}
      </AppText>

      <Button
        titulo="Tentar novamente"
        icone="refresh"
        onPress={onTentarNovamente}
        style={styles.botao}
      />
    </View>
  );
}

/** Bloco cinza que pulsa enquanto os dados carregam. */
function Skeleton({ largura, altura, raio = radius.sm }: { largura: number | `${number}%`; altura: number; raio?: number }) {
  const pulso = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const animacao = Animated.loop(
      Animated.sequence([
        Animated.timing(pulso, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulso, {
          toValue: 0.4,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    animacao.start();
    return () => animacao.stop();
  }, [pulso]);

  return (
    <Animated.View
      style={{
        width: largura,
        height: altura,
        borderRadius: raio,
        backgroundColor: colors.slate200,
        opacity: pulso,
      }}
    />
  );
}

/** Esqueleto da lista de ocorrências, exibido no carregamento inicial. */
export function SkeletonList({ quantidade = 4 }: { quantidade?: number }) {
  return (
    <View style={styles.skeletonLista}>
      {Array.from({ length: quantidade }).map((_, indice) => (
        <View key={indice} style={styles.skeletonCard}>
          <Skeleton largura={56} altura={56} raio={radius.md} />
          <View style={styles.skeletonTextos}>
            <Skeleton largura="70%" altura={14} />
            <Skeleton largura="90%" altura={11} />
            <Skeleton largura="45%" altura={11} />
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.huge,
    gap: spacing.sm,
  },
  circulo: {
    width: 68,
    height: 68,
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
    maxWidth: 300,
  },
  botao: {
    marginTop: spacing.md,
    minWidth: 200,
  },
  skeletonLista: {
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  skeletonCard: {
    flexDirection: "row",
    gap: spacing.md,
    backgroundColor: palette.surface,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: palette.border,
    padding: spacing.lg,
  },
  skeletonTextos: {
    flex: 1,
    gap: spacing.sm,
    justifyContent: "center",
  },
});
