const BATE_API_URL = "http://localhost:3000"

async function buscarProdutos() {
    const response = await fetch(`${BATE_API_URL}/produtos`)
    const dados = await response.json()

    if (!response.ok) {
        throw new Error(dados.erro || `Erro ${response.status}`)
    }
    
    return dados
}

async function criarPedido(cliente, itens) {
   const response = await fetch(`${BATE_API_URL}/pedidos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cliente, itens })
    })

    const dados = await response.json()

    if (!response.ok) {
        throw new Error(dados.erro || `Erro ${response.status}`)
    }
    
    return dados
}

async function buscarPedidos() {
    const response = await fetch(`${BATE_API_URL}/pedidos`)
    const dados = await response.json()

    if (!response.ok) {
        throw new Error(dados.erro || `Erro ${response.status}`)
    }

    return dados
}

async function deletarPedido(id) {
    const response = await fetch(`${BATE_API_URL}/pedidos/${id}`, {
        method: "DELETE"
    })

    const dados = await response.json()

    if (!response.ok) {
        throw new Error(dados.erro || `Erro ${response.status}`)
    }

    return dados
}

async function atualizarPedido(id, novoStatus) {
    const response = await fetch(`${BATE_API_URL}/pedidos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: novoStatus })
    })

    const dados = await response.json()

    if (!response.ok) {
        throw new Error(dados.erro || `Erro ${response.status}`)
    }

    return dados
}