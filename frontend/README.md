# 🎨 Livraria UI (Frontend)

Interface moderna e responsiva desenvolvida com **React** e **Vite**, focada na experiência do usuário (UX). Utiliza CSS Modules para estilização e modais para fluxos de criação/edição sem recarregamento.

## 🚀 Tecnologias

- **Core:** [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Linguagem:** TypeScript
- **Estilização:** CSS Modules + Variáveis CSS (Theming)
- **Ícones:** Lucide React
- **HTTP Client:** Axios
- **Roteamento:** React Router DOM

## ⚙️ Instalação e Execução

### 1. Instalação
```bash
npm install
```

### 2. Rodando em Desenvolvimento
```bash
npm run dev
```
O frontend estará acessível em: `http://localhost:5173`

### 3. Build para Produção
```bash
npm run build
```

## 🧩 Funcionalidades Principais

- **Listagem com Paginação:** Grid de livros responsivo com controles de página.
- **Busca em Tempo Real:** Filtro por título ou autor.
- **Modais de CRUD:** Formulários de criação e edição abrem em sobreposição (Overlay).
- **Upload de Imagens:** Preview instantâneo da capa do livro.

## 📂 Estrutura de Pastas

```
src/
├── components/      # Componentes Reutilizáveis (Cards, Modais, Inputs)
├── pages/           # Páginas (BookList, BookDetails)
├── services/        # Configuração do Axios (api.ts)
├── types/           # Definições de Tipos TS (Interfaces)
└── styles/          # Temas globais e resets
```
