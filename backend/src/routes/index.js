const express = require('express')
const router = express.Router()

const produtoRoutes = require('./ProdutoRoutes')
const pedidoRoutes = require('./PedidoRoutes')

router.get('/', (req, res) => {
    res.json({
        mensagem: "API SaborDigital",
        versao: "1.0",
        arquitetura: "MVC + SOLID"
    })
})

router.use('/produtos', produtoRoutes)
router.use('/pedidos', pedidoRoutes)