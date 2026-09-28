import type { EventoHistorico, IntervencaoVegetacao, Ocorrencia, StatusOcorrencia, TipoIntervencao } from "../types";
import { referenciaFotoMock } from "./fotos";

type Semente = {
  protocolo: string;
  titulo: string;
  descricao: string;
  tipo: Ocorrencia["tipo"];
  rodovia: string;
  km: number;
  sentido: Ocorrencia["sentido"];
  referencia: string;
  alturaAtualCm: number;
  limiteCm: number;
  risco: Ocorrencia["risco"];
  status: StatusOcorrencia;
  responsavel: string;
  horasAtras: number;
  foto?: string;
  coordenada?: [number, number];
  tramitacao?: Array<{ status: StatusOcorrencia; horasAtras: number; por: string; nota?: string }>;
  intervencoes?: Array<{
    tipo: TipoIntervencao;
    horasAtras: number;
    equipe: string;
    alturaAntesCm?: number;
    alturaDepoisCm?: number;
    observacao?: string;
  }>;
};

const SEMENTES: Semente[] = [
  { protocolo:"MTV-0014", titulo:"Vegetação acima de 1,5 m no trecho operacional", descricao:"Vegetação com 1,72 m, acima do limite de 1,50 m definido para o trecho. O volume reduz a visibilidade da faixa de domínio.", tipo:"vegetacao_alta", rodovia:"SP-348 Bandeirantes", km:42.5, sentido:"interior", referencia:"Faixa de domínio direita, antes da saída 42", alturaAtualCm:172, limiteCm:150, risco:"alto", status:"aberta", responsavel:"Carlos Souza", horasAtras:3, foto:"vegetacao-alta", coordenada:[-23.1512,-46.9488] },
  { protocolo:"MTV-0013", titulo:"Vegetação encobrindo placa de saída", descricao:"Vegetação lateral avançou sobre a sinalização vertical. A placa fica parcialmente encoberta e perde visibilidade para o motorista.", tipo:"vegetacao_sinalizacao", rodovia:"SP-330 Anhanguera", km:72.3, sentido:"interior", referencia:"Placa de saída, faixa de domínio direita", alturaAtualCm:164, limiteCm:150, risco:"alto", status:"em_analise", responsavel:"Marcos Lima", horasAtras:9, foto:"vegetacao-alta", coordenada:[-23.0864,-46.9512], tramitacao:[{status:"em_analise",horasAtras:6,por:"Juliana Alves",nota:"Equipe de conservação acionada para vistoria e programação da roçada."}] },
  { protocolo:"MTV-0012", titulo:"Vegetação invadindo o acostamento", descricao:"Arbustos avançaram cerca de 80 cm sobre o acostamento, reduzindo a área livre de escape e a visibilidade do bordo da pista.", tipo:"vegetacao_acostamento", rodovia:"SP-280 Castello Branco", km:158.3, sentido:"interior", referencia:"Acostamento direito, após o viaduto", alturaAtualCm:138, limiteCm:100, risco:"alto", status:"aberta", responsavel:"Ana Paula Ribeiro", horasAtras:14, foto:"vegetacao-alta", coordenada:[-23.5051,-46.9203] },
  { protocolo:"MTV-0011", titulo:"Vegetação sobre canaleta de drenagem", descricao:"Capim e arbustos cobrem a canaleta lateral, dificultando a inspeção e o escoamento da água no trecho.", tipo:"vegetacao_drenagem", rodovia:"SP-270 Raposo Tavares", km:135.3, sentido:"capital", referencia:"Canaleta lateral, trecho de serra", alturaAtualCm:121, limiteCm:80, risco:"alto", status:"em_analise", responsavel:"Felipe Nunes", horasAtras:33, foto:"vegetacao-alta", coordenada:[-23.7831,-46.4796], tramitacao:[{status:"em_analise",horasAtras:28,por:"Felipe Nunes",nota:"Roçada e limpeza da canaleta programadas."}] },
  { protocolo:"MTV-0010", titulo:"Vegetação alta na faixa de domínio", descricao:"Massa vegetal contínua acima do limite operacional em aproximadamente 400 m do trecho.", tipo:"vegetacao_alta", rodovia:"SP-300 Dom Gabriel Paulino Bueno Couto", km:63.8, sentido:"interior", referencia:"Faixa de domínio direita, próximo ao acesso local", alturaAtualCm:156, limiteCm:120, risco:"alto", status:"aberta", responsavel:"Ricardo Ferreira", horasAtras:48, foto:"vegetacao-alta", coordenada:[-23.0201,-47.0451] },
  { protocolo:"MTV-0009", titulo:"Vegetação encobrindo defensas e marco quilométrico", descricao:"Vegetação lateral dificulta a inspeção visual da defensa e encobre parcialmente o marco quilométrico.", tipo:"vegetacao_sinalizacao", rodovia:"SP-348 Bandeirantes", km:58.1, sentido:"capital", referencia:"Acostamento direito, próximo ao posto de pesagem", alturaAtualCm:132, limiteCm:100, risco:"medio", status:"em_analise", responsavel:"Juliana Alves", horasAtras:60, foto:"vegetacao-alta", coordenada:[-23.0219,-47.0125], tramitacao:[{status:"em_analise",horasAtras:54,por:"Rafael Mendes",nota:"Trecho incluído na rota semanal de conservação."}] },
  { protocolo:"MTV-0008", titulo:"Roçada preventiva próxima a acesso", descricao:"Vegetação está próxima do limite de intervenção e exige acompanhamento para evitar perda de visibilidade no acesso.", tipo:"vegetacao_alta", rodovia:"SP-255 João Mellão", km:240.3, sentido:"interior", referencia:"Faixa de domínio próxima ao acesso", alturaAtualCm:96, limiteCm:100, risco:"medio", status:"aberta", responsavel:"Beatriz Costa", horasAtras:72, foto:"vegetacao-alta", coordenada:[-21.912,-48.102] },
  { protocolo:"MTV-0007", titulo:"Vegetação sobre área de drenagem", descricao:"Capim alto cobre a saída da drenagem e dificulta a inspeção do dispositivo.", tipo:"vegetacao_drenagem", rodovia:"SP-127 Antônio Romano Schincariol", km:133.9, sentido:"capital", referencia:"Saída de drenagem, margem direita", alturaAtualCm:110, limiteCm:80, risco:"medio", status:"aberta", responsavel:"Daniel Rocha", horasAtras:86, foto:"vegetacao-alta", coordenada:[-22.745,-48.152] },
  { protocolo:"MTV-0006", titulo:"Vegetação lateral dentro do limite", descricao:"Trecho monitorado apresenta crescimento controlado, sem necessidade imediata de intervenção.", tipo:"vegetacao_alta", rodovia:"SP-270 Raposo Tavares", km:135.5, sentido:"interior", referencia:"Faixa de domínio direita", alturaAtualCm:72, limiteCm:100, risco:"baixo", status:"resolvida", responsavel:"Rafael Mendes", horasAtras:96, foto:"vegetacao-alta", coordenada:[-23.4725,-46.4038], tramitacao:[{status:"em_analise",horasAtras:90,por:"Rafael Mendes"},{status:"resolvida",horasAtras:74,por:"Equipe de conservação 3",nota:"Roçada executada e altura reduzida para 62 cm."}], intervencoes:[{tipo:"rocada_executada",horasAtras:74,equipe:"Equipe de conservação 3",alturaAntesCm:118,alturaDepoisCm:62,observacao:"Intervenção concluída no trecho."}] },
  { protocolo:"MTV-0005", titulo:"Roçada concluída junto à sinalização", descricao:"Trecho que apresentava vegetação cobrindo parcialmente a placa foi tratado pela equipe de conservação.", tipo:"vegetacao_sinalizacao", rodovia:"SP-258 Francisco Alves Negrão", km:250.1, sentido:"capital", referencia:"Placa lateral, faixa de domínio", alturaAtualCm:58, limiteCm:100, risco:"baixo", status:"resolvida", responsavel:"Lucas Martins", horasAtras:120, foto:"vegetacao-alta", coordenada:[-23.0507,-47.2076], tramitacao:[{status:"em_analise",horasAtras:118,por:"Lucas Martins"},{status:"resolvida",horasAtras:112,por:"Equipe de campo 1",nota:"Roçada executada e sinalização liberada."}], intervencoes:[{tipo:"rocada_executada",horasAtras:112,equipe:"Equipe de campo 1",alturaAntesCm:145,alturaDepoisCm:58,observacao:"Placa totalmente visível após a intervenção."}] },
  { protocolo:"MTV-0004", titulo:"Vegetação em crescimento no canteiro lateral", descricao:"Crescimento recente ainda abaixo do limite, acompanhado para programação preventiva.", tipo:"vegetacao_alta", rodovia:"SP-280 Castello Branco", km:208.4, sentido:"capital", referencia:"Canteiro lateral do trevo", alturaAtualCm:88, limiteCm:100, risco:"baixo", status:"aberta", responsavel:"Stefanny Brum", horasAtras:140, coordenada:[-23.4394,-47.0621] },
  { protocolo:"MTV-0003", titulo:"Poda necessária próxima a equipamento", descricao:"Vegetação arbustiva cresce lateralmente próxima a equipamento de inspeção e requer poda de contenção.", tipo:"vegetacao_acostamento", rodovia:"SP-258 Francisco Alves Negrão", km:326.6, sentido:"interior", referencia:"Acostamento direito, antes do túnel 4", alturaAtualCm:115, limiteCm:100, risco:"medio", status:"resolvida", responsavel:"Letícia Temóteo", horasAtras:168, foto:"vegetacao-alta", coordenada:[-23.7715,-46.5524], tramitacao:[{status:"resolvida",horasAtras:150,por:"Equipe de campo 2",nota:"Poda executada e área liberada."}], intervencoes:[{tipo:"poda",horasAtras:150,equipe:"Equipe de campo 2",alturaAntesCm:115,alturaDepoisCm:55,observacao:"Poda de contenção concluída."}] },
  { protocolo:"MTV-0002", titulo:"Trecho monitorado dentro do padrão", descricao:"Vegetação uniforme e abaixo do limite operacional. Registro mantido como referência de conformidade.", tipo:"vegetacao_alta", rodovia:"SP-280 Castello Branco", km:278.0, sentido:"capital", referencia:"Pé do talude, faixa de domínio direita", alturaAtualCm:64, limiteCm:100, risco:"baixo", status:"resolvida", responsavel:"Gustavo Braga", horasAtras:210, foto:"vegetacao-alta", coordenada:[-21.982,-47.89], tramitacao:[{status:"resolvida",horasAtras:180,por:"Equipe de campo 2",nota:"Inspeção concluída; trecho dentro do padrão."}], intervencoes:[{tipo:"inspecao",horasAtras:180,equipe:"Equipe de campo 2",alturaAntesCm:64,alturaDepoisCm:64,observacao:"Sem necessidade de roçada."}] },
  { protocolo:"MTV-0001", titulo:"Vegetação invadindo a faixa lateral", descricao:"Arbustos avançaram sobre a área lateral de circulação e exigem intervenção de roçada.", tipo:"vegetacao_acostamento", rodovia:"SP-127 Francisco da Silva Pontes", km:196.7, sentido:"interior", referencia:"Margem esquerda, próximo à ciclovia lateral", alturaAtualCm:126, limiteCm:100, risco:"medio", status:"em_analise", responsavel:"Bruno Carvalho", horasAtras:260, foto:"vegetacao-alta", coordenada:[-23.5192,-46.4815], tramitacao:[{status:"em_analise",horasAtras:240,por:"Ana Paula Ribeiro",nota:"Roçada incluída na programação da semana."}] },
];

