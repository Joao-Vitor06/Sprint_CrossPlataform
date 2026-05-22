import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from "react-native";
import { Ocorrencia, NivelRisco } from "../types";
import OcorrenciaCard from "../components/OcorrenciaCard";

// ─── Props ─────────────────────────────────────────────────────────────────

type Props = {
  ocorrencias: Ocorrencia[];
  onVerDetalhe: (ocorrencia: Ocorrencia) => void;
  onNovaCorrencia: () => void;
};

// ─── Filtro de Risco ───────────────────────────────────────────────────────

const FILTROS: Array<{ label: string; valor: NivelRisco | "todos" }> = [
  { label: "Todos", valor: "todos" },
  { label: "Alto", valor: "alto" },
  { label: "Médio", valor: "medio" },
  { label: "Baixo", valor: "baixo" },
];

// ─── Tela ──────────────────────────────────────────────────────────────────

export default function ListaOcorrencias({
  ocorrencias,
  onVerDetalhe,
  onNovaCorrencia,
}: Props) {
  const [filtroAtivo, setFiltroAtivo] = React.useState<NivelRisco | "todos">(
    "todos"
  );

  const ocorrenciasFiltradas =
    filtroAtivo === "todos"
      ? ocorrencias
      : ocorrencias.filter((o) => o.risco === filtroAtivo);

  const totalAlto = ocorrencias.filter((o) => o.risco === "alto").length;
  const totalAberta = ocorrencias.filter((o) => o.status === "aberta").length;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerSub}>Motiva Safety</Text>
          <Text style={styles.headerTitulo}>Ocorrências</Text>
        </View>
        <TouchableOpacity style={styles.botaoNova} onPress={onNovaCorrencia}>
          <Text style={styles.botaoNovaTexto}>+ Nova</Text>
        </TouchableOpacity>
      </View>

      {/* Cards de Resumo */}
      <View style={styles.resumoRow}>
        <View style={[styles.resumoCard, { backgroundColor: "#fee2e2" }]}>
          <Text style={[styles.resumoNumero, { color: "#ef4444" }]}>
            {totalAlto}
          </Text>
          <Text style={[styles.resumoLabel, { color: "#ef4444" }]}>
            Alto Risco
          </Text>
        </View>
        <View style={[styles.resumoCard, { backgroundColor: "#e0e7ff" }]}>
          <Text style={[styles.resumoNumero, { color: "#6366f1" }]}>
            {totalAberta}
          </Text>
          <Text style={[styles.resumoLabel, { color: "#6366f1" }]}>
            Em Aberto
          </Text>
        </View>
        <View style={[styles.resumoCard, { backgroundColor: "#f1f5f9" }]}>
          <Text style={[styles.resumoNumero, { color: "#475569" }]}>
            {ocorrencias.length}
          </Text>
          <Text style={[styles.resumoLabel, { color: "#475569" }]}>Total</Text>
        </View>
      </View>

      {/* Filtros */}
      <View style={styles.filtrosRow}>
        {FILTROS.map((f) => (
          <TouchableOpacity
            key={f.valor}
            style={[
              styles.filtroBotao,
              filtroAtivo === f.valor && styles.filtroBotaoAtivo,
            ]}
            onPress={() => setFiltroAtivo(f.valor)}
          >
            <Text
              style={[
                styles.filtroTexto,
                filtroAtivo === f.valor && styles.filtroTextoAtivo,
              ]}
            >
              {f.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Lista */}
      <FlatList
        data={ocorrenciasFiltradas}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <OcorrenciaCard ocorrencia={item} onPress={onVerDetalhe} />
        )}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.vazio}>
            <Text style={styles.vazioIcone}>🔍</Text>
            <Text style={styles.vazioTexto}>
              Nenhuma ocorrência encontrada para este filtro.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

// ─── Estilos ───────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    backgroundColor: "#0f172a",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  headerSub: {
    fontSize: 12,
    color: "#94a3b8",
    fontWeight: "600",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  headerTitulo: {
    fontSize: 24,
    fontWeight: "800",
    color: "#ffffff",
    marginTop: 2,
  },
  botaoNova: {
    backgroundColor: "#6366f1",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
  },
  botaoNovaTexto: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 14,
  },
  resumoRow: {
    flexDirection: "row",
    gap: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  resumoCard: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  resumoNumero: {
    fontSize: 22,
    fontWeight: "800",
  },
  resumoLabel: {
    fontSize: 11,
    fontWeight: "600",
    marginTop: 2,
  },
  filtrosRow: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  filtroBotao: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#e2e8f0",
  },
  filtroBotaoAtivo: {
    backgroundColor: "#0f172a",
  },
  filtroTexto: {
    fontSize: 13,
    color: "#64748b",
    fontWeight: "600",
  },
  filtroTextoAtivo: {
    color: "#ffffff",
  },
  lista: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  vazio: {
    alignItems: "center",
    marginTop: 60,
    gap: 10,
  },
  vazioIcone: {
    fontSize: 40,
  },
  vazioTexto: {
    fontSize: 14,
    color: "#94a3b8",
    textAlign: "center",
  },
});
