import { useCallback, useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";

import {
  AppText,
  Button,
  ConfirmSheet,
  FilterChips,
  Input,
  ScreenHeader,
  SeletorFoto,
  SeletorRisco,
  SeletorTipo,
  useToast,
  type Chip,
} from "../components";
import { useOcorrencias } from "../context/OcorrenciasContext";
import type { PropsFormulario } from "../navigation/types";
import { SENTIDO, colors, palette, radius, shadows, spacing } from "../theme";
import type { DadosFormularioOcorrencia, SentidoRodovia } from "../types";
import { formatarCoordenadas, interpretarKm } from "../utils/format";

/** Rodovias mais registradas, oferecidas como atalho para não digitar tudo. */
const RODOVIAS_FREQUENTES = [
  "SP-348 Bandeirantes",
  "SP-330 Anhanguera",
  "SP-070 Ayrton Senna",
  "SP-280 Castello Branco",
  "SP-021 Rodoanel Mário Covas",
  "SP-310 Washington Luís",
];

const CHIPS_SENTIDO: Chip<SentidoRodovia>[] = [
  { valor: "capital", label: SENTIDO.capital.label },
  { valor: "interior", label: SENTIDO.interior.label },
];

const VALOR_INICIAL: DadosFormularioOcorrencia = {
  titulo: "",
  descricao: "",
  tipo: "pavimento",
  rodovia: "",
  km: "",
  sentido: "capital",
  referencia: "",
  risco: "medio",
  responsavel: "",
};

type Erros = Partial<Record<keyof DadosFormularioOcorrencia, string>>;

/** Validação do formulário. Devolve todos os problemas de uma vez. */
function validar(dados: DadosFormularioOcorrencia): Erros {
  const erros: Erros = {};

  if (dados.titulo.trim().length < 6) {
    erros.titulo = "Descreva o problema em pelo menos 6 caracteres.";
  }
  if (dados.descricao.trim().length < 20) {
    erros.descricao = "Detalhe o que foi encontrado em pelo menos 20 caracteres.";
  }
  if (dados.rodovia.trim() === "") {
    erros.rodovia = "Informe a rodovia do trecho.";
  }
  if (interpretarKm(dados.km) === null) {
    erros.km = "Informe o quilômetro, por exemplo 42,5.";
  }
  if (dados.referencia.trim() === "") {
    erros.referencia = "Informe uma referência do ponto exato.";
  }
  if (dados.responsavel.trim() === "") {
    erros.responsavel = "Informe quem está registrando.";
  }
  if (!dados.fotoUri) {
    erros.fotoUri = "A foto da evidência é obrigatória.";
  }

  return erros;
}

/**
 * Cadastro e edição de ocorrência.
 *
 * A mesma tela atende os dois casos: sem `ocorrenciaId` na rota ela cria um
 * registro novo, com `ocorrenciaId` ela carrega os dados existentes e salva por
 * cima. Os erros aparecem embaixo de cada campo, e não em um alerta do sistema.
 */
export function FormularioOcorrencia({ navigation, route }: PropsFormulario) {
  const ocorrenciaId = route.params?.ocorrenciaId;
  const { obter, criar, atualizar, salvando } = useOcorrencias();
  const { mostrar } = useToast();
  const insets = useSafeAreaInsets();

  const original = ocorrenciaId ? obter(ocorrenciaId) : undefined;
  const edicao = Boolean(original);

  const [dados, setDados] = useState<DadosFormularioOcorrencia>(() => {
    if (!original) return VALOR_INICIAL;

    return {
      titulo: original.titulo,
      descricao: original.descricao,
      tipo: original.tipo,
      rodovia: original.rodovia,
      km: String(original.km).replace(".", ","),
      sentido: original.sentido,
      referencia: original.referencia,
      risco: original.risco,
      responsavel: original.responsavel,
      fotoUri: original.fotoUri,
      latitude: original.latitude,
      longitude: original.longitude,
    };
  });

  const [erros, setErros] = useState<Erros>({});
  const [tentouSalvar, setTentouSalvar] = useState(false);
  const [buscandoGps, setBuscandoGps] = useState(false);
  const [processandoFoto, setProcessandoFoto] = useState(false);
  const [confirmarSaida, setConfirmarSaida] = useState(false);

  const alterado = useMemo(() => {
    if (!original) {
      return JSON.stringify(dados) !== JSON.stringify(VALOR_INICIAL);
    }
    return (
      dados.titulo !== original.titulo ||
      dados.descricao !== original.descricao ||
      dados.tipo !== original.tipo ||
      dados.rodovia !== original.rodovia ||
      interpretarKm(dados.km) !== original.km ||
      dados.sentido !== original.sentido ||
      dados.referencia !== original.referencia ||
      dados.risco !== original.risco ||
      dados.responsavel !== original.responsavel ||
      dados.fotoUri !== original.fotoUri
    );
  }, [dados, original]);

  /** Depois da primeira tentativa de salvar, a validação passa a ser ao vivo. */
  const alterar = useCallback(
    <C extends keyof DadosFormularioOcorrencia>(
      campo: C,
      valor: DadosFormularioOcorrencia[C]
    ) => {
      setDados((atual) => {
        const proximo = { ...atual, [campo]: valor };
        if (tentouSalvar) setErros(validar(proximo));
        return proximo;
      });
    },
    [tentouSalvar]
  );

  const tirarFoto = useCallback(async () => {
    setProcessandoFoto(true);
    try {
      const permissao = await ImagePicker.requestCameraPermissionsAsync();
      if (!permissao.granted) {
        mostrar({
          tipo: "erro",
          titulo: "Câmera bloqueada",
          descricao: "Libere o acesso à câmera nas configurações do aparelho.",
        });
        return;
      }

      const resultado = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
      });

      if (!resultado.canceled && resultado.assets[0]) {
        alterar("fotoUri", resultado.assets[0].uri);
      }
    } catch {
      mostrar({
        tipo: "erro",
        titulo: "Não foi possível abrir a câmera",
        descricao: "Tente anexar a foto pela galeria.",
      });
    } finally {
      setProcessandoFoto(false);
    }
  }, [alterar, mostrar]);

  const escolherDaGaleria = useCallback(async () => {
    setProcessandoFoto(true);
    try {
      const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permissao.granted) {
        mostrar({
          tipo: "erro",
          titulo: "Galeria bloqueada",
          descricao: "Libere o acesso às fotos nas configurações do aparelho.",
        });
        return;
      }

      const resultado = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
      });

      if (!resultado.canceled && resultado.assets[0]) {
        alterar("fotoUri", resultado.assets[0].uri);
      }
    } catch {
      mostrar({
        tipo: "erro",
        titulo: "Não foi possível abrir a galeria",
        descricao: "Tente registrar a foto pela câmera.",
      });
    } finally {
      setProcessandoFoto(false);
    }
  }, [alterar, mostrar]);

  /**
   * Preenche referência e coordenadas com a posição atual.
   *
   * O endereço reverso é um bônus: se ele falhar, as coordenadas continuam
   * salvas, porque é a latitude e longitude que a equipe usa para chegar ao ponto.
   */
  const usarGps = useCallback(async () => {
    setBuscandoGps(true);
    try {
      const permissao = await Location.requestForegroundPermissionsAsync();
      if (!permissao.granted) {
        mostrar({
          tipo: "erro",
          titulo: "Localização bloqueada",
          descricao: "Você ainda pode informar a referência do trecho manualmente.",
        });
        return;
      }

      const posicao = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      setDados((atual) => ({
        ...atual,
        latitude: posicao.coords.latitude,
        longitude: posicao.coords.longitude,
      }));

      try {
        const [endereco] = await Location.reverseGeocodeAsync(posicao.coords);
        const partes = [endereco?.street, endereco?.district, endereco?.city].filter(Boolean);

        if (partes.length > 0) {
          setDados((atual) => ({
            ...atual,
            referencia: atual.referencia.trim() === "" ? partes.join(", ") : atual.referencia,
          }));
        }
      } catch {
        // Sem endereço reverso a coordenada já resolve.
      }

      mostrar({
        tipo: "sucesso",
        titulo: "Localização capturada",
        descricao: "As coordenadas foram anexadas à ocorrência.",
      });
    } catch {
      mostrar({
        tipo: "erro",
        titulo: "Não foi possível obter a localização",
        descricao: "Confira se o GPS do aparelho está ligado.",
      });
    } finally {
      setBuscandoGps(false);
    }
  }, [mostrar]);

  const salvar = useCallback(async () => {
    setTentouSalvar(true);
    const problemas = validar(dados);
    setErros(problemas);

    if (Object.keys(problemas).length > 0) {
      mostrar({
        tipo: "erro",
        titulo: "Revise o formulário",
        descricao: `${Object.keys(problemas).length} campo(s) precisam de atenção.`,
      });
      return;
    }

    try {
      if (original) {
        await atualizar(original.id, dados);
        mostrar({
          tipo: "sucesso",
          titulo: "Ocorrência atualizada",
          descricao: `As alterações em ${original.protocolo} foram salvas.`,
        });
      } else {
        const nova = await criar(dados);
        mostrar({
          tipo: "sucesso",
          titulo: "Ocorrência registrada",
          descricao: `Protocolo ${nova.protocolo} criado e já disponível na lista.`,
        });
      }
      navigation.goBack();
    } catch {
      mostrar({
        tipo: "erro",
        titulo: "Não foi possível salvar",
        descricao: "Nada foi perdido. Verifique a conexão e tente de novo.",
      });
    }
  }, [atualizar, criar, dados, mostrar, navigation, original]);

  const tentarVoltar = useCallback(() => {
    if (alterado) {
      setConfirmarSaida(true);
      return;
    }
    navigation.goBack();
  }, [alterado, navigation]);

  return (
    <View style={styles.container}>
      <ScreenHeader
        sobretitulo={edicao ? original?.protocolo : "Novo registro"}
        titulo={edicao ? "Editar ocorrência" : "Nova ocorrência"}
        onVoltar={tentarVoltar}
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 24}
      >
        <ScrollView
          contentContainerStyle={styles.formulario}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.secao}>
            <AppText variant="overline" color={palette.textSecondary}>
              Evidência fotográfica *
            </AppText>
            <SeletorFoto
              fotoUri={dados.fotoUri}
              erro={erros.fotoUri}
              onTirarFoto={tirarFoto}
              onEscolherDaGaleria={escolherDaGaleria}
              onRemover={() => alterar("fotoUri", undefined)}
              ocupado={processandoFoto}
            />
          </View>

          <View style={styles.secao}>
            <AppText variant="overline" color={palette.textSecondary}>
              Tipo do problema *
            </AppText>
            <SeletorTipo selecionado={dados.tipo} onSelecionar={(tipo) => alterar("tipo", tipo)} />
          </View>

          <Input
            label="Título"
            obrigatorio
            placeholder="Ex: Buraco profundo na faixa da direita"
            value={dados.titulo}
            onChangeText={(texto) => alterar("titulo", texto)}
            erro={erros.titulo}
            maxLength={80}
          />

          <Input
            label="Descrição"
            obrigatorio
            multilinha
            maxLength={500}
            placeholder="O que foi encontrado, qual a extensão e o que já foi observado no local"
            value={dados.descricao}
            onChangeText={(texto) => alterar("descricao", texto)}
            erro={erros.descricao}
          />

          <View style={styles.secao}>
            <Input
              label="Rodovia"
              obrigatorio
              placeholder="Ex: SP-348 Bandeirantes"
              value={dados.rodovia}
              onChangeText={(texto) => alterar("rodovia", texto)}
              erro={erros.rodovia}
              autoCapitalize="characters"
            />

            <FilterChips
              opcoes={RODOVIAS_FREQUENTES.map((rodovia) => ({ valor: rodovia, label: rodovia }))}
              selecionado={dados.rodovia}
              onSelecionar={(rodovia) => alterar("rodovia", rodovia)}
              rolavel
            />
          </View>

          <Input
            label="Quilômetro"
            obrigatorio
            placeholder="42,5"
            keyboardType="decimal-pad"
            value={dados.km}
            onChangeText={(texto) => alterar("km", texto)}
            erro={erros.km}
          />

          <View style={styles.secao}>
            <AppText variant="overline" color={palette.textSecondary}>
              Sentido *
            </AppText>
            <FilterChips
              opcoes={CHIPS_SENTIDO}
              selecionado={dados.sentido}
              onSelecionar={(sentido) => alterar("sentido", sentido)}
            />
          </View>

          <Input
            label="Referência do ponto"
            obrigatorio
            placeholder="Ex: Acostamento direito, antes do viaduto"
            value={dados.referencia}
            onChangeText={(texto) => alterar("referencia", texto)}
            erro={erros.referencia}
            acessorio={
              <Pressable
                onPress={usarGps}
                disabled={buscandoGps}
                accessibilityRole="button"
                accessibilityLabel="Usar minha localização"
                style={({ pressed }) => [styles.botaoGps, pressed && styles.pressionado]}
              >
                <Ionicons
                  name={buscandoGps ? "sync" : "locate"}
                  size={20}
                  color={palette.textInverse}
                />
              </Pressable>
            }
            ajuda={
              dados.latitude !== undefined && dados.longitude !== undefined
                ? `GPS: ${formatarCoordenadas(dados.latitude, dados.longitude)}`
                : "Toque no alvo para capturar as coordenadas do local"
            }
          />

          <Input
            label="Responsável pelo registro"
            obrigatorio
            placeholder="Nome do operador de campo"
            value={dados.responsavel}
            onChangeText={(texto) => alterar("responsavel", texto)}
            erro={erros.responsavel}
          />

          <View style={styles.secao}>
            <AppText variant="overline" color={palette.textSecondary}>
              Nível de risco *
            </AppText>
            <SeletorRisco
              selecionado={dados.risco}
              onSelecionar={(risco) => alterar("risco", risco)}
            />
          </View>

          {dados.risco === "alto" ? (
            <View style={styles.avisoAlto}>
              <Ionicons name="warning" size={18} color={colors.red600} />
              <AppText variant="caption" color={colors.red600} style={styles.flex}>
                Ocorrências de alto risco entram na fila de urgência e notificam o Centro de
                Controle Operacional assim que são salvas.
              </AppText>
            </View>
          ) : null}

          <View style={styles.rodapeInfo}>
            <Ionicons name="time-outline" size={16} color={palette.textMuted} />
            <AppText variant="caption" color={palette.textMuted} style={styles.flex}>
              {edicao
                ? "A data original do registro e a linha do tempo são mantidas. Esta edição aparece em \"Última atualização\"."
                : "Data, hora e número de protocolo são gerados automaticamente ao salvar."}
            </AppText>
          </View>
        </ScrollView>

        <View style={[styles.barraSalvar, { paddingBottom: insets.bottom + spacing.md }]}>
          <Button
            titulo={edicao ? "Salvar alterações" : "Registrar ocorrência"}
            icone="checkmark"
            tamanho="lg"
            onPress={salvar}
            carregando={salvando}
            larguraTotal
          />
        </View>
      </KeyboardAvoidingView>

      <ConfirmSheet
        visivel={confirmarSaida}
        titulo="Descartar alterações?"
        descricao="Você preencheu informações que ainda não foram salvas. Se sair agora, elas serão perdidas."
        icone="alert-circle-outline"
        cor={palette.danger}
        fundoIcone={colors.red100}
        rotuloConfirmar="Descartar"
        varianteConfirmar="perigo"
        onConfirmar={() => {
          setConfirmarSaida(false);
          navigation.goBack();
        }}
        onCancelar={() => setConfirmarSaida(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.background,
  },
  flex: {
    flex: 1,
  },
  formulario: {
    padding: spacing.lg,
    gap: spacing.xl,
    paddingBottom: spacing.huge,
  },
  secao: {
    gap: spacing.sm,
  },
  botaoGps: {
    width: 50,
    borderRadius: radius.md,
    backgroundColor: palette.action,
    alignItems: "center",
    justifyContent: "center",
  },
  pressionado: {
    opacity: 0.8,
  },
  avisoAlto: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.md,
    backgroundColor: colors.red50,
    borderLeftWidth: 4,
    borderLeftColor: colors.red500,
    borderRadius: radius.sm,
    padding: spacing.lg,
  },
  rodapeInfo: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
    backgroundColor: palette.surfaceMuted,
    borderRadius: radius.sm,
    padding: spacing.md,
  },
  barraSalvar: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    backgroundColor: palette.surface,
    borderTopWidth: 1,
    borderTopColor: palette.border,
    ...shadows.lg,
  },
});
