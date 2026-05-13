document.addEventListener("DOMContentLoaded", () => {
    exibirBoasVindas()
    exibirDataFooter()
    fecharMenuAoNavegar()
})

function exibirBoasVindas() {
const agora = new Date()
    const hora = agora.getHours()
    const minutos = agora.getMinutes()
    const horaExata = hora + minutos / 60

    saudacao = horaExata < 12 ? "☀️ Bom dia! Qual o seu pedido?" : horaExata < 18 ? "🌤️ Boa tarde! Confira nosso cardápio." : "🌙 Boa noite! Ainda dá tempo de pedir."

    const elemSaudacao = document.querySelector("#boas-vindas")
    if (elemSaudacao) elemSaudacao.textContent = saudacao
}

function exibirDataFooter() {
  const elemFooter = document.querySelector("#data-hora-footer")
  if (!elemFooter) return

  const agora = new Date()
  const dataFormatada = agora.toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  elemFooter.textContent = dataFormatada
}

function fecharMenuAoNavegar() {
    const isMobile = window.matchMedia("(max-widht: 600px)").matches

    if (!isMobile) return

    const linksMenu = document.querySelectorAll("#menu a")
    linksMenu.forEach(link => {
        link.addEventListener("click", () => {
            const checkbox = document.querySelector("#bt_menu")
            if (checkbox) checkbox.checked = false
        })
    })
}

