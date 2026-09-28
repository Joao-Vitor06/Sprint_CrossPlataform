# Testes finais — Sprint 4

> Este documento deve ser executado novamente **no APK final instalado em um dispositivo Android** antes da submissão.
>
> Os testes abaixo são a regressão da Sprint 3 + os novos cenários de vegetação da Sprint 4.

| ID | Cenário | Resultado esperado | Status |
|---|---|---|---|
| SF-01 | Abrir o APK | App inicia sem crash e carrega a lista | ⏳ A executar |
| SF-02 | Restaurar exemplos | 14 ocorrências de vegetação aparecem | ⏳ A executar |
| SF-03 | Consultar dashboard | Indicadores de acima do limite, em tratamento e dentro do limite aparecem | ⏳ A executar |
| SF-04 | Buscar por "vegetação" | Lista retorna ocorrências relacionadas | ⏳ A executar |
| SF-05 | Filtrar por risco | Apenas ocorrências do risco selecionado aparecem | ⏳ A executar |
| SF-06 | Abrir detalhe | Foto, localização, altura, limite e histórico aparecem | ⏳ A executar |
| SF-07 | Comparar altura × limite | O detalhe identifica corretamente se está acima ou dentro do limite | ⏳ A executar |
| SF-08 | Abrir GPS no mapa | Aplicativo de mapas abre com as coordenadas da ocorrência | ⏳ A executar |
| SF-09 | Tramitar ocorrência | Status muda e nova etapa aparece no histórico | ⏳ A executar |
| SF-10 | Registrar nova ocorrência | Formulário salva uma ocorrência de vegetação com foto, GPS, altura e limite | ⏳ A executar |
| SF-11 | Editar ocorrência | Altura/limite e demais informações são persistidos | ⏳ A executar |
| SF-12 | Persistência | Após fechar e abrir o app, os registros continuam disponíveis | ⏳ A executar |
| SF-13 | Lista vazia | Estado vazio aparece sem quebrar a navegação | ⏳ A executar |
| SF-14 | Busca sem resultado | Mensagem de nenhum resultado e limpeza de filtros funcionam | ⏳ A executar |
| SF-15 | Falha simulada | Estado de erro aparece e permite tentar novamente | ⏳ A executar |
| SF-16 | Permissão de câmera | Negar permissão mostra orientação e não trava o app | ⏳ A executar |
| SF-17 | Permissão de GPS | Negar localização mantém possibilidade de informar referência manual | ⏳ A executar |
| SF-18 | Base antiga | Em aparelho que possuía dados da Sprint 3, a base genérica é substituída pelos exemplos de vegetação | ⏳ A executar |

## Critério de aprovação

A entrega final deve ser considerada pronta somente após:

- [ ] todos os fluxos principais passarem;
- [ ] nenhum crash durante a execução;
- [ ] câmera funcionando;
- [ ] GPS funcionando;
- [ ] persistência funcionando;
- [ ] 14 ocorrências de demonstração sendo exclusivamente de vegetação;
- [ ] altura e limite aparecendo corretamente;
- [ ] histórico de intervenção funcionando;
- [ ] APK instalado em dispositivo físico.

## Evidência

Registrar, para cada teste:

- dispositivo utilizado;
- versão do Android;
- versão do APK;
- data;
- resultado obtido;
- evidência por screenshot ou vídeo quando necessário.

Os resultados finais devem substituir os status **"A executar"** antes da entrega.
