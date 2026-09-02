const BATE_API_URL = "http://localhost:3000"

function obterToken() {
    return localStorage.getItem("techfood_token")
}

function headersAutenticados() {
    const headers = { "Content-Type": "application/json" }
    const token = obterToken()

    if (token) {
        headers.Authorization = `Bearer ${token}`
    }

    return headers
}

async function requisicao(url, opcoes = {}) {
    const response = await fetch(`${BATE_API_URL}${url}`, {
        ...opcoes,
        headers: {
            ...headersAutenticados(),
            ...(opcoes.headers || {})
        }
    })

    const dados = await response.json().catch(() => ({}))

    if (!response.ok) {
        throw new Error(dados.mensagem || dados.erro || `Erro ${response.status}`)
    }

    return dados
}

async function registrarUsuario(usuario) {
    return requisicao("/usuarios/registrar", {
        method: "POST",
        body: JSON.stringify(usuario)
    })
}

async function fazerLogin(email, senha) {
    return requisicao("/usuarios/login", {
        method: "POST",
        body: JSON.stringify({ email, senha })
    })
}

function encerrarSessao() {
    localStorage.removeItem("techfood_token")
    localStorage.removeItem("techfood_usuario")
    window.location.href = "login.html"
}

async function buscarProdutos() {
    return requisicao("/produtos")
}

async function criarPedido(cliente, itens) {
    return requisicao("/pedidos", {
        method: "POST",
        body: JSON.stringify({ cliente, itens })
    })
}

async function buscarPedidos() {
    return requisicao("/pedidos")
}

async function deletarPedido(id) {
    return requisicao(`/pedidos/${id}`, { method: "DELETE" })
}

async function atualizarPedido(id, novoStatus) {
    return requisicao(`/pedidos/${id}`, {
        method: "PUT",
        body: JSON.stringify({ status: novoStatus })
    })
}

async function cadastrarProduto(produto) {
    return requisicao("/produtos", {
        method: "POST",
        body: JSON.stringify(produto)
    })
}