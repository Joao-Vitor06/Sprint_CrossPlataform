import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useColorScheme } from "react-native";

import { colors } from "./colors";

export type ThemeMode = "light" | "dark";

export type ThemePalette = {
  background: string;
  surface: string;
  surfaceMuted: string;
  border: string;
  borderStrong: string;
  headerBackground: string;
  headerText: string;
  headerTextMuted: string;
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textInverse: string;
  action: string;
  actionPressed: string;
  actionSoft: string;
  actionSoftText: string;
  danger: string;
  dangerSoft: string;
  success: string;
  successSoft: string;
};

export type AppTheme = {
  mode: ThemeMode;
  palette: ThemePalette;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
};

const LIGHT_PALETTE: ThemePalette = {
  background: colors.slate100,
  surface: colors.white,
  surfaceMuted: colors.slate50,
  border: colors.slate200,
  borderStrong: colors.slate300,
  headerBackground: colors.navy900,
  headerText: colors.white,
  headerTextMuted: "#A8C0DE",
  textPrimary: colors.slate900,
  textSecondary: colors.slate600,
  textMuted: colors.slate400,
  textInverse: colors.white,
  action: colors.blue600,
  actionPressed: "#1D4ED8",
  actionSoft: colors.blue50,
  actionSoftText: "#1D4ED8",
  danger: colors.red600,
  dangerSoft: colors.red50,
  success: colors.green600,
  successSoft: colors.green50,
};

const DARK_PALETTE: ThemePalette = {
  background: "#0B1220",
  surface: "#111827",
  surfaceMuted: "#162033",
  border: "#273449",
  borderStrong: "#3A4A63",
  headerBackground: "#071A33",
  headerText: "#F8FAFC",
  headerTextMuted: "#9FB5D1",
  textPrimary: "#F8FAFC",
  textSecondary: "#CBD5E1",
  textMuted: "#94A3B8",
  textInverse: "#FFFFFF",
  action: "#60A5FA",
  actionPressed: "#3B82F6",
  actionSoft: "#172554",
  actionSoftText: "#BFDBFE",
  danger: "#F87171",
  dangerSoft: "#3A1F24",
  success: "#4ADE80",
  successSoft: "#143222",
};

const CHAVE_TEMA = "@motiva_safety:theme";

const ThemeContext = createContext<AppTheme | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const sistema = useColorScheme();
  const [mode, setModeState] = useState<ThemeMode>(sistema === "dark" ? "dark" : "light");
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    void AsyncStorage.getItem(CHAVE_TEMA).then((salvo) => {
      if (salvo === "dark" || salvo === "light") {
        setModeState(salvo);
      }
      setCarregado(true);
    });
  }, []);

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next);
    void AsyncStorage.setItem(CHAVE_TEMA, next);
  }, []);

  const toggleMode = useCallback(() => {
    setMode(mode === "light" ? "dark" : "light");
  }, [mode, setMode]);

  const value = useMemo<AppTheme>(
    () => ({
      mode,
      palette: mode === "dark" ? DARK_PALETTE : LIGHT_PALETTE,
      setMode,
      toggleMode,
    }),
    [mode, setMode, toggleMode]
  );

  if (!carregado) return null;

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useAppTheme precisa estar dentro de <ThemeProvider>.");
  }
  return context;
}
