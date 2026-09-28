import type { NativeStackScreenProps } from "@react-navigation/native-stack";

/**
 * Rotas do app.
 *
 * O formulário é uma rota só: sem `ocorrenciaId` ele cadastra, com `ocorrenciaId`
 * ele edita. Isso evita duplicar a tela mais complexa do produto.
 */
export type RootStackParamList = {
  Lista: undefined;
  Formulario: { ocorrenciaId?: string } | undefined;
  Detalhe: { ocorrenciaId: string };
};

export type PropsLista = NativeStackScreenProps<RootStackParamList, "Lista">;
export type PropsFormulario = NativeStackScreenProps<RootStackParamList, "Formulario">;
export type PropsDetalhe = NativeStackScreenProps<RootStackParamList, "Detalhe">;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
