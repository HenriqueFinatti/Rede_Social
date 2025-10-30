import * as funcoes from '../backend/scripts/consumoAPI.js';

document.getElementById("buscar").addEventListener("click", carregarUsuarios);

document.getElementById("btn-busca-email").addEventListener("click", () => {
  // Pegando os valores dos inputs
  const email = document.getElementById("busca_email").value;
  buscar_usuario(email);

}); 

async function carregarUsuarios() {
  const usuarios = await funcoes.buscar_usuarios();
  const nomeElemento = document.getElementById("nome_usuario");
  nomeElemento.textContent = `Bem-vindo, ${usuarios[3].nome} - ${usuarios[3].id}!`;
  console.log(usuarios); // mostra no console
}


async function buscar_usuario(id){
  const usuario = await funcoes.buscar_usuario_por_id(id);
  const nomeElemento = document.getElementById("email_usuario");
  nomeElemento.textContent = `Bem-vindo ${usuario.nome}`
}
