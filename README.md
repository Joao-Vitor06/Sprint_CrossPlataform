# Motiva Safety — Entrega Final > **Aplicativo mobile para monitoramento e gestão de vegetação na faixa de domínio de rodovias.** O **Motiva Safety** transforma o monitoramento de vegetação em um fluxo operacional rastreável: **identificar → fotografar → localizar → medir → priorizar → intervir → comprovar → consultar histórico** A Sprint 4 corrigiu o principal ponto de atenção da Sprint 3: o produto deixou de ser um gerenciador genérico de ocorrências de segurança e passou a ter **vegetação como núcleo do domínio**.
---

##  Problema O crescimento irregular da vegetação pode afetar a visibilidade de sinalização, ocupar áreas laterais, dificultar a inspeção de dispositivos de drenagem e aumentar a necessidade de intervenções de conservação. O Motiva Safety foi projetado para responder: > **Onde a vegetação está fora do padrão, qual é a prioridade, qual equipe precisa atuar e o que aconteceu depois da intervenção?**
---

##  Solução A equipe de campo consegue registrar: - evidência fotográfica;
- rodovia, km e sentido;

- localização por GPS;

- altura atual da vegetação;

- limite operacional do trecho;

- referência do ponto;

- prioridade;

- responsável pelo registro. O supervisor consegue:
 - consultar os trechos;
- buscar e filtrar;

- identificar ocorrências acima do limite;

- detalhar cada trecho;

- acompanhar a tramitação;

- visualizar histórico;

- registrar a resolução;

- consultar intervenções anteriores.

---

# O foco em vegetação A base de demonstração possui **14/14 ocorrências exclusivamente de vegetação**. Os cenários incluem: | Cenário | Exemplo |
|---|---|
| Acima do limite | 172 cm medidos × 150 cm de limite |
| Encobrindo sinalização | Vegetação reduzindo a visibilidade de uma placa |
| Invadindo acostamento | Vegetação ocupando área lateral |
| Sobre drenagem | Vegetação dificultando inspeção e escoamento |
| Dentro do padrão | Trecho monitorado sem necessidade de intervenção |
| Roçada concluída | Altura antes × altura depois |
| Poda concluída | Histórico da intervenção |
| Inspeção | Registro de conformidade | O detalhe de uma ocorrência resolvida consegue demonstrar, por exemplo: **118 cm → roçada → 62 cm** Assim, o produto não registra apenas "um problema": ele registra **medição, limite, localização, prioridade, intervenção e resultado**.

---

# Tema claro e escuro A Sprint 4 também ganhou suporte completo a **modo claro e modo escuro**.
### Comportamento - tema inicial acompanha a configuração do dispositivo;
- usuário pode alternar manualmente pelo ícone no cabeçalho;

- preferência fica salva no aparelho;

- tema é aplicado a telas, cartões, formulários, filtros, modais, estados de erro e carregamento;

- barra de status acompanha o tema. O design escuro utiliza uma superfície azul-marinho/cinza profunda, mantendo o azul institucional da Motiva como cor de ação e preservando as cores semânticas de prioridade.

---

# Funcionalidades
## Monitoramento - Concluído Cadastro de ocorrência de vegetação
- **Concluído:** Foto por câmera

- **Concluído:** Foto pela galeria

- **Concluído:** GPS

- **Concluído:** Rodovia, km e sentido

- **Concluído:** Altura medida

- **Concluído:** Limite operacional

- **Concluído:** Comparação acima/abaixo do limite

- **Concluído:** Categorias de vegetação

- **Concluído:** Classificação de prioridade

## Gestão - Concluído Lista de trechos monitorados
- **Concluído:** Busca

- **Concluído:** Filtros por prioridade

- **Concluído:** Filtros por status

- **Concluído:** Ordenação

- **Concluído:** Detalhamento

- **Concluído:** Edição

- **Concluído:** Tramitação

- **Concluído:** Linha do tempo

- **Concluído:** Histórico de intervenções

- **Concluído:** Abertura da localização em aplicativo de mapas

- **Concluído:** Persistência local com AsyncStorage

## Estados - Concluído Carregamento
- **Concluído:** Erro

- **Concluído:** Lista vazia

- **Concluído:** Busca sem resultado

