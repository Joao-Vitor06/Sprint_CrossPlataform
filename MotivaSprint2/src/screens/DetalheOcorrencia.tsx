import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Image,
} from "react-native";

import { Ocorrencia } from "../types";

// ============================================================
// PROPS
// ============================================================

type Props = {
  ocorrencia: Ocorrencia;

  onVoltar: () => void;

  onDarBaixa: (
    ocorrencia: Ocorrencia
  ) => void;

  onReabrir: (
    ocorrencia: Ocorrencia
  ) => void;
};

// ============================================================
// CONFIGURAÇÃO DE RISCO
// ============================================================

const RISCO_CONFIG = {
  baixo: {
    label: "Baixo",
    cor: "#22c55e",
    fundo: "#dcfce7",
    emoji: "🟢",
  },

  medio: {
    label: "Médio",
    cor: "#f59e0b",
    fundo: "#fef3c7",
    emoji: "🟡",
  },

  alto: {
    label: "Alto",
    cor: "#ef4444",
    fundo: "#fee2e2",
    emoji: "🔴",
  },
};

// ============================================================
// CONFIGURAÇÃO DE STATUS
// ============================================================

const STATUS_CONFIG = {
  aberta: {
    label: "Aberta",
    cor: "#6366f1",
    fundo: "#e0e7ff",
  },

  em_analise: {
    label: "Em Análise",
    cor: "#f59e0b",
    fundo: "#fef3c7",
  },

  resolvida: {
    label: "Concluída",
    cor: "#22c55e",
    fundo: "#dcfce7",
  },
};

// ============================================================
// FORMATAR DATA
// ============================================================

