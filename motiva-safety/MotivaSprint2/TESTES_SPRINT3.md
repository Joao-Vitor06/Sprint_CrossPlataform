# Documento de Testes Manuais — Sprint 3

**Aplicação:** Motiva Safety (React Native + Expo + TypeScript)
**Versão testada:** 3.0.0
**Tipo de teste:** manual, exploratório, executado pelo grupo

## Ambiente de execução

| Item | Valor |
|---|---|
| Expo SDK | 57 |
| React Native | 0.86.3 |
| Origem dos dados | Mock local + persistência em AsyncStorage |
| Plataformas exercitadas | Web (Metro em modo responsivo, viewport 430x900) e Android via Expo Go |

> Os testes de câmera, galeria e GPS só valem em dispositivo físico ou emulador.
> Na web esses recursos têm comportamento diferente, e isso está registrado nas
> observações de cada caso.

---

## 1. Fluxos principais

### FP-01 — Consultar a lista de ocorrências

| | |
|---|---|
| **Cenário** | Abrir o app com a base de exemplo já semeada. |
| **Passos** | 1. Abrir o app. 2. Aguardar o carregamento. |
| **Resultado esperado** | Esqueleto de carregamento por cerca de 1 s, depois a lista com 14 ocorrências, os três indicadores do topo preenchidos e os filtros disponíveis. |
| **Resultado obtido** | A lista carrega com as 14 ocorrências. Indicadores marcam 6 de alto risco, 10 em andamento e 4 resolvidas. Cada card mostra miniatura da foto, protocolo, tipo, rodovia, quilômetro, sentido, risco, status e tempo relativo. |
| **Status** | **Passou** |

### FP-02 — Buscar e filtrar ocorrências

| | |
|---|---|
| **Cenário** | Localizar uma ocorrência específica combinando busca, filtros e ordenação. |
| **Passos** | 1. Buscar "buraco". 2. Limpar e buscar "vegetacao" sem acento. 3. Tocar no cartão "Alto risco". 4. Aplicar o filtro de status "Resolvida". 5. Abrir a ordenação e escolher "Maior risco". |
| **Resultado esperado** | A busca ignora acentos e procura em título, descrição, rodovia, referência, responsável e protocolo. Os filtros se acumulam. O rodapé do painel informa quantos itens estão visíveis. |
| **Resultado obtido** | Comportamento conforme esperado. A busca por "vegetacao" encontra "Vegetação alta encobrindo placa de saída". O cartão "Alto risco" funciona como atalho de filtro e fica destacado. O contador mostra "X de 14 ocorrências". |
| **Status** | **Passou** |

### FP-03 — Consultar o detalhe de uma ocorrência

| | |
|---|---|
| **Cenário** | Abrir um registro e conferir todas as informações. |
| **Passos** | 1. Tocar em uma ocorrência da lista. 2. Percorrer a tela até o fim. |
| **Resultado esperado** | Foto em tamanho grande, etiquetas de risco/status/tipo, descrição completa, blocos de Localização, Registro e Linha do tempo, e as ações válidas para o status atual. |
| **Resultado obtido** | Todos os blocos aparecem. A linha do tempo lista os eventos em ordem cronológica com marcador colorido por status. Quando há coordenadas, o botão "Abrir no mapa" é exibido. |
| **Status** | **Passou** |

### FP-04 — Cadastrar uma nova ocorrência

| | |
|---|---|
| **Cenário** | Registrar um problema encontrado em campo. |
| **Passos** | 1. Tocar em "Nova ocorrência". 2. Anexar foto. 3. Escolher o tipo. 4. Preencher título, descrição, rodovia, km, sentido, referência e responsável. 5. Escolher o risco. 6. Salvar. |
| **Resultado esperado** | O registro é criado com protocolo sequencial, status "Aberta", data e hora atuais, e passa a aparecer no topo da lista. |
| **Resultado obtido** | A ocorrência é criada com o protocolo seguinte ao maior existente (MTV-0015 na base de exemplo). O app volta para a lista e mostra um aviso verde com o protocolo gerado. O novo registro aparece no topo quando a ordenação é "Mais recentes". |
| **Status** | **Passou** |

### FP-05 — Alterar o status de uma ocorrência

