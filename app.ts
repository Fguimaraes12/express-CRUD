import express from "express"

const app = express()

app.use(express.json())

const produtos = [
  { id: "1", nome: "Notebook", categoria: "eletronicos", preco: 3500 },
  { id: "2", nome: "Mouse", categoria: "eletronicos", preco: 80 },
  { id: "3", nome: "Cadeira", categoria: "moveis", preco: 600 },
  { id: "4", nome: "Mesa", categoria: "moveis", preco: 900 },
  { id: "5", nome: "Fone de ouvido", categoria: "eletronicos", preco: 250 },
]

app.get("/products/:id", (req, res) => {
  const produto = produtos.find((produto) => produto.id === req.params.id)

  if (!produto) {
    return res.status(404).send({ erro: "Produto não encontrado" })
  }
})

app.get("/produtos", (req, res) => {
  let resultado = produtos

  if (!req.query.categoria && !req.query.precoMax) {
    return res.send({ mensagem: "Sem filtros" })
  }

  if (req.query.categoria) {
    resultado = resultado.filter(
      (produto) => produto.categoria == req.query.categoria,
    )
  }

  if (req.query.precoMax) {
    resultado = resultado.filter(
      (produto) => produto.preco <= Number(req.query.precoMax),
    )
  }

  res.send(resultado)
})

const PORT = 3000

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