- **Concluído:** Falha de gravação

- **Concluído:** Permissão de câmera

- **Concluído:** Permissão de localização

- **Concluído:** Modo demonstração para validação dos cenários

---

# Stack e arquitetura | Tecnologia | Uso |
|---|---|
| React Native | Aplicativo mobile |
| Expo SDK 57 | Framework |
| TypeScript | Tipagem |
| React Navigation | Navegação |
| AsyncStorage | Persistência local |
| Expo Image Picker | Câmera/galeria |
| Expo Location | GPS |
| Expo Image | Evidências |
| Expo Vector Icons | Ícones |
| EAS Build | Build Android | Estrutura principal: ```text
MotivaSprint2/
├── App.tsx
├── app.json
├── eas.json
├── src/
│ ├── components/
│ ├── context/
│ ├── data/
│ ├── navigation/
│ ├── screens/
│ ├── services/
│ ├── theme/
│ ├── types/
│ └── utils/
├── assets/
│ └── ocorrencias/
└── docs/ ├── PLANO_NEGOCIO.md └── TESTES_SPRINT4_FINAL.md
```

---

# APK final O projeto possui um perfil EAS configurado para gerar **APK Android**: ```bash
eas build --platform android --profile preview
```

### Link do APK > **Pendente:**** gerar o build final e publicar o APK fora do repositório. O APK deverá ser hospedado em **EAS Build, GitHub Releases, Google Drive ou serviço equivalente**. > **O arquivo binário não deve ser commitado neste repositório.**
### Instalação 1. Abrir o link do APK no Android.
2. Autorizar a instalação quando solicitado.
3. Instalar o Motiva Safety.
4. Abrir o aplicativo.
5. Permitir câmera e localização.
6. Executar os testes finais.

---

# Plano de negócio O plano completo está em: **[PLANO_NEGOCIO.md](./motiva-safety/docs/PLANO_NEGOCIO.md)** O documento contempla: - proposta de valor;
- problema;

- público-alvo;

- personas;

- modelo de receita;

- custos operacionais estimados;

- diferenciais;

- riscos;

- impacto esperado;

- indicadores;

- roadmap.

### Modelo comercial **B2B SaaS + implantação + serviço gerenciado opcional.** As estimativas financeiras são tratadas explicitamente como **premissas acadêmicas para um piloto**, e não como cotação comercial da Motiva.
---

# Evolução com visão computacional A arquitetura foi preparada para uma evolução futura: ```text
Câmera embarcada ↓
Captura da imagem ↓
Visão computacional ↓
Estimativa da altura ↓
Comparação com limite ↓
Classificação de prioridade ↓
GPS ↓
Ocorrência automática ↓
Motiva Safety
```
A automação não elimina a validação humana: o aplicativo continua como camada operacional de revisão, priorização e acompanhamento.

---

# Testes
### Sprint 3 A Sprint 3 teve **20 testes manuais documentados**, incluindo fluxos principais, secundários, erros, estados vazios, foto, GPS, persistência e permissões. **[TESTES_SPRINT3.md](./motiva-safety/MotivaSprint2/TESTES_SPRINT3.md)**
### Sprint 4 — regressão final Foi criado um novo checklist específico para o APK: **[TESTES_SPRINT4_FINAL.md](./motiva-safety/docs/TESTES_SPRINT4_FINAL.md)** Ele possui **18 cenários**, cobrindo: - abertura do APK;
- base de vegetação;

- dashboard;

- busca;

- filtros;

- detalhe;

- altura × limite;

- GPS;

- tramitação;

- novo registro;

- edição;

- persistência;

- lista vazia;

- busca sem resultado;

- falha simulada;

- câmera;

- GPS negado;

- migração da base antiga. > Os 18 testes precisam ser executados novamente no **APK final instalado em dispositivo Android** antes da submissão.

---

# Pitch final
### Link do vídeo > **Pendente:**** gravar e publicar o vídeo final. O vídeo deve ter **até 5 minutos** e ter protagonismo dos integrantes do grupo. Roteiro: **[ROTEIRO_VIDEO.md](./motiva-safety/MotivaSprint2/ROTEIRO_VIDEO.md)** Estrutura: | Tempo | Conteúdo |
|---|---|
| 0:00–0:30 | Grupo + problema |
| 0:30–1:00 | Solução |
| 1:00–2:00 | Dashboard |
| 2:00–3:15 | Detalhe + histórico |
| 3:15–4:00 | Novo registro |
| 4:00–4:35 | Plano de negócio |
| 4:35–5:00 | Impacto + encerramento | **Importante:** a apresentação deve ser narrada pelos integrantes. Não utilizar narração automatizada por IA.

---

# Evolução das quatro Sprints | Sprint | Entrega |
|---|---|
| **Sprint 1** | Problema, proposta e prototipação inicial |
| **Sprint 2** | Estrutura mobile, navegação, componentes e identidade visual |
| **Sprint 3** | Protótipo funcional completo, GPS, foto, persistência, tramitação, histórico e 20 testes |
| **Sprint 4** | Especialização em vegetação, altura/limite, histórico de intervenções, plano de negócio, tema escuro e preparação do APK final |

### Resultado da Sprint 3 **9/10** Principal feedback recebido: > O aplicativo estava funcional e bem documentado, mas havia perdido aderência ao desafio porque se comportava como um gerenciador genérico de ocorrências.
### Resposta na Sprint 4 **14/14 mocks agora são de vegetação**, com dados de altura, limite, prioridade e histórico de intervenção.
---

# Matriz de aderência à Sprint 4 | Exigência | Estado atual |
|---|---|
| Aplicação final em Android | Em preparação Código preparado; falta gerar/validar APK |
| APK hospedado fora do Git | Pendente Falta publicar o build |
| Link do APK no README | Pendente Falta adicionar após publicação |
| Plano de negócio | Concluído Concluído |
| Proposta de valor | Concluído |
| Público-alvo/personas | Concluído |
| Modelo de receita | Concluído |
| Custos operacionais | Concluído |
| Riscos | Concluído |
| Diferenciais | Concluído |
| README como documento-âncora | Concluído |
| Pitch de até 5 minutos | Concluído Roteiro pronto |
| Protagonismo dos integrantes | Pendente Depende da gravação |
| Link do vídeo | Pendente Falta adicionar |
| Demonstração em dispositivo | Pendente Depende do APK |
| Problema da Motiva no centro do produto | Concluído |
| Vegetação como domínio principal | Concluído |
| Altura + limite | Concluído |
| Histórico de intervenções | Concluído |
| Tema claro/escuro | Concluído |
| Migração para Flutter | N/A — React Native foi mantido | > **Conclusão:** o código e a documentação estão alinhados ao escopo da Sprint 4. A submissão só fica integralmente fechada após **gerar o APK, instalar e testar em Android, publicar o APK, gravar o pitch e adicionar os dois links ao README**.

---

# Evoluções futuras Estas funcionalidades ficam como evolução do produto, e não como pendência necessária para a entrega acadêmica atual: - backend remoto;
- autenticação;

- sincronização entre dispositivos;

- mapa integrado;

- compressão de imagens;

- testes automatizados;

- visão computacional;

- criação automática de ocorrências;

- análise de reincidência por trecho.

---

# Decisão tecnológica A equipe **não migrou para Flutter**. O projeto permanece em: **React Native + Expo + TypeScript** A decisão foi manter a stack utilizada nas Sprints anteriores porque ela já possuía navegação, componentes reutilizáveis, camada de serviço, persistência e fluxos funcionais. A Sprint 4 foi utilizada para aprofundar a aderência ao problema da Motiva, melhorar a experiência visual, adicionar o tema escuro, consolidar o plano de negócio e preparar a distribuição em APK.
---

# Como executar localmente
### Pré-requisitos - Node.js
- npm

- Android Studio ou dispositivo Android

- Expo/EAS CLI

### Instalação ```bash
git clone https://github.com/Joao-Vitor06/Sprint_CrossPlataform.git
cd Sprint_CrossPlataform/motiva-safety/MotivaSprint2
npm install
```

### Desenvolvimento ```bash
npx expo start
```

### Android ```bash
npm run android
```

### APK ```bash
eas build --platform android --profile preview
```

---

# Projeto **FIAP — Ciência da Computação** **Desafio:** Motiva **Aplicação:** Motiva Safety **Stack:** React Native + Expo + TypeScript **Versão:** 4.0.0