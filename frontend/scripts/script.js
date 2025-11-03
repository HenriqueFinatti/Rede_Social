import * as funcoes from '../../backend/scripts/consumoAPI.js';

async function carregarSeguidores(id_usuario) {
    const seguidores = await funcoes.visualizar_seguidores(id_usuario)
    const nomeElemento = document.getElementById("seguidores");
    const seguidoresArray = Object.values(seguidores);
    const quantidade = seguidoresArray.length;
    nomeElemento.textContent = "Seguidores: " + quantidade;
}

async function carregarSeguindo(id_usuario) {
    const seguindo = await funcoes.visualizar_seguindo(id_usuario)
    const nomeElemento = document.getElementById("seguindo");
    const seguindoArray = Object.values(seguindo);
    const quantidade = seguindoArray.length;
    nomeElemento.textContent = "Seguidores: " + quantidade;
}

async function ver_posts() {
    const posts = await funcoes.visualizar_todos_posts()
    const feed = document.getElementById("feed");
    feed.innerHTML = "";
    
    for (const post of posts) {

        const postDiv = document.createElement("div");
        postDiv.classList.add("post");

        const usuario = await funcoes.buscar_usuario_por_id(post.id_usario);
        const nomeUsuario = usuario?.nome || "Usuário desconhecido";

        const imagensHTML = post.foto_url
            .map(url => `<img src="${url}" class="foto-post" alt="Post de ${nomeUsuario}">`)
            .join("");

        const legenda = post.foto_comentario || "";

        postDiv.innerHTML = `
            <div class="post-cabecalho">
                <strong>${nomeUsuario}</strong>
            </div>
            <div class="post-imagens">${imagensHTML}</div>
            <div class="post-legenda">${legenda}</div>
            <div class="post-info">
                ❤️ ${post.curtidas || 0} curtidas
            </div>
        `;

        feed.appendChild(postDiv);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const usernameString = localStorage.getItem("username")
    const idString = localStorage.getItem("id")

    const username = document.getElementById("username")
    username.textContent = "Bem vindo " + usernameString
    // carregarSeguidores(idString)
    // carregarSeguindo(idString)
    // ver_posts()

})
