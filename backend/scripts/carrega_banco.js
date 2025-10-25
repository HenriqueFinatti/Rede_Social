
import * as funcoes from './consumoAPI.js'

function geraSenha() {
  let caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let resultado = "";
  for (let i = 0; i < 5; i++) {
    resultado += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return resultado;
}

const nomes = [
  "Lucas Ferreira",
  "Ana Oliveira",
  "Pedro Souza",
  "Mariana Lima",
  "Carlos Almeida",
  "Beatriz Rocha",
  "Rafael Gomes",
  "Fernanda Costa",
  "Gustavo Martins",
  "Camila Azevedo",
  "Joao Carvalho",
  "Larissa Mendes",
  "Thiago Barbosa",
  "Patricia Duarte",
  "Felipe Ramos",
  "Juliana Castro",
  "Andre Pinto",
  "Natalia Fernandes",
  "Rodrigo Teixeira",
  "Gabriela Nogueira"
];

const paises = [
  "Brasil",
  "Portugal",
  "Estados Unidos",
  "Canadá",
  "México",
  "Argentina",
  "Chile",
  "Colômbia",
  "Peru",
  "Espanha",
  "França",
  "Alemanha",
  "Itália",
  "Reino Unido",
  "Japão",
  "China",
  "Índia",
  "Austrália",
  "África do Sul",
  "Nova Zelândia"
];

const usernames = nomes.map(nome => {
    return nome.split(" ")[0];
})

const emails = nomes.map(nome => {
    const primeiro_nome = nome.split(" ")[0].toLowerCase()
    const segundo_nome = nome.split(" ")[1].toLowerCase()
    const gmail = "@fei.com"

    return primeiro_nome + "." + segundo_nome + gmail
})

let senhas = []
const lista_usuarios = [];
const ids = []
const lista_relacionamentos = [];

for(let i = 0; i < 20; i++){
    senhas[i] = geraSenha()
}

for(let i = 0; i < 20; i++){
    const user = {
        nome: nomes[i],
        email: emails[i],
        senha: senhas[i],
        username: usernames[i],
        pais: paises[i]
    };
    lista_usuarios.push(user)
}

await funcoes.adicionar_muitos_usuarios(lista_usuarios)

const resposta = await funcoes.buscar_usuarios()
for(let i = 0; i < resposta.length; i++){
  ids.push(resposta[i].id)
}

for(let i = 0; i < ids.length; i++){
  const numero_seguidores = Math.floor(Math.random() * 3) + 3;
  for(let j = 0; j < numero_seguidores; j++){
    let seguidor = ids[Math.floor(Math.random() * ids.length)]

    while(seguidor == ids[i]){
      seguidor = Math.floor(Math.random() * ids.length)
    }
    const relacionamento = {
      id_usuario: ids[i],
      id_seguidor: seguidor
    }
    lista_relacionamentos.push(relacionamento)
  }
}

await funcoes.adicionar_muitos_relacionamentos(lista_relacionamentos)
