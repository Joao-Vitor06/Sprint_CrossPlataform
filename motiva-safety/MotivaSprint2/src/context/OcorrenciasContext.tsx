import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import * as servico from "../services/ocorrenciasService";
import type {
  DadosFormularioOcorrencia,
  EventoHistorico,
  Ocorrencia,
  StatusOcorrencia,
} from "../types";
import { interpretarKm } from "../utils/format";

type EstadoCarregamento = "carregando" | "pronto" | "erro";

type ContextoOcorrencias = {
  ocorrencias: Ocorrencia[];
  estado: EstadoCarregamento;
  /** Verdadeiro enquanto uma escrita está em andamento, para travar botões. */
  salvando: boolean;
  simulandoFalha: boolean;

  recarregar: () => Promise<void>;
  criar: (dados: DadosFormularioOcorrencia) => Promise<Ocorrencia>;
  atualizar: (id: string, dados: DadosFormularioOcorrencia) => Promise<Ocorrencia>;
  mudarStatus: (id: string, status: StatusOcorrencia) => Promise<Ocorrencia>;
  obter: (id: string) => Ocorrencia | undefined;

  alternarSimulacaoDeFalha: (ativo: boolean) => void;
  limparTudo: () => Promise<void>;
  restaurarExemplos: () => Promise<void>;
};

const Contexto = createContext<ContextoOcorrencias | null>(null);

/** Gera o próximo protocolo no formato MTV-0001 a partir do maior já existente. */
function proximoProtocolo(lista: Ocorrencia[]): string {
  const maior = lista.reduce((maximo, ocorrencia) => {
    const numero = Number(ocorrencia.protocolo.replace(/\D/g, ""));
    return Number.isFinite(numero) && numero > maximo ? numero : maximo;
  }, 0);

  return `MTV-${String(maior + 1).padStart(4, "0")}`;
}

function novoEvento(
  status: StatusOcorrencia,
  por: string,
  nota?: string
): EventoHistorico {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    status,
    em: new Date().toISOString(),
    por,
    nota,
  };
}

/**
 * Fonte única das ocorrências do app.
 *
 * Concentra carregamento, persistência e as regras de negócio (protocolo,
 * histórico de status) para que as telas cuidem só de apresentação. A lista em
 * memória é atualizada primeiro e só depois é gravada, e se a gravação falhar o
 * estado anterior é restaurado.
 */
