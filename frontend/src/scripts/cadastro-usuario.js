document.querySelector("#form-cadastro-usuario").addEventListener("submit", async (event) => {
    event.preventDefault()

    const mensagem = document.querySelector("#mensagem-auth")
    const botao = event.target.querySelector("button")

    botao.disabled = true
    mensagem.textContent = "Cadastrando..."

    try {
        await registrarUsuario({
            nome: document.querySelector("#nome").value.trim(),
            email: document.querySelector("#email").value.trim(),
            senha: document.querySelector("#senha").value
        })

        alert("Usuário cadastrado com sucesso!")
        window.location.href = "login.html"
    } catch (erro) {
        mensagem.textContent = erro.message
    } finally {
        botao.disabled = false
    }
})