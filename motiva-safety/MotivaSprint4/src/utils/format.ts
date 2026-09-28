/** Formatações de exibição. Tudo em pt-BR, já que o app é usado só no Brasil. */

const MESES = [
  "jan",
  "fev",
  "mar",
  "abr",
  "mai",
  "jun",
  "jul",
  "ago",
  "set",
  "out",
  "nov",
  "dez",
];

function doisDigitos(valor: number): string {
  return String(valor).padStart(2, "0");
}

/** "18/08/2026 às 14:32" */
export function formatarDataHora(iso: string): string {
  const data = new Date(iso);
  if (Number.isNaN(data.getTime())) return iso;

  return (
    `${doisDigitos(data.getDate())}/${doisDigitos(data.getMonth() + 1)}/${data.getFullYear()}` +
    ` às ${doisDigitos(data.getHours())}:${doisDigitos(data.getMinutes())}`
  );
}

/** "18 ago" — usado nos cards, onde espaço é curto. */
export function formatarDataCurta(iso: string): string {
  const data = new Date(iso);
  if (Number.isNaN(data.getTime())) return iso;

  return `${doisDigitos(data.getDate())} ${MESES[data.getMonth()]}`;
}

/**
 * Tempo relativo ("há 2 h", "há 3 d"). Deixa claro no card se a ocorrência é
 * recente sem ocupar espaço com a data completa.
 */
export function formatarTempoRelativo(iso: string, agora: Date = new Date()): string {
  const data = new Date(iso);
  if (Number.isNaN(data.getTime())) return iso;

  const segundos = Math.floor((agora.getTime() - data.getTime()) / 1000);
  if (segundos < 60) return "agora";

  const minutos = Math.floor(segundos / 60);
  if (minutos < 60) return `há ${minutos} min`;

  const horas = Math.floor(minutos / 60);
  if (horas < 24) return `há ${horas} h`;

  const dias = Math.floor(horas / 24);
  if (dias < 30) return `há ${dias} d`;

  const meses = Math.floor(dias / 30);
  if (meses < 12) return `há ${meses} ${meses === 1 ? "mês" : "meses"}`;

  return `há ${Math.floor(meses / 12)} a`;
}

/** "km 42,5" — quilômetro de rodovia usa vírgula decimal e uma casa. */
export function formatarKm(km: number): string {
  return `km ${km.toFixed(1).replace(".", ",")}`;
}

/**
 * "Lat -23,561410 · Lon -46,656160"
 *
 * Os rótulos existem porque a vírgula decimal do pt-BR deixaria "-23,561410,
 * -46,656160" ambíguo: não dá para saber onde termina a latitude.
 */
export function formatarCoordenadas(latitude: number, longitude: number): string {
  const formatar = (valor: number) => valor.toFixed(6).replace(".", ",");
  return `Lat ${formatar(latitude)} · Lon ${formatar(longitude)}`;
}

/** Aceita "42", "42.5" ou "42,5" e devolve o número, ou null se não for válido. */
export function interpretarKm(entrada: string): number | null {
  const limpo = entrada.trim().replace(",", ".");
  if (limpo === "") return null;

  const numero = Number(limpo);
  if (!Number.isFinite(numero) || numero < 0 || numero > 2000) return null;

  return numero;
}

/** Remove acentos e caixa para que a busca por "vegetacao" encontre "vegetação". */
export function normalizar(texto: string): string {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}
