import { Pressable, StyleSheet, View } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";

import { resolverFoto } from "../data/fotos";
import { palette, radius, spacing } from "../theme";
import { AppText } from "./AppText";
import { Button } from "./Button";

type Props = {
  fotoUri?: string;
  erro?: string;
  onTirarFoto: () => void;
  onEscolherDaGaleria: () => void;
  onRemover: () => void;
  ocupado?: boolean;
};

/**
 * Bloco de evidência fotográfica do formulário.
 *
 * A foto é obrigatória porque é ela que permite ao supervisor avaliar a
 * gravidade sem ir até o trecho. Sem foto, o registro é só uma descrição.
 */
export function SeletorFoto({
  fotoUri,
  erro,
  onTirarFoto,
  onEscolherDaGaleria,
  onRemover,
  ocupado = false,
}: Props) {
  const foto = resolverFoto(fotoUri);

  if (foto) {
    return (
      <View style={styles.preenchido}>
        <Image
          source={foto}
          style={styles.previa}
          contentFit="cover"
          transition={200}
          accessibilityLabel="Foto da ocorrência"
        />

        <View style={styles.acoes}>
          <Button
            titulo="Trocar foto"
            variante="secundario"
            icone="camera-outline"
            onPress={onTirarFoto}
            desabilitado={ocupado}
            style={styles.acao}
          />
          <Pressable
            onPress={onRemover}
            accessibilityRole="button"
            accessibilityLabel="Remover foto"
            style={({ pressed }) => [styles.remover, pressed && styles.pressionado]}
          >
            <Ionicons name="trash-outline" size={18} color={palette.danger} />
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.vazio, Boolean(erro) && styles.vazioErro]}>
      <View style={styles.icone}>
        <Ionicons name="camera-outline" size={26} color={palette.action} />
      </View>

      <AppText variant="subtitle">Anexe a evidência</AppText>
      <AppText variant="caption" color={palette.textSecondary} style={styles.ajuda}>
        Enquadre o problema e o trecho da pista na mesma foto
      </AppText>

      <View style={styles.botoes}>
        <Button
          titulo="Tirar foto"
          icone="camera"
          onPress={onTirarFoto}
          carregando={ocupado}
          style={styles.botao}
        />
        <Button
          titulo="Galeria"
          variante="contorno"
          icone="images-outline"
          onPress={onEscolherDaGaleria}
          desabilitado={ocupado}
          style={styles.botao}
        />
      </View>

      {erro ? (
        <View style={styles.linhaErro}>
          <Ionicons name="alert-circle" size={14} color={palette.danger} />
          <AppText variant="caption" color={palette.danger}>
            {erro}
          </AppText>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  vazio: {
    alignItems: "center",
    gap: spacing.xs,
    padding: spacing.xl,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: palette.borderStrong,
    backgroundColor: palette.surface,
  },
  vazioErro: {
    borderColor: palette.danger,
    backgroundColor: palette.dangerSoft,
  },
  icone: {
    width: 52,
    height: 52,
    borderRadius: radius.pill,
    backgroundColor: palette.actionSoft,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.xs,
  },
  ajuda: {
    textAlign: "center",
  },
  botoes: {
    flexDirection: "row",
    gap: spacing.sm,
    alignSelf: "stretch",
    marginTop: spacing.md,
  },
  botao: {
    flex: 1,
  },
  linhaErro: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
    marginTop: spacing.sm,
  },
  preenchido: {
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: palette.border,
    backgroundColor: palette.surface,
    overflow: "hidden",
  },
  previa: {
    width: "100%",
    height: 220,
    backgroundColor: palette.background,
  },
  acoes: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    padding: spacing.md,
  },
  acao: {
    flex: 1,
  },
  remover: {
    width: 46,
    height: 46,
    borderRadius: radius.md,
    backgroundColor: palette.dangerSoft,
    alignItems: "center",
    justifyContent: "center",
  },
  pressionado: {
    opacity: 0.7,
  },
});
