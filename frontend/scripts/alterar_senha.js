import * as funcoes from '../../backend/scripts/consumoAPI.js';

const btnTrocarSenha = document.getElementById("btn-trocar-senha");

  btnTrocarSenha.addEventListener("click", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const senha = document.getElementById("senha").value.trim();
    const nova_senha = document.getElementById("nova-senha").value.trim();

    trocar_senha(email, senha, nova_senha);
}); 

async function trocar_senha(usuario_email, senha, nova_senha){
  const usuario = await funcoes.buscar_usuario_por_email(usuario_email);
  const nomeElemento = document.getElementById("email_usuario");
  if (senha === usuario.senha && usuario != 'Não econtrado'){
    const resposta = await funcoes.alterar_senha(usuario_email, nova_senha)
    nomeElemento.textContent = resposta
  } else {
    nomeElemento.textContent = 'Usuário ou senha incorretos'
  }
}
