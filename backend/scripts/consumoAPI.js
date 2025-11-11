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

export async function buscar_usuario_por_email(user_email){
  try{
    const response = await fetch(`http://127.0.0.1:8000/usuarios/visualizar_especifico?usuario_email=${user_email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });
    const data = await response.json();
    return data.usuario
  }
  catch (error){
    console.error("Erro ao buscar usuário por ID:", error);
  }
}

export async function buscar_usuario_por_id(user_id){
  try{
    const response = await fetch(`http://127.0.0.1:8000/usuarios/visualizar_especifico_por_id?usuario_id=${user_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });
    const data = await response.json();
    console.log(data)
    return data.usuario
  }
  catch (error){
    console.error("Erro ao buscar usuário por ID:", error);
  }
}

export async function alterar_senha(user_email, nova_senha){
  try{
    const response = await fetch(`http://127.0.0.1:8000/usuarios/atualizar_senha?usuario_email=${user_email}&nova_senha=${nova_senha}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
    });
    const data = await response.json();
    return data
  }
  catch (error){
    console.error("Erro ao buscar usuário por ID:", error);
  }
}

export async function visualizar_seguidores(id_usuario){
  try{
    const response = await fetch(`http://127.0.0.1:8000/usuarios/visualizar_seguidores?id_usuario=${id_usuario}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });
    const data = await response.json();
    return data.Seguidores
  }
  catch (error){
    console.error("Erro ao buscar usuário por ID:", error);
  }
}

export async function visualizar_seguindo(id_usuario) {
  try{
    const response = await fetch(`http://127.0.0.1:8000/usuarios/visualizar_seguindos?id_seguidor=${id_usuario}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });
    const data = await response.json();
    return data.Seguindos
  }
  catch (error){
    console.error("Erro ao buscar usuário por ID:", error);
  }
}

export async function visualizar_todos_posts() {
  try{
    const response = await fetch(`http://127.0.0.1:8000/posts/visualizar_todos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      },
    });
    const data = await response.json();
    console.log(data)
    return data
  }
  catch (error){
    console.error("Erro ao buscar usuário por ID:", error);
  }
}

export async function inserir_post_curtido(postCurtido) {
  try {
    const resposta = await fetch("http://localhost:8000/posts_curtidos/inserir", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_usuario: Number(postCurtido.id_usuario),
        id_post: String(postCurtido.id_post),       
      }),
    });

    if (!resposta.ok) {
      const erroTexto = await resposta.text();
      throw new Error(`Erro ${resposta.status}: ${erroTexto}`);
    }

    const dados = await resposta.json();
    console.log("Curtida inserida com sucesso:", dados);
    return dados; // importante retornar!
  } catch (erro) {
    console.error("Erro ao inserir post curtido:", erro.message);
  }
}

export async function visualizar_todas_curtidas(usuario){
  try {
    const resposta = await fetch(`http://localhost:8000/posts_curtidos/visualizar?id=${usuario}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const dados = await resposta.json();
    return dados
  } catch (erro) {
    console.error("Erro ao visualizar os posts:", erro.message);
  }
}

export async function visualizar_post_especifico(id_post){
  try {
      const resposta = await fetch(`http://localhost:8000/posts/visualizar_especifico?_id=${id_post}`, {
      method: "GET",
      headers: {
      "Content-Type": "application/json",
      }
    });
      if (!resposta.ok) {
        console.error("Erro ao buscar post:", resposta.status);
        return null;
      }
      const dados = await resposta.json();
      return dados;
    } catch (erro) {
      console.error("Erro ao visualizar os posts:", erro.message);
      return null;
    }
}

export async function adicionar_curtida_post(id_post) {
  try {
    const resposta = await fetch(`http://localhost:8000/posts/curtir?_id=${id_post}`, {
      method: "PUT",
      headers: {
        "accept": "application/json",
      },
    });

    if (!resposta.ok) {
      console.error("Erro ao curtir post:", resposta.status);
      const textoErro = await resposta.text();
      console.error("Detalhes:", textoErro);
      return null;
    }

    const dados = await resposta.json();
    return dados;

  } catch (erro) {
    console.error("Erro ao curtir o post:", erro.message);
    return null;
  }
}

export async function enviar_post(idUsuario, comentario, formData) {
    try {
    const response = await fetch(`http://127.0.0.1:8000/posts/inserir?id_usuario=${idUsuario}&foto_comentario=${encodeURIComponent(comentario)}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Erro ${response.status}: ${errorText}`);
    }
    
    const data = await response.json();
    return data;

  } catch (error) {
    return null
  }
}
