import * as funcoes from '../../backend/scripts/consumoAPI.js';

async function ver_posts_curtidos() {
    const idUsuario = Number(localStorage.getItem("id"));

    const curtidas = await funcoes.visualizar_todas_curtidas(idUsuario);
    if (!curtidas || curtidas.length === 0) {
        console.log("Nenhum post curtido.");
        const feed = document.getElementById("posts-curtidos");
        feed.innerHTML = "<p>Você ainda não curtiu nenhum post.</p>";
        return;
    }

    const feed = document.getElementById("posts-curtidos");
    feed.innerHTML = "";

    for (const curtida of curtidas) {
        console.log("Curtida recebida:", curtida);

        const post = await funcoes.visualizar_post_especifico(curtida.id_post);

        if (!post) {
            console.warn("Post não encontrado:", curtida.id_post);
            continue;
        }
        const usuario = await funcoes.buscar_usuario_por_id(post.id_usario);

        const nomeUsuario = usuario?.nome || "Usuário desconhecido";
        const imagensHTML = Array.isArray(post.foto_url)
            ? post.foto_url
                .map(url => `<img src="${url}" class="foto-post" alt="Post de ${nomeUsuario}">`)
                .join("")
            : "";

        const postDiv = document.createElement("div");
        postDiv.classList.add("post");
        postDiv.innerHTML = `
            <div class="post-cabecalho">
                <strong>${nomeUsuario}</strong>
            </div>
            <div class="post-imagens">${imagensHTML}</div>
            <div class="post-legenda">${post.foto_comentario || ""}</div>
            <div class="post-info">
                ❤️ ${post.curtidas || 0} curtidas
            </div>
        `;

        feed.appendChild(postDiv);
    }
}

window.addEventListener("DOMContentLoaded", ver_posts_curtidos);