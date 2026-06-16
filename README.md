# 🍽️ API Restaurant

API REST desenvolvida para gerenciamento de um restaurante, permitindo o controle de mesas, abertura e fechamento de sessões e gerenciamento de pedidos.

O projeto foi desenvolvido utilizando **Node.js**, **TypeScript**, **Express**, **Knex.js**, **SQLite** e **Zod**, aplicando boas práticas de organização em camadas e validação de dados.

---

## 🚀 Tecnologias utilizadas

- Node.js
- TypeScript
- Express
- Knex.js
- SQLite
- Zod

---

## ⚙️ Funcionalidades

### 🥘 Produtos

- ✅ Criar produto
- ✅ Listar produtos
- ✅ Atualizar produto
- ✅ Remover produto

### 🪑 Mesas

- ✅ Listar mesas

### 🔓 Sessões das mesas

- ✅ Abrir uma mesa
- ✅ Listar mesas abertas
- ✅ Fechar uma mesa

### 🧾 Pedidos

- ✅ Criar pedido
- ✅ Listar pedidos de uma mesa
- ✅ Exibir resumo do pedido (quantidade e valor total)

---

## 📌 Rotas da API

### Produtos

| Método | Rota | Descrição |
|---------|------|-----------|
| POST | `/products` | Criar produto |
| GET | `/products` | Listar produtos |
| PUT | `/products/:id` | Atualizar produto |
| DELETE | `/products/:id` | Remover produto |

---

### Mesas

| Método | Rota | Descrição |
|---------|------|-----------|
| GET | `/tables` | Listar mesas |

---

### Sessões

| Método | Rota | Descrição |
|---------|------|-----------|
| POST | `/tables-sessions/open` | Abrir mesa |
| GET | `/tables-sessions` | Listar mesas abertas |
| PATCH | `/tables-sessions/:table_session_id/close` | Fechar mesa |

---

### Pedidos

| Método | Rota | Descrição |
|---------|------|-----------|
| POST | `/orders` | Criar pedido |
| GET | `/orders/table/:table_session_id` | Listar pedidos da mesa |
| GET | `/orders/table/:table_session_id/show` | Resumo do pedido |

---

## ▶️ Como executar

### Clone o repositório

```bash
git clone https://github.com/palhetabraian/Api-Restaurant.git
```

Entre na pasta:

```bash
cd Api-Restaurant
```

Instale as dependências:

```bash
npm install
```

Execute as migrations:

```bash
npm run knex migrate:latest
```

Execute os seeds (caso existam):

```bash
npm run knex seed:run
```

Inicie o servidor:

```bash
npm run dev
```

A aplicação será iniciada em:

```
http://localhost:3333
```

---

## 🛠️ Ferramentas utilizadas para testes

As requisições da API foram testadas utilizando o **Insomnia**.

---

## 📚 Objetivo

Este projeto foi desenvolvido com o objetivo de praticar conceitos de desenvolvimento backend, como:

- Arquitetura em camadas
- CRUD com banco de dados
- Validação de dados com Zod
- Migrations e Seeds com Knex
- Tratamento de erros
- Desenvolvimento de APIs REST

---

## 👨‍💻 Autor

**Braian Nickolas**

GitHub:
https://github.com/palhetabraian
