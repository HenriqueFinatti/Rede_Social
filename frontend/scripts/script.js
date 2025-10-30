import * as funcoes from '../../backend/scripts/consumoAPI.js';

document.getElementById("buscar").addEventListener("click", carregarUsuarios);

document.getElementById("btn-login").addEventListener("click", () => {
  // Pegando os valores dos inputs
  const email = document.getElementById("email-login").value;
  const senha = document.getElementById("senha-login").value;
  buscar_usuario(email, senha);
}); 

async function carregarUsuarios() {
  const usuarios = await funcoes.buscar_usuarios();
  const nomeElemento = document.getElementById("nome_usuario");
  nomeElemento.textContent = `Bem-vindo, ${usuarios[0].nome} - ${usuarios[0].id}!`;
  console.log(usuarios); // mostra no console
}


async function buscar_usuario(usuario_email, senha){
  const usuario = await funcoes.buscar_usuario_por_id(usuario_email);
  const nomeElemento = document.getElementById("email_usuario");
  if (senha === usuario.senha){
    nomeElemento.textContent = `Bem-vindo ${usuario.nome}`
  } else {
    nomeElemento.textContent = 'Senha incorreta'
  }
}
