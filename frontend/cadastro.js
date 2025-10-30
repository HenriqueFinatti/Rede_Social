import * as funcoes from '../backend/scripts/consumoAPI.js';

document.getElementById("btn-cadastrar").addEventListener("click", () => {
  // Pegando os valores dos inputs
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const username = document.getElementById("username").value;
  const pais = document.getElementById("pais").value;

  const user = {
    nome : nome,
    email : email,
    senha : senha,
    username : username,
    pais : pais
  }

  cadastrarUsuario(user);
}); 

async function cadastrarUsuario(usuario) {
  await funcoes.adicionar_usuario(usuario)
}