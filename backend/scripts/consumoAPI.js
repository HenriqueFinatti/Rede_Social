
export async function adicionar_usuario(usuarios) {
  try {
    const response = await fetch("http://127.0.0.1:8000/usuarios/adicionar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(usuarios)
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Erro ao adicionar usuário:", error);
  }
}

export async function adicionar_muitos_usuarios(usuarios) {
  try {
    const response = await fetch("http://127.0.0.1:8000/usuarios/adicionar/muitos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(usuarios)
    });

    const data = await response.json();

    console.log("Resposta do servidor:", data);
  } 
  catch (error) {
    console.error("Erro ao enviar usuários:", error);
  }
}

export async function adicionar_muitos_relacionamentos(relacionamentos) {
  try {
    const response = await fetch("http://127.0.0.1:8000/usuarios/gerar_relacioamento/muitos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(relacionamentos)
    });

    const data = await response.json();

    console.log("Resposta do servidor:", data);
  } 
  catch (error) {
    console.error("Erro ao enviar relacionamentos:", error);
  }
}

export async function buscar_usuarios() {
  try {
    const response = await fetch("http://127.0.0.1:8000/usuarios/visualizar_todos", {
      method: "GET"
    });

    const data = await response.json();
    return data.usuarios
  } 
  catch (error) {
    console.error("Erro ao buscar usuários:", error);
  }
}

export async function buscar_usuario_por_id(id){
  try{
    const response = await fetch(`http://127.0.0.1:8000/usuarios/visualizar_especifico?usuario_email=${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });
    const data = await response.json();
    console.log(data.usuario)
    return data.usuario
  }
  catch (error){
    console.error("Erro ao buscar usuário por ID:", error);
  }
}