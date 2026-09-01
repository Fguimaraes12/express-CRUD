# Desafio: API de Produtos — praticando req.params, req.query, req.body e req.headers

## Setup

Rotas dentro de `src/index.ts`, usando Express + TypeScript, com `express.json()` já configurado.

## Rotas para implementar

### 1. `GET /products/:id` — usa `req.params`

Retorna um objeto fixo simulando um produto, usando o `id` da URL:

```json
{ "id": "<valor recebido>", "nome": "Produto genérico" }
```

### 2. `GET /products` — usa `req.query`

Aceita dois parâmetros opcionais de busca: `categoria` e `precoMax`.

- Se nenhum vier, retorna uma mensagem dizendo "sem filtros".
- Se vierem, retorna um objeto mostrando os filtros recebidos:

```json
{ "categoria": "eletronicos", "precoMax": "500" }
```

### 3. `POST /products` — usa `req.body`

Espera receber `{ "nome": "...", "preco": ... }` no corpo da requisição.

- Se `nome` ou `preco` não vierem, retorna status `400` com mensagem de erro.
- Se vierem, retorna status `201` com o produto criado (pode inventar um `id` fixo).

### 4. `GET /products/:id/details` — usa `req.headers`

Verifica se existe um header customizado `x-api-key`.

- Se não existir, retorna status `401` (não autorizado).
- Se existir, retorna o `id` do produto (via `params`) junto com o valor do header recebido.

### 5. `GET /products/:id`, variação com query — regra extra (combina tudo)

Mesma rota da 1, mas agora aceite também `?formato=resumido` na query:

- Se `formato === 'resumido'`, retorna só `{ id }`
- Senão, retorna o objeto completo

## Como testar

- Rotas `GET`: testar direto pelo navegador
- Rota `POST`: precisa de uma ferramenta que envie body, tipo Postman, Insomnia ou Thunder Client
