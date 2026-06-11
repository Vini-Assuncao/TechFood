document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#form-cadastro-prato");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        
        const arquivoImagem = document.querySelector("#imagem").files[0];
        
        const imagem = await new Promise((resolve) => {  // await new Promise garante que o código só rodará depois da leitura e conversão da imagem
            const reader = new FileReader();  // Cria um objeto que fará a leitura do arquivo
            reader.onload = () => {  // Quando finalizar a leitura, essa função será executada
                resolve(reader.result);  // Avisa o Promise que a leitura finalizou e armazena o resultado na const imagem
            };
            reader.readAsDataURL(arquivoImagem);  // Transforma o arquivo para Base64
        });

        const produto = {
            nome: document.querySelector("#nome").value,
            descricao: document.querySelector("#descricao").value,
            categoria: document.querySelector("#categoria").value,
            preco: Number(document.querySelector("#preco").value),
            imagem
        };

        const resposta = await cadastrarProduto(produto)
        alert(resposta.mensagem)

        form.reset();
    });
});