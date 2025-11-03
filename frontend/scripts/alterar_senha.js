import * as funcoes from '../../backend/scripts/consumoAPI.js';

document.getElementById("btn-trocar-senha").addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const nova_senha = document.getElementById("nova-senha").value
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
