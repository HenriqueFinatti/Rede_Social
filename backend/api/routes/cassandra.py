import os
from fastapi import APIRouter
from model.data_types import *
from services.conexao_cassandra import *
from dotenv import load_dotenv

load_dotenv()

TABLE_NAME = os.getenv("TABLE_NAME")

router = APIRouter()

database = conexao_cassandra()
table = database.get_table(TABLE_NAME)


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
