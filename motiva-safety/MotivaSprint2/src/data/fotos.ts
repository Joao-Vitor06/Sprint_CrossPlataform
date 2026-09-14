import type { ImageSourcePropType } from "react-native";

/**
 * Fotos de exemplo empacotadas junto com o app.
 *
 * Ficam no bundle em vez de virem de uma URL para que a demonstração funcione
 * mesmo sem internet. Créditos e licenças em `assets/ocorrencias/CREDITOS.md`.
 */
const FOTOS_EMBUTIDAS: Record<string, ImageSourcePropType> = {
  "vegetacao-alta": require("../../assets/ocorrencias/vegetacao-alta.jpg"),
  "pavimento-buraco": require("../../assets/ocorrencias/pavimento-buraco.jpg"),
  "pavimento-trinca": require("../../assets/ocorrencias/pavimento-trinca.jpg"),
  "sinalizacao-placa": require("../../assets/ocorrencias/sinalizacao-placa.jpg"),
  "sinalizacao-pintura": require("../../assets/ocorrencias/sinalizacao-pintura.jpg"),
  "drenagem-alagamento": require("../../assets/ocorrencias/drenagem-alagamento.jpg"),
  "drenagem-bueiro": require("../../assets/ocorrencias/drenagem-bueiro.jpg"),
  "obstaculo-obra": require("../../assets/ocorrencias/obstaculo-obra.jpg"),
  "obstaculo-arvore": require("../../assets/ocorrencias/obstaculo-arvore.jpg"),
  "acostamento-defensa": require("../../assets/ocorrencias/acostamento-defensa.jpg"),
  "animal-pista": require("../../assets/ocorrencias/animal-pista.jpg"),
};

/** Prefixo que marca uma foto de exemplo, separando-a das fotos tiradas no app. */
export const PREFIXO_MOCK = "mock:";

export function referenciaFotoMock(chave: keyof typeof FOTOS_EMBUTIDAS): string {
  return `${PREFIXO_MOCK}${chave}`;
}

/**
 * Converte o campo `fotoUri` no source que o `expo-image` entende.
 *
 * Guardar uma string (e não o resultado do require) permite salvar a ocorrência
 * no AsyncStorage como JSON, tanto para as fotos de exemplo quanto para as que
 * o operador tira com a câmera.
 */
export function resolverFoto(fotoUri?: string): ImageSourcePropType | undefined {
  if (!fotoUri) return undefined;

  if (fotoUri.startsWith(PREFIXO_MOCK)) {
    return FOTOS_EMBUTIDAS[fotoUri.slice(PREFIXO_MOCK.length)];
  }

  return { uri: fotoUri };
}
