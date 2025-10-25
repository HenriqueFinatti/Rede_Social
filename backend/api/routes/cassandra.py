import os
from fastapi import APIRouter, HTTPException
from model.data_types import *
from services.conexao_cassandra import *
from dotenv import load_dotenv

load_dotenv()

TABELA_CURTIDAS = os.getenv("TABELA_CURTIDAS")

router = APIRouter()

database = conexao_cassandra()
table = database.get_table(TABELA_CURTIDAS)

#Post: Insere posts curtidos
@router.post(
    "/posts_curtidos/inserir",
    response_description= "Inserindo o post curtido pelo usuario.",
    response_model = PostCurtido 
)
def inserir_post_curtido(post : PostCurtido):
    try:
        table.insert_one(
            post.dict()
        )
        return post.dict()
    except Exception as e:
        return{
            "erro" : str(e)
        }

#Get: Mostra os posts curtidos
@router.get(
    "/posts_curtidos/visualizar",
    response_description= "Visualizando o post curtido pelo usuario"
)
def mostrar_post_curtido(id: int):
    try:
        posts_curtidos = table.find(
            {
                "$and": [
                    {"id_usuario": id},
                ]   
            }
        )
        posts_curtidos = list(posts_curtidos)
        if len(posts_curtidos) == 0:
            raise HTTPException(status_code=404, detail="Usuario naão possui posts curtidos")
        return posts_curtidos
    except Exception as e:
        return{
            "erro" : str(e)
        }
    
#Delete:Caso o usuario "descurta" o post:
@router.delete(
    "/posts_curtidos/deletar",
    response_description = "Apagando post curtido pelo usuario"
)
def deletar_post_curtido(post: PostCurtido):
    try:
        post_deletado = table.delete_one({"id_usuario": post.id_usuario, "id_post": post.id_post})
        if post_deletado is None:
            raise HTTPException(status_code=404, detail="Nenhum post encontrado para deletar")
        return{
            "msg": "Post curtido excluido"
        }
    except Exception as e:
        return str(e)

