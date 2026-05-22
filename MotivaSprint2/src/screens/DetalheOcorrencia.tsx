import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ocorrencia } from "../types";

// ─── Props ─────────────────────────────────────────────────────────────────

type Props = {
  ocorrencia: Ocorrencia;
  onVoltar: () => void;
};

// ─── Helpers ───────────────────────────────────────────────────────────────

const RISCO_CONFIG = {
  baixo: { label: "Baixo", cor: "#22c55e", fundo: "#dcfce7", emoji: "🟢" },
  medio: { label: "Médio", cor: "#f59e0b", fundo: "#fef3c7", emoji: "🟡" },
  alto: { label: "Alto", cor: "#ef4444", fundo: "#fee2e2", emoji: "🔴" },
};

const STATUS_CONFIG = {
  aberta: { label: "Aberta", cor: "#6366f1", fundo: "#e0e7ff" },
  em_analise: { label: "Em Análise", cor: "#f59e0b", fundo: "#fef3c7" },
  resolvida: { label: "Resolvida", cor: "#22c55e", fundo: "#dcfce7" },
};

function formatarData(data: string): string {
  const [ano, mes, dia] = data.split("-");
  return `${dia}/${mes}/${ano}`;
}

// ─── Sub-componente: Linha de Info ─────────────────────────────────────────

function LinhaInfo({ icone, rotulo, valor }: { icone: string; rotulo: string; valor: string }) {
  return (
    <View style={detalheStyles.linhaInfo}>
      <Text style={detalheStyles.linhaIcone}>{icone}</Text>
      <View style={detalheStyles.linhaTextos}>
        <Text style={detalheStyles.linhaRotulo}>{rotulo}</Text>
        <Text style={detalheStyles.linhaValor}>{valor}</Text>
      </View>
    </View>
  );
}

// ─── Tela ──────────────────────────────────────────────────────────────────

export default function DetalheOcorrencia({ ocorrencia, onVoltar }: Props) {
  const risco = RISCO_CONFIG[ocorrencia.risco];
  const status = STATUS_CONFIG[ocorrencia.status];

  return (
    <SafeAreaView style={detalheStyles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />

      {/* Header */}
      <View style={detalheStyles.header}>
        <TouchableOpacity onPress={onVoltar} style={detalheStyles.botaoVoltar}>
          <Text style={detalheStyles.botaoVoltarTexto}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={detalheStyles.headerTitulo}>Detalhes</Text>
        <View style={{ width: 70 }} />
      </View>

      <ScrollView
        contentContainerStyle={detalheStyles.conteudo}
        showsVerticalScrollIndicator={false}
      >
        {/* Card principal */}
        <View style={detalheStyles.cardPrincipal}>
          {/* Badges de Risco e Status */}
          <View style={detalheStyles.badgesRow}>
            <View style={[detalheStyles.badge, { backgroundColor: risco.fundo }]}>
              <Text style={[detalheStyles.badgeTexto, { color: risco.cor }]}>
                {risco.emoji} Risco {risco.label}
              </Text>
            </View>
            <View style={[detalheStyles.badge, { backgroundColor: status.fundo }]}>
              <Text style={[detalheStyles.badgeTexto, { color: status.cor }]}>
                {status.label}
              </Text>
            </View>
          </View>

          {/* Título */}
          <Text style={detalheStyles.titulo}>{ocorrencia.titulo}</Text>

          {/* Descrição */}
          <View style={detalheStyles.secao}>
            <Text style={detalheStyles.secaoRotulo}>DESCRIÇÃO</Text>
            <Text style={detalheStyles.descricao}>{ocorrencia.descricao}</Text>
          </View>
        </View>

        {/* Card de informações */}
        <View style={detalheStyles.cardInfo}>
          <Text style={detalheStyles.cardInfoTitulo}>Informações</Text>

          <LinhaInfo
            icone="📍"
            rotulo="Local"
            valor={ocorrencia.local}
          />
          <View style={detalheStyles.divisor} />
          <LinhaInfo
            icone="👤"
            rotulo="Responsável"
            valor={ocorrencia.responsavel}
          />
          <View style={detalheStyles.divisor} />
          <LinhaInfo
            icone="📅"
            rotulo="Data do Registro"
            valor={formatarData(ocorrencia.data)}
          />
          <View style={detalheStyles.divisor} />
          <LinhaInfo
            icone="🆔"
            rotulo="ID da Ocorrência"
            valor={`#${String(ocorrencia.id).padStart(4, "0")}`}
          />
        </View>

        {/* Indicador visual de risco */}
        <View style={[detalheStyles.bannerRisco, { backgroundColor: risco.fundo, borderColor: risco.cor }]}>
          <Text style={[detalheStyles.bannerRiscoTexto, { color: risco.cor }]}>
            {risco.emoji} Este registro está classificado como risco {risco.label}.
            {ocorrencia.risco === "alto"
              ? " A equipe de segurança foi notificada."
              : ocorrencia.risco === "medio"
              ? " Acompanhamento recomendado."
              : " Situação sob controle."}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ─── Estilos ───────────────────────────────────────────────────────────────

const detalheStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    backgroundColor: "#0f172a",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },
  botaoVoltar: {
    padding: 4,
    width: 70,
  },
  botaoVoltarTexto: {
    color: "#94a3b8",
    fontSize: 14,
    fontWeight: "600",
  },
  headerTitulo: {
    fontSize: 18,
    fontWeight: "800",
    color: "#ffffff",
  },
  conteudo: {
    padding: 16,
    gap: 14,
    paddingBottom: 40,
  },
  cardPrincipal: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 18,
    gap: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  badgesRow: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  badgeTexto: {
    fontSize: 12,
    fontWeight: "700",
  },
  titulo: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1e293b",
    lineHeight: 26,
  },
  secao: {
    gap: 6,
  },
  secaoRotulo: {
    fontSize: 11,
    fontWeight: "700",
    color: "#94a3b8",
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  descricao: {
    fontSize: 15,
    color: "#374151",
    lineHeight: 22,
  },
  cardInfo: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 18,
    gap: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  cardInfoTitulo: {
    fontSize: 13,
    fontWeight: "700",
    color: "#94a3b8",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 14,
  },
  linhaInfo: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    paddingVertical: 10,
  },
  linhaIcone: {
    fontSize: 18,
    marginTop: 1,
  },
  linhaTextos: {
    flex: 1,
    gap: 2,
  },
  linhaRotulo: {
    fontSize: 11,
    color: "#94a3b8",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  linhaValor: {
    fontSize: 15,
    color: "#1e293b",
    fontWeight: "500",
  },
  divisor: {
    height: 1,
    backgroundColor: "#f1f5f9",
  },
  bannerRisco: {
    borderRadius: 12,
    padding: 14,
    borderLeftWidth: 4,
  },
  bannerRiscoTexto: {
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "500",
  },
});
