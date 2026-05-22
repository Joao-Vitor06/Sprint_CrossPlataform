import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ocorrencia } from "../types";

// ─── Props ─────────────────────────────────────────────────────────────────

type Props = {
  ocorrencia: Ocorrencia;
  onPress: (ocorrencia: Ocorrencia) => void;
};

// ─── Helpers ───────────────────────────────────────────────────────────────

const RISCO_CONFIG = {
  baixo: { label: "Baixo", cor: "#22c55e", fundo: "#dcfce7" },
  medio: { label: "Médio", cor: "#f59e0b", fundo: "#fef3c7" },
  alto: { label: "Alto", cor: "#ef4444", fundo: "#fee2e2" },
};

const STATUS_CONFIG = {
  aberta: { label: "Aberta", cor: "#6366f1" },
  em_analise: { label: "Em Análise", cor: "#f59e0b" },
  resolvida: { label: "Resolvida", cor: "#22c55e" },
};

function formatarData(data: string): string {
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}

// ─── Componente ────────────────────────────────────────────────────────────

export default function OcorrenciaCard({ ocorrencia, onPress }: Props) {
  const risco = RISCO_CONFIG[ocorrencia.risco];
  const status = STATUS_CONFIG[ocorrencia.status];

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(ocorrencia)}
      activeOpacity={0.85}
    >
      {/* Barra lateral colorida por risco */}
      <View style={[styles.barra, { backgroundColor: risco.cor }]} />

      <View style={styles.conteudo}>
        {/* Cabeçalho */}
        <View style={styles.cabecalho}>
          <Text style={styles.titulo} numberOfLines={1}>
            {ocorrencia.titulo}
          </Text>
          <View style={[styles.badgeRisco, { backgroundColor: risco.fundo }]}>
            <Text style={[styles.badgeRiscoTexto, { color: risco.cor }]}>
              {risco.label}
            </Text>
          </View>
        </View>

        {/* Descrição resumida */}
        <Text style={styles.descricao} numberOfLines={2}>
          {ocorrencia.descricao}
        </Text>

        {/* Rodapé */}
        <View style={styles.rodape}>
          <View style={styles.rodapeEsquerda}>
            <Text style={styles.icone}>📍</Text>
            <Text style={styles.local} numberOfLines={1}>
              {ocorrencia.local}
            </Text>
          </View>
          <View style={styles.rodapeDireita}>
            <Text style={[styles.statusTexto, { color: status.cor }]}>
              ● {status.label}
            </Text>
            <Text style={styles.data}>{formatarData(ocorrencia.data)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

// ─── Estilos ───────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    overflow: "hidden",
  },
  barra: {
    width: 5,
    borderRadius: 0,
  },
  conteudo: {
    flex: 1,
    padding: 14,
    gap: 6,
  },
  cabecalho: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  titulo: {
    flex: 1,
    fontSize: 15,
    fontWeight: "700",
    color: "#1e293b",
  },
  badgeRisco: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
  },
  badgeRiscoTexto: {
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  descricao: {
    fontSize: 13,
    color: "#64748b",
    lineHeight: 18,
  },
  rodape: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 4,
  },
  rodapeEsquerda: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    flex: 1,
  },
  icone: {
    fontSize: 11,
  },
  local: {
    fontSize: 11,
    color: "#94a3b8",
    flex: 1,
  },
  rodapeDireita: {
    alignItems: "flex-end",
    gap: 2,
  },
  statusTexto: {
    fontSize: 11,
    fontWeight: "600",
  },
  data: {
    fontSize: 11,
    color: "#94a3b8",
  },
});
