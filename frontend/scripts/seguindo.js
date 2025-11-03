import * as funcoes from '../../backend/scripts/consumoAPI.js';

async function carregarSeguidoresNome(id_usuario) {
  const seguidores = await funcoes.visualizar_seguidores(id_usuario);
  const nomeElemento = document.getElementById("seguindo");
  nomeElemento.innerHTML = "";

  const seguidoresArray = Object.values(seguidores);

  const lista = document.createElement("ul");

  for (const seguidor of seguidoresArray) {
    const usuario = await funcoes.buscar_usuario_por_id(seguidor.id_seguidor);
    const li = document.createElement("li");
    li.textContent = usuario?.nome || `Usuário ${seguidor.id_seguidor}`;
    lista.appendChild(li);
  }

  nomeElemento.appendChild(lista);
}

window.addEventListener("DOMContentLoaded", () => {
  const id_usuario = localStorage.getItem("id");
  carregarSeguidoresNome(id_usuario);
});