function formatarData(data: string): string {
  // Ocorrências novas possuem data e hora
  if (data.includes("T")) {
    const dataObj = new Date(data);

    if (!Number.isNaN(dataObj.getTime())) {
      return dataObj.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  }

  // Compatibilidade com os mocks antigos
  const partes = data.split("-");

  if (partes.length === 3) {
    const [ano, mes, dia] = partes;

    return `${dia}/${mes}/${ano}`;
  }

  return data;
}

// ============================================================
// LINHA DE INFORMAÇÃO
// ============================================================

function LinhaInfo({
  icone,
  rotulo,
  valor,
}: {
  icone: string;
  rotulo: string;
  valor: string;
}) {
  return (
    <View style={styles.linhaInfo}>
      <Text style={styles.linhaIcone}>
        {icone}
      </Text>

      <View style={styles.linhaTextos}>
        <Text style={styles.linhaRotulo}>
          {rotulo}
        </Text>

        <Text style={styles.linhaValor}>
          {valor}
        </Text>
      </View>
    </View>
  );
}

// ============================================================
// TELA DE DETALHES
// ============================================================

export default function DetalheOcorrencia({
  ocorrencia,
  onVoltar,
  onDarBaixa,
  onReabrir,
}: Props) {
  const risco = RISCO_CONFIG[ocorrencia.risco];

  const status =
    STATUS_CONFIG[ocorrencia.status];

  const concluida =
    ocorrencia.status === "resolvida";

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0f172a"
      />

      {/* ======================================================
          HEADER
      ====================================================== */}

      <View style={styles.header}>
        <TouchableOpacity
          onPress={onVoltar}
          style={styles.botaoVoltar}
          activeOpacity={0.7}
        >
          <Text style={styles.botaoVoltarTexto}>
            ← Voltar
          </Text>
        </TouchableOpacity>

        <Text style={styles.headerTitulo}>
          Detalhes
        </Text>

        <View style={{ width: 70 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.conteudo}
        showsVerticalScrollIndicator={false}
      >
        {/* ====================================================
            CARD PRINCIPAL
        ==================================================== */}

        <View style={styles.cardPrincipal}>
          {/* RISCO + STATUS */}

          <View style={styles.badgesRow}>
            <View
              style={[
                styles.badge,
                {
                  backgroundColor: risco.fundo,
                },
              ]}
            >
              <Text
                style={[
                  styles.badgeTexto,
                  {
                    color: risco.cor,
                  },
                ]}
              >
                {risco.emoji} Risco {risco.label}
              </Text>
            </View>

            <View
              style={[
                styles.badge,
                {
                  backgroundColor: status.fundo,
                },
              ]}
            >
              <Text
                style={[
                  styles.badgeTexto,
                  {
                    color: status.cor,
                  },
                ]}
              >
                {status.label}
              </Text>
            </View>
          </View>

          {/* TÍTULO */}

          <Text style={styles.titulo}>
            {ocorrencia.titulo}
          </Text>

          {/* DESCRIÇÃO */}

          <View style={styles.secao}>
            <Text style={styles.secaoRotulo}>
              DESCRIÇÃO
            </Text>

            <Text style={styles.descricao}>
              {ocorrencia.descricao}
            </Text>
          </View>
        </View>

        {/* ====================================================
            FOTO
        ==================================================== */}

        <View style={styles.cardInfo}>
          <Text style={styles.cardInfoTitulo}>
            Evidência fotográfica
          </Text>

          {ocorrencia.fotoUri ? (
            <Image
              source={{
                uri: ocorrencia.fotoUri,
              }}
              style={styles.foto}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.semFoto}>
              <Text style={styles.semFotoIcone}>
                📷
              </Text>

              <Text style={styles.semFotoTexto}>
                Nenhuma foto anexada.
              </Text>
            </View>
          )}
        </View>

        {/* ====================================================
            INFORMAÇÕES
        ==================================================== */}

        <View style={styles.cardInfo}>
          <Text style={styles.cardInfoTitulo}>
            Informações
          </Text>

          {/* LOCAL */}

          <LinhaInfo
            icone="📍"
            rotulo="Local"
            valor={ocorrencia.local}
          />

          <View style={styles.divisor} />

          {/* RESPONSÁVEL */}

          <LinhaInfo
            icone="👤"
            rotulo="Responsável"
            valor={ocorrencia.responsavel}
          />

          <View style={styles.divisor} />

          {/* DATA */}

          <LinhaInfo
            icone="📅"
            rotulo="Data e hora"
            valor={formatarData(ocorrencia.data)}
          />

          <View style={styles.divisor} />

          {/* ID */}

          <LinhaInfo
            icone="🆔"
            rotulo="ID da ocorrência"
            valor={`#${String(
              ocorrencia.id
            ).padStart(4, "0")}`}
          />

          {/* GPS */}

          {ocorrencia.latitude !== undefined &&
            ocorrencia.longitude !== undefined && (
              <>
                <View style={styles.divisor} />

                <LinhaInfo
                  icone="🛰️"
                  rotulo="Coordenadas GPS"
                  valor={`${ocorrencia.latitude.toFixed(
                    6
                  )}, ${ocorrencia.longitude.toFixed(
                    6
                  )}`}
                />
              </>
            )}
        </View>

        {/* ====================================================
            BANNER DE RISCO
        ==================================================== */}

        <View
          style={[
            styles.bannerRisco,
            {
              backgroundColor: risco.fundo,
              borderColor: risco.cor,
            },
          ]}
        >
          <Text
            style={[
              styles.bannerRiscoTexto,
              {
                color: risco.cor,
              },
            ]}
          >
            {risco.emoji} Esta ocorrência está
            classificada como risco{" "}
            {risco.label}.
          </Text>
        </View>

        {/* ====================================================
            DAR BAIXA
        ==================================================== */}

        {!concluida && (
          <TouchableOpacity
            style={styles.botaoDarBaixa}
            activeOpacity={0.8}
            onPress={() => {
              onDarBaixa(ocorrencia);
            }}
          >
            <View style={styles.iconeAcao}>
              <Text style={styles.iconeAcaoTexto}>
                ✓
              </Text>
            </View>

            <View style={styles.textoAcao}>
              <Text style={styles.botaoAcaoTitulo}>
                Dar baixa na ocorrência
              </Text>

              <Text style={styles.botaoAcaoDescricao}>
                Marcar como concluída
              </Text>
            </View>
          </TouchableOpacity>
        )}

        {/* ====================================================
            OCORRÊNCIA CONCLUÍDA
        ==================================================== */}

        {concluida && (
          <>
            <View
              style={styles.ocorrenciaConcluida}
            >
              <View
                style={styles.iconeConcluida}
              >
                <Text
                  style={
                    styles.iconeConcluidaTexto
                  }
                >
                  ✓
                </Text>
              </View>

              <View style={styles.textoAcao}>
                <Text
                  style={styles.concluidaTitulo}
                >
                  Ocorrência concluída
                </Text>

                <Text
                  style={styles.concluidaDescricao}
                >
                  Esta ocorrência já recebeu
                  baixa.
                </Text>
              </View>
            </View>

            {/* ==================================================
                REABRIR
            ================================================== */}

            <TouchableOpacity
              style={styles.botaoReabrir}
              activeOpacity={0.8}
              onPress={() =>
                onReabrir(ocorrencia)
              }
            >
              <Text
                style={styles.botaoReabrirTexto}
              >
                ↻ Reabrir ocorrência
              </Text>
            </TouchableOpacity>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// ============================================================
// ESTILOS
// ============================================================

const styles = StyleSheet.create({
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
    paddingBottom: 50,
  },

  // ==========================================================
  // CARD PRINCIPAL
  // ==========================================================

  cardPrincipal: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 18,
    gap: 14,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },

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
    paddingVertical: 5,
    borderRadius: 20,
  },

  badgeTexto: {
    fontSize: 12,
    fontWeight: "700",
  },

  titulo: {
    fontSize: 21,
    fontWeight: "800",
    color: "#1e293b",
    lineHeight: 27,
  },

  secao: {
    gap: 6,
  },

  secaoRotulo: {
    fontSize: 11,
    fontWeight: "700",
    color: "#94a3b8",
    letterSpacing: 1,
  },

  descricao: {
    fontSize: 15,
    color: "#374151",
    lineHeight: 22,
  },

  // ==========================================================
  // CARD INFORMAÇÕES
  // ==========================================================

  cardInfo: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 18,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },

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

  // ==========================================================
  // FOTO
  // ==========================================================

  foto: {
    width: "100%",
    height: 260,
    borderRadius: 10,
    backgroundColor: "#e2e8f0",
  },

  semFoto: {
    minHeight: 130,

    borderWidth: 1,
    borderColor: "#e2e8f0",

    borderRadius: 10,

    backgroundColor: "#f8fafc",

    alignItems: "center",
    justifyContent: "center",

    gap: 8,
  },

  semFotoIcone: {
    fontSize: 28,
  },

  semFotoTexto: {
    fontSize: 13,
    color: "#64748b",
    textAlign: "center",
  },

  // ==========================================================
  // INFORMAÇÕES
  // ==========================================================

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

  // ==========================================================
  // BANNER
  // ==========================================================

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

  // ==========================================================
  // BOTÃO DAR BAIXA
  // ==========================================================

  botaoDarBaixa: {
    backgroundColor: "#16a34a",

    borderRadius: 13,

    padding: 16,

    flexDirection: "row",

    alignItems: "center",

    gap: 13,

    shadowColor: "#16a34a",

    shadowOffset: {
      width: 0,
      height: 4,
    },

    shadowOpacity: 0.2,

    shadowRadius: 6,

    elevation: 4,
  },

  iconeAcao: {
    width: 40,
    height: 40,

    borderRadius: 20,

    backgroundColor: "#ffffff",

    alignItems: "center",
    justifyContent: "center",
  },

  iconeAcaoTexto: {
    color: "#16a34a",
    fontSize: 24,
    fontWeight: "900",
  },

  textoAcao: {
    flex: 1,
  },

  botaoAcaoTitulo: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "800",
  },

  botaoAcaoDescricao: {
    color: "#dcfce7",
    fontSize: 12,
    marginTop: 3,
  },

  // ==========================================================
  // CONCLUÍDA
  // ==========================================================

  ocorrenciaConcluida: {
    backgroundColor: "#dcfce7",

    borderRadius: 13,

    padding: 16,

    flexDirection: "row",

    alignItems: "center",

    gap: 13,

    borderWidth: 1,

    borderColor: "#86efac",
  },

  iconeConcluida: {
    width: 40,
    height: 40,

    borderRadius: 20,

    backgroundColor: "#22c55e",

    alignItems: "center",
    justifyContent: "center",
  },

  iconeConcluidaTexto: {
    color: "#ffffff",
    fontSize: 23,
    fontWeight: "900",
  },

  concluidaTitulo: {
    color: "#166534",
    fontSize: 15,
    fontWeight: "800",
  },

  concluidaDescricao: {
    color: "#15803d",
    fontSize: 12,
    marginTop: 3,
  },

  // ==========================================================
  // REABRIR
  // ==========================================================

  botaoReabrir: {
    backgroundColor: "#ffffff",

    borderWidth: 1.5,
    borderColor: "#cbd5e1",

    borderRadius: 12,

    paddingVertical: 14,

    alignItems: "center",
  },

  botaoReabrirTexto: {
    color: "#475569",
    fontSize: 14,
    fontWeight: "700",
  },
});