# 🍝 TechFood

Sistema web de cardápio e gerenciamento de pedidos para uma restaurante desenvolvido com **HTML, CSS, JavaScript, Node.js, Express e MySQL**, utilizando a arquitetura **MVC**.

## 📖 Sobre o Projeto

O TechFood é uma aplicação que permite:

- Visualizar o cardápio de produtos.
- Adicionar pedidos.
- Gerenciar pedidos realizados.
- Cadastrar novos produtos.

O projeto foi desenvolvido com fins educacionais para praticar conceitos de:

- Front-end
- Back-end
- APIs REST
- Arquitetura MVC
- LocalStorage
- Comunicação Cliente ↔ Servidor

---

## 🚀 Tecnologias Utilizadas

### Front-end
- HTML5
- CSS3
- JavaScript (Vanilla JS)

### Back-end
- Node.js

### Banco de Dados
- MySQL

---

## 📂 Estrutura do Projeto

```text
TechFood/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── services/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── config/
│   │   └── server.js
│   │
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── scripts/
│   │   ├── styles/
│   │   └── imagens/
│   │
│   ├── index.html
│   ├── pedidos.html
│   └── cadastro.html
│
└── database.sql
```

---

## 🎯 Funcionalidades

### Cardápio

- Listagem automática dos produtos cadastrados.
- Exibição de:
  - Nome
  - Descrição
  - Categoria
  - Preço
  - Imagem
- Função de pedir os produtos

### Pedidos

- Adicionar itens ao pedido.
- Visualizar pedidos realizados.
- Remover pedidos.
- Limpar lista de pedidos.
- Exibição do valor total.

### Cadastro de Produtos

- Cadastro de:
  - Nome
  - Descrição
  - Categoria
  - Preço
  - Imagem (utilizando Base64)
- Envio dos dados para a API.
