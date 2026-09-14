import type { EventoHistorico, Ocorrencia, StatusOcorrencia } from "../types";
import { referenciaFotoMock } from "./fotos";

/**
 * Base de ocorrências de exemplo do protótipo.
 *
 * A cobertura é intencional: os três níveis de risco, os três status, os oito
 * tipos de problema, ocorrências com e sem foto e com e sem coordenada GPS.
 * Assim toda variação de tela tem pelo menos um caso para demonstrar.
 */

type Semente = {
  protocolo: string;
  titulo: string;
  descricao: string;
  tipo: Ocorrencia["tipo"];
  rodovia: string;
  km: number;
  sentido: Ocorrencia["sentido"];
  referencia: string;
  risco: Ocorrencia["risco"];
  status: StatusOcorrencia;
  responsavel: string;
  /** Há quantas horas a ocorrência foi registrada, contando a partir de agora. */
  horasAtras: number;
  foto?: string;
  coordenada?: [number, number];
  /** Responsáveis pelas mudanças de status, na ordem em que aconteceram. */
  tramitacao?: Array<{ status: StatusOcorrencia; horasAtras: number; por: string; nota?: string }>;
};

const SEMENTES: Semente[] = [
  {
    protocolo: "MTV-0014",
    titulo: "Vegetação alta encobrindo placa de saída",
    descricao:
      "O mato na faixa de domínio cresceu acima de 1,5 m e cobre quase toda a placa de indicação da saída para Itupeva. O motorista só enxerga a sinalização quando já passou do ponto de decisão.",
    tipo: "vegetacao",
    rodovia: "SP-348 Bandeirantes",
    km: 42.5,
    sentido: "interior",
    referencia: "Antes da saída 42, faixa de domínio à direita",
    risco: "alto",
    status: "aberta",
    responsavel: "Carlos Souza",
    horasAtras: 3,
    foto: "vegetacao-alta",
    coordenada: [-23.1512, -46.9488],
  },
  {
    protocolo: "MTV-0013",
    titulo: "Buraco profundo na faixa da direita",
    descricao:
      "Buraco de aproximadamente 40 cm de diâmetro e 12 cm de profundidade na faixa da direita. Dois caminhões desviaram bruscamente durante a vistoria.",
    tipo: "pavimento",
    rodovia: "SP-330 Anhanguera",
    km: 72.3,
    sentido: "interior",
    referencia: "Faixa da direita, próximo ao acesso de Louveira",
    risco: "alto",
    status: "em_analise",
    responsavel: "Marcos Lima",
    horasAtras: 9,
    foto: "pavimento-buraco",
    coordenada: [-23.0864, -46.9512],
    tramitacao: [
      {
        status: "em_analise",
        horasAtras: 6,
        por: "Juliana Alves",
        nota: "Equipe de pavimentação acionada para medição no local.",
      },
    ],
  },
  {
    protocolo: "MTV-0012",
    titulo: "Capivaras circulando próximo à pista",
    descricao:
      "Grupo de cinco capivaras atravessando a faixa de domínio perto do córrego. A cerca de proteção está rompida em um trecho de cerca de 8 m.",
    tipo: "animal",
    rodovia: "SP-330 Anhanguera",
    km: 88.4,
    sentido: "capital",
    referencia: "Córrego do Piçarrão, cerca lateral rompida",
    risco: "alto",
    status: "aberta",
    responsavel: "Ana Paula Ribeiro",
    horasAtras: 14,
    foto: "animal-pista",
    coordenada: [-22.9712, -47.0633],
  },
  {
    protocolo: "MTV-0011",
    titulo: "Pintura de faixa apagada em curva",
    descricao:
      "A demarcação central está praticamente invisível em um trecho de 300 m de curva. Em dia de chuva o condutor perde a referência da faixa.",
    tipo: "sinalizacao",
    rodovia: "SP-280 Castello Branco",
    km: 33.4,
    sentido: "interior",
    referencia: "Curva descendente após o viaduto de Barueri",
    risco: "alto",
    status: "aberta",
    responsavel: "Ricardo Ferreira",
    horasAtras: 26,
    foto: "sinalizacao-pintura",
    coordenada: [-23.5051, -46.9203],
  },
  {
    protocolo: "MTV-0010",
    titulo: "Alagamento na pista após chuva forte",
    descricao:
      "Lâmina d'água de cerca de 10 cm cobrindo a faixa da direita depois da chuva da madrugada. A água não escoa porque a canaleta lateral está assoreada.",
    tipo: "drenagem",
    rodovia: "SP-150 Anchieta",
    km: 40.2,
    sentido: "capital",
    referencia: "Trecho de serra, faixa da direita",
    risco: "alto",
    status: "em_analise",
    responsavel: "Felipe Nunes",
    horasAtras: 33,
    foto: "drenagem-alagamento",
    coordenada: [-23.7831, -46.4796],
    tramitacao: [
      {
        status: "em_analise",
        horasAtras: 28,
        por: "Felipe Nunes",
        nota: "Caminhão de sucção agendado para a limpeza da canaleta.",
      },
    ],
  },
  {
    protocolo: "MTV-0009",
    titulo: "Defensa metálica amassada após colisão",
    descricao:
      "Aproximadamente 12 m de defensa metálica deformada, provavelmente por colisão não registrada. Dois postes de sustentação estão soltos do solo.",
    tipo: "acostamento",
    rodovia: "SP-348 Bandeirantes",
    km: 58.1,
    sentido: "capital",
    referencia: "Acostamento direito, trecho reto antes do posto de pesagem",
    risco: "medio",
    status: "em_analise",
    responsavel: "Juliana Alves",
    horasAtras: 40,
    foto: "acostamento-defensa",
    coordenada: [-23.0219, -47.0125],
    tramitacao: [
      {
        status: "em_analise",
        horasAtras: 36,
        por: "Rafael Mendes",
        nota: "Orçamento de reposição das peças solicitado ao fornecedor.",
      },
    ],
  },
  {
    protocolo: "MTV-0008",
    titulo: "Sinalização de obra sem cones suficientes",
    descricao:
      "Frente de serviço isolada com apenas quatro cones em um trecho que exige doze. O afunilamento começa cedo demais e sem placa de advertência.",
    tipo: "obstaculo",
    rodovia: "SP-021 Rodoanel Mário Covas",
    km: 15.6,
    sentido: "interior",
    referencia: "Trecho oeste, faixa de aceleração",
    risco: "medio",
    status: "aberta",
    responsavel: "Beatriz Costa",
    horasAtras: 52,
    foto: "obstaculo-obra",
    coordenada: [-23.4291, -46.8433],
  },
  {
    protocolo: "MTV-0007",
    titulo: "Trinca longitudinal no pavimento",
    descricao:
      "Trinca contínua de cerca de 60 m acompanhando a junta entre as faixas. Ainda não há desnível, mas a infiltração pode evoluir para panela.",
    tipo: "pavimento",
    rodovia: "SP-310 Washington Luís",
    km: 151,
    sentido: "interior",
    referencia: "Entre as faixas 1 e 2, próximo ao acesso de São Carlos",
    risco: "medio",
    status: "aberta",
    responsavel: "Daniel Rocha",
    horasAtras: 70,
    foto: "pavimento-trinca",
    coordenada: [-21.9812, -47.8901],
  },
  {
    protocolo: "MTV-0006",
    titulo: "Placa de limite de velocidade torta",
    descricao:
      "A placa de 110 km/h girou na base e ficou voltada para a faixa de domínio. O condutor não consegue ler a informação em velocidade de operação.",
    tipo: "sinalizacao",
    rodovia: "SP-070 Ayrton Senna",
    km: 25.8,
    sentido: "interior",
    referencia: "Canteiro direito, após o trevo de Itaquaquecetuba",
    risco: "medio",
    status: "resolvida",
    responsavel: "Rafael Mendes",
    horasAtras: 96,
    foto: "sinalizacao-placa",
    coordenada: [-23.4725, -46.4038],
    tramitacao: [
      { status: "em_analise", horasAtras: 90, por: "Rafael Mendes" },
      {
        status: "resolvida",
        horasAtras: 74,
        por: "Equipe de campo 3",
        nota: "Base reapertada e placa reposicionada no ângulo correto.",
      },
    ],
  },
  {
    protocolo: "MTV-0005",
    titulo: "Árvore caída sobre o acostamento",
    descricao:
      "Eucalipto tombou com o vento e ocupou toda a largura do acostamento, sem atingir a pista. Galhos avançam cerca de meio metro sobre a faixa da direita.",
    tipo: "obstaculo",
    rodovia: "SP-075 Santos Dumont",
    km: 20.9,
    sentido: "capital",
    referencia: "Acostamento direito, divisa com área de reflorestamento",
    risco: "alto",
    status: "resolvida",
    responsavel: "Lucas Martins",
    horasAtras: 120,
    foto: "obstaculo-arvore",
    coordenada: [-23.0507, -47.2076],
    tramitacao: [
      { status: "em_analise", horasAtras: 118, por: "Lucas Martins" },
      {
        status: "resolvida",
        horasAtras: 112,
        por: "Equipe de campo 1",
        nota: "Árvore removida e acostamento liberado em 2 h 40.",
      },
    ],
  },
  {
    protocolo: "MTV-0004",
    titulo: "Poste de iluminação apagado no trevo",
    descricao:
      "Três luminárias consecutivas apagadas no acesso ao trevo. O registro foi feito durante o turno da noite e ainda não há foto do poste danificado.",
    tipo: "iluminacao",
    rodovia: "SP-280 Castello Branco",
    km: 47.2,
    sentido: "capital",
    referencia: "Alça de acesso ao trevo de Araçariguama",
    risco: "baixo",
    status: "aberta",
    responsavel: "Stefanny Brum",
    horasAtras: 140,
    coordenada: [-23.4394, -47.0621],
  },
  {
    protocolo: "MTV-0003",
    titulo: "Bueiro obstruído no acostamento",
    descricao:
      "Boca de lobo tomada por folhas e sedimento. Sem escoamento, a água transborda para o acostamento em chuvas de média intensidade.",
    tipo: "drenagem",
    rodovia: "SP-160 Imigrantes",
    km: 30.7,
    sentido: "interior",
    referencia: "Acostamento direito, antes do túnel 4",
    risco: "baixo",
    status: "resolvida",
    responsavel: "Letícia Temóteo",
    horasAtras: 168,
    foto: "drenagem-bueiro",
    coordenada: [-23.7715, -46.5524],
    tramitacao: [
      { status: "resolvida", horasAtras: 150, por: "Equipe de campo 2", nota: "Bueiro desobstruído." },
    ],
  },
  {
    protocolo: "MTV-0002",
    titulo: "Acúmulo de terra no acostamento",
    descricao:
      "Terra carreada do talude cobre cerca de 20 m do acostamento. Não impede a circulação, mas reduz a área de escape em caso de emergência.",
    tipo: "acostamento",
    rodovia: "SP-310 Washington Luís",
    km: 163.5,
    sentido: "capital",
    referencia: "Pé do talude, acostamento direito",
    risco: "baixo",
    status: "resolvida",
    responsavel: "Gustavo Braga",
    horasAtras: 210,
    tramitacao: [
      { status: "em_analise", horasAtras: 200, por: "Gustavo Braga" },
      { status: "resolvida", horasAtras: 180, por: "Equipe de campo 2" },
    ],
  },
  {
    protocolo: "MTV-0001",
    titulo: "Vegetação invadindo a ciclovia lateral",
    descricao:
      "Arbustos avançaram sobre a ciclovia que acompanha a rodovia, estreitando o caminho para pouco mais de meio metro em alguns pontos.",
    tipo: "vegetacao",
    rodovia: "SP-070 Ayrton Senna",
    km: 12.1,
    sentido: "interior",
    referencia: "Ciclovia lateral, margem esquerda",
    risco: "baixo",
    status: "em_analise",
    responsavel: "Bruno Carvalho",
    horasAtras: 260,
    coordenada: [-23.5192, -46.4815],
    tramitacao: [
      { status: "em_analise", horasAtras: 240, por: "Ana Paula Ribeiro", nota: "Roçada incluída na programação da semana." },
    ],
  },
];

