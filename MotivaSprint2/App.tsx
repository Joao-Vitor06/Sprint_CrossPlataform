import React, { useState } from "react";
import { Alert } from "react-native";

import { Ocorrencia, NovaOcorrencia, Tela } from "./src/types";
import { ocorrenciasMock } from "./src/data/mockData";

import ListaOcorrencias from "./src/screens/ListaOcorrencias";
import CadastroOcorrencia from "./src/screens/CadastroOcorrencia";
import DetalheOcorrencia from "./src/screens/DetalheOcorrencia";

// ─── App ───────────────────────────────────────────────────────────────────

export default function App() {
  // ── Estado de Navegação ──────────────────────────────────────────────────
  const [telaAtual, setTelaAtual] = useState<Tela>("lista");
  const [ocorrenciaSelecionada, setOcorrenciaSelecionada] =
    useState<Ocorrencia | null>(null);

  // ── Estado de Dados ──────────────────────────────────────────────────────
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>(ocorrenciasMock);
  const [proximoId, setProximoId] = useState<number>(
    ocorrenciasMock.length + 1
  );

  // ── Handlers ─────────────────────────────────────────────────────────────

  function handleVerDetalhe(ocorrencia: Ocorrencia) {
    setOcorrenciaSelecionada(ocorrencia);
    setTelaAtual("detalhe");
  }

  function handleSalvarOcorrencia(dados: NovaOcorrencia) {
    const nova: Ocorrencia = {
      id: proximoId,
      titulo: dados.titulo,
      descricao: dados.descricao,
      local: dados.local,
      responsavel: dados.responsavel,
      risco: dados.risco,
      data: new Date().toISOString().split("T")[0], // data atual
      status: "aberta",
    };

    setOcorrencias((prev) => [nova, ...prev]);
    setProximoId((prev) => prev + 1);

    Alert.alert(
      "✅ Registrado!",
      "Ocorrência cadastrada com sucesso.",
      [{ text: "Ver Lista", onPress: () => setTelaAtual("lista") }]
    );
  }

  // ── Roteador de Telas ─────────────────────────────────────────────────────

  if (telaAtual === "lista") {
    return (
      <ListaOcorrencias
        ocorrencias={ocorrencias}
        onVerDetalhe={handleVerDetalhe}
        onNovaCorrencia={() => setTelaAtual("cadastro")}
      />
    );
  }

  if (telaAtual === "cadastro") {
    return (
      <CadastroOcorrencia
        onSalvar={handleSalvarOcorrencia}
        onVoltar={() => setTelaAtual("lista")}
      />
    );
  }

  if (telaAtual === "detalhe" && ocorrenciaSelecionada) {
    return (
      <DetalheOcorrencia
        ocorrencia={ocorrenciaSelecionada}
        onVoltar={() => setTelaAtual("lista")}
      />
    );
  }

  // Fallback
  return (
    <ListaOcorrencias
      ocorrencias={ocorrencias}
      onVerDetalhe={handleVerDetalhe}
      onNovaCorrencia={() => setTelaAtual("cadastro")}
    />
  );
}
