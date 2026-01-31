# 📚 Livraria API (Backend)

Backend robusto desenvolvido com **NestJS**, seguindo arquitetura modular e princípios SOLID. Utiliza uma abordagem híbrida de banco de dados (**PostgreSQL** para metadados e **MongoDB** para arquivos) e inclui documentação automática via Swagger.

## 🚀 Tecnologias

- **Framework:** [NestJS](https://nestjs.com/)
- **Linguagem:** TypeScript
- **Bancos de Dados:**
  - **PostgreSQL:** TypeORM
  - **MongoDB:** Mongoose
- **Containerização:** Docker
- **Testes:** Jest
- **Documentação:** Swagger (OpenAPI)

## ⚙️ Pré-requisitos

- Node.js (v18+)
- Docker & Docker Compose
- PostgreSQL e MongoDB rodando (via Docker Compose na raiz)

## 🛠️ Instalação e Execução

### 1. Configuração de Ambiente
Certifique-se de que o arquivo `.env` na raiz do projeto existe e contém as credenciais corretas.

### 2. Instalação
```bash
npm install
```

### 3. Rodando a Aplicação
```bash
# Desenvolvimento (Watch Mode)
npm run start:dev

# Produção
npm run build
npm run start:prod
```
A API estará disponível em: `http://localhost:3000`

## 📖 Documentação da API (Swagger)

A documentação interativa está disponível em:
**[http://localhost:3000/api/docs](http://localhost:3000/api/docs)**

## 🗃️ Seed de Dados

Para popular o banco de dados com livros iniciais:
```bash
npm run seed
```

## 🧪 Testes

```bash
# Testes Unitários
npm run test

# Cobertura de Testes
npm run test:cov
```

## 📂 Estrutura de Pastas

```
src/
├── books/           # Módulo de Livros (Review, Controller, Service)
├── images/          # Módulo de Imagens (Integração Mongo)
├── common/          # Filtros Globais, DTOs e Interceptors
├── app.module.ts    # Módulo Raiz
├── main.ts          # Entry Point
└── seed.ts          # Script de População
```
