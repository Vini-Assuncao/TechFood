const express = require('express');
const router = express.Router();

const produtoRoutes = require('./produtoRoutes');
const cardapioRoutes = require('./cardapioRoutes');
const pedidoRoutes = require('./pedidoRoutes');
const usuarioRoutes = require('./usuarioRoutes')

// Rota base (Root endpoint que estava em app.js)
router.get('/', (req, res) => {
    res.json({
        mensagem: "API TechFood funcionando 🍝",
        versao: "1.0.0",
        arquitetura: "MVC + SOLID (Refatorada)"
    });
});

// Registrar domínios de rotas
router.use('/produtos', produtoRoutes);
router.use('/cardapios', cardapioRoutes);
router.use('/pedidos', pedidoRoutes);
router.use('/usuarios', usuarioRoutes)

module.exports = router;
