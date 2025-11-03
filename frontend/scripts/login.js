import * as funcoes from '../../backend/scripts/consumoAPI.js';

document.getElementById("buscar").addEventListener("click", carregarUsuarios);

document.getElementById("btn-login").addEventListener("click", () => {
  const email = document.getElementById("email-login").value;
  const senha = document.getElementById("senha-login").value;
  buscar_usuario(email, senha);
}); 

async function carregarUsuarios() {
  const usuarios = await funcoes.buscar_usuarios();
  const nomeElemento = document.getElementById("nome_usuario");
  nomeElemento.textContent = `Bem-vindo, ${usuarios[0].nome} - ${usuarios[0].id}!`;
  console.log(usuarios);
}

async function buscar_usuario(usuario_email, senha){
  const usuario = await funcoes.buscar_usuario_por_email(usuario_email);
  const nomeElemento = document.getElementById("email_usuario");
  if (senha === usuario.senha && usuario != 'Não econtrado'){
    localStorage.setItem("id", usuario.id)
    localStorage.setItem("username", usuario.username);
    localStorage.setItem("email", usuario.email);
    localStorage.setItem("nome", usuario.nome);
    window.location.href = "./index.html";
  } else {
    nomeElemento.textContent = 'Usuário ou senha incorretos'
  }
}
