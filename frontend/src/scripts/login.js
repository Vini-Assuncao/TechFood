document.querySelector("#form-login").addEventListener("submit", async (event) => {
    event.preventDefault()

    const mensagem = document.querySelector("#mensagem-auth")
    const botao = event.target.querySelector("button")

    botao.disabled = true
    mensagem.textContent = "Entrando..."

    try {
        const resposta = await fazerLogin(
            document.querySelector("#email").value.trim(),
            document.querySelector("#senha").value
        )

        localStorage.setItem("techfood_token", resposta.token)
        localStorage.setItem("techfood_usuario", JSON.stringify(resposta.usuario))

        window.location.href = "index.html"
    } catch (erro) {
        mensagem.textContent = erro.message
    } finally {
        botao.disabled = false
    }
})