export function OcorrenciasProvider({ children }: { children: ReactNode }) {
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [estado, setEstado] = useState<EstadoCarregamento>("carregando");
  const [salvando, setSalvando] = useState(false);
  const [simulandoFalha, setSimulandoFalha] = useState(servico.simulacaoDeFalhaAtiva());

  const recarregar = useCallback(async () => {
    setEstado("carregando");
    try {
      setOcorrencias(await servico.carregarOcorrencias());
      setEstado("pronto");
    } catch {
      setEstado("erro");
    }
  }, []);

  useEffect(() => {
    void recarregar();
  }, [recarregar]);

  /** Aplica a mudança em memória e persiste, desfazendo tudo se a escrita falhar. */
  const persistir = useCallback(
    async (proxima: Ocorrencia[], anterior: Ocorrencia[]) => {
      setSalvando(true);
      setOcorrencias(proxima);
      try {
        await servico.salvarOcorrencias(proxima);
      } catch (erro) {
        setOcorrencias(anterior);
        throw erro;
      } finally {
        setSalvando(false);
      }
    },
    []
  );

  const criar = useCallback(
    async (dados: DadosFormularioOcorrencia) => {
      const agora = new Date().toISOString();
      const nova: Ocorrencia = {
        id: `${Date.now()}`,
        protocolo: proximoProtocolo(ocorrencias),
        titulo: dados.titulo.trim(),
        descricao: dados.descricao.trim(),
        tipo: dados.tipo,
        rodovia: dados.rodovia.trim(),
        km: interpretarKm(dados.km) ?? 0,
        sentido: dados.sentido,
        referencia: dados.referencia.trim(),
        risco: dados.risco,
        status: "aberta",
        responsavel: dados.responsavel.trim(),
        criadaEm: agora,
        atualizadaEm: agora,
        fotoUri: dados.fotoUri,
        latitude: dados.latitude,
        longitude: dados.longitude,
        historico: [novoEvento("aberta", dados.responsavel.trim(), "Ocorrência registrada em campo.")],
      };

      await persistir([nova, ...ocorrencias], ocorrencias);
      return nova;
    },
    [ocorrencias, persistir]
  );

  const atualizar = useCallback(
    async (id: string, dados: DadosFormularioOcorrencia) => {
      const atual = ocorrencias.find((ocorrencia) => ocorrencia.id === id);
      if (!atual) throw new Error("Ocorrência não encontrada.");

      const editada: Ocorrencia = {
        ...atual,
        titulo: dados.titulo.trim(),
        descricao: dados.descricao.trim(),
        tipo: dados.tipo,
        rodovia: dados.rodovia.trim(),
        km: interpretarKm(dados.km) ?? atual.km,
        sentido: dados.sentido,
        referencia: dados.referencia.trim(),
        risco: dados.risco,
        responsavel: dados.responsavel.trim(),
        fotoUri: dados.fotoUri,
        latitude: dados.latitude,
        longitude: dados.longitude,
        atualizadaEm: new Date().toISOString(),
      };

      await persistir(
        ocorrencias.map((ocorrencia) => (ocorrencia.id === id ? editada : ocorrencia)),
        ocorrencias
      );
      return editada;
    },
    [ocorrencias, persistir]
  );

  const mudarStatus = useCallback(
    async (id: string, status: StatusOcorrencia) => {
      const atual = ocorrencias.find((ocorrencia) => ocorrencia.id === id);
      if (!atual) throw new Error("Ocorrência não encontrada.");

      const evento = novoEvento(status, atual.responsavel);
      const editada: Ocorrencia = {
        ...atual,
        status,
        atualizadaEm: evento.em,
        historico: [...atual.historico, evento],
      };

      await persistir(
        ocorrencias.map((ocorrencia) => (ocorrencia.id === id ? editada : ocorrencia)),
        ocorrencias
      );
      return editada;
    },
    [ocorrencias, persistir]
  );

  const obter = useCallback(
    (id: string) => ocorrencias.find((ocorrencia) => ocorrencia.id === id),
    [ocorrencias]
  );

  const alternarSimulacaoDeFalha = useCallback((ativo: boolean) => {
    servico.definirSimulacaoDeFalha(ativo);
    setSimulandoFalha(ativo);
  }, []);

  const limparTudo = useCallback(async () => {
    setSalvando(true);
    try {
      await servico.limparOcorrencias();
      setOcorrencias([]);
      setEstado("pronto");
    } finally {
      setSalvando(false);
    }
  }, []);

  const restaurarExemplos = useCallback(async () => {
    setSalvando(true);
    try {
      setOcorrencias(await servico.restaurarExemplos());
      setEstado("pronto");
    } finally {
      setSalvando(false);
    }
  }, []);

  const valor = useMemo<ContextoOcorrencias>(
    () => ({
      ocorrencias,
      estado,
      salvando,
      simulandoFalha,
      recarregar,
      criar,
      atualizar,
      mudarStatus,
      obter,
      alternarSimulacaoDeFalha,
      limparTudo,
      restaurarExemplos,
    }),
    [
      ocorrencias,
      estado,
      salvando,
      simulandoFalha,
      recarregar,
      criar,
      atualizar,
      mudarStatus,
      obter,
      alternarSimulacaoDeFalha,
      limparTudo,
      restaurarExemplos,
    ]
  );

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

export function useOcorrencias() {
  const contexto = useContext(Contexto);
  if (!contexto) {
    throw new Error("useOcorrencias precisa estar dentro de <OcorrenciasProvider>.");
  }
  return contexto;
}
