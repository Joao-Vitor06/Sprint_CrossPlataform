import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Animated, Platform, Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import { colors, palette, radius, shadows, spacing } from "../theme";
import { AppText } from "./AppText";

type TipoToast = "sucesso" | "erro" | "info";

type Toast = {
  tipo: TipoToast;
  titulo: string;
  descricao?: string;
};

type ContextoToast = {
  mostrar: (toast: Toast) => void;
};

const ToastContext = createContext<ContextoToast | null>(null);

const VISUAL: Record<TipoToast, { fundo: string; borda: string; cor: string; icone: keyof typeof Ionicons.glyphMap }> = {
  sucesso: {
    fundo: colors.green50,
    borda: colors.green500,
    cor: colors.green600,
    icone: "checkmark-circle",
  },
  erro: { fundo: colors.red50, borda: colors.red500, cor: colors.red600, icone: "alert-circle" },
  info: { fundo: colors.blue50, borda: colors.blue500, cor: colors.blue600, icone: "information-circle" },
};

const DURACAO_MS = 3200;

/**
 * Feedback de sucesso e erro do app.
 *
 * Substitui o Alert.alert do sistema: o alerta nativo interrompe o usuário e
 * exige um toque em "OK", enquanto o toast confirma a ação e some sozinho.
 * Alertas modais ficam reservados para confirmações destrutivas (ConfirmSheet).
 */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<Toast | null>(null);
  const insets = useSafeAreaInsets();
  const deslocamento = useRef(new Animated.Value(-140)).current;
  const temporizador = useRef<ReturnType<typeof setTimeout> | null>(null);

  const esconder = useCallback(() => {
    Animated.timing(deslocamento, {
      toValue: -140,
      duration: 200,
      useNativeDriver: true,
    }).start(() => setToast(null));
  }, [deslocamento]);

  const mostrar = useCallback(
    (novo: Toast) => {
      if (temporizador.current) clearTimeout(temporizador.current);

      if (Platform.OS !== "web") {
        const estilo =
          novo.tipo === "erro"
            ? Haptics.NotificationFeedbackType.Error
            : Haptics.NotificationFeedbackType.Success;
        Haptics.notificationAsync(estilo).catch(() => {
          // Vibração é um detalhe opcional: se o aparelho não suportar, segue sem.
        });
      }

      setToast(novo);
      Animated.spring(deslocamento, {
        toValue: 0,
        useNativeDriver: true,
        damping: 18,
        stiffness: 180,
      }).start();

      temporizador.current = setTimeout(esconder, DURACAO_MS);
    },
    [deslocamento, esconder]
  );

  useEffect(() => {
    return () => {
      if (temporizador.current) clearTimeout(temporizador.current);
    };
  }, []);

  const valor = useMemo(() => ({ mostrar }), [mostrar]);
  const visual = toast ? VISUAL[toast.tipo] : null;

  return (
    <ToastContext.Provider value={valor}>
      {children}

      {toast && visual ? (
        <Animated.View
          style={[
            styles.wrapper,
            { top: insets.top + spacing.sm, transform: [{ translateY: deslocamento }] },
          ]}
        >
          <Pressable
            onPress={esconder}
            accessibilityRole="alert"
            accessibilityLabel={`${toast.titulo}. ${toast.descricao ?? ""}`}
            style={[styles.toast, { backgroundColor: visual.fundo, borderColor: visual.borda }]}
          >
            <Ionicons name={visual.icone} size={22} color={visual.cor} />
            <View style={styles.textos}>
              <AppText variant="label" color={visual.cor}>
                {toast.titulo}
              </AppText>
              {toast.descricao ? (
                <AppText variant="caption" color={palette.textSecondary}>
                  {toast.descricao}
                </AppText>
              ) : null}
            </View>
          </Pressable>
        </Animated.View>
      ) : null}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const contexto = useContext(ToastContext);
  if (!contexto) {
    throw new Error("useToast precisa estar dentro de <ToastProvider>.");
  }
  return contexto;
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: spacing.lg,
    right: spacing.lg,
    zIndex: 1000,
    // Deixa passar o toque fora do toast, para não bloquear a tela por baixo.
    pointerEvents: "box-none",
  },
  toast: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    borderRadius: radius.md,
    borderLeftWidth: 4,
    borderWidth: 1,
    padding: spacing.lg,
    ...shadows.lg,
  },
  textos: {
    flex: 1,
    gap: spacing.xxs,
  },
});
