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
} from "react-native";
import { NivelRisco, NovaOcorrencia } from "../types";

// ─── Props ─────────────────────────────────────────────────────────────────

type Props = {
  onSalvar: (ocorrencia: NovaOcorrencia) => void;
  onVoltar: () => void;
};

// ─── Opções de Risco ───────────────────────────────────────────────────────

const RISCOS: Array<{ valor: NivelRisco; label: string; cor: string; fundo: string }> = [
  { valor: "baixo", label: "Baixo", cor: "#22c55e", fundo: "#dcfce7" },
  { valor: "medio", label: "Médio", cor: "#f59e0b", fundo: "#fef3c7" },
  { valor: "alto", label: "Alto", cor: "#ef4444", fundo: "#fee2e2" },
];

// ─── Tela ──────────────────────────────────────────────────────────────────

export default function CadastroOcorrencia({ onSalvar, onVoltar }: Props) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [local, setLocal] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [risco, setRisco] = useState<NivelRisco>("baixo");

  function handleSalvar() {
    if (!titulo.trim() || !descricao.trim() || !local.trim() || !responsavel.trim()) {
      Alert.alert("Campos obrigatórios", "Por favor, preencha todos os campos antes de salvar.");
      return;
    }

    onSalvar({
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      local: local.trim(),
      responsavel: responsavel.trim(),
      risco,
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onVoltar} style={styles.botaoVoltar}>
          <Text style={styles.botaoVoltarTexto}>← Voltar</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitulo}>Nova Ocorrência</Text>
        <View style={{ width: 70 }} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.formulario}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* Título */}
          <View style={styles.campo}>
            <Text style={styles.label}>Título da Ocorrência *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Pneu furado em serviço"
              placeholderTextColor="#94a3b8"
              value={titulo}
              onChangeText={setTitulo}
              maxLength={80}
            />
          </View>

          {/* Descrição */}
          <View style={styles.campo}>
            <Text style={styles.label}>Descrição Detalhada *</Text>
            <TextInput
              style={[styles.input, styles.inputMultilinha]}
              placeholder="Descreva o que aconteceu com o máximo de detalhes..."
              placeholderTextColor="#94a3b8"
              value={descricao}
              onChangeText={setDescricao}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              maxLength={500}
            />
            <Text style={styles.contadorChar}>{descricao.length}/500</Text>
          </View>

          {/* Local */}
          <View style={styles.campo}>
            <Text style={styles.label}>Local da Ocorrência *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Av. Paulista, 1578 – São Paulo/SP"
              placeholderTextColor="#94a3b8"
              value={local}
              onChangeText={setLocal}
            />
          </View>

          {/* Responsável */}
          <View style={styles.campo}>
            <Text style={styles.label}>Responsável pelo Registro *</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome do motoboy ou gestor"
              placeholderTextColor="#94a3b8"
              value={responsavel}
              onChangeText={setResponsavel}
            />
          </View>

          {/* Nível de Risco */}
          <View style={styles.campo}>
            <Text style={styles.label}>Nível de Risco *</Text>
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
                  onPress={() => setRisco(r.valor)}
                >
                  <View
                    style={[styles.riscoPonto, { backgroundColor: r.cor }]}
                  />
                  <Text
                    style={[
                      styles.riscoTexto,
                      risco === r.valor && { color: r.cor, fontWeight: "700" },
                    ]}
                  >
                    {r.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Aviso de risco alto */}
          {risco === "alto" && (
            <View style={styles.avisoAlto}>
              <Text style={styles.avisoAltoTexto}>
                ⚠️ Ocorrências de alto risco são priorizadas e notificadas à equipe de segurança.
              </Text>
            </View>
          )}

          {/* Botão Salvar */}
          <TouchableOpacity style={styles.botaoSalvar} onPress={handleSalvar}>
            <Text style={styles.botaoSalvarTexto}>✓ Registrar Ocorrência</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
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
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "#374151",
    textTransform: "uppercase",
    letterSpacing: 0.5,
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
  botaoSalvar: {
    backgroundColor: "#0f172a",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#0f172a",
    shadowOffset: { width: 0, height: 4 },
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
