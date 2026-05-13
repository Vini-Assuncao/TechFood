const ProdutoRepository = require("../repositories/ProdutoRepository")

class ProdutoService {
    async listarProdutos() {
        const listaProdutos = await ProdutoRepository.listarTodosProdutos()

        return {
            sucesso: true,
            dados: listaProdutos,
            quantidade: listaProdutos.length
        }
    }

    async buscarProdutoPorId(id) {
        if (!id || isNaN(id) || id < 0) {
            throw {
                status: 400,
                mensagem: "ID inválido"
            }
        }

        const produto = await ProdutoRepository.buscarPorId(id)

        if (!produto) {
            throw {
                status: 404,
                mensagem: "Produto não encontrado"
            }
        }

        return {
            sucesso: true,
            dados: produto
        }
    }

    async cadastrarProduto(dados) {
        const {nome, descricao, preco, categoria, disponivel} = dados

        if (!nome || !descricao || preco === undefined) {
            throw {
                status: 400,
                mensagem: "Nome, descrição e preço são obrigatórios"
            }
        }

        if (isNaN(preco) || preco <= 0) {
            throw {
                status: 400,
                mensagem: "Preço deve ser um número positivo"
            }
        }

        const novoProduto = {
            nome: nome.trim(),
            descricao: descricao.trim(),
            preco,
            categoria: categoria.trim() || null,
            disponivel: disponivel ?? true
        }

        const id = await ProdutoRepository.cadastrarNovoProduto(novoProduto)

        return {
            sucesso: true,
            mensagem: "Produto cadastrado",
            produto: novoProduto,
            id
        }
    }

    async atualizarProduto(id, dados) {
        if (!id || isNaN(id) || id < 0) {
            throw {
                status: 400,
                mensagem: "ID inválido"
            }
        }

        const produto = await ProdutoRepository.buscarPorId(id)

        if (!produto) {
            throw {
                status: 404,
                mensagem: "Produto não encontrado"
            }
        }

        const produtoAtualizado = {}
        const {nome, descricao, preco, categoria, disponivel} = dados

        if (nome !== undefined) produtoAtualizado.nome = nome.trim()
        if (descricao !== undefined) produtoAtualizado.descricao = descricao.trim()
        if (preco !== undefined) {
            if (isNaN(preco) || preco <= 0) {
                throw {
                    status: 400,
                    mensagem: "Preço deve ser um número positivo"
                }
            }
            else {
                produtoAtualizado.preco = preco
            }
        }
        if (categoria !== undefined) produtoAtualizado.categoria = categoria.trim()
        if (disponivel !== undefined) produtoAtualizado.disponivel = disponivel

        if (Object.keys(produtoAtualizado).length == 0) {
            throw {
                status: 400,
                mensagem: "Nenhum dado a atualizar"
            }
        }

        await ProdutoRepository.atualizarProdutoPorId(id, produtoAtualizado)

        return {
            sucesso: true,
            mensagem: "Produto atualizado com sucesso"
        }
    }

    async deletarProduto(id) {
        if (!id || isNaN(preco) || preco <= 0) {
            throw {
                status: 400,
                mensagem: "ID inválido"
            }
        }

        const produto = await ProdutoRepository.buscarProdutoPorId(id)

        if (!produto) {
            throw {
                status: 404,
                mensagem: "Produto não encontrado"
            }
        }

        await ProdutoRepository.deletarProdutoPorId(id)

        return {
            sucesso: true,
            mensagem: "Produto deletado com sucesso"
        }
    }
}

module.exports = new ProdutoService()