import React, { useState } from "react";
import { Alert } from "react-native";

import {
  Ocorrencia,
  NovaOcorrencia,
  Tela,
} from "./src/types";

import { ocorrenciasMock } from "./src/data/mockData";

import ListaOcorrencias from "./src/screens/ListaOcorrencias";
import CadastroOcorrencia from "./src/screens/CadastroOcorrencia";
import DetalheOcorrencia from "./src/screens/DetalheOcorrencia";

export default function App() {
  // ============================================================
  // NAVEGAÇÃO
  // ============================================================

  const [telaAtual, setTelaAtual] =
    useState<Tela>("lista");

  const [
    ocorrenciaSelecionada,
    setOcorrenciaSelecionada,
  ] = useState<Ocorrencia | null>(null);

  // ============================================================
  // DADOS
  // ============================================================

  const [ocorrencias, setOcorrencias] =
    useState<Ocorrencia[]>(ocorrenciasMock);

  const [proximoId, setProximoId] =
    useState<number>(
      ocorrenciasMock.length + 1
    );

  // ============================================================
  // ABRIR DETALHES
  // ============================================================

  function handleVerDetalhe(
    ocorrencia: Ocorrencia
  ) {
    setOcorrenciaSelecionada(
      ocorrencia
    );

    setTelaAtual("detalhe");
  }

  // ============================================================
  // CADASTRAR OCORRÊNCIA
  // ============================================================

  function handleSalvarOcorrencia(
    dados: NovaOcorrencia
  ) {
    const nova: Ocorrencia = {
      id: proximoId,
      ...dados,

      // Data e hora automáticas
      data: new Date().toISOString(),

      // Toda nova ocorrência começa aberta
      status: "aberta",
    };

    // Adiciona no início da lista
    setOcorrencias((prev) => [
      nova,
      ...prev,
    ]);

    // Próximo ID
    setProximoId((prev) => prev + 1);

    // Volta para a página inicial
    setTelaAtual("lista");

    // Mensagem de sucesso
    Alert.alert(
      "✅ Ocorrência cadastrada com sucesso!",
      "A ocorrência foi registrada e já está disponível na lista.",
      [
        {
          text: "OK",
        },
      ]
    );
  }

  // ============================================================
  // DAR BAIXA
  // ============================================================

  function handleDarBaixa(
    ocorrencia: Ocorrencia
  ) {
    // Evita dar baixa novamente
    if (ocorrencia.status === "resolvida") {
      return;
    }

    const ocorrenciaAtualizada: Ocorrencia = {
      ...ocorrencia,
      status: "resolvida",
    };

    // Atualiza a ocorrência dentro do array principal
    setOcorrencias((listaAtual) =>
      listaAtual.map((item) =>
        item.id === ocorrencia.id
          ? ocorrenciaAtualizada
          : item
      )
    );

    // Atualiza o detalhe que está aberto
    setOcorrenciaSelecionada(
      ocorrenciaAtualizada
    );

    // Confirmação
    Alert.alert(
      "✅ Ocorrência concluída",
      `"${ocorrencia.titulo}" foi marcada como concluída.`,
      [
        {
          text: "OK",
        },
      ]
    );
  }

  // ============================================================
  // REABRIR OCORRÊNCIA
  // ============================================================

  function handleReabrir(
    ocorrencia: Ocorrencia
  ) {
    // Só permite reabrir ocorrências concluídas
    if (ocorrencia.status !== "resolvida") {
      return;
    }

    const ocorrenciaAtualizada: Ocorrencia = {
      ...ocorrencia,
      status: "aberta",
    };

    // Atualiza a lista
    setOcorrencias((listaAtual) =>
      listaAtual.map((item) =>
        item.id === ocorrencia.id
          ? ocorrenciaAtualizada
          : item
      )
    );

    // Atualiza o detalhe aberto
    setOcorrenciaSelecionada(
      ocorrenciaAtualizada
    );

    Alert.alert(
      "🔄 Ocorrência reaberta",
      `"${ocorrencia.titulo}" voltou para o status Aberta.`,
      [
        {
          text: "OK",
        },
      ]
    );
  }

  // ============================================================
  // LISTA
  // ============================================================

  if (telaAtual === "lista") {
    return (
      <ListaOcorrencias
        ocorrencias={ocorrencias}
        onVerDetalhe={
          handleVerDetalhe
        }
        onNovaCorrencia={() =>
          setTelaAtual("cadastro")
        }
      />
    );
  }

  // ============================================================
  // CADASTRO
  // ============================================================

  if (telaAtual === "cadastro") {
    return (
      <CadastroOcorrencia
        onSalvar={
          handleSalvarOcorrencia
        }
        onVoltar={() =>
          setTelaAtual("lista")
        }
      />
    );
  }

  // ============================================================
  // DETALHES
  // ============================================================

  if (
    telaAtual === "detalhe" &&
    ocorrenciaSelecionada !== null
  ) {
    return (
      <DetalheOcorrencia
        ocorrencia={
          ocorrenciaSelecionada
        }

        onVoltar={() => {
          setOcorrenciaSelecionada(
            null
          );

          setTelaAtual("lista");
        }}

        onDarBaixa={
          handleDarBaixa
        }

        onReabrir={
          handleReabrir
        }
      />
    );
  }

  // ============================================================
  // FALLBACK
  // ============================================================

  return (
    <ListaOcorrencias
      ocorrencias={ocorrencias}
      onVerDetalhe={
        handleVerDetalhe
      }
      onNovaCorrencia={() =>
        setTelaAtual("cadastro")
      }
    />
  );
}