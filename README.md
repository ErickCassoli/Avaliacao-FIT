# Livraria (Avaliação FIT) 📚

Sistema fullstack de gerenciamento de livros com upload de capas, desenvolvido como parte da avaliação técnica FIT.

## 🚀 Tecnologias

### Backend
- **NestJS** (Framework NodeJS)
- **PostgreSQL** (Metadados dos Livros)
- **MongoDB** (Armazenamento de Imagens/Binários)
- **TypeORM** & **Mongoose**
- **Docker** (Containerização)

### Frontend
- **React** (Vite + TypeScript)
- **CSS Modules** (Estilização customizada)
- **Axios** (Integração API)
- **React Router DOM**

## 🛠️ Como Rodar

### Pré-requisitos
- Docker Desktop instalado e rodando.
- Node.js (v18+)

### Passo a Passo

1. **Clone o repositório**
   ```bash
   git clone <url-do-repo>
   cd Avaliacao-FIT
   ```

2. **Suba a infraestrutura (Bancos de Dados)**
   Isso iniciará o PostgreSQL e o MongoDB via Docker.
   ```bash
   docker compose up -d
   ```

3. **Inicie o Backend**
   Em um terminal:
   ```bash
   cd backend
   npm install
   npm run start:dev
   ```
   *O backend rodará em http://localhost:3000*

4. **Inicie o Frontend**
   Em outro terminal:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   *O frontend rodará em http://localhost:5173*

## 🏛️ Decisões Arquiteturais

### Armazenamento Híbrido
Optou-se por uma abordagem híbrida para demonstrar proficiência em lidar com diferentes tipos de bancos de dados:
- **Postgres (Relacional):** Ideal para dados estruturados e relacionais (Livros, Autores, Datas). Garante integridade e consistência.
- **MongoDB (NoSQL):** Utilizado aqui como um *Object Store* para os binários das imagens. Embora imagens geralmente fiquem em S3/Blob Storage em produção, o uso do Mongo demonstra capacidade de integração com bancos NoSQL e manipulação de fluxos de dados binários (Buffers) numa arquitetura de microsserviços simulada.

### Frontend
Design focado na experiência do usuário (UX), com **Modais** para operações de CRUD para evitar navegação desnecessária e manter o contexto.

## 🧪 Testes
Para rodar os testes unitários do backend:
```bash
cd backend
npm run test
```