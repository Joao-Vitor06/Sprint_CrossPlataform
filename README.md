# Aplicativo de Registro de Ocorrências
## Problema a ser resolvido

A Motiva enfrenta dificuldades para registrar e acompanhar ocorrências de risco nas estradas (como vegetação alta, falta de visibilidade na pista ou outros perigos). O processo atual é majoritariamente manual, o que causa atrasos, retrabalho e falta de rastreabilidade. Não existe um sistema padronizado para registrar uma ocorrência com foto e classificar o nível de risco, dificultando o monitoramento dos trechos e a tomada de decisões.

## Usuários do aplicativo
-  Operador de campo– profissional responsável por percorrer os trechos das rodovias e registrar ocorrências. Este usuário precisa de uma ferramenta simples para capturar fotos, descrever a situação e classificar o risco.
-  Supervisor – responsável por acompanhar a lista de ocorrências e priorizar ações de mitigação. Precisa visualizar detalhes, filtros e risco associado a cada ocorrência.
### Principal ação do app

Registrar uma ocorrência com foto, descrição e classificação de risco (baixo, médio ou alto) de forma rápida e padronizada. Essa ação permite que os responsáveis tomem ciência dos problemas e atuem com base na criticidade.

Funcionalidades do MVP

O objetivo é entregar um Produto Mínimo Viável (MVP) que cubra apenas o essencial:

### 1. Cadastro de ocorrência
- Permitir ao usuário registrar uma nova ocorrência informando:
- Foto tirada na hora ou selecionada da galeria;
- Descrição curta do problema;
- Classificação de risco (baixo, médio, alto);
- Data e hora (geradas automaticamente);
- Localização (quando disponível, utilizando APIs de geolocalização do próprio dispositivo).
### 2. Listagem de ocorrências
- Exibir uma lista simples com todas as ocorrências cadastradas, ordenadas por data ou prioridade. Cada item deve mostrar a classificação de risco, data/hora e uma descrição resumida.
### 3. Visualização de detalhes
- Ao selecionar um item da lista, abrir uma tela com todos os detalhes da ocorrência: foto em tamanho maior, descrição completa, classificação de risco, data/hora e localização.
### 4. Classificação de risco
- Nas telas de cadastro e visualização, permitir que o usuário visualize ou defina o nível de risco como baixo, médio ou alto para auxiliar na priorização.

Funcionalidades extras como login, edição ou exclusão de ocorrências podem ser consideradas em sprints posteriores, mas não fazem parte do escopo do MVP.

## Protótipo navegável

O protótipo deve contemplar três telas principais e permitir a navegação entre elas. O protótipo navegável já foi criado no Figma e pode ser acessado pelo link: https://dialog-glade-82150722.figma.site/

1- Tela de listagem – apresenta as ocorrências com ícone ou cor indicando o risco, breve descrição e data.

2- Tela de nova ocorrência – formulário para inserir foto, descrição e risco.

3- Tela de detalhes – mostra as informações completas da ocorrência selecionada.

## Estrutura técnica do projeto

O projeto será desenvolvido em React Native utilizando Expo e TypeScript. Uma estrutura inicial recomendada é:

```
src/
  screens/
    OccurrenceListScreen.tsx      // Tela de listagem de ocorrências
    NewOccurrenceScreen.tsx       // Tela de cadastro de ocorrência
    OccurrenceDetailScreen.tsx    // Tela de detalhes da ocorrência

  components/
    OccurrenceItem.tsx            // Componente para renderizar um item na lista
    OccurrenceForm.tsx            // Formulário reutilizável para cadastro

  types/
    occurrence.ts                 // Definição de tipos e interfaces (ex.: Occurrence)

  services/
    storage.ts                    // Serviços para armazenamento local ou API futura

  App.tsx                         // Configuração de rotas e navegação
```

Essa organização favorece a manutenibilidade e escalabilidade nas próximas sprints. O uso de Expo agiliza o desenvolvimento e facilita o acesso a recursos de câmera e localização. A tipagem com TypeScript traz mais segurança e clareza ao código.
