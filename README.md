# MotivaSprint3

Código do aplicativo Motiva Safety. A documentação completa do projeto, incluindo status das
funcionalidades, pendências e plano da Sprint 4, está no [README da raiz](../README.md).

## Rodar localmente

Após o gitclone faça os seguintes comandos:
```bash
cd motiva-safety
cd motivasprint2
npm install
npx expo start
```

| Comando | O que faz |
|---|---|
| `npm start` | Inicia o Metro e mostra o QR Code para o Expo Go |
| `npm run android` | Abre no emulador ou dispositivo Android |
| `npm run ios` | Abre no simulador iOS (só em macOS) |
| `npm run web` | Abre no navegador |
| `npm run typecheck` | Roda o TypeScript sem gerar arquivos |

Requer Node.js 20 ou superior e o Expo Go atualizado. O projeto usa a **SDK 57**.

## Onde mexer

| Quero mudar | Arquivo |
|---|---|
| Cores, fontes, espaçamento | `src/theme/colors.ts` e `src/theme/tokens.ts` |
| Rótulos e cores de risco, status e tipo | `src/theme/domain.ts` |
| Quais mudanças de status são permitidas | `TRANSICOES` em `src/theme/domain.ts` |
| Ocorrências de exemplo | `src/data/mockData.ts` |
| Regras de validação do formulário | `validar()` em `src/screens/FormularioOcorrencia.tsx` |
| Trocar o mock pela API real | `src/services/ocorrenciasService.ts` |

## Modo demonstração

O ícone de frasco no cabeçalho da lista abre um painel que força os cenários difíceis de
reproduzir: falha de conexão e base sem nenhuma ocorrência. Serve para a apresentação da Sprint e
deve ser removido quando a integração real entrar.
