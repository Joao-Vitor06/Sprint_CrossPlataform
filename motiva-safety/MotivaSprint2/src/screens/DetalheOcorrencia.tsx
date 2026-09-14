import { ComponentProps, useCallback, useState } from "react";
import { Linking, Platform, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import {
  AppText,
  Badge,
  Button,
  Card,
  ConfirmSheet,
  EmptyState,
  RiscoBadge,
  ScreenHeader,
  StatusBadge,
  useToast,
} from "../components";
import { useOcorrencias } from "../context/OcorrenciasContext";
import { resolverFoto } from "../data/fotos";
import type { PropsDetalhe } from "../navigation/types";
import {
  RISCO,
  ROTULO_TRANSICAO,
  SENTIDO,
  STATUS,
  TIPO,
  TRANSICOES,
  palette,
  radius,
  spacing,
} from "../theme";
import type { StatusOcorrencia } from "../types";
import { formatarCoordenadas, formatarDataHora, formatarKm } from "../utils/format";

function LinhaInfo({
  icone,
  rotulo,
  valor,
}: {
  icone: ComponentProps<typeof Ionicons>["name"];
  rotulo: string;
  valor: string;
}) {
  return (
    <View style={styles.linhaInfo}>
      <View style={styles.linhaIcone}>
        <Ionicons name={icone} size={16} color={palette.textSecondary} />
      </View>
      <View style={styles.linhaTextos}>
        <AppText variant="overline" color={palette.textMuted}>
          {rotulo}
        </AppText>
        <AppText variant="bodyMedium">{valor}</AppText>
      </View>
    </View>
  );
}

/**
 * Detalhe da ocorrência.
 *
 * Reúne a evidência, os dados de localização, a linha do tempo de tramitação e
 * as ações de mudança de status. Os botões de ação saem de `TRANSICOES`, então
 * só aparece o que é válido a partir do status atual.
 */
export function DetalheOcorrencia({ navigation, route }: PropsDetalhe) {
  const { obter, mudarStatus, salvando } = useOcorrencias();
  const { mostrar } = useToast();
  const insets = useSafeAreaInsets();

  const ocorrencia = obter(route.params.ocorrenciaId);
  const [statusPendente, setStatusPendente] = useState<StatusOcorrencia | null>(null);

  const confirmarMudanca = useCallback(async () => {
    if (!ocorrencia || !statusPendente) return;

    const alvo = statusPendente;
    setStatusPendente(null);

    try {
      await mudarStatus(ocorrencia.id, alvo);
      mostrar({
        tipo: "sucesso",
        titulo: `Ocorrência ${STATUS[alvo].label.toLowerCase()}`,
        descricao: `${ocorrencia.protocolo} foi atualizada e o histórico registrou a mudança.`,
      });
    } catch {
      mostrar({
        tipo: "erro",
        titulo: "Não foi possível atualizar",
        descricao: "O status anterior foi mantido. Verifique a conexão e tente de novo.",
      });
    }
  }, [mostrar, mudarStatus, ocorrencia, statusPendente]);

  const abrirNoMapa = useCallback(async () => {
    if (!ocorrencia?.latitude || !ocorrencia?.longitude) return;

    const { latitude, longitude } = ocorrencia;
    const rotulo = encodeURIComponent(ocorrencia.titulo);
    const url = Platform.select({
      ios: `maps:0,0?q=${rotulo}@${latitude},${longitude}`,
      android: `geo:${latitude},${longitude}?q=${latitude},${longitude}(${rotulo})`,
      default: `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=17/${latitude}/${longitude}`,
    });

    try {
      await Linking.openURL(url);
    } catch {
      mostrar({
        tipo: "erro",
        titulo: "Nenhum app de mapas disponível",
        descricao: `Coordenadas: ${formatarCoordenadas(latitude, longitude)}`,
      });
    }
  }, [mostrar, ocorrencia]);

  // A ocorrência some da memória se a lista for esvaziada com esta tela aberta.
  if (!ocorrencia) {
    return (
      <View style={styles.container}>
        <ScreenHeader titulo="Detalhes" onVoltar={navigation.goBack} />
        <EmptyState
          icone="help-circle-outline"
          titulo="Ocorrência não encontrada"
          descricao="Este registro não está mais disponível no aparelho. Ele pode ter sido removido em outra tela."
          acao={{ titulo: "Voltar para a lista", icone: "arrow-back", onPress: navigation.goBack }}
        />
      </View>
    );
  }

  const risco = RISCO[ocorrencia.risco];
  const tipo = TIPO[ocorrencia.tipo];
  const foto = resolverFoto(ocorrencia.fotoUri);
  const proximosStatus = TRANSICOES[ocorrencia.status];

  return (
    <View style={styles.container}>
      <ScreenHeader
        sobretitulo={ocorrencia.protocolo}
        titulo="Detalhes"
        onVoltar={navigation.goBack}
        acoes={[
          {
            icone: "create-outline",
            rotulo: "Editar ocorrência",
            onPress: () =>
              navigation.navigate("Formulario", { ocorrenciaId: ocorrencia.id }),
          },
        ]}
      />

      <ScrollView
        contentContainerStyle={[styles.conteudo, { paddingBottom: insets.bottom + spacing.xxl }]}
        showsVerticalScrollIndicator={false}
      >
        {foto ? (
          <Image
            source={foto}
            style={styles.foto}
            contentFit="cover"
            transition={250}
            accessibilityLabel={`Evidência da ocorrência ${ocorrencia.protocolo}`}
          />
        ) : (
          <View style={styles.semFoto}>
            <Ionicons name="image-outline" size={28} color={palette.textMuted} />
            <AppText variant="bodySm" color={palette.textSecondary}>
              Nenhuma evidência anexada
            </AppText>
            <AppText variant="caption" color={palette.textMuted} style={styles.semFotoAjuda}>
              Este registro foi feito antes da foto virar obrigatória. Edite a ocorrência para
              anexar uma imagem.
            </AppText>
          </View>
        )}

        <Card>
          <View style={styles.selos}>
            <RiscoBadge risco={ocorrencia.risco} />
            <StatusBadge status={ocorrencia.status} />
            <Badge
              label={tipo.label}
              cor={palette.textSecondary}
              fundo={palette.background}
            />
          </View>

          <AppText variant="displayLg" style={styles.titulo}>
            {ocorrencia.titulo}
          </AppText>

          <AppText variant="body" color={palette.textSecondary}>
            {ocorrencia.descricao}
          </AppText>
        </Card>

        <View style={[styles.faixaRisco, { backgroundColor: risco.fundo }]}>
          <MaterialCommunityIcons name={tipo.icone} size={20} color={risco.cor} />
          <AppText variant="caption" color={risco.cor} style={styles.faixaTexto}>
            {risco.descricao}
          </AppText>
        </View>

        <Card titulo="Localização">
          <LinhaInfo icone="git-branch-outline" rotulo="Rodovia" valor={ocorrencia.rodovia} />
          <View style={styles.divisor} />
          <LinhaInfo
            icone="navigate-outline"
            rotulo="Trecho"
            valor={`${formatarKm(ocorrencia.km)} · ${SENTIDO[ocorrencia.sentido].label}`}
          />
          <View style={styles.divisor} />
          <LinhaInfo icone="pin-outline" rotulo="Referência" valor={ocorrencia.referencia} />

          {ocorrencia.latitude !== undefined && ocorrencia.longitude !== undefined ? (
            <>
              <View style={styles.divisor} />
              <LinhaInfo
                icone="locate-outline"
                rotulo="Coordenadas GPS"
                valor={formatarCoordenadas(ocorrencia.latitude, ocorrencia.longitude)}
              />
              <Button
                titulo="Abrir no mapa"
                variante="secundario"
                icone="map-outline"
                onPress={abrirNoMapa}
                larguraTotal
                style={styles.botaoMapa}
              />
            </>
          ) : (
            <>
              <View style={styles.divisor} />
              <View style={styles.semGps}>
                <Ionicons name="alert-circle-outline" size={16} color={palette.textMuted} />
                <AppText variant="caption" color={palette.textMuted} style={styles.faixaTexto}>
                  Sem coordenadas. A equipe vai localizar o ponto pela referência textual.
                </AppText>
              </View>
            </>
          )}
        </Card>

        <Card titulo="Registro">
          <LinhaInfo icone="person-outline" rotulo="Responsável" valor={ocorrencia.responsavel} />
          <View style={styles.divisor} />
          <LinhaInfo
            icone="calendar-outline"
            rotulo="Registrada em"
            valor={formatarDataHora(ocorrencia.criadaEm)}
          />
          <View style={styles.divisor} />
          <LinhaInfo
            icone="refresh-outline"
            rotulo="Última atualização"
            valor={formatarDataHora(ocorrencia.atualizadaEm)}
          />
        </Card>

        <Card titulo="Linha do tempo">
          {ocorrencia.historico.map((evento, indice) => {
            const config = STATUS[evento.status];
            const ultimo = indice === ocorrencia.historico.length - 1;

            return (
              <View key={evento.id} style={styles.evento}>
                <View style={styles.trilha}>
                  <View style={[styles.marcador, { backgroundColor: config.solido }]} />
                  {!ultimo ? <View style={styles.linhaTrilha} /> : null}
                </View>

                <View style={[styles.eventoTextos, ultimo && styles.eventoUltimo]}>
                  <AppText variant="label" color={config.cor}>
                    {config.label}
                  </AppText>
                  <AppText variant="caption" color={palette.textMuted}>
                    {formatarDataHora(evento.em)} · {evento.por}
                  </AppText>
                  {evento.nota ? (
                    <AppText variant="bodySm" color={palette.textSecondary}>
                      {evento.nota}
                    </AppText>
                  ) : null}
                </View>
              </View>
            );
          })}
        </Card>

        <View style={styles.acoes}>
          <AppText variant="overline" color={palette.textSecondary}>
            Ações
          </AppText>

          {proximosStatus.map((status) => {
            const rotulo = ROTULO_TRANSICAO[status];
            const config = STATUS[status];
            const principal = status === "resolvida";

            return (
              <Pressable
                key={status}
                onPress={() => setStatusPendente(status)}
                disabled={salvando}
                accessibilityRole="button"
                accessibilityLabel={rotulo.titulo}
                style={({ pressed }) => [
                  styles.acao,
                  principal && { backgroundColor: config.solido, borderColor: config.solido },
                  pressed && styles.pressionado,
                  salvando && styles.desabilitado,
                ]}
              >
                <View
                  style={[
                    styles.acaoIcone,
                    { backgroundColor: principal ? "rgba(255,255,255,0.25)" : config.fundo },
                  ]}
                >
                  <Ionicons
                    name={config.icone}
                    size={20}
                    color={principal ? palette.textInverse : config.cor}
                  />
                </View>

                <View style={styles.acaoTextos}>
                  <AppText
                    variant="bodyMedium"
                    color={principal ? palette.textInverse : palette.textPrimary}
                  >
                    {rotulo.titulo}
                  </AppText>
                  <AppText
                    variant="caption"
                    color={principal ? "rgba(255,255,255,0.85)" : palette.textMuted}
                  >
                    {rotulo.ajuda}
                  </AppText>
                </View>

                <Ionicons
                  name="chevron-forward"
                  size={18}
                  color={principal ? palette.textInverse : palette.textMuted}
                />
              </Pressable>
            );
          })}

          <Button
            titulo="Editar informações"
            variante="contorno"
            icone="create-outline"
            onPress={() => navigation.navigate("Formulario", { ocorrenciaId: ocorrencia.id })}
            larguraTotal
          />
        </View>
      </ScrollView>

      <ConfirmSheet
        visivel={statusPendente !== null}
        titulo={statusPendente ? ROTULO_TRANSICAO[statusPendente].titulo : ""}
        descricao={
          statusPendente
            ? `${ocorrencia.protocolo} passa para "${STATUS[statusPendente].label}". A mudança fica registrada na linha do tempo.`
            : ""
        }
        icone={statusPendente ? STATUS[statusPendente].icone : "help-circle-outline"}
        cor={statusPendente ? STATUS[statusPendente].cor : palette.action}
        fundoIcone={statusPendente ? STATUS[statusPendente].fundo : palette.actionSoft}
        rotuloConfirmar="Confirmar"
        varianteConfirmar={statusPendente === "resolvida" ? "sucesso" : "primario"}
        onConfirmar={confirmarMudanca}
        onCancelar={() => setStatusPendente(null)}
        carregando={salvando}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
  },
  conteudo: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  foto: {
    width: "100%",
    height: 240,
    borderRadius: radius.lg,
    backgroundColor: palette.surface,
  },
  semFoto: {
    height: 160,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: palette.borderStrong,
    backgroundColor: palette.surface,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xs,
    paddingHorizontal: spacing.xl,
  },
  semFotoAjuda: {
    textAlign: "center",
  },
  selos: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  titulo: {
    marginBottom: spacing.sm,
  },
  faixaRisco: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    borderRadius: radius.md,
    padding: spacing.lg,
  },
  faixaTexto: {
    flex: 1,
  },
  linhaInfo: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
    paddingVertical: spacing.md,
  },
  linhaIcone: {
    width: 30,
    height: 30,
    borderRadius: radius.sm,
    backgroundColor: palette.background,
    alignItems: "center",
    justifyContent: "center",
  },
  linhaTextos: {
    flex: 1,
    gap: spacing.xxs,
  },
  divisor: {
    height: 1,
    backgroundColor: palette.background,
  },
  botaoMapa: {
    marginTop: spacing.md,
  },
  semGps: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    paddingVertical: spacing.md,
  },
  evento: {
    flexDirection: "row",
    gap: spacing.md,
  },
  trilha: {
    alignItems: "center",
    width: 14,
  },
  marcador: {
    width: 12,
    height: 12,
    borderRadius: radius.pill,
    marginTop: spacing.xs,
  },
  linhaTrilha: {
    flex: 1,
    width: 2,
    backgroundColor: palette.border,
    marginVertical: spacing.xs,
  },
  eventoTextos: {
    flex: 1,
    gap: spacing.xxs,
    paddingBottom: spacing.lg,
  },
  eventoUltimo: {
    paddingBottom: 0,
  },
  acoes: {
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  acao: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: palette.surface,
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  acaoIcone: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  acaoTextos: {
    flex: 1,
    gap: spacing.xxs,
  },
  pressionado: {
    opacity: 0.85,
  },
  desabilitado: {
    opacity: 0.5,
  },
});
