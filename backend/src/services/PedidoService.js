const PedidoRepository = require('../repositories/PedidoRepository')
const ProdutoRepository = require('../repositories/ProdutoRepository')

class PedidoService {
    async listarPedidos() {
        const listaPedidos = await PedidoRepository.listarTodosPedidos()

        return {
            sucesso: true,
            dados: listaPedidos,
            quantidade: listaPedidos.length
        }
    }

    async buscarPorId(id) {
        if (!id || isNaN(id) || id < 0) {
            throw {
                status: 400,
                mensagem: "ID inválido"
            }
        }

        const pedido = await PedidoRepository.buscarPorId(id)

        if (!pedido) {
            throw {
                status: 404,
                mensagem: "Pedido não encontrado"
            }
        }

        return {
            sucesso: true,
            dados: pedido
        }
    }

    async cadastrarPedido(dados) {
        const {cliente, produtos} = dados

        if (!cliente || !produtos) {
            throw {
                status: 400,
                mensagem: "Cliente e produtos são obrigatórios"
            }
        }

        const custoPedido = 0

        for (produto in produtos) {
            if (!produto.id_produto || produto.quantidade === undefined) {
                throw {
                    status: 400,
                    mensagem: "ID do produto e quantidade são obrigatórios"
                }
            }

            if (isNaN(produto.id_produto) || produto.id_produto < 0) {
                throw {
                    status: 400,
                    mensagem: "ID do produto inválido"
                }
            }

            if (isNaN(produto.quantidade) || produto.quantidade <= 0) {
                throw {
                    status: 400,
                    mensagem: "Quantidade deve ser um número positivo"
                }
            }

            const produtoDados = await ProdutoRepository.buscarPorId(produto.id_produto)

            if (!produtoDados) {
                throw {
                    status: 404,
                    mensagem: "Produto não encontrado"
                }
            }

            if (!produtoDados.disponivel) {
                throw {
                    status: 400,
                    mensagem: "Produto não disponível"
                }
            }

            custoPedido += produtoDados.preco * produto.quantidade
        }

        const novoPedido = {
            cliente,
            status: "pendente",
            total: custoPedido
        }
    }

    async atualizarPedido(id, dados) {

    }

    async deletarPedido(id) {
        if (!id || isNaN(id) || id < 0) {
            throw {
                status: 400,
                mensagem: "ID inválido"
            }
        }

        const pedido = await PedidoRepository.buscarPorId(id)

        if (!pedido) {
            throw {
                status: 404,
                mensagem: "Pedido não encontrado"
            }
        }

        await PedidoRepository.deletarPedidoPorId(id)

        return {
            sucesso: true,
            mensagem: "Pedido deletado com sucesso"
        } 
    }
}

module.exports = new PedidoService()