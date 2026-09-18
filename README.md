# Motiva Safety

Aplicativo mobile desenvolvido para apoiar equipes da Motiva no **registro, acompanhamento e tratamento de ocorrências de segurança em rodovias**.

A aplicação foi construída em **React Native com Expo**, mantendo os fluxos definidos nas Sprints anteriores e utilizando dados mockados/persistência local enquanto a integração com backend não está disponível.

> **Status da Sprint:** aplicação funcional para demonstração, com os principais fluxos implementados e testados manualmente.  
> **Tecnologia:** React Native + Expo + TypeScript  
> **Versão:** Sprint 3 / preparação para Sprint 4

---

## 1. Visão geral

O Motiva Safety permite que um operador registre uma ocorrência encontrada em campo e que um supervisor acompanhe esses registros, filtre problemas, consulte detalhes e altere o status de atendimento.

O fluxo principal é:

**Registrar ocorrência → consultar lista → abrir detalhe → tramitar status → acompanhar histórico**

A aplicação também foi preparada para demonstrar situações alternativas, como:

- lista vazia;
- busca sem resultados;
- falha de carregamento;
- falha ao salvar;
- ocorrência sem foto;
- ocorrência sem coordenadas;
- permissões de câmera/localização;
- validação de formulário.

---

## 2. Tecnologias utilizadas

| Tecnologia | Utilização |
|---|---|
| React Native | Desenvolvimento do aplicativo mobile |
| Expo SDK 57 | Execução e gerenciamento do projeto |
| TypeScript | Tipagem e organização do código |
| React Navigation | Navegação entre as telas |
| AsyncStorage | Persistência local dos dados |
| Expo Image Picker | Seleção/captura de fotos |
| Expo Location | Captura de localização por GPS |
| Expo Haptics | Feedback tátil |
| Expo Vector Icons | Ícones da interface |
| Inter | Tipografia da aplicação |

---

## 3. Estrutura do projeto

O código principal está em:

