# 🏍️ Motiva Safety — Sprint 3

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

## 📱 Status atual — Sprint 3

| Funcionalidade | Status |
|---|---|
| Listagem de ocorrências | ✅ Implementada |
| Resumo por criticidade e status | ✅ Implementado |
| Filtro por nível de risco | ✅ Implementado |
| Estado vazio após filtro | ✅ Implementado |
| Cadastro de ocorrência | ✅ Implementado |
| Validação de campos obrigatórios | ✅ Implementada |
| Seleção de nível de risco | ✅ Implementada |
| Alerta específico para alto risco | ✅ Implementado |
| Confirmação de cadastro | ✅ Implementada |
| Inclusão de nova ocorrência na sessão | ✅ Implementada |
| Tela de detalhes | ✅ Implementada |
| Dados mockados com cenários variados | ✅ Implementados |
| Persistência após reiniciar o app | ⚠️ Pendente |
| Integração com API/banco | ⚠️ Pendente |
| Edição/alteração de status | ⚠️ Pendente, conforme escopo futuro |

---

## 🧭 Fluxos principais

1. **Consultar ocorrências:** usuário abre o app e visualiza a lista, resumo de indicadores e filtros.
2. **Filtrar ocorrências:** usuário seleciona Alto, Médio ou Baixo e visualiza somente os registros correspondentes.
3. **Consultar detalhes:** usuário toca em uma ocorrência e visualiza seus dados completos.
4. **Cadastrar ocorrência:** usuário preenche título, descrição, local, responsável e risco e registra a ocorrência.
5. **Tratar validação:** caso campos obrigatórios estejam vazios, o cadastro é bloqueado e uma mensagem é apresentada.
6. **Fluxo de alto risco:** ao selecionar Alto no cadastro, o app apresenta orientação visual sobre a priorização da ocorrência.

A navegação atual é controlada por estado local no `App.tsx`, mantendo a implementação simples para o protótipo funcional. Os dados são mantidos em memória durante a sessão. 

---

## 🗂️ Dados mockados

A camada de mock foi ampliada para cobrir diferentes níveis de risco (`baixo`, `medio`, `alto`) e status (`aberta`, `em_analise`, `resolvida`), permitindo demonstrar cenários variados da solução.

Também foram definidos cenários de apoio para cadastro válido, cadastro de alto risco e formulário inválido em `src/data/mockData.ts`.

---

## 🧪 Testes manuais

O documento `TESTES_SPRINT3.md` registra os fluxos testados, resultado esperado, resultado obtido e status. Foram documentados 7 cenários, incluindo sucesso, validação, alto risco e lista vazia.

---

## ⚠️ Pendências identificadas

- Os dados ainda são armazenados somente em memória e não persistem após reiniciar o aplicativo.
- Não há integração com API ou banco de dados nesta Sprint.
- Não há edição/alteração de ocorrências implementada nesta versão.
- A validação foi realizada manualmente; testes automatizados são uma melhoria futura.

---

## 🚀 Plano de ajustes — Sprint 4

1. Implementar persistência dos dados por API e/ou banco de dados.
2. Evoluir os fluxos de atualização das ocorrências, incluindo alteração de status quando aplicável aos requisitos finais.
3. Adicionar testes automatizados para os fluxos críticos.
4. Revisar acessibilidade, feedbacks e estados de carregamento/erro.
5. Avaliar uma solução de navegação por rotas caso novas telas sejam incorporadas.

---

## 🚀 Como rodar o projeto

### Pré-requisitos

- Node.js 18+ instalado
- Expo CLI/Expo compatível com o projeto
- App **Expo Go** no celular (Android ou iOS) ou emulador configurado

### Passos

```bash
git clone https://github.com/Joao-Vitor06/Sprint_CrossPlataform
cd Sprint_CrossPlataform/MotivaSprint2
npm install
npx expo start
```

Depois, escaneie o QR Code pelo Expo Go ou execute em um emulador.

---

## 📦 Tecnologias

- React Native
- Expo
- TypeScript
- React Native Web

---

## 🔗 Links

- **Repositório:** https://github.com/Joao-Vitor06/Sprint_CrossPlataform
- **Protótipo Figma:** https://dialog-glade-82150722.figma.site/
- **Documento de testes:** `TESTES_SPRINT3.md`
- **Vídeo de demonstração:** *(adicionar o link do YouTube não listado após a gravação)*

---

## 📌 Observação sobre a migração

O projeto permanece em **React Native + Expo + TypeScript**. Não houve migração para Flutter nesta Sprint.
