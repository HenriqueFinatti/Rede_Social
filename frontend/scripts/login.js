import * as funcoes from '../../backend/scripts/consumoAPI.js';

const formLogin = document.getElementById("form-login");

formLogin.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = document.getElementById("email-login").value.trim();
  const senha = document.getElementById("senha-login").value.trim();

  await buscar_usuario(email, senha);
});

async function buscar_usuario(usuario_email, senha){
  const usuario = await funcoes.buscar_usuario_por_email(usuario_email);
  const nomeElemento = document.getElementById("resposta-login");
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
