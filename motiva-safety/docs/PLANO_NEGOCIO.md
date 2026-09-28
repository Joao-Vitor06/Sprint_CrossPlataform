# Plano de Negócio — Motiva Safety

## 1. Resumo executivo

O **Motiva Safety** é uma solução mobile para monitoramento e gestão de vegetação na faixa de domínio de rodovias. A proposta é transformar uma inspeção que hoje depende de observação, registro e acompanhamento operacional em um fluxo digital rastreável: **identificar → medir → localizar → priorizar → executar intervenção → comprovar resultado**.

O protótipo final utiliza câmera/galeria, GPS, persistência local, indicadores de altura, limite operacional, risco, status e histórico de intervenções. Em uma implantação real, a mesma camada de serviço poderá ser conectada a uma API e a um banco de dados corporativo.

A solução é especialmente adequada a operações em que equipes de conservação percorrem grandes extensões rodoviárias. A Motiva Sorocabana, por exemplo, informa operar mais de 460 km e manter equipes de conservação atuando diariamente, o que ilustra a escala operacional em que rastreabilidade e priorização podem gerar valor. citeturn0search12

---

## 2. Problema

O crescimento da vegetação na faixa de domínio pode afetar:

- visibilidade de placas e equipamentos;
- leitura do entorno da pista;
- acesso e inspeção de dispositivos de drenagem;
- área livre junto ao acostamento;
- planejamento de roçadas e podas;
- rastreabilidade das intervenções realizadas.

O problema do produto não é simplesmente "registrar uma ocorrência". É **saber onde a vegetação está fora do padrão, qual a prioridade, qual equipe deve atuar e se a intervenção realmente normalizou o trecho**.

---

## 3. Proposta de valor

### Para a operação

**Centralizar o monitoramento da vegetação em um fluxo único, georreferenciado e auditável.**

O operador registra a evidência e a localização; o sistema organiza altura, limite, risco e status; o supervisor acompanha a fila de atendimento; e o histórico registra a intervenção.

### Valor entregue

1. **Priorização operacional:** trechos acima do limite ficam identificados por risco.
2. **Rastreabilidade:** cada ocorrência possui protocolo, localização e histórico.
3. **Evidência:** foto vinculada ao trecho.
4. **Medição:** altura atual comparada com o limite operacional.
5. **Histórico de conservação:** roçadas, podas e inspeções ficam registradas.
6. **Redução de retrabalho:** a equipe consegue consultar o histórico antes de deslocar-se ao trecho.
7. **Escalabilidade:** o protótipo pode evoluir de dados locais para API, banco e processamento automático de imagens.

---

## 4. Público-alvo e personas

### Persona 1 — Inspetor de campo

**Perfil:** profissional que percorre a rodovia e identifica situações que precisam de conservação.

**Necessidades:**
- registrar rapidamente;
- fotografar o trecho;
- capturar GPS;
- informar altura;
- não depender de conexão permanente;
- receber confirmação do registro.

**Uso do Motiva Safety:** criação da ocorrência em poucos passos.

### Persona 2 — Supervisor de conservação

**Perfil:** responsável por acompanhar as ocorrências e organizar as equipes.

**Necessidades:**
- enxergar trechos acima do limite;
- filtrar por risco/status;
- consultar histórico;
- decidir quais ocorrências entram em intervenção;
- acompanhar a baixa.

**Uso do Motiva Safety:** dashboard, filtros, detalhe, tramitação e histórico.

### Persona 3 — Gestor operacional

**Perfil:** responsável por indicadores e desempenho da operação.

**Necessidades:**
- acompanhar quantidade de trechos fora do padrão;
- identificar reincidências;
- medir execução das intervenções;
- obter histórico para planejamento.

**Uso futuro:** dashboards corporativos e relatórios integrados à API.

---

## 5. Modelo de receita

A proposta comercial é **B2B SaaS + serviço de implantação**, com cobrança vinculada à operação da concessionária.

### Modelo recomendado

**1. Licença SaaS por operação**
- cobrança mensal por unidade/concessão;
- usuários operacionais incluídos por faixa;
- acesso ao painel, API, histórico e indicadores.

**2. Implantação**
- configuração dos limites e regras de cada operação;
- cadastro das rodovias e trechos;
- integração com sistemas existentes;
- treinamento das equipes.

**3. Serviço gerenciado opcional**
- monitoramento de indicadores;
- suporte;
- evolução de modelos de visão computacional;
- relatórios periódicos.

### Exemplo de estrutura comercial

| Componente | Faixa inicial de referência* |
|---|---:|
| Implantação piloto | R$ 30 mil – R$ 60 mil |
| SaaS por concessão/mês | R$ 8 mil – R$ 20 mil |
| Serviço gerenciado opcional | R$ 5 mil – R$ 15 mil/mês |
| Integração/API adicional | R$ 15 mil – R$ 40 mil |

*Valores são **premissas para o exercício acadêmico**, não cotações comerciais da Motiva. O preço real dependeria de número de quilômetros, usuários, integrações, SLA, volume de imagens e nível de automação contratado.

---

## 6. Estimativa de custos operacionais

Para um piloto inicial, os principais custos são:

| Categoria | Estimativa mensal de referência |
|---|---:|
| Cloud/API/banco | R$ 1.500 – R$ 4.000 |
| Armazenamento de imagens | R$ 500 – R$ 2.000 |
| Monitoramento/logs | R$ 300 – R$ 800 |
| Manutenção e desenvolvimento | R$ 8.000 – R$ 18.000 |
| Suporte/operação | R$ 3.000 – R$ 7.000 |
| **Total estimado** | **R$ 13.300 – R$ 31.800/mês** |