| | |
|---|---|
| **Cenário** | Tramitar uma ocorrência de Aberta até Resolvida e depois reabrir. |
| **Passos** | 1. Abrir uma ocorrência com status "Aberta". 2. Tocar em "Enviar para análise" e confirmar. 3. Tocar em "Dar baixa na ocorrência" e confirmar. 4. Tocar em "Reabrir ocorrência" e confirmar. |
| **Resultado esperado** | Cada mudança pede confirmação, atualiza a etiqueta de status, acrescenta um evento na linha do tempo e reflete na lista. |
| **Resultado obtido** | As três transições funcionam. A folha de confirmação mostra o status de destino com o ícone e a cor correspondentes. Cada mudança gera um evento novo com data, hora e responsável. |
| **Status** | **Passou** |

---

## 2. Fluxos secundários

### FS-01 — Editar uma ocorrência existente

| | |
|---|---|
| **Cenário** | Corrigir informações de um registro já criado. |
| **Passos** | 1. Abrir o detalhe. 2. Tocar no ícone de edição no cabeçalho. 3. Alterar o risco e a descrição. 4. Salvar. |
| **Resultado esperado** | O formulário abre preenchido, salva por cima e mantém protocolo, data de criação e histórico. |
| **Resultado obtido** | Conforme esperado. O campo "Última atualização" passa a mostrar a data da edição enquanto "Registrada em" permanece a original. |
| **Status** | **Passou** |

### FS-02 — Capturar a localização pelo GPS

| | |
|---|---|
| **Cenário** | Preencher as coordenadas automaticamente no cadastro. |
| **Passos** | 1. No formulário, tocar no botão de alvo ao lado de "Referência do ponto". 2. Conceder a permissão. |
| **Resultado esperado** | As coordenadas aparecem abaixo do campo e a referência é preenchida com o endereço aproximado, se disponível. |
| **Resultado obtido** | Em dispositivo físico funciona: a coordenada é anexada e o endereço reverso preenche a referência quando o campo está vazio. Se o endereço reverso falha, a coordenada continua salva. |
| **Status** | **Passou** (dispositivo físico) |
| **Observação** | Na web o navegador pede permissão de localização e devolve uma posição aproximada por IP, o que não representa o uso real. Este caso deve ser demonstrado no celular. |

### FS-03 — Descartar um cadastro pela metade

| | |
|---|---|
| **Cenário** | Evitar perder o preenchimento por um toque acidental no voltar. |
| **Passos** | 1. Abrir o formulário. 2. Preencher qualquer campo. 3. Tocar na seta de voltar. |
| **Resultado esperado** | O app pede confirmação antes de descartar. |
| **Resultado obtido** | A folha "Descartar alterações?" aparece com as opções Cancelar e Descartar. Sair sem ter alterado nada não pede confirmação. |
| **Status** | **Passou** |

### FS-04 — Persistir os dados entre execuções

| | |
|---|---|
| **Cenário** | Confirmar que um registro novo sobrevive ao fechamento do app. |
| **Passos** | 1. Cadastrar uma ocorrência. 2. Fechar o app completamente. 3. Abrir de novo. |
| **Resultado esperado** | A ocorrência cadastrada continua na lista. |
| **Resultado obtido** | O registro permanece, assim como as mudanças de status e as edições. Esta era a principal pendência da Sprint 2 e foi resolvida com AsyncStorage. |
| **Status** | **Passou** |

### FS-05 — Atualizar a lista puxando para baixo

| | |
|---|---|
| **Cenário** | Recarregar os dados sem sair da tela. |
| **Passos** | 1. Na lista, puxar para baixo. |
| **Resultado esperado** | Indicador de atualização e recarga dos dados. |
| **Resultado obtido** | Funciona no celular. Com a simulação de falha ligada, a recarga leva à tela de erro, como esperado. |
| **Status** | **Passou** (dispositivo físico) |
| **Observação** | O `RefreshControl` do React Native não tem equivalente na web, então puxar para atualizar não funciona no navegador. É uma limitação da plataforma, não do app. |

---

## 3. Estados de erro, vazio e alternativos

### EE-01 — Formulário incompleto

