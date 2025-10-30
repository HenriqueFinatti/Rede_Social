import * as funcoes from '../backend/scripts/consumoAPI.js';

async function carregarUsuarios() {
  const usuarios = await funcoes.buscar_usuarios();
  console.log(usuarios); // mostra no console
}

document.getElementById("buscar").addEventListener("click", carregarUsuarios);