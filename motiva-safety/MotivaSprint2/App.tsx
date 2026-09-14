import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/inter";

import { ToastProvider } from "./src/components";
import { OcorrenciasProvider } from "./src/context/OcorrenciasContext";
import { RootNavigator } from "./src/navigation/RootNavigator";
import { palette } from "./src/theme";

// Mantém a splash na tela até as fontes carregarem, evitando o "pulo" de fonte.
void SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontesCarregadas, erroFontes] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  const [pronto, setPronto] = useState(false);

  // Se a fonte falhar, o app segue com a fonte do sistema em vez de travar.
  useEffect(() => {
    if (fontesCarregadas || erroFontes) setPronto(true);
  }, [fontesCarregadas, erroFontes]);

  const aoDesenhar = useCallback(() => {
    if (pronto) void SplashScreen.hideAsync();
  }, [pronto]);

  if (!pronto) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={aoDesenhar}>
      <SafeAreaProvider>
        <View style={{ flex: 1, backgroundColor: palette.background }}>
          <StatusBar style="light" />
          <OcorrenciasProvider>
            <ToastProvider>
              <RootNavigator />
            </ToastProvider>
          </OcorrenciasProvider>
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