| | |
|---|---|
| **Cenário** | Tentar salvar sem preencher os obrigatórios. |
| **Passos** | 1. Abrir o formulário. 2. Tocar em "Registrar ocorrência" sem preencher nada. |
| **Resultado esperado** | O cadastro é bloqueado e cada campo com problema mostra a mensagem embaixo dele. |
| **Resultado obtido** | Sete mensagens aparecem (foto, título, descrição, rodovia, km, referência e responsável), os campos ficam com borda vermelha e um aviso no topo informa quantos campos precisam de atenção. A partir da primeira tentativa, a validação passa a corrigir sozinha conforme o usuário digita. |
| **Status** | **Passou** |

### EE-02 — Quilômetro inválido

| | |
|---|---|
| **Cenário** | Digitar um valor que não é um quilômetro válido. |
| **Passos** | 1. Preencher o km com "abc", depois com "-5", depois com "9999". |
| **Resultado esperado** | Os três são rejeitados com a mensagem de formato. |
| **Resultado obtido** | Rejeitados. O campo aceita vírgula e ponto como separador decimal, então "42,5" e "42.5" funcionam. |
| **Status** | **Passou** |

### EE-03 — Falha de conexão ao carregar

| | |
|---|---|
| **Cenário** | O servidor não responde na abertura do app. |
| **Passos** | 1. Abrir o Modo demonstração. 2. Ligar "Simular falha de conexão". |
| **Resultado esperado** | Tela de erro com explicação e botão para tentar de novo, sem travar nem fechar o app. |
| **Resultado obtido** | Ligar o interruptor já dispara uma recarga, e a tela "Não foi possível carregar" aparece na hora com o botão "Tentar novamente". Uma faixa vermelha fica visível abaixo do cabeçalho enquanto a simulação está ligada, para não confundir quem está assistindo à demonstração. |
| **Status** | **Passou** |

### EE-04 — Falha de conexão ao salvar

| | |
|---|---|
| **Cenário** | A gravação falha depois de o usuário preencher tudo. |
| **Passos** | 1. Ligar a simulação de falha. 2. Cadastrar uma ocorrência completa. 3. Salvar. |
| **Resultado esperado** | O app avisa do erro, mantém o usuário no formulário com os dados preenchidos e não cria um registro pela metade. |
| **Resultado obtido** | Aviso vermelho "Não foi possível salvar". O formulário continua preenchido e a lista volta ao estado anterior, sem registro fantasma. |
| **Status** | **Passou** |

### EE-05 — Lista vazia

| | |
|---|---|
| **Cenário** | Primeiro uso do app, sem nenhuma ocorrência. |
| **Passos** | 1. Abrir o Modo demonstração. 2. Tocar em "Esvaziar a lista". |
| **Resultado esperado** | Estado vazio explicativo, com atalho para cadastrar. |
| **Resultado obtido** | Mensagem "Nenhuma ocorrência registrada" com o botão "Registrar ocorrência" e um atalho secundário para restaurar os exemplos. |
| **Status** | **Passou** |

### EE-06 — Busca sem resultado

| | |
|---|---|
| **Cenário** | O termo buscado não existe na base. |
| **Passos** | 1. Buscar "zzzzz". |
| **Resultado esperado** | Estado vazio diferente do anterior, citando o termo buscado e oferecendo limpar os filtros. |
| **Resultado obtido** | Mensagem "Nenhum resultado" citando o termo entre aspas, com o botão "Limpar filtros". O texto muda quando o vazio vem de filtro e não de busca. |
| **Status** | **Passou** |

### EE-07 — Ocorrência sem foto

| | |
|---|---|
| **Cenário** | Registro antigo, feito antes de a foto virar obrigatória. |
| **Passos** | 1. Abrir a ocorrência MTV-0004 (poste de iluminação apagado). |
| **Resultado esperado** | Um bloco explicando a ausência da foto, e não um espaço em branco ou uma imagem quebrada. |
| **Resultado obtido** | Bloco tracejado com "Nenhuma evidência anexada" e a orientação de editar a ocorrência para anexar. Na lista, o card mostra um ícone genérico no lugar da miniatura. |
| **Status** | **Passou** |

### EE-08 — Ocorrência sem coordenadas