function isoHorasAtras(horas: number, base: Date): string {
  return new Date(base.getTime() - horas * 3600 * 1000).toISOString();
}

/**
 * Gera a base de exemplo com datas relativas ao momento da chamada.
 *
 * Datas fixas envelheceriam e a lista apareceria com registros de meses atrás
 * na hora da demonstração. Assim a ocorrência mais nova é sempre "há 3 h".
 */
export function criarOcorrenciasMock(agora: Date = new Date()): Ocorrencia[] {
  return SEMENTES.map((semente) => {
    const criadaEm = isoHorasAtras(semente.horasAtras, agora);

    const historico: EventoHistorico[] = [
      {
        id: `${semente.protocolo}-h0`,
        status: "aberta",
        em: criadaEm,
        por: semente.responsavel,
        nota: "Ocorrência registrada em campo.",
      },
      ...(semente.tramitacao ?? []).map((evento, indice) => ({
        id: `${semente.protocolo}-h${indice + 1}`,
        status: evento.status,
        em: isoHorasAtras(evento.horasAtras, agora),
        por: evento.por,
        nota: evento.nota,
      })),
    ];

    return {
      id: semente.protocolo.toLowerCase(),
      protocolo: semente.protocolo,
      titulo: semente.titulo,
      descricao: semente.descricao,
      tipo: semente.tipo,
      rodovia: semente.rodovia,
      km: semente.km,
      sentido: semente.sentido,
      referencia: semente.referencia,
      risco: semente.risco,
      status: semente.status,
      responsavel: semente.responsavel,
      criadaEm,
      atualizadaEm: historico[historico.length - 1].em,
      fotoUri: semente.foto ? referenciaFotoMock(semente.foto as never) : undefined,
      latitude: semente.coordenada?.[0],
      longitude: semente.coordenada?.[1],
      historico,
    };
  });
}

/** Maior número de protocolo já usado, para continuar a sequência nos novos registros. */
export const ULTIMO_PROTOCOLO = SEMENTES.length;