function isoHorasAtras(horas:number, base:Date){return new Date(base.getTime()-horas*3600*1000).toISOString();}

export function criarOcorrenciasMock(agora:Date=new Date()):Ocorrencia[]{
  return SEMENTES.map((s)=>{
    const criadaEm=isoHorasAtras(s.horasAtras,agora);
    const historico:EventoHistorico[]=[
      {id:`${s.protocolo}-h0`,status:"aberta",em:criadaEm,por:s.responsavel,nota:"Registro da vegetação realizado em campo."},
      ...(s.tramitacao??[]).map((e,i)=>({id:`${s.protocolo}-h${i+1}`,status:e.status,em:isoHorasAtras(e.horasAtras,agora),por:e.por,nota:e.nota}))
    ];
    const intervencoes:IntervencaoVegetacao[]=(s.intervencoes??[]).map((e,i)=>({id:`${s.protocolo}-i${i}`,tipo:e.tipo,em:isoHorasAtras(e.horasAtras,agora),equipe:e.equipe,alturaAntesCm:e.alturaAntesCm,alturaDepoisCm:e.alturaDepoisCm,observacao:e.observacao}));
    return {
      id:s.protocolo.toLowerCase(),protocolo:s.protocolo,titulo:s.titulo,descricao:s.descricao,tipo:s.tipo,
      rodovia:s.rodovia,km:s.km,sentido:s.sentido,referencia:s.referencia,alturaAtualCm:s.alturaAtualCm,limiteCm:s.limiteCm,
      risco:s.risco,status:s.status,responsavel:s.responsavel,criadaEm,atualizadaEm:historico[historico.length-1].em,
      fotoUri:s.foto?referenciaFotoMock(s.foto as never):undefined,latitude:s.coordenada?.[0],longitude:s.coordenada?.[1],
      historico,intervencoes
    };
  });
}
export const ULTIMO_PROTOCOLO=SEMENTES.length;
