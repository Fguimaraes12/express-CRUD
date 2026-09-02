import express from "express"
import type { Produtos } from "./types/produtos.js"

const app = express()

app.use(express.json())

let produtos: Produtos[] = [
  { id: "1", nome: "Notebook", categoria: "eletronicos", preco: 3500 },
  { id: "2", nome: "Mouse", categoria: "eletronicos", preco: 80 },
  { id: "3", nome: "Cadeira", categoria: "moveis", preco: 600 },
  { id: "4", nome: "Mesa", categoria: "moveis", preco: 900 },
  { id: "5", nome: "Fone de ouvido", categoria: "eletronicos", preco: 250 },
]

app.get("/products", (req, res) => {
  res.send(produtos)
})

app.get("/products/:id", (req, res) => {
  const foundProduct = produtos.find((p) => p.id === req.params.id)
  if (!foundProduct) {
    res.status(404).send({ erro: "produto não encontrado" })
  }
  res.status(200).send(foundProduct)
})

app.post("/products", (req, res) => {
  const newProduct: Produtos = req.body
  produtos.push(newProduct)
  res.status(201).send({ message: "Novo produto foi adicionado" })
})

app.patch("/products/:id", (req, res) => {
  const foundProduct = produtos.find((p) => p.id === req.params.id)

  const chave = req.query.chave as string
  const valor = req.query.valor as string

  if (!foundProduct) {
    return res.status(404).send({ message: "Produto não encontrado" })
  }

  if (!chave || !valor) {
    return res.status(400).json({ erro: "chave e valor são obrigatórios" })
  }

  ;(foundProduct as any)[chave] = valor
  res.status(201).send(foundProduct)
})

app.delete("/products/:id", (req, res) => {
  const existe = produtos.some((produto) => produto.id !== req.params.id)

  if (!existe) {
    res.status(404).send({ erro: "Produto não encontrado" })
  }
  produtos = produtos.filter((produto) => produto.id !== req.params.id)
  res
    .status(200)
    .send({ mensagem: "Produto removido com sucesso!", produtos: produtos })
})

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
