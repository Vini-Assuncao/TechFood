const express = require('express')
const app = express()
const routes = require('./routes')

app.use(express.json())

app.use('/', routes)

module.exports = app

const querryAsync = (sql, values = []) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, values, (err, results) => {
            if(err) reject(err)
            else resolve(results)
        })
    })
}

// GET SERVIDOR ///////////////////////////////////////////////////////////////////////

app.get('/', (req, res) => {
    res.send('API SaborDigital está funcionando')
})

// GET PRODUTO /////////////////////////////////////////////////////////////////////////

app.get('/produtos', async (req, res) => {
    try {
        const produtos = await querryAsync("SELECT * FROM produto ORDER BY id DESC")
        res.status(200).json({
            sucesso: true,
            dados: produtos,
            quantidade: produtos.length
        })
    }
    catch (error) {
        console.error("Erro ao listar produtos")
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao listar produtos",
            erro: error.message
        })
    }
})

// GET PRODUTO ESPECIFICO /////////////////////////////////////////////////////////////////////

app.get('/produtos/:id', async(req, res) => {
    try {
        const {id} = req.params

        if (isNaN(id) || id < 0) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'ID do produto deve ser um número positivo'
            })
        }

        const produto = await querryAsync("SELECT * FROM produto WHERE id = ?", [id])

        if (produto.length == 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: 'Produto não encontrado'
            })
        }

        res.status(200).json({
            sucesso: true,
            dados: produto[0]
        })
    }
    catch (error) {
        console.error("Erro ao listar produto")
        res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao listar produto",
            erro: error.message
        })
    }
})

// POST PRODUTO /////////////////////////////////////////////////////////////////////////

app.post('/produtos', async(req, res) => {
    try {
        const {nome, descricao, preco, disponivel} = req.body

        if (!nome || !descricao || !preco || disponivel === undefined) {
            return res.status(400).json({
                sucesso: false,
                mensagem: "Os campos nome, descrição, preço e disponível são obrigatórios"
            })
        }

        if (isNaN(preco) || preco < 0) {
            return res.status(400).json({
                sucesso: false,
                mensagem: "O preço deve ser um número positivo"
            })
        }

        if (disponivel !== true && disponivel !== false) {
            return res.status(400).json({
                sucesso: false,
                mensagem: "A disponibilidade do produto deve ser true ou false"
            })
        }

        const novoProduto = {
            nome: nome.trim(),
            descricao: descricao.trim(),
            preco: preco,
            disponivel: disponivel
        }

        const resultado = await querryAsync("INSERT INTO produto SET ?", [novoProduto])

        res.status(201).json({
            sucesso: true,
            id: resultado.insertId,
            produto: novoProduto
        })
    }
    catch (error) {
        console.error("Erro ao criar produto")

        res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao criar produto",
            erro: error.message
        })
    }
})

// PUT PRODUTO ////////////////////////////////////////////////////////////////////////////////////

app.put('/produtos/:id', async(req, res) => {
    try {
        const {nome, descricao, preco, disponivel} = req.body
        const {id} = req.params
        
        if (isNaN(id) || id < 0) {
            return res.status(400).json({
                sucesso: false,
                mensagem: "ID do produto deve ser um número positivo"
            })
        }

        const produtoParaMudar = await querryAsync("SELECT * FROM produto WHERE id = ?", [id])

        if (produtoParaMudar.length == 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: "Produto não encontrado"
            })
        }

        const produtoNovo = {}

        if (nome !== undefined) produtoNovo.nome = nome.trim()
        if (descricao !== undefined) produtoNovo.descricao = descricao.trim()
        if (preco !== undefined) {
            if (isNaN(preco) || preco < 0) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: "O preço deve ser um número positivo"
                })
            }
            produtoNovo.preco = preco
        }
        if (disponivel !== undefined) {
            if (disponivel !== true && disponivel !== false) {
                return res.status(400).json({
                    sucesso: false,
                    mensagem: "A disponibilidade do produto deve ser true ou false"
                })
            }
            produtoNovo.disponivel = disponivel
        }

        if(Object.keys(produtoNovo).length == 0) {
            return res.status(400).json({
                sucesso: false,
                mensagem: 'Nenhum campo para atualizar'
            })
        }

        await querryAsync("UPDATE produto SET ? WHERE id = ?", [produtoNovo, id])
        res.status(200).json({
            sucesso: true,
            novoProduto: await querryAsync("SELECT * FROM produto WHERE id = ?", [id]),
        })
    }
    catch (error) {
        console.error("Erro ao editar produto")

        res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao editar produto",
            erro: error.message
        })
    }
})

// DELETE PRODUTO ////////////////////////////////////////////////////////////////////////////////////

app.delete('/produtos/:id', async(req, res) => {
    try {
        const {id} = req.params

        if (isNaN(id) || id < 0) {
            return res.status(400).json({
                sucesso: false,
                mensagem: "ID do produto deve ser um número positivo"
            })
        }

        const produtoRemover = await querryAsync("SELECT * FROM produto", [id])

        if (produtoRemover.length == 0) {
            return res.status(404).json({
                sucesso: false,
                mensagem: "Produto não encontrado"
            })
        }

        const resultado = await querryAsync("DELETE FROM produto WHERE id = ?", [id])

        res.status(200).json({
            sucesso: true,
            produtoRemovido: produtoRemover[0],
            resultado: resultado
        })
    }
    catch (error) {
        console.error("Erro ao remover produto")

        res.status(500).json({
            sucesso: false,
            mensagem: "Erro ao remover produto",
            erro: error.message
        })
    }
})

module.exports = app