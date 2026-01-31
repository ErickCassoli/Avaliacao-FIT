# 📚 Livraria FIT - Fullstack Challenge

![Build Status](https://img.shields.io/badge/build-passing-brightgreen) ![License](https://img.shields.io/badge/license-MIT-blue) ![Node](https://img.shields.io/badge/node-v18+-green)

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
    git clone https://github.com/seu-usuario/Avaliacao-FIT.git
    cd Avaliacao-FIT
    ```

2.  **Suba os Bancos de Dados:**
    ```bash
    docker compose up -d
    ```
    *Isso iniciará os containers do PostgreSQL e MongoDB.*

3.  **Inicie as Aplicações:**

    *   **Backend:**
        ```bash
        cd backend
        npm install
        npm run seed    # (Opcional) Popula o banco com dados iniciais
        npm run start:dev
        ```
    *   **Frontend:**
        ```bash
        cd frontend
        npm install
        npm run dev
        ```

4.  **Acesse:**
    *   📱 **Aplicação:** [http://localhost:5173](http://localhost:5173)
    *   📄 **Documentação API:** [http://localhost:3000/api/docs](http://localhost:3000/api/docs)

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

Desenvolvido por **Erick Cassoli** 🚀