Esses valores são premissas de planejamento para um piloto e devem ser recalculados após conhecer volume de fotos, frequência de inspeção, usuários simultâneos, infraestrutura contratada e necessidade de inferência de IA.

### Principal variável de custo

O maior fator de crescimento tende a ser o **volume de imagens e processamento de visão computacional**. Por isso, a arquitetura proposta deve permitir:

- compressão de imagens;
- processamento apenas quando necessário;
- armazenamento por política de retenção;
- processamento em lote quando possível;
- cache de resultados.

---

## 7. Diferenciais da solução

### 7.1 Foco específico em vegetação

O produto não trata mais a vegetação como apenas uma categoria entre vários problemas de rodovia. A versão final do protótipo possui:

- altura medida;
- limite do trecho;
- comparação acima/abaixo do limite;
- categorias específicas de vegetação;
- histórico de roçada/poda;
- evidência fotográfica;
- GPS.

### 7.2 Evolução para visão computacional

A arquitetura permite uma evolução para um veículo de inspeção equipado com câmera.

Fluxo futuro:

**Câmera → imagem → modelo de visão computacional → estimativa de altura → classificação do trecho → GPS → ocorrência automática**

O aplicativo continua sendo a camada operacional para validação, priorização e acompanhamento.

### 7.3 Operação offline-first

O protótipo usa persistência local. Em uma versão de produção, essa característica pode ser mantida como fila offline:

**campo sem sinal → registro local → sincronização automática quando houver conexão.**

Isso é relevante para inspeções em trechos onde a conectividade móvel não é uniforme.

---

## 8. Principais riscos

| Risco | Impacto | Mitigação |
|---|---|---|
| Medição de altura imprecisa | Alto | calibrar modelo e validar amostras em campo |
| Fotos com baixa qualidade | Médio | validação de imagem e orientação ao operador |
| Falha de GPS | Médio | permitir referência manual e sincronizar depois |
| Falta de conectividade | Alto | arquitetura offline-first |
| Volume elevado de imagens | Alto | compressão, retenção e armazenamento escalável |
| Integração com sistemas legados | Médio | API desacoplada e contratos bem definidos |
| Adoção pela equipe de campo | Alto | fluxo curto e treinamento |
| Falso positivo de prioridade | Médio | revisão humana antes de acionar intervenção crítica |

---

## 9. Impacto esperado

O impacto esperado não é apenas tecnológico. O produto pretende melhorar o ciclo operacional de conservação:

**detecção → priorização → programação → intervenção → comprovação → histórico**

Indicadores que podem ser acompanhados em uma implantação real:

- tempo médio entre detecção e programação;
- tempo médio até a intervenção;
- percentual de ocorrências acima do limite;
- percentual de intervenções concluídas;
- reincidência por trecho;
- quantidade de trechos monitorados;
- redução de ocorrências repetidas;
- percentual de registros com evidência e GPS.

Esses indicadores devem ser medidos em piloto antes de qualquer afirmação de economia ou redução de risco.

---

## 10. Roadmap

### Fase 1 — Protótipo acadêmico
- [x] aplicativo mobile;
- [x] registro;
- [x] foto;
- [x] GPS;
- [x] altura e limite;
- [x] priorização;
- [x] tramitação;
- [x] histórico;
- [x] persistência local.

### Fase 2 — Piloto operacional
- [ ] API;
- [ ] banco remoto;
- [ ] autenticação;
- [ ] sincronização offline;
- [ ] mapa integrado;
- [ ] painel web;
- [ ] indicadores operacionais.

### Fase 3 — Automação
- [ ] captura por câmera em veículo;
- [ ] visão computacional;
- [ ] estimativa automática de altura;
- [ ] detecção de vegetação fora do padrão;
- [ ] criação automática de ocorrências;
- [ ] priorização baseada em regras/modelo.

### Fase 4 — Escala
- [ ] integração com sistemas corporativos;
- [ ] múltiplas concessões;
- [ ] relatórios gerenciais;
- [ ] modelos preditivos;
- [ ] acompanhamento de reincidência por trecho.

---

## 11. Critério de sucesso do piloto

O piloto deve ser considerado tecnicamente válido quando a equipe conseguir acompanhar um trecho completo sem planilhas paralelas:

**registrar → localizar → medir → priorizar → executar → comprovar → consultar histórico.**

A decisão de escala deve ser baseada nos indicadores coletados durante o piloto e não em estimativas do protótipo.


## 11. Aderência ao contexto rodoviário da Motiva

Os exemplos do protótipo foram alinhados à malha rodoviária real administrada por concessionárias da Motiva.

A **Motiva AutoBAn** informa administrar o Sistema Anhanguera-Bandeirantes, incluindo SP-330 Anhanguera, SP-348 Bandeirantes, SP-300 Dom Gabriel Paulino Bueno Couto e SPI-102/330 Adalberto Panzan. citeturn844597search0

A **Motiva SPVias** informa administrar 516 km, incluindo trechos das rodovias SP-280 Castello Branco, SP-255 João Mellão, SP-127 Antônio Romano Schincariol, SP-127 Francisco da Silva Pontes, SP-270 Raposo Tavares e SP-258 Francisco Alves Negrão. citeturn657430search0

Os mocks da aplicação usam nomes e quilômetros compatíveis com esses trechos, incluindo exemplos em SP-127 km 133,9, SP-255 km 240,3, SP-258 km 250,1 e 326,6, SP-270 km 135,3 e SP-280 km 158,3, 208,4 e 278,0. A própria Motiva publicou cronogramas de conservação com esses trechos e quilômetros, além de serviços como roçada, poda e limpeza de placas. citeturn657430search4turn657430search1

Esse alinhamento é importante para o plano de negócio porque evita tratar o problema como um caso genérico de manutenção: a solução está contextualizada em uma operação real de conservação rodoviária.
