# 🏍️ Motiva Safety – Sprint 2

Aplicativo mobile desenvolvido com **React Native + Expo + TypeScript** para registro e acompanhamento de ocorrências de segurança de motoboys.

---

## 👥 Integrantes

| Nome | RM |
|------|-----|
| João Vitor Santana Silva Ribeiro | RM564693 |
| Letícia Gabrielle Andrade Temóteo | RM563985 |
| Stefanny Brum Dos Santos | RM566216 |
| Gustavo Cordeiro Braga | RM562247 |
| Bruno Otávio da Cruz Carvalho | RM562354 |

---

## 📱 O que o app faz

O **Motiva Safety** permite que motoboys e gestores registrem ocorrências de segurança durante as operações. As funcionalidades incluem:

- ✅ **Listar ocorrências** com filtros por nível de risco (Alto / Médio / Baixo)
- ✅ **Resumo visual** com contagem de ocorrências por criticidade e status
- ✅ **Cadastrar nova ocorrência** com título, descrição, local, responsável e nível de risco
- ✅ **Ver detalhes completos** de cada ocorrência registrada
- ✅ Ocorrências novas ficam **salvas no estado** durante a sessão

---

## 🏗️ Estrutura do Projeto

```
motiva-sprint2/
├── App.tsx                     # Ponto de entrada + roteador de navegação
├── app.json                    # Configuração do Expo
├── package.json
├── tsconfig.json
└── src/
    ├── types/
    │   └── index.ts            # Tipagem TypeScript (Ocorrencia, Tela, etc.)
    ├── data/
    │   └── mockData.ts         # Dados mockados (5 ocorrências simuladas)
    ├── components/
    │   └── OcorrenciaCard.tsx  # Card reutilizável da lista
    └── screens/
        ├── ListaOcorrencias.tsx    # Tela principal com lista e filtros
        ├── CadastroOcorrencia.tsx  # Formulário de nova ocorrência
        └── DetalheOcorrencia.tsx   # Detalhes de uma ocorrência
```

---

## 🗂️ Como os dados estão mockados

Os dados ficam em `src/data/mockData.ts` como um **array estático** de objetos do tipo `Ocorrencia`. São 5 ocorrências pré-carregadas que simulam situações reais vividas por motoboys.

```ts
// src/data/mockData.ts
export const ocorrenciasMock: Ocorrencia[] = [
  {
    id: 1,
    titulo: "Pneu furado em serviço",
    descricao: "...",
    local: "Av. Paulista, 1578 – São Paulo/SP",
    risco: "medio",
    data: "2025-05-10",
    responsavel: "Carlos Souza",
    status: "resolvida",
  },
  // ...
];
```

O estado é gerenciado em `App.tsx` com `useState`, e novas ocorrências cadastradas pelo usuário são adicionadas ao array em tempo real — sem banco de dados ou requisições externas.

---

## 🚀 Como rodar o projeto

### Pré-requisitos

- Node.js 18+ instalado
- Expo CLI instalado globalmente:
  ```bash
  npm install -g expo-cli
  ```
- App **Expo Go** no celular (Android ou iOS) **ou** emulador configurado

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/Joao-Vitor06/Sprint_CrossPlataform
cd motiva-sprint2

# 2. Instale as dependências
npm install

# 3. Inicie o servidor de desenvolvimento
npx expo start

# 4. Escaneie o QR Code com o Expo Go (Android) 
#    ou com a câmera (iOS)
```

---

## 🧭 Navegação

A navegação é implementada com **`useState` condicional** no `App.tsx`, sem dependências externas. O estado `telaAtual` controla qual tela é exibida:

```ts
type Tela = "lista" | "cadastro" | "detalhe";
const [telaAtual, setTelaAtual] = useState<Tela>("lista");
```

---

## 📦 Dependências principais

| Pacote | Versão | Uso |
|--------|--------|-----|
| `expo` | ~51.0.0 | Framework base |
| `react-native` | 0.74.5 | UI nativa |
| `typescript` | ^5.1.3 | Tipagem estática |

---

## 🔗 Links

- **Repositório:** https://github.com/Joao-Vitor06/Sprint_CrossPlataform
- **Protótipo Figma:** https://dialog-glade-82150722.figma.site/
- **Vídeo demonstração:** *(adicionar link do YouTube após gravação)*
