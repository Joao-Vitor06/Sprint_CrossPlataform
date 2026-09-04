import React from "react";

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { Ocorrencia } from "../types";

type Props = {
  ocorrencia: Ocorrencia;

  onPress: (
    ocorrencia: Ocorrencia
  ) => void;
};

const RISCO_CONFIG = {
  baixo: {
    label: "Baixo",
    cor: "#22c55e",
    fundo: "#dcfce7",
  },

  medio: {
    label: "Médio",
    cor: "#f59e0b",
    fundo: "#fef3c7",
  },

  alto: {
    label: "Alto",
    cor: "#ef4444",
    fundo: "#fee2e2",
  },
};

const STATUS_CONFIG = {
  aberta: {
    label: "Aberta",
    cor: "#6366f1",
  },

  em_analise: {
    label: "Em Análise",
    cor: "#f59e0b",
  },

  resolvida: {
    label: "Concluída",
    cor: "#22c55e",
  },
};

function formatarData(
  data: string
): string {
  if (data.includes("T")) {
    const dataObj = new Date(data);

    if (
      !Number.isNaN(
        dataObj.getTime()
      )
    ) {
      return dataObj.toLocaleString(
        "pt-BR",
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }
      );
    }
  }

  const partes =
    data.split("-");

  if (partes.length === 3) {
    const [ano, mes, dia] =
      partes;

    return `${dia}/${mes}/${ano}`;
  }

  return data;
}

export default function OcorrenciaCard({
  ocorrencia,
  onPress,
}: Props) {
  const risco =
    RISCO_CONFIG[
    ocorrencia.risco
    ];

  const status =
    STATUS_CONFIG[
    ocorrencia.status
    ];

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}

      // SOMENTE executa quando o usuário clicar
      onPress={() =>
        onPress(ocorrencia)
      }
    >
      {/* Indicador de risco */}
      <View
        style={[
          styles.barraRisco,
          {
            backgroundColor:
              risco.cor,
          },
        ]}
      />

      <View style={styles.conteudo}>

        {/* ====================================================
            CABEÇALHO
        ==================================================== */}

        <View
          style={styles.cabecalho}
        >
          <View
            style={
              styles.tituloContainer
            }
          >
            <Text
              style={styles.titulo}
              numberOfLines={1}
            >
              {ocorrencia.titulo}
            </Text>

            {ocorrencia.fotoUri && (
              <Text
                style={
                  styles.indicadorFoto
                }
              >
                📷
              </Text>
            )}
          </View>

          <View
            style={[
              styles.badgeRisco,
              {
                backgroundColor:
                  risco.fundo,
              },
            ]}
          >
            <Text
              style={[
                styles.badgeRiscoTexto,
                {
                  color:
                    risco.cor,
                },
              ]}
            >
              {risco.label}
            </Text>
          </View>
        </View>

        {/* ====================================================
            DESCRIÇÃO
        ==================================================== */}

        <Text
          style={styles.descricao}
          numberOfLines={2}
        >
          {ocorrencia.descricao}
        </Text>

        {/* ====================================================
            INFORMAÇÕES
        ==================================================== */}

        <View
          style={styles.informacoes}
        >
          <View
            style={styles.infoItem}
          >
            <Text
              style={
                styles.infoIcone
              }
            >
              📍
            </Text>

            <Text
              style={
                styles.infoTexto
              }
              numberOfLines={1}
            >
              {ocorrencia.local}
            </Text>
          </View>

          <View
            style={styles.infoItem}
          >
            <Text
              style={
                styles.infoIcone
              }
            >
              👤
            </Text>

            <Text
              style={
                styles.infoTexto
              }
              numberOfLines={1}
            >
              {ocorrencia.responsavel}
            </Text>
          </View>
        </View>

        {/* ====================================================
            RODAPÉ
        ==================================================== */}

        <View
          style={styles.rodape}
        >
          <Text
            style={[
              styles.statusTexto,
              {
                color:
                  status.cor,
              },
            ]}
          >
            ● {status.label}
          </Text>

          <Text style={styles.data}>
            {formatarData(
              ocorrencia.data
            )}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",

    backgroundColor: "#ffffff",

    borderRadius: 12,

    marginBottom: 12,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.08,

    shadowRadius: 8,

    elevation: 3,

    overflow: "hidden",
  },

  barraRisco: {
    width: 5,
  },

  conteudo: {
    flex: 1,

    padding: 14,

    gap: 7,
  },

  cabecalho: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent:
      "space-between",

    gap: 8,
  },

  tituloContainer: {
    flex: 1,

    flexDirection: "row",

    alignItems: "center",

    gap: 5,
  },

  titulo: {
    flex: 1,

    fontSize: 15,

    fontWeight: "800",

    color: "#1e293b",
  },

  indicadorFoto: {
    fontSize: 13,
  },

  badgeRisco: {
    paddingHorizontal: 9,

    paddingVertical: 5,

    borderRadius: 20,
  },

  badgeRiscoTexto: {
    fontSize: 11,

    fontWeight: "700",
  },

  descricao: {
    fontSize: 13,

    lineHeight: 19,

    color: "#64748b",
  },

  informacoes: {
    gap: 6,

    marginTop: 3,
  },

  infoItem: {
    flexDirection: "row",

    alignItems: "center",

    gap: 7,
  },

  infoIcone: {
    fontSize: 13,
  },

  infoTexto: {
    flex: 1,

    fontSize: 12,

    color: "#64748b",
  },

  rodape: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent:
      "space-between",

    marginTop: 4,

    paddingTop: 9,

    borderTopWidth: 1,

    borderTopColor:
      "#f1f5f9",
  },

  statusTexto: {
    fontSize: 11,

    fontWeight: "700",
  },

  data: {
    fontSize: 11,

    color: "#94a3b8",
  },
});