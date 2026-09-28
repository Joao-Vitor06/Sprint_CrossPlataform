import { useCallback, useEffect } from "react";
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
import { ThemeProvider, useAppTheme } from "./src/theme";

void SplashScreen.preventAutoHideAsync();

function AppShell() {
  const { palette, mode } = useAppTheme();

  return (
    <View style={{ flex: 1, backgroundColor: palette.background }}>
      <StatusBar style={mode === "dark" ? "light" : "dark"} backgroundColor={palette.headerBackground} />
      <OcorrenciasProvider>
        <ToastProvider>
          <RootNavigator />
        </ToastProvider>
      </OcorrenciasProvider>
    </View>
  );
}

export default function App() {
  const [fontesCarregadas, erroFontes] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
  });

  const pronto = fontesCarregadas || Boolean(erroFontes);

  const aoDesenhar = useCallback(() => {
    if (pronto) void SplashScreen.hideAsync();
  }, [pronto]);

  useEffect(() => {
    if (pronto) void SplashScreen.hideAsync();
  }, [pronto]);

  if (!pronto) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={aoDesenhar}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AppShell />
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
