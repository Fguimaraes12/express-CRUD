# API de Produtos — CRUD com Express + TypeScript

Prática de rotas Express cobrindo `req.params`, `req.query`, `req.body` e `req.headers`.

## Setup

Rotas dentro de `src/index.ts`, usando Express + TypeScript, com `express.json()` já configurado.

## Rotas

### `GET /products`

Lista todos os produtos.

Aceita dois parâmetros opcionais de query: `categoria` e `precoMax`.

- Se nenhum vier, retorna a lista completa (ou mensagem "sem filtros", dependendo da implementação).
- Se vierem, filtra os produtos de acordo:

```json
{ "categoria": "eletronicos", "precoMax": "500" }
```

### `GET /products/:id`

Retorna o produto correspondente ao `id` da URL.

- Se não encontrado, retorna status `404`.
- Aceita `?formato=resumido` na query:
  - Se `formato === 'resumido'`, retorna só `{ id }`.
  - Senão, retorna o objeto completo.

### `GET /products/:id/details`

Verifica se existe um header customizado `x-api-key`.

- Se não existir, retorna status `401` (não autorizado).
- Se existir, retorna o `id` do produto junto com o valor do header recebido.

### `POST /products`

Cria um novo produto. Espera `{ "nome": "...", "preco": ... }` no corpo da requisição.

- Se `nome` ou `preco` não vierem, retorna status `400` com mensagem de erro.
- Se vierem, retorna status `201` com o produto criado.

### `PATCH /products/:id`

Atualiza um campo específico do produto, via query string (`chave` e `valor`).

- Se o produto não existir, retorna `404`.
- Se `chave` ou `valor` não vierem, retorna `400`.
- Se tudo certo, atualiza o campo e retorna o produto atualizado.

### `DELETE /products/:id`

Remove o produto correspondente ao `id`.

- Se o produto não existir, retorna `404`.
- Se existir, remove e retorna `200` com a lista atualizada.

## Como testar

- Rotas `GET`: testar direto pelo navegador.
- Rotas `POST`, `PATCH`, `DELETE`: precisam de uma ferramenta que envie body/headers, tipo Postman, Insomnia ou Thunder Client.
