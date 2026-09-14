import { useCallback, useMemo, useState } from "react";
import { FlatList, Pressable, RefreshControl, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import {
  AppText,
  EmptyState,
  ErrorState,
  FilterChips,
  OcorrenciaCard,
  OptionSheet,
  PainelDemonstracao,
  ScreenHeader,
  SearchBar,
  SkeletonList,
  StatCard,
  useToast,
  type Chip,
} from "../components";
import { useOcorrencias } from "../context/OcorrenciasContext";
import type { PropsLista } from "../navigation/types";
import { ORDENACAO, RISCO, STATUS, palette, radius, shadows, spacing } from "../theme";
import type { FiltroRisco, FiltroStatus, Ocorrencia, Ordenacao } from "../types";
import { normalizar } from "../utils/format";

const CHIPS_RISCO: Chip<FiltroRisco>[] = [
  { valor: "todos", label: "Todos os riscos" },
  { valor: "alto", label: RISCO.alto.label, cor: RISCO.alto.solido },
  { valor: "medio", label: RISCO.medio.label, cor: RISCO.medio.solido },
  { valor: "baixo", label: RISCO.baixo.label, cor: RISCO.baixo.solido },
];

const CHIPS_STATUS: Chip<FiltroStatus>[] = [
  { valor: "todos", label: "Todos os status" },
  { valor: "aberta", label: STATUS.aberta.label, cor: STATUS.aberta.solido },
  { valor: "em_analise", label: STATUS.em_analise.label, cor: STATUS.em_analise.solido },
  { valor: "resolvida", label: STATUS.resolvida.label, cor: STATUS.resolvida.solido },
];

const OPCOES_ORDENACAO = (Object.keys(ORDENACAO) as Ordenacao[]).map((valor) => ({
  valor,
  label: ORDENACAO[valor].label,
  icone: ORDENACAO[valor].icone,
}));

/**
 * Tela inicial: painel de indicadores, busca, filtros e a lista de ocorrências.
 *
 * É a visão do supervisor, que precisa achar rápido o que é urgente. Os cards
 * do topo são atalhos: tocar em "Alto risco" já aplica o filtro correspondente.
 */
export function ListaOcorrencias({ navigation }: PropsLista) {
  const {
    ocorrencias,
    estado,
    salvando,
    simulandoFalha,
    recarregar,
    alternarSimulacaoDeFalha,
    limparTudo,
    restaurarExemplos,
  } = useOcorrencias();
  const { mostrar } = useToast();
  const insets = useSafeAreaInsets();

  const [busca, setBusca] = useState("");
  const [filtroRisco, setFiltroRisco] = useState<FiltroRisco>("todos");
  const [filtroStatus, setFiltroStatus] = useState<FiltroStatus>("todos");
  const [ordenacao, setOrdenacao] = useState<Ordenacao>("recentes");

  const [painelOrdenacao, setPainelOrdenacao] = useState(false);
  const [painelDemo, setPainelDemo] = useState(false);
  const [atualizando, setAtualizando] = useState(false);

  const indicadores = useMemo(
    () => ({
      alto: ocorrencias.filter((o) => o.risco === "alto").length,
      abertas: ocorrencias.filter((o) => o.status !== "resolvida").length,
      resolvidas: ocorrencias.filter((o) => o.status === "resolvida").length,
    }),
    [ocorrencias]
  );

  const visiveis = useMemo(() => {
    const termo = normalizar(busca);

    const filtradas = ocorrencias.filter((ocorrencia) => {
      if (filtroRisco !== "todos" && ocorrencia.risco !== filtroRisco) return false;
      if (filtroStatus !== "todos" && ocorrencia.status !== filtroStatus) return false;
      if (termo === "") return true;

      const alvo = normalizar(
        [
          ocorrencia.titulo,
          ocorrencia.descricao,
          ocorrencia.rodovia,
          ocorrencia.referencia,
          ocorrencia.responsavel,
          ocorrencia.protocolo,
        ].join(" ")
      );
      return alvo.includes(termo);
    });

    const ordenar: Record<Ordenacao, (a: Ocorrencia, b: Ocorrencia) => number> = {
      recentes: (a, b) => b.criadaEm.localeCompare(a.criadaEm),
      antigas: (a, b) => a.criadaEm.localeCompare(b.criadaEm),
      risco: (a, b) =>
        RISCO[b.risco].ordem - RISCO[a.risco].ordem || b.criadaEm.localeCompare(a.criadaEm),
      km: (a, b) => a.km - b.km,
    };

    return [...filtradas].sort(ordenar[ordenacao]);
  }, [ocorrencias, busca, filtroRisco, filtroStatus, ordenacao]);

  const temFiltroAtivo =
    busca.trim() !== "" || filtroRisco !== "todos" || filtroStatus !== "todos";

  const limparFiltros = useCallback(() => {
    setBusca("");
    setFiltroRisco("todos");
    setFiltroStatus("todos");
  }, []);

  const aoPuxar = useCallback(async () => {
    setAtualizando(true);
    await recarregar();
    setAtualizando(false);
  }, [recarregar]);

  const abrirDetalhe = useCallback(
    (ocorrencia: Ocorrencia) =>
      navigation.navigate("Detalhe", { ocorrenciaId: ocorrencia.id }),
    [navigation]
  );

  const conteudo = () => {
    if (estado === "carregando" && ocorrencias.length === 0) {
      return <SkeletonList />;
    }

    if (estado === "erro") {
      return (
        <ErrorState
          titulo="Não foi possível carregar"
          descricao="Verifique sua conexão e tente de novo. As ocorrências já salvas no aparelho continuam guardadas."
          onTentarNovamente={() => void recarregar()}
        />
      );
    }

    if (ocorrencias.length === 0) {
      return (
        <EmptyState
          icone="documents-outline"
          titulo="Nenhuma ocorrência registrada"
          descricao="Assim que o primeiro problema for encontrado em campo, registre aqui para a equipe priorizar o atendimento."
          acao={{
            titulo: "Registrar ocorrência",
            icone: "add",
            onPress: () => navigation.navigate("Formulario"),
          }}
          acaoSecundaria={{
            titulo: "Restaurar exemplos",
            onPress: () => void restaurarExemplos(),
          }}
        />
      );
    }

    if (visiveis.length === 0) {
      return (
        <EmptyState
          icone="search-outline"
          titulo="Nenhum resultado"
          descricao={
            busca.trim() !== ""
              ? `Nada encontrado para "${busca.trim()}". Tente outro termo ou revise os filtros.`
              : "Nenhuma ocorrência combina com os filtros selecionados."
          }
          acao={{ titulo: "Limpar filtros", icone: "close", onPress: limparFiltros }}
        />
      );
    }

    return null;
  };

  const vazio = conteudo();

  return (
    <View style={styles.container}>
      <ScreenHeader
        sobretitulo="Motiva Safety"
        titulo="Ocorrências"
        acoes={[
          {
            icone: "swap-vertical-outline",
            rotulo: "Ordenar lista",
            onPress: () => setPainelOrdenacao(true),
          },
          {
            icone: "flask-outline",
            rotulo: "Modo demonstração",
            onPress: () => setPainelDemo(true),
          },
        ]}
      >
        <SearchBar
          valor={busca}
          onChange={setBusca}
          placeholder="Buscar por rodovia, trecho ou protocolo"
        />
      </ScreenHeader>

      {simulandoFalha ? (
        <View style={styles.avisoDemo}>
          <Ionicons name="flask" size={14} color={palette.danger} />
          <AppText variant="caption" color={palette.danger} style={styles.avisoTexto}>
            Modo demonstração: falha de conexão simulada
          </AppText>
        </View>
      ) : null}

      <FlatList
        data={vazio ? [] : visiveis}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OcorrenciaCard ocorrencia={item} onPress={abrirDetalhe} />}
        contentContainerStyle={[
          styles.lista,
          { paddingBottom: insets.bottom + 96 },
        ]}
        ItemSeparatorComponent={() => <View style={styles.separador} />}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl
            refreshing={atualizando}
            onRefresh={aoPuxar}
            tintColor={palette.action}
            colors={[palette.action]}
          />
        }
        ListHeaderComponent={
          // Sem nenhuma ocorrência, indicadores zerados e filtros só poluem o
          // estado vazio. Com a base cheia o painel fica, mesmo que o filtro
          // não retorne nada, porque é por ele que o usuário ajusta a busca.
          estado === "erro" || ocorrencias.length === 0 ? null : (
          <View style={styles.painel}>
            <View style={styles.indicadores}>
              <StatCard
                valor={indicadores.alto}
                label="Alto risco"
                cor={RISCO.alto.cor}
                fundo={RISCO.alto.fundo}
                icone="flame"
                ativo={filtroRisco === "alto"}
                onPress={() =>
                  setFiltroRisco((atual) => (atual === "alto" ? "todos" : "alto"))
                }
              />
              <StatCard
                valor={indicadores.abertas}
                label="Em andamento"
                cor={STATUS.aberta.cor}
                fundo={STATUS.aberta.fundo}
                icone="hourglass"
                ativo={filtroStatus === "aberta"}
                onPress={() =>
                  setFiltroStatus((atual) => (atual === "aberta" ? "todos" : "aberta"))
                }
              />
              <StatCard
                valor={indicadores.resolvidas}
                label="Resolvidas"
                cor={STATUS.resolvida.cor}
                fundo={STATUS.resolvida.fundo}
                icone="checkmark-done"
                ativo={filtroStatus === "resolvida"}
                onPress={() =>
                  setFiltroStatus((atual) => (atual === "resolvida" ? "todos" : "resolvida"))
                }
              />
            </View>

            <FilterChips
              opcoes={CHIPS_RISCO}
              selecionado={filtroRisco}
              onSelecionar={setFiltroRisco}
              rolavel
            />
            <FilterChips
              opcoes={CHIPS_STATUS}
              selecionado={filtroStatus}
              onSelecionar={setFiltroStatus}
              rolavel
            />

            {estado === "pronto" && ocorrencias.length > 0 ? (
              <View style={styles.resumoLinha}>
                <AppText variant="caption" color={palette.textSecondary}>
                  {visiveis.length} de {ocorrencias.length}{" "}
                  {ocorrencias.length === 1 ? "ocorrência" : "ocorrências"} ·{" "}
                  {ORDENACAO[ordenacao].label.toLowerCase()}
                </AppText>

                {temFiltroAtivo ? (
                  <Pressable
                    onPress={limparFiltros}
                    accessibilityRole="button"
                    accessibilityLabel="Limpar filtros"
                  >
                    <AppText variant="caption" color={palette.action}>
                      Limpar filtros
                    </AppText>
                  </Pressable>
                ) : null}
              </View>
            ) : null}
          </View>
          )
        }
        ListEmptyComponent={vazio}
      />

      <Pressable
        onPress={() => navigation.navigate("Formulario")}
        accessibilityRole="button"
        accessibilityLabel="Registrar nova ocorrência"
        style={({ pressed }) => [
          styles.fab,
          { bottom: insets.bottom + spacing.xl },
          pressed && styles.fabPressionado,
        ]}
      >
        <Ionicons name="add" size={22} color={palette.textInverse} />
        <AppText variant="label" color={palette.textInverse}>
          Nova ocorrência
        </AppText>
      </Pressable>

      <OptionSheet
        visivel={painelOrdenacao}
        titulo="Ordenar por"
        opcoes={OPCOES_ORDENACAO}
        selecionado={ordenacao}
        onSelecionar={setOrdenacao}
        onFechar={() => setPainelOrdenacao(false)}
      />

      <PainelDemonstracao
        visivel={painelDemo}
        onFechar={() => setPainelDemo(false)}
        simulandoFalha={simulandoFalha}
        onAlternarFalha={async (ativo) => {
          alternarSimulacaoDeFalha(ativo);
          mostrar({
            tipo: ativo ? "info" : "sucesso",
            titulo: ativo ? "Falha de conexão simulada" : "Simulação desligada",
            descricao: ativo
              ? "Carregar e salvar passam a falhar até você desligar."
              : "O app voltou a carregar e salvar normalmente.",
          });
          // Recarrega na hora para o resultado da simulação aparecer na tela,
          // sem depender do puxar para atualizar.
          await recarregar();
        }}
        ocupado={salvando}
        onLimparTudo={async () => {
          setPainelDemo(false);
          limparFiltros();
          await limparTudo();
          mostrar({
            tipo: "info",
            titulo: "Lista esvaziada",
            descricao: "Use o painel de demonstração para restaurar os exemplos.",
          });
        }}
        onRestaurar={async () => {
          setPainelDemo(false);
          limparFiltros();
          await restaurarExemplos();
          mostrar({
            tipo: "sucesso",
            titulo: "Exemplos restaurados",
            descricao: "As 14 ocorrências de demonstração voltaram para a lista.",
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
  },
  avisoDemo: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: palette.dangerSoft,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  avisoTexto: {
    flex: 1,
  },
  lista: {
    paddingHorizontal: spacing.lg,
  },
  painel: {
    gap: spacing.md,
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
  },
  indicadores: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  resumoLinha: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
    paddingTop: spacing.xs,
  },
  separador: {
    height: spacing.md,
  },
  fab: {
    position: "absolute",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    backgroundColor: palette.action,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.pill,
    ...shadows.lg,
  },
  fabPressionado: {
    opacity: 0.9,
    transform: [{ scale: 0.97 }],
  },
});
