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

async function curtir_post(body) {
  const resposta = await funcoes.inserir_post_curtido(body);
  const curtida = await funcoes.adicionar_curtida_post(body.id_post);
  console.log("Enviando ID para curtir:", body.id_post);
  console.log("Resposta da API:", resposta);
  console.log(curtida)
}


// Renderiza os posts
async function ver_posts() {
  const posts = await funcoes.visualizar_todos_posts();
  const feed = document.getElementById("feed");
  feed.innerHTML = "";

  for (const post of posts) {
    const postDiv = document.createElement("div");
    postDiv.classList.add("post");
    console.log("Post recebido:", post);

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
        <button class="btn-like" data-id="${post._id}">❤️ Curtir</button>
        <span class="contador-curtidas">${post.curtidas || 0}</span> curtidas
      </div>
    `;

    // Quando clicar no botão:
    postDiv.querySelector(".btn-like").addEventListener("click", async (event) => {
      const idPost = event.currentTarget.dataset.id;
      const idUsuario = localStorage.getItem("id");

      const body = {
        id_usuario: idUsuario,
        id_post: idPost,
      };

      await curtir_post(body);
    });

    feed.appendChild(postDiv);
  }
}


document.getElementById('form-post').addEventListener('submit', async (e) => {
  e.preventDefault();

  const idUsuario = Number(localStorage.getItem("id")); // substitua pelo ID real do usuário logado
  const comentario = document.getElementById('foto_comentario').value;
  const foto = document.getElementById('foto_files').files[0];

  if (!foto) {
    document.getElementById('mensagem').textContent = "Por favor, selecione uma imagem.";
    return;
  }

  const formData = new FormData();
  formData.append('foto_files', foto);

  data = funcoes.enviar_post(idUsuario, comentario, formData)

  if (data==null){
    console.error("Erro ao enviar post:", error);
    document.getElementById('mensagem').textContent = "Erro ao enviar post.";
  } else {
    console.log("Post inserido:", data);
    document.getElementById('mensagem').textContent = "Post enviado com sucesso!";
  }
});


window.addEventListener("DOMContentLoaded", () => {
    const usernameString = localStorage.getItem("username")
    const idString = localStorage.getItem("id")

    const username = document.getElementById("username")
    username.textContent = "Bem vindo " + usernameString
    carregarSeguidores(idString)
    carregarSeguindo(idString)
    ver_posts()

})
