import AsyncStorage from "@react-native-async-storage/async-storage";

import { criarOcorrenciasMock } from "../data/mockData";
import type { Ocorrencia } from "../types";

const CHAVE_OCORRENCIAS = "@motiva_safety:ocorrencias";
const CHAVE_SEMEADO = "@motiva_safety:semeado";

/**
 * Camada que simula o backend que ainda não existe.
 *
 * Todas as telas conversam apenas com este módulo, nunca com o AsyncStorage
 * direto. Quando a API real entrar na Sprint 4, basta trocar o corpo destas
 * funções por chamadas HTTP: a assinatura e os estados de carregamento e erro
 * já estão no formato final.
 */

/** Latência artificial, para que os estados de carregamento apareçam de verdade. */
const LATENCIA_MS = { leitura: 700, escrita: 320 } as const;

function esperar(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Interruptor do modo demonstração.
 *
 * Fica só em memória de propósito: se o app for reiniciado, a simulação de
 * falha volta desligada e ninguém fica preso em um erro permanente.
 */
let simularFalha = false;

export function definirSimulacaoDeFalha(ativo: boolean): void {
  simularFalha = ativo;
}

export function simulacaoDeFalhaAtiva(): boolean {
  return simularFalha;
}

export class FalhaDeConexao extends Error {
  constructor() {
    super("Não foi possível falar com o servidor da Motiva.");
    this.name = "FalhaDeConexao";
  }
}

/**
 * Carrega as ocorrências salvas no aparelho.
 *
 * Na primeira execução a base de exemplo é gravada, e a partir daí o que vale
 * é o que o usuário criou ou alterou. A flag de semeado impede que os exemplos
 * voltem depois de o usuário apagar tudo de propósito.
 */
export async function carregarOcorrencias(): Promise<Ocorrencia[]> {
  await esperar(LATENCIA_MS.leitura);

  if (simularFalha) {
    throw new FalhaDeConexao();
  }

  const [bruto, semeado] = await Promise.all([
    AsyncStorage.getItem(CHAVE_OCORRENCIAS),
    AsyncStorage.getItem(CHAVE_SEMEADO),
  ]);

  if (bruto === null && semeado === null) {
    const exemplos = criarOcorrenciasMock();
    await Promise.all([
      AsyncStorage.setItem(CHAVE_OCORRENCIAS, JSON.stringify(exemplos)),
      AsyncStorage.setItem(CHAVE_SEMEADO, "1"),
    ]);
    return exemplos;
  }

  if (bruto === null) return [];

  try {
    const lista = JSON.parse(bruto) as Ocorrencia[];
    return Array.isArray(lista) ? lista : [];
  } catch {
    // Dado corrompido não pode travar o app: começa de uma lista vazia.
    await AsyncStorage.removeItem(CHAVE_OCORRENCIAS);
    return [];
  }
}

export async function salvarOcorrencias(lista: Ocorrencia[]): Promise<void> {
  await esperar(LATENCIA_MS.escrita);

  if (simularFalha) {
    throw new FalhaDeConexao();
  }

  await AsyncStorage.setItem(CHAVE_OCORRENCIAS, JSON.stringify(lista));
}

/** Esvazia a base mantendo a marca de semeado, para demonstrar a lista vazia. */
export async function limparOcorrencias(): Promise<void> {
  await esperar(LATENCIA_MS.escrita);
  await AsyncStorage.multiSet([
    [CHAVE_OCORRENCIAS, JSON.stringify([])],
    [CHAVE_SEMEADO, "1"],
  ]);
}

/** Descarta as alterações locais e volta à base de exemplo original. */
export async function restaurarExemplos(): Promise<Ocorrencia[]> {
  await esperar(LATENCIA_MS.escrita);

  const exemplos = criarOcorrenciasMock();
  await AsyncStorage.multiSet([
    [CHAVE_OCORRENCIAS, JSON.stringify(exemplos)],
    [CHAVE_SEMEADO, "1"],
  ]);
  return exemplos;
}