| | |
|---|---|
| **Cenário** | Registro feito com o GPS desligado. |
| **Passos** | 1. Abrir a ocorrência MTV-0002 (acúmulo de terra no acostamento). |
| **Resultado esperado** | O bloco de localização não mostra coordenadas nem o botão de mapa, e explica o que isso significa. |
| **Resultado obtido** | Aviso "Sem coordenadas. A equipe vai localizar o ponto pela referência textual." e o botão "Abrir no mapa" não é exibido. |
| **Status** | **Passou** |

### EE-09 — Permissão de câmera negada

| | |
|---|---|
| **Cenário** | O usuário nega o acesso à câmera. |
| **Passos** | 1. No formulário, tocar em "Tirar foto". 2. Negar a permissão. |
| **Resultado esperado** | Aviso explicando como liberar, sem travar a tela. |
| **Resultado obtido** | Aviso "Câmera bloqueada" orientando a liberar nas configurações. O usuário pode seguir pela galeria. |
| **Status** | **Passou** |

### EE-10 — Ocorrência aberta que deixa de existir

| | |
|---|---|
| **Cenário** | A base é esvaziada com a tela de detalhe aberta. |
| **Passos** | 1. Abrir uma ocorrência. 2. Esvaziar a lista pelo Modo demonstração em outra aba de navegação. |
| **Resultado esperado** | A tela de detalhe não pode quebrar. |
| **Resultado obtido** | Aparece "Ocorrência não encontrada" com o botão de voltar para a lista. |
| **Status** | **Passou** |

---

## 4. Resumo

| Grupo | Casos | Passou | Falhou |
|---|---|---|---|
| Fluxos principais | 5 | 5 | 0 |
| Fluxos secundários | 5 | 5 | 0 |
| Estados de erro e vazios | 10 | 10 | 0 |
| **Total** | **20** | **20** | **0** |

---

## 5. Problemas encontrados e corrigidos durante a Sprint

Estes defeitos existiam na entrega da Sprint 2 e foram tratados agora:

1. **O app não iniciava.** O `app.json` apontava para `assets/icon.png`, `assets/splash.png` e
   `assets/adaptive-icon.png`, mas a pasta `assets/` não existia no repositório. Os ícones foram
   criados e a splash reconfigurada.
2. **O app não abria no Expo Go atual.** O projeto estava na SDK 51, e o Expo Go publicado nas
   lojas só executa a SDK mais recente. Migrado para a SDK 57.
3. **Dados mockados fora do domínio.** Os exemplos descreviam ocorrências de motoboy (pneu furado,
   capacete danificado), enquanto o problema definido no projeto é a segurança de trechos de
   rodovia. Toda a base foi reescrita.
4. **Nenhuma ocorrência de exemplo tinha foto.** A tela de detalhe abria sempre com "nenhuma foto
   anexada", justamente no elemento central do produto. Agora 12 das 14 têm foto, e as duas sem
   foto são intencionais, para exercitar o estado vazio.
5. **O status "Em análise" era inalcançável.** O tipo previa três status, mas a interface só
   permitia alternar entre aberta e resolvida. As transições agora são declaradas em um só lugar e
   a tela monta os botões a partir delas.
6. **Perda de dados ao fechar o app.** Tudo vivia em memória. Agora há persistência local.
7. **Inconsistência visual entre telas.** As cores de risco e status estavam duplicadas em três
   arquivos e já divergiam entre si. Foram centralizadas em `src/theme/domain.ts`.

---

## 6. Limitações conhecidas desta versão

Itens que **não** foram corrigidos e entram na Sprint 4:

1. **Não existe backend.** A persistência é local no aparelho. Dois celulares diferentes não
   enxergam as mesmas ocorrências.
2. **Não existe autenticação.** O campo "Responsável" é digitado à mão e não há login, então nada
   impede que alguém registre em nome de outro operador.
3. **Não existe exclusão de ocorrência.** Foi deixada de fora por não estar no escopo do MVP.
4. **Não existe mapa dentro do app.** O botão "Abrir no mapa" delega para o aplicativo de mapas do
   aparelho, o que evita depender de uma chave de API paga.
5. **Não há testes automatizados.** Toda a verificação desta Sprint foi manual.
6. **O "Modo demonstração" é um recurso de protótipo.** Ele existe para forçar cenários de erro e
   de lista vazia na apresentação e deve ser removido quando a API real entrar.
7. **A foto não é comprimida nem redimensionada** antes de ser guardada. Com muitos registros isso
   pode ocupar espaço no aparelho.
