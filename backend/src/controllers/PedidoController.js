const PedidoService = require('../services/PedidoService')

class PedidoController {
    async listar(req, res) {
        try {
            const resultado = await PedidoService.listarPedidos()
            res.status(200).json(resultado)
        } catch (erro) {
            res.status(500).json({
                sucesso: false,
                mensagem: erro.message || "Erro interno do servidor",
                erro: erro
            })
        }
    }

    async buscarPorId(req, res) {
        try {
            const resultado = await PedidoService.buscarPedidoPorId(req.params.id)
            res.status(200).json(resultado)
        } catch (erro) {
            res.status(500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro
            })
        }
    }

    async cadastrar(req, res) {
        try {
            const resultado = await PedidoService.cadastrarPedido(req.body)
            res.status(201).json(resultado)
        } catch (erro) {
            res.status(500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro
            })
        }
    }

    async atualizar(req, res) {
        try {
            const resultado = await PedidoService.atualizarPedido(req.params.id, req.body)
            res.status(200).json(resultado)
        } catch (erro) {
            res.status(500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro
            })
        }
    }

    async deletar(req, res) {
        try {
            const resultado = await PedidoService.deletarPedido(req.params.id)
            res.status(200).json(resultado)
        } catch (erro) {
            res.status(500).json({
                sucesso: false,
                mensagem: erro.mensagem || "Erro interno do servidor",
                erro: erro
            })
        }
    }
}

module.exports = new PedidoController()