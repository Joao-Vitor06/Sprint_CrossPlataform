import { DefaultTheme, NavigationContainer, type Theme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { DetalheOcorrencia } from "../screens/DetalheOcorrencia";
import { FormularioOcorrencia } from "../screens/FormularioOcorrencia";
import { ListaOcorrencias } from "../screens/ListaOcorrencias";
import { fonts, palette } from "../theme";
import type { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

const temaNavegacao: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: palette.action,
    background: palette.background,
    card: palette.headerBackground,
    text: palette.textPrimary,
    border: palette.border,
  },
  fonts: {
    regular: { fontFamily: fonts.regular, fontWeight: "400" },
    medium: { fontFamily: fonts.medium, fontWeight: "500" },
    bold: { fontFamily: fonts.bold, fontWeight: "700" },
    heavy: { fontFamily: fonts.extrabold, fontWeight: "800" },
  },
};

/**
 * Pilha de navegação do app.
 *
 * Cada tela desenha o próprio cabeçalho com `ScreenHeader`, por isso o header
 * nativo fica desligado. O que a pilha traz é a transição animada, o gesto de
 * voltar no iOS e o botão físico de voltar no Android, que a navegação por
 * estado das Sprints anteriores não oferecia.
 */
export function RootNavigator() {
  return (
    <NavigationContainer theme={temaNavegacao}>
      <Stack.Navigator
        initialRouteName="Lista"
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          contentStyle: { backgroundColor: palette.background },
        }}
      >
        <Stack.Screen name="Lista" component={ListaOcorrencias} />
        <Stack.Screen name="Detalhe" component={DetalheOcorrencia} />
        <Stack.Screen
          name="Formulario"
          component={FormularioOcorrencia}
          options={{ animation: "slide_from_bottom" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
