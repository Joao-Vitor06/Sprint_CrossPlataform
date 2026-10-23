# Testes finais — Sprint 4

> Testes executados **no APK final instalado em um dispositivo Android físico**.
>
> Os testes abaixo são a regressão da Sprint 3 + os novos cenários de vegetação da Sprint 4.

**Dispositivo:** Samsung Galaxy S25+ | **Android:** 16 | **APK:** 4.0.0 | **Data:** 22/10/2026

Legenda:
- ✅ **Passou:** o resultado obtido no APK foi igual ao esperado.
- ❌ **Falhou:** o resultado obtido foi diferente do esperado (falha e correção anotadas).

| ID | Cenário | Resultado esperado | Status |
|---|---|---|---|
| SF-01 | Abrir o APK | App inicia sem crash e carrega a lista | ✅ Passou |
| SF-02 | Restaurar exemplos | 14 ocorrências de vegetação aparecem | ✅ Passou |
| SF-03 | Consultar dashboard | Indicadores de acima do limite, em tratamento e dentro do limite aparecem | ✅ Passou |
| SF-04 | Buscar por "vegetação" | Lista retorna ocorrências relacionadas | ✅ Passou |
| SF-05 | Filtrar por risco | Apenas ocorrências do risco selecionado aparecem | ✅ Passou |
| SF-06 | Abrir detalhe | Foto, localização, altura, limite e histórico aparecem | ✅ Passou |
| SF-07 | Comparar altura × limite | O detalhe identifica corretamente se está acima ou dentro do limite | ✅ Passou |
| SF-08 | Abrir GPS no mapa | Aplicativo de mapas abre com as coordenadas da ocorrência | ✅ Passou |
| SF-09 | Tramitar ocorrência | Status muda e nova etapa aparece no histórico | ✅ Passou |
| SF-10 | Registrar nova ocorrência | Formulário salva uma ocorrência de vegetação com foto, GPS, altura e limite | ✅ Passou |
| SF-11 | Editar ocorrência | Altura/limite e demais informações são persistidos | ✅ Passou |
| SF-12 | Persistência | Após fechar e abrir o app, os registros continuam disponíveis | ✅ Passou |
| SF-13 | Lista vazia | Estado vazio aparece sem quebrar a navegação | ✅ Passou |
| SF-14 | Busca sem resultado | Mensagem de nenhum resultado e limpeza de filtros funcionam | ✅ Passou |
| SF-15 | Falha simulada | Estado de erro aparece e permite tentar novamente | ✅ Passou |
| SF-16 | Permissão de câmera | Negar permissão mostra orientação e não trava o app | ✅ Passou |
| SF-17 | Permissão de GPS | Negar localização mantém possibilidade de informar referência manual | ✅ Passou |
| SF-18 | Base antiga | Em aparelho que possuía dados da Sprint 3, a base genérica é substituída pelos exemplos de vegetação | ✅ Passou |

## Critério de aprovação

A entrega final deve ser considerada pronta somente após:

- [x] todos os fluxos principais passarem;
- [x] nenhum crash durante a execução;
- [x] câmera funcionando;
- [x] GPS funcionando;
- [x] persistência funcionando;
- [x] 14 ocorrências de demonstração sendo exclusivamente de vegetação;
- [x] altura e limite aparecendo corretamente;
- [x] histórico de intervenção funcionando;
- [x] APK instalado em dispositivo físico.

## Evidência

Registrar, para cada teste:

- dispositivo utilizado;
- versão do Android;
- versão do APK;
- data;
- resultado obtido;
- evidência por screenshot ou vídeo quando necessário.

Todos os 18 testes passaram no dispositivo acima, sem falhas a corrigir.
