# Documento de Testes Manuais — Sprint 3

## Aplicação
Motiva Safety — registro e acompanhamento de ocorrências de segurança.

## Ambiente
- React Native + Expo + TypeScript
- Dados mockados locais
- Execução prevista em Expo Go ou emulador

## Fluxos testados

| # | Cenário testado | Resultado esperado | Resultado obtido | Status |
|---|---|---|---|---|
| 1 | Abrir o app e visualizar a lista de ocorrências | A tela inicial deve carregar sem erro e apresentar as ocorrências mockadas, resumo e filtros. | A lista é carregada com os registros mockados, cards de resumo e filtros de risco. | PASSOU |
| 2 | Filtrar ocorrências por risco Alto, Médio e Baixo | Ao selecionar um filtro, somente ocorrências daquele nível devem permanecer na lista. | O filtro altera a lista e o contador/resumo continua sendo calculado a partir dos dados atuais. | PASSOU |
| 3 | Selecionar uma ocorrência e abrir seus detalhes | Deve abrir a tela de detalhes com risco, status, descrição, local, responsável, data e ID. | A tela de detalhes apresenta os dados completos da ocorrência selecionada e permite retornar à lista. | PASSOU |
| 4 | Abrir cadastro e tentar salvar formulário vazio | O app não deve cadastrar registro e deve informar que os campos obrigatórios precisam ser preenchidos. | O formulário bloqueia o cadastro e exibe alerta de campos obrigatórios. | PASSOU |
| 5 | Preencher cadastro válido e registrar ocorrência | Deve exibir confirmação e inserir a nova ocorrência na lista com status aberta. | A ocorrência é criada em memória, recebe ID, data atual e status aberta; após confirmação, o usuário pode voltar à lista. | PASSOU |
| 6 | Selecionar risco Alto no cadastro | O formulário deve destacar o risco e mostrar o aviso de priorização. | O risco Alto fica selecionado e o aviso de segurança é exibido. | PASSOU |
| 7 | Selecionar um filtro sem resultados | A tela deve informar que nenhuma ocorrência foi encontrada, sem travar. | O componente de lista possui estado vazio com mensagem orientativa. | PASSOU |

## Cenários de erro e alternativos

- Formulário incompleto: tratado com validação antes do cadastro.
- Lista filtrada sem resultados: tratado com `ListEmptyComponent`.
- Ocorrência de alto risco: possui aviso específico no cadastro e indicador na tela de detalhes.
- Dados não disponíveis em API: aplicação utiliza mock local para manter os fluxos demonstráveis.

## Observações

Os testes acima são testes manuais previstos para a demonstração da Sprint 3. O fluxo de persistência ainda é somente em memória: uma ocorrência cadastrada não é mantida após o encerramento/reinício do aplicativo.

## Pontos para Sprint 4

1. Substituir o armazenamento em memória por persistência/banco de dados ou API.
2. Evoluir a navegação para uma solução de rotas caso a quantidade de telas aumente.
3. Adicionar edição e/ou atualização do status das ocorrências, se previsto nos requisitos finais.
4. Adicionar testes automatizados para validações e componentes críticos.
5. Avaliar melhorias de acessibilidade e feedback visual durante operações.
