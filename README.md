# Tech Challenge 5

Projeto desenvolvido com NestJS para integração com a API da OpenAI.

## Pré-requisitos

- Node.js (versão 18 ou superior)
- npm ou yarn
- Conta na OpenAI

## Instalação

1. Clone o repositório:
```bash
git clone [URL_DO_REPOSITORIO]
cd tech-challenge-5
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:
- Copie o arquivo `.env.example` para `.env`
- Preencha as variáveis necessárias:
  - OPENAI_API_KEY: Sua chave de API da OpenAI

## Estrutura do Projeto

```
tech-challenge-5/
├── src/                  # Código fonte
│   ├── openai.service.ts # Serviço de integração com OpenAI
│   └── ...               # Outros arquivos do projeto
├── fine-tunning/        # Scripts para fine-tuning
│   ├── fine-tunning.ts  # Script principal
│   └── upload-dataset.ts # Script para upload de dataset
└── ...                  # Outros diretórios
```

## Inicialização do Projeto

1. Para desenvolvimento:
```bash
npm run start:dev
# ou
yarn start:dev
```

2. Para produção:
```bash
npm run start:prod
# ou
yarn start:prod
```

## Scripts Disponíveis

- `npm run build`: Compila o projeto
- `npm run start`: Inicia o servidor
- `npm run start:dev`: Inicia o servidor em modo de desenvolvimento
- `npm run start:debug`: Inicia o servidor em modo de debug
- `npm run test`: Executa os testes
- `npm run test:watch`: Executa os testes em modo watch
- `npm run test:cov`: Executa os testes com cobertura
- `npm run lint`: Executa o linting
- `npm run format`: Formata o código

## Fine-tuning

Para realizar fine-tuning com a OpenAI:

1. Preparar o dataset:
```bash
node fine-tunning/upload-dataset.ts
```

2. Iniciar o processo de fine-tuning:
```bash
node fine-tunning/fine-tunning.ts
```

## Tecnologias Utilizadas

- NestJS
- OpenAI API
- TypeScript
- Multer (para upload de arquivos)
- PDFKit (para geração de PDFs)

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request