\`motiva-safety/MotivaSprint2\`

Principais diretórios:

```text
MotivaSprint2/
├── App.tsx
├── package.json
├── src/
│   ├── components/       # Componentes reutilizáveis
│   ├── context/          # Estado global das ocorrências
│   ├── data/             # Dados mockados
│   ├── navigation/       # Navegação entre telas
│   ├── screens/          # Telas principais
│   ├── services/         # Camada de acesso aos dados
│   ├── theme/            # Cores, tipografia e regras de domínio
│   ├── types/            # Tipos TypeScript
│   └── utils/            # Funções auxiliares
├── assets/               # Ícones e imagens utilizadas no app
├── TESTES_SPRINT3.md     # Documento de testes manuais
└── ROTEIRO_VIDEO.md      # Roteiro do vídeo de demonstração
```

### Telas principais

| Tela | Arquivo | Função |
|---|---|---|
| Lista de ocorrências | \`src/screens/ListaOcorrencias.tsx\` | Dashboard, busca, filtros, ordenação e acesso aos registros |
| Detalhe da ocorrência | \`src/screens/DetalheOcorrencia.tsx\` | Informações completas, histórico e alteração de status |
| Nova/Editar ocorrência | \`src/screens/FormularioOcorrencia.tsx\` | Cadastro e edição de ocorrências |

---

# 4. Status das funcionalidades

## Fluxos principais

| Funcionalidade | Status | Observação |
|---|---|---|
| Navegação entre Lista, Detalhe e Formulário | ✅ Implementado | Navegação com React Navigation |
| Lista de ocorrências | ✅ Implementado | Dados mockados + persistência local |
| Indicadores de risco/status | ✅ Implementado | Cards funcionam como atalhos de filtro |
| Busca de ocorrências | ✅ Implementado | Busca em diversos campos e ignora acentos |
| Filtros por risco | ✅ Implementado | Todos, Alto, Médio e Baixo |
| Filtros por status | ✅ Implementado | Aberta, Em análise e Resolvida |
| Ordenação | ✅ Implementado | Recentes, antigas, risco e quilômetro |
| Detalhamento da ocorrência | ✅ Implementado | Informações, foto, localização e histórico |
| Cadastro de ocorrência | ✅ Implementado | Formulário completo com validação |
| Edição de ocorrência | ✅ Implementado | Mantém protocolo e histórico |
| Alteração de status | ✅ Implementado | Fluxo Aberta → Em análise → Resolvida e reabertura |
| Linha do tempo | ✅ Implementado | Histórico de alterações com data, hora e responsável |
| Upload/seleção de foto | ✅ Implementado | Galeria e câmera |
| Captura de localização | ✅ Implementado | Testado em dispositivo físico |
| Persistência após fechar o app | ✅ Implementado | AsyncStorage |
| Estados de carregamento | ✅ Implementado | Skeleton da lista |
| Estado de erro | ✅ Implementado | Falha de carregamento com tentativa novamente |
| Estado vazio | ✅ Implementado | Sem ocorrências |
| Busca sem resultado | ✅ Implementado | Mensagem específica + limpar filtros |
| Modo de demonstração | ✅ Implementado | Permite simular falhas e esvaziar/restaurar a base |

## Funcionalidades ainda pendentes

| Funcionalidade | Status | Planejamento |
|---|---|---|
| Backend/API real | ⏳ Pendente | Sprint 4 |
| Sincronização entre dispositivos | ⏳ Pendente | Sprint 4 |
| Autenticação/login | ⏳ Pendente | Sprint 4 |
| Usuários e permissões por perfil | ⏳ Pendente | Sprint 4 |
| Mapa integrado dentro do aplicativo | ⏳ Pendente | Sprint 4 |
| Testes automatizados | ⏳ Pendente | Sprint 4 |
| Compressão/redimensionamento das fotos | ⏳ Pendente | Sprint 4 |
| Remoção do Modo demonstração para versão final | ⏳ Pendente | Finalização |

### Observação sobre exclusão de ocorrências

A exclusão de registros não foi implementada porque não faz parte do escopo definido para o MVP atual. Caso a funcionalidade seja incorporada ao produto final, deverá ser tratada com confirmação e controle de permissão.

---

# 5. Mock de dados

A aplicação possui uma base de dados mockada para permitir a demonstração dos diferentes cenários da solução.

Arquivo principal:

\`src/data/mockData.ts\`

A base contempla ocorrências com diferentes:

- tipos;
- níveis de risco;
- status;
- rodovias;
- quilômetros;
- responsáveis;
- situações com e sem foto;
- situações com e sem coordenadas;
- históricos de alteração de status.

Além da base inicial, o aplicativo permite:

**Modo demonstração → Restaurar ocorrências de exemplo**

ou

**Modo demonstração → Esvaziar a lista**

Isso permite testar rapidamente os estados de sucesso, erro e lista vazia exigidos na Sprint.

---

# 6. Testes manuais

O projeto possui um documento específico com os testes realizados:

**[TESTES_SPRINT3.md](./motiva-safety/MotivaSprint2/TESTES_SPRINT3.md)**

Foram documentados **20 casos de teste manuais**, divididos em:

| Grupo | Casos | Resultado |
|---|---:|---:|
| Fluxos principais | 5 | ✅ 5 passaram |
| Fluxos secundários | 5 | ✅ 5 passaram |
| Estados de erro e vazios | 10 | ✅ 10 passaram |
| **Total** | **20** | **✅ 20 passaram** |

## 5 fluxos principais testados

| ID | Fluxo | Status |
|---|---|---|
| FP-01 | Carregar e consultar a lista de ocorrências | ✅ Passou |
| FP-02 | Buscar, filtrar e ordenar ocorrências | ✅ Passou |
| FP-03 | Consultar o detalhe de uma ocorrência | ✅ Passou |
| FP-04 | Cadastrar uma nova ocorrência | ✅ Passou |
| FP-05 | Alterar o status de uma ocorrência | ✅ Passou |

Os testes também cobrem edição, GPS, persistência local, atualização por gesto, validações, falhas de conexão, lista vazia, ausência de foto/coordenadas e permissões de câmera.

> **Observação:** os cenários que dependem diretamente de recursos físicos, como GPS e atualização por gesto, foram validados em dispositivo físico.

---

# 7. Principais problemas identificados e corrigidos

Durante a evolução da Sprint 3, alguns problemas das versões anteriores foram tratados:

1. **Inicialização do projeto:** foram corrigidas referências de assets que impediam o aplicativo de iniciar.
2. **Compatibilidade com Expo Go:** o projeto foi atualizado para a **SDK 57**.
3. **Dados mockados:** os exemplos foram adequados ao contexto de segurança rodoviária.
4. **Fotos nas ocorrências:** a base passou a contemplar ocorrências com e sem evidência fotográfica.
5. **Fluxo de status:** as transições entre status foram estruturadas e passaram a ser navegáveis.
6. **Persistência:** os dados deixaram de existir somente em memória e passaram a ser armazenados localmente.
7. **Consistência visual:** regras de cores, status e risco foram centralizadas no tema da aplicação.

---

# 8. Pendências e limitações atuais

A versão entregue ainda possui limitações que precisam ser tratadas antes de uma versão conectada ao ambiente real:

### Backend

Atualmente não existe uma API ou banco de dados remoto. As ocorrências são persistidas somente no dispositivo através do AsyncStorage.

**Impacto:** dois dispositivos não compartilham automaticamente os mesmos dados.

### Autenticação

Ainda não existe login nem controle de acesso por usuário.

**Impacto:** o responsável pela ocorrência é informado manualmente.

### Mapas

A aplicação possui localização e coordenadas, porém o mapa é aberto através do aplicativo de mapas do dispositivo em vez de possuir um mapa incorporado.

### Imagens

As fotos ainda não passam por uma etapa específica de compressão e redimensionamento.

**Impacto:** o armazenamento local pode crescer rapidamente com muitos registros.

### Testes automatizados

Os testes desta Sprint foram manuais. Ainda não há suíte automatizada de testes unitários ou de integração.

---

# 9. Plano de ajustes para a Sprint 4

A Sprint 4 será dedicada principalmente à preparação para uma versão mais próxima do produto final.

## Prioridade 1 — Backend e sincronização

- Definir API e banco de dados remoto.
- Criar endpoints para listar, cadastrar, editar e atualizar ocorrências.
- Substituir gradualmente o mock pela integração real.
- Manter uma estratégia de fallback para demonstração offline.
- Garantir que diferentes dispositivos possam consultar os mesmos registros.

## Prioridade 2 — Autenticação e usuários

- Implementar login.
- Definir perfis de acesso.
- Relacionar a ocorrência ao usuário autenticado.
- Substituir o preenchimento manual do responsável.

## Prioridade 3 — Localização e mapa

- Integrar mapa dentro da aplicação.
- Exibir a ocorrência diretamente no ponto geográfico.
- Permitir visualização da localização a partir da tela de detalhe.

## Prioridade 4 — Imagens e desempenho

- Redimensionar e comprimir fotos antes do armazenamento/upload.
- Avaliar limite de tamanho por imagem.
- Melhorar carregamento de listas maiores.
- Validar comportamento em aparelhos de menor desempenho.

## Prioridade 5 — Qualidade

- Criar testes automatizados para regras críticas.
- Reexecutar os 20 testes manuais após as mudanças.
- Fazer regressão completa de navegação.
- Corrigir qualquer crash ou fluxo quebrado encontrado durante a demonstração.

## Prioridade 6 — Preparação da entrega final

- Remover ou desabilitar o Modo demonstração na versão final.
- Revisar identidade visual.
- Validar o aplicativo em dispositivo físico.
- Gravar o vídeo final com até 3 minutos.
- Atualizar este README com o estado final da Sprint 4.

---

# 10. Vídeo de demonstração

O roteiro do vídeo está disponível em:

**[ROTEIRO_VIDEO.md](./motiva-safety/MotivaSprint2/ROTEIRO_VIDEO.md)**

O roteiro foi estruturado para uma demonstração de aproximadamente **2 minutos e 50 segundos**, cobrindo:

1. abertura e dashboard;
2. busca, filtros e ordenação;
3. estado sem resultados;
4. detalhe da ocorrência;
5. alteração de status;
6. cadastro e validação;
7. falha de conexão;
8. lista vazia.

**Link do vídeo:** _a adicionar após publicação._

---

# 11. Como executar o projeto

### Pré-requisitos

- Node.js 20 ou superior
- npm
- Expo Go atualizado para execução em dispositivo
- Android Studio, caso seja utilizado emulador Android
- macOS + Xcode para execução nativa em iOS

### Instalação

No terminal:

```bash
git clone https://github.com/Joao-Vitor06/Sprint_CrossPlataform.git
cd Sprint_CrossPlataform/motiva-safety/MotivaSprint2
npm install
```

### Executar com Expo

```bash
npx expo start
```

Depois, escaneie o QR Code com o Expo Go ou abra o projeto em um emulador.

### Comandos disponíveis

| Comando | Função |
|---|---|
| \`npm start\` | Inicia o Expo |
| \`npm run android\` | Executa a versão Android nativa |
| \`npm run ios\` | Executa a versão iOS nativa |
| \`npm run web\` | Executa a versão web |
| \`npm run typecheck\` | Verifica os tipos TypeScript |

---

# 12. Onde alterar cada parte

| Necessidade | Arquivo |
|---|---|
| Cores, fontes e espaçamentos | \`src/theme/colors.ts\` e \`src/theme/tokens.ts\` |
| Regras de risco e status | \`src/theme/domain.ts\` |
| Dados mockados | \`src/data/mockData.ts\` |
| Estado global das ocorrências | \`src/context/OcorrenciasContext.tsx\` |
| Lista, filtros e busca | \`src/screens/ListaOcorrencias.tsx\` |
| Detalhe e status | \`src/screens/DetalheOcorrencia.tsx\` |
| Cadastro/edição | \`src/screens/FormularioOcorrencia.tsx\` |
| Camada de dados/API | \`src/services/ocorrenciasService.ts\` |
| Navegação | \`src/navigation/RootNavigator.tsx\` |

---

# 13. Decisão tecnológica

A equipe **não migrou para Flutter** nesta etapa.

A implementação continua em **React Native + Expo + TypeScript**, mantendo a base desenvolvida nas Sprints anteriores. A decisão evita reescrita desnecessária dos fluxos já implementados e permite concentrar a Sprint 4 em backend, autenticação, mapa, testes e refinamentos de produto.

---

# 14. Resumo da entrega

A versão atual do Motiva Safety possui:

- ✅ navegação funcional entre os principais fluxos;
- ✅ lista de ocorrências;
- ✅ busca, filtros e ordenação;
- ✅ cadastro e edição;
- ✅ validação de formulário;
- ✅ fotos;
- ✅ GPS;
- ✅ histórico e alteração de status;
- ✅ persistência local;
- ✅ estados de carregamento, erro e vazio;
- ✅ dados mockados para demonstração;
- ✅ 20 testes manuais documentados e aprovados;
- ✅ plano de evolução para a Sprint 4.

### Próximo marco

**Sprint 4 → integração e preparação para a versão final do Motiva Safety.**
