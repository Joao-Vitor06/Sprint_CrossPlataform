import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
  ActivityIndicator,
} from "react-native";

import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

import { NivelRisco, NovaOcorrencia } from "../types";

type Props = {
  onSalvar: (ocorrencia: NovaOcorrencia) => void;
  onVoltar: () => void;
};

const RISCOS: Array<{
  valor: NivelRisco;
  label: string;
  cor: string;
  fundo: string;
}> = [
    {
      valor: "baixo",
      label: "Baixo",
      cor: "#22c55e",
      fundo: "#dcfce7",
    },
    {
      valor: "medio",
      label: "Médio",
      cor: "#f59e0b",
      fundo: "#fef3c7",
    },
    {
      valor: "alto",
      label: "Alto",
      cor: "#ef4444",
      fundo: "#fee2e2",
    },
  ];

export default function CadastroOcorrencia({
  onSalvar,
  onVoltar,
}: Props) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [local, setLocal] = useState("");
  const [responsavel, setResponsavel] = useState("");

  const [risco, setRisco] = useState<NivelRisco>("baixo");

  const [fotoUri, setFotoUri] = useState<string | undefined>();

  const [latitude, setLatitude] = useState<number | undefined>();
  const [longitude, setLongitude] = useState<number | undefined>();

  const [buscandoLocalizacao, setBuscandoLocalizacao] =
    useState(false);

  // ──────────────────────────────────────────────────────────────
  // Galeria
  // ──────────────────────────────────────────────────────────────

  async function selecionarDaGaleria() {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Permissão necessária",
          "Permita o acesso às fotos para anexar uma evidência."
        );
        return;
      }

      const resultado =
        await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.8,
        });

      if (
        !resultado.canceled &&
        resultado.assets.length > 0
      ) {
        setFotoUri(resultado.assets[0].uri);
      }
    } catch {
      Alert.alert(
        "Erro",
        "Não foi possível selecionar a imagem."
      );
    }
  }

  // ──────────────────────────────────────────────────────────────
  // Câmera
  // ──────────────────────────────────────────────────────────────

  async function tirarFoto() {
    try {
      const permission =
        await ImagePicker.requestCameraPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Permissão necessária",
          "Permita o acesso à câmera para registrar uma evidência."
        );
        return;
      }

      const resultado =
        await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.8,
        });

      if (
        !resultado.canceled &&
        resultado.assets.length > 0
      ) {
        setFotoUri(resultado.assets[0].uri);
      }
    } catch {
      Alert.alert(
        "Erro",
        "Não foi possível abrir a câmera."
      );
    }
  }

  // ──────────────────────────────────────────────────────────────
  // GPS
  // ──────────────────────────────────────────────────────────────

  async function obterLocalizacao() {
    try {
      setBuscandoLocalizacao(true);

      const servicosAtivos =
        await Location.hasServicesEnabledAsync();

      if (!servicosAtivos) {
        Alert.alert(
          "Localização desativada",
          "Ative a localização do dispositivo e tente novamente."
        );
        return;
      }

      const permission =
        await Location.requestForegroundPermissionsAsync();

      if (!permission.granted) {
        Alert.alert(
          "Permissão necessária",
          "Permita o acesso à localização para preencher o local automaticamente."
        );
        return;
      }

      const posicao =
        await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });

      const {
        latitude: lat,
        longitude: lng,
      } = posicao.coords;

      setLatitude(lat);
      setLongitude(lng);

      // Tenta transformar coordenadas em endereço
      try {
        const enderecos =
          await Location.reverseGeocodeAsync({
            latitude: lat,
            longitude: lng,
          });

        const endereco = enderecos[0];

        if (endereco) {
          const partes = [
            endereco.street,
            endereco.streetNumber,
            endereco.district,
            endereco.city,
            endereco.region,
          ].filter(Boolean);

          if (partes.length > 0) {
            setLocal(partes.join(", "));
          }
        }
      } catch {
        // Coordenadas continuam salvas mesmo sem endereço.
      }

      Alert.alert(
        "📍 Localização registrada",
        "A localização atual foi associada à ocorrência."
      );
    } catch {
      Alert.alert(
        "Erro de localização",
        "Não foi possível obter sua localização. Você ainda pode informar o local manualmente."
      );
    } finally {
      setBuscandoLocalizacao(false);
    }
  }

  function removerFoto() {
    setFotoUri(undefined);
  }

  // ──────────────────────────────────────────────────────────────
  // Salvar
  // ──────────────────────────────────────────────────────────────

  function handleSalvar() {
    if (
      !titulo.trim() ||
      !descricao.trim() ||
      !local.trim() ||
      !responsavel.trim()
    ) {
      Alert.alert(
        "Campos obrigatórios",
        "Preencha título, descrição, local e responsável antes de salvar."
      );
      return;
    }

    if (!fotoUri) {
      Alert.alert(
        "Foto obrigatória",
        "Anexe uma foto da ocorrência pela câmera ou pela galeria antes de registrar."
      );
      return;
    }

    onSalvar({
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      local: local.trim(),
      responsavel: responsavel.trim(),
      risco,
      fotoUri,

      ...(latitude !== undefined
        ? { latitude }
        : {}),

      ...(longitude !== undefined
        ? { longitude }
        : {}),
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#0f172a"
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={onVoltar}
          style={styles.botaoVoltar}
        >
          <Text style={styles.botaoVoltarTexto}>
            ← Voltar
          </Text>
        </TouchableOpacity>

        <Text style={styles.headerTitulo}>
          Nova Ocorrência
        </Text>

        <View style={{ width: 70 }} />
      </View>

      <KeyboardAvoidingView
        behavior={
          Platform.OS === "ios"
            ? "padding"
            : "height"
        }
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={
            styles.formulario
          }
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* FOTO */}
          <View style={styles.campo}>
            <View style={styles.labelLinha}>
              <Text style={styles.label}>
                Evidência fotográfica *
              </Text>

              <Text style={styles.obrigatorio}>
                Obrigatória
              </Text>
            </View>

            {fotoUri ? (
              <View style={styles.fotoContainer}>
                <Image
                  source={{ uri: fotoUri }}
                  style={styles.fotoPreview}
                />

                <View style={styles.fotoAcoes}>
                  <TouchableOpacity
                    style={
                      styles.botaoSecundario
                    }
                    onPress={tirarFoto}
                  >
                    <Text
                      style={
                        styles.botaoSecundarioTexto
                      }
                    >
                      📷 Nova foto
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.botaoExcluir}
                    onPress={removerFoto}
                  >
                    <Text
                      style={
                        styles.botaoExcluirTexto
                      }
                    >
                      Remover
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View
                style={
                  styles.fotoPlaceholder
                }
              >
                <Text style={styles.fotoIcone}>
                  📸
                </Text>

                <Text style={styles.fotoTitulo}>
                  Adicione uma evidência
                </Text>

                <Text
                  style={styles.fotoDescricao}
                >
                  Tire uma foto agora ou escolha
                  uma imagem da galeria.
                </Text>

                <View
                  style={
                    styles.fotoBotoesRow
                  }
                >
                  <TouchableOpacity
                    style={styles.botaoFoto}
                    onPress={tirarFoto}
                  >
                    <Text
                      style={
                        styles.botaoFotoTexto
                      }
                    >
                      📷 Tirar foto
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={
                      styles.botaoFotoAlternativo
                    }
                    onPress={
                      selecionarDaGaleria
                    }
                  >
                    <Text
                      style={
                        styles.botaoFotoAlternativoTexto
                      }
                    >
                      🖼️ Galeria
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>

          {/* TÍTULO */}
          <View style={styles.campo}>
            <Text style={styles.label}>
              Título da Ocorrência *
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Ex: Pneu furado em serviço"
              placeholderTextColor="#94a3b8"
              value={titulo}
              onChangeText={setTitulo}
              maxLength={80}
            />
          </View>

          {/* DESCRIÇÃO */}
          <View style={styles.campo}>
            <Text style={styles.label}>
              Descrição Detalhada *
            </Text>

            <TextInput
              style={[
                styles.input,
                styles.inputMultilinha,
              ]}
              placeholder="Descreva o que aconteceu com o máximo de detalhes..."
              placeholderTextColor="#94a3b8"
              value={descricao}
              onChangeText={setDescricao}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              maxLength={500}
            />

            <Text style={styles.contadorChar}>
              {descricao.length}/500
            </Text>
          </View>

          {/* LOCAL */}
          <View style={styles.campo}>
            <Text style={styles.label}>
              Local da Ocorrência *
            </Text>

            <View style={styles.localLinha}>
              <TextInput
                style={[
                  styles.input,
                  styles.localInput,
                ]}
                placeholder="Ex: Av. Paulista, 1578 – São Paulo/SP"
                placeholderTextColor="#94a3b8"
                value={local}
                onChangeText={setLocal}
              />

              <TouchableOpacity
                style={styles.botaoGPS}
                onPress={obterLocalizacao}
                disabled={buscandoLocalizacao}
              >
                {buscandoLocalizacao ? (
                  <ActivityIndicator
                    size="small"
                    color="#ffffff"
                  />
                ) : (
                  <Text
                    style={styles.botaoGPSTexto}
                  >
                    📍 Usar GPS
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            {latitude !== undefined &&
              longitude !== undefined && (
                <Text
                  style={styles.coordenadas}
                >
                  GPS registrado:{" "}
                  {latitude.toFixed(6)},{" "}
                  {longitude.toFixed(6)}
                </Text>
              )}
          </View>

          {/* RESPONSÁVEL */}
          <View style={styles.campo}>
            <Text style={styles.label}>
              Responsável pelo Registro *
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Nome do motoboy ou gestor"
              placeholderTextColor="#94a3b8"
              value={responsavel}
              onChangeText={setResponsavel}
            />
          </View>

          {/* RISCO */}
          <View style={styles.campo}>
            <Text style={styles.label}>
              Nível de Risco *
            </Text>

            <View style={styles.riscoRow}>
              {RISCOS.map((r) => (
                <TouchableOpacity
                  key={r.valor}
                  style={[
                    styles.riscoBotao,
                    risco === r.valor && {
                      backgroundColor: r.fundo,
                      borderColor: r.cor,
                    },
                  ]}
                  onPress={() =>
                    setRisco(r.valor)
                  }
                >
                  <View
                    style={[
                      styles.riscoPonto,
                      {
                        backgroundColor:
                          r.cor,
                      },
                    ]}
                  />

                  <Text
                    style={[
                      styles.riscoTexto,
                      risco === r.valor && {
                        color: r.cor,
                        fontWeight: "700",
                      },
                    ]}
                  >
                    {r.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* ALERTA ALTO */}
          {risco === "alto" && (
            <View style={styles.avisoAlto}>
              <Text
                style={
                  styles.avisoAltoTexto
                }
              >
                ⚠️ Ocorrências de alto risco são
                priorizadas e notificadas à equipe
                de segurança.
              </Text>
            </View>
          )}

          {/* DATA AUTOMÁTICA */}
          <View
            style={styles.infoAutomatico}
          >
            <Text
              style={
                styles.infoAutomaticoTexto
              }
            >
              🕒 Data e hora serão registradas
              automaticamente no momento do
              cadastro.
            </Text>
          </View>

          {/* SALVAR */}
          <TouchableOpacity
            style={styles.botaoSalvar}
            onPress={handleSalvar}
          >
            <Text
              style={styles.botaoSalvarTexto}
            >
              ✓ Registrar Ocorrência
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

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

  formulario: {
    padding: 20,
    paddingBottom: 60,
    gap: 18,
  },

  campo: {
    gap: 6,
  },

  labelLinha: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#374151",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  obrigatorio: {
    fontSize: 10,
    color: "#ef4444",
    fontWeight: "700",
    textTransform: "uppercase",
  },

  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#1e293b",
  },

  inputMultilinha: {
    minHeight: 100,
    paddingTop: 12,
  },

  contadorChar: {
    fontSize: 11,
    color: "#94a3b8",
    textAlign: "right",
    marginTop: 2,
  },

  localLinha: {
    flexDirection: "row",
    gap: 8,
    alignItems: "stretch",
  },

  localInput: {
    flex: 1,
  },

  botaoGPS: {
    minWidth: 105,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "#6366f1",
    alignItems: "center",
    justifyContent: "center",
  },

  botaoGPSTexto: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 12,
  },

  coordenadas: {
    fontSize: 11,
    color: "#64748b",
    marginTop: 2,
  },

  fotoPlaceholder: {
    borderRadius: 12,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: "#cbd5e1",
    backgroundColor: "#ffffff",
    padding: 20,
    alignItems: "center",
    gap: 7,
  },

  fotoIcone: {
    fontSize: 34,
  },

  fotoTitulo: {
    fontSize: 15,
    color: "#1e293b",
    fontWeight: "800",
  },

  fotoDescricao: {
    fontSize: 12,
    color: "#64748b",
    textAlign: "center",
  },

  fotoBotoesRow: {
    flexDirection: "row",
    gap: 8,
    marginTop: 5,
    width: "100%",
  },

  botaoFoto: {
    flex: 1,
    backgroundColor: "#0f172a",
    borderRadius: 9,
    paddingVertical: 11,
    alignItems: "center",
  },

  botaoFotoTexto: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 12,
  },

  botaoFotoAlternativo: {
    flex: 1,
    backgroundColor: "#eef2ff",
    borderRadius: 9,
    paddingVertical: 11,
    alignItems: "center",
  },

  botaoFotoAlternativoTexto: {
    color: "#4f46e5",
    fontWeight: "700",
    fontSize: 12,
  },

  fotoContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  fotoPreview: {
    width: "100%",
    height: 220,
    backgroundColor: "#e2e8f0",
  },

  fotoAcoes: {
    flexDirection: "row",
    gap: 8,
    padding: 10,
  },

  botaoSecundario: {
    flex: 1,
    borderRadius: 9,
    backgroundColor: "#eef2ff",
    paddingVertical: 10,
    alignItems: "center",
  },

  botaoSecundarioTexto: {
    color: "#4f46e5",
    fontWeight: "700",
    fontSize: 12,
  },

  botaoExcluir: {
    borderRadius: 9,
    paddingHorizontal: 14,
    paddingVertical: 10,
    backgroundColor: "#fee2e2",
    alignItems: "center",
    justifyContent: "center",
  },

  botaoExcluirTexto: {
    color: "#b91c1c",
    fontWeight: "700",
    fontSize: 12,
  },

  riscoRow: {
    flexDirection: "row",
    gap: 10,
  },

  riscoBotao: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: "#ffffff",
    borderWidth: 1.5,
    borderColor: "#e2e8f0",
  },

  riscoPonto: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  riscoTexto: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "600",
  },

  avisoAlto: {
    backgroundColor: "#fee2e2",
    borderRadius: 10,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#ef4444",
  },

  avisoAltoTexto: {
    fontSize: 13,
    color: "#b91c1c",
    lineHeight: 18,
  },

  infoAutomatico: {
    backgroundColor: "#f1f5f9",
    borderRadius: 10,
    padding: 12,
  },

  infoAutomaticoTexto: {
    fontSize: 12,
    color: "#475569",
    lineHeight: 18,
  },

  botaoSalvar: {
    backgroundColor: "#0f172a",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 2,
    shadowColor: "#0f172a",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },

  botaoSalvarTexto: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },
});