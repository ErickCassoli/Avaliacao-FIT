# 📚 Livraria FIT - Fullstack Challenge

![Build Status](https://img.shields.io/badge/build-passing-brightgreen) ![Node](https://img.shields.io/badge/node-v18+-green)

Sistema completo de gerenciamento de livros desenvolvido como parte da avaliação técnica FIT. O projeto demonstra uma arquitetura escalável utilizando **NestJS** no backend e **React** no frontend, com armazenamento híbrido (Relacional + NoSQL).

---

## 🌟 Diferenciais do Projeto

*   **Arquitetura Híbrida:** PostgreSQL (Metadados) + MongoDB (Imagens/Binários).
*   **DevOps:** Pipeline de CI com **GitHub Actions** configurado.
*   **UX Premium:** Interface responsiva com paginação e feedbacks visuais.
*   **Qualidade de Código:** Padrões SOLID, TypeScript estrito e DTOs validados.
*   **Documentação Viva:** API totalmente documentada com Swagger.

---

## 🚀 Quick Start (Rodando Tudo)

A maneira mais fácil de rodar o projeto é utilizando o Docker Compose:

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/ErickCassoli/Avaliacao-FIT.git
    cd Avaliacao-FIT
    ```

2.  **Configuração de Ambiente (.env):**
    O projeto utiliza variáveis de ambiente para conectar aos bancos de dados.
    Crie um arquivo `.env` na raiz do projeto (baseado no exemplo) antes de subir os containers:

    ```bash
    cp .env.example .env
    # Se estiver no Windows (PowerShell):
    # copy .env.example .env
    ```
    *Isso garantirá que o Backend consiga se conectar ao Postgres e Mongo.*

3.  **Escolha o Modo de Execução:**
    Você pode rodar apenas a infraestrutura (para desenvolvimento local) ou a aplicação completa containerizada.

    ### 🛠️ Opção A: Desenvolvimento Local (Recomendado para Devs)
    *Roda apenas os bancos no Docker. Backend e Frontend rodam na sua máquina.*

    1.  **Suba os Bancos:**
        ```bash
        docker compose up -d
        ```
    2.  **Inicie as Aplicações:**
        *   **Backend:** `cd backend && npm i && npm run start:dev`
        *   **Frontend:** `cd frontend && npm i && npm run dev`
    3.  **Acesse:**
        *   Frontend: `http://localhost:5173`
        *   Backend: `http://localhost:3000`

    ---

    ### � Opção B: Modo Fullstack (Produção/Demo)
    *Roda TUDO (App + Bancos) dentro do Docker.*

    1.  **Suba tudo:**
        ```bash
        docker compose --profile app up --build
        ```
    2.  **Acesse:**
        *   Frontend: `http://localhost:5173` (Via Nginx)
        *   Backend: `http://localhost:3000`

---

## 🏗️ Arquitetura

O projeto está organizado como um **Monorepo**:

*   **[`/backend`](./backend/README.md):** API NestJS, contendo regras de negócio, acesso a dados e testes.
*   **[`/frontend`](./frontend/README.md):** Aplicação React (SPA), responsável pela interface do usuário.

### Decisão de Armazenamento Híbrido
Optou-se por usar **MongoDB** para armazenar as imagens (simulando um Object Storage) e **PostgreSQL** para os dados relacionais dos livros. O Frontend consome a imagem através de um endpoint de streaming do Backend, garantindo segurança e abstração.

---

## 🧪 Testes

Para garantir a robustez, o backend possui testes unitários cobrindo serviços e controladores.

```bash
cd backend
npm run test
```
---

