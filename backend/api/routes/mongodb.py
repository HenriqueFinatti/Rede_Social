import os

from services.conexao_supabase_storage import upload_file, delete_post_supabase

from fastapi import UploadFile, HTTPException, Form, APIRouter
from typing import Optional
from typing import Optional 
from bson import ObjectId

from model.data_types import *
from services.conexao_mongodb import *

router = APIRouter()
post_collection = conexao_mongo()

@router.post(
    "/posts/inserir",
    response_description= "Inserindo post",
    response_model=PostModel
)
async def inserir_post(id_usuario: int, foto_files: list[UploadFile], foto_comentario: Optional[str] = None):
    try:
        urls = []
        for foto_file in foto_files:
            resultado_upload = await upload_file(foto_file)
            urls.append(resultado_upload["url"])

        post = PostModel(
            id_usario=id_usuario,
            foto_url=urls,  
            foto_comentario=foto_comentario or "", 
            comentario=[],
            curtidas=0 
        )
        post_dict = post.model_dump(exclude={"_id"})
        result = await post_collection.insert_one(post_dict)
        post_dict["_id"] = str(result.inserted_id)

        return post_dict
        
    except Exception as e:
        return {"erro aqui": str(e)}

@router.get(
    "/posts/visualizar_todos",
    response_description= "Visualizando todos os posts",
    response_model=list[PostModel]
)
async def visualizar_todos_posts():
    try:
        posts = [post async for post in post_collection.find()]
        for post in posts:
            post["_id"] = str(post["_id"])
        return posts
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao buscar posts: {str(e)}")


@router.get(
    "/posts/visualizar_especifico",
    response_description= "Visualizando o post especifico",
    response_model=PostModel
)
async def visualizar_post(_id: str):
    try:
        if not ObjectId.is_valid(_id):
            raise HTTPException(
                status_code=400,
                detail="ID inválido, precisa ser um ObjectId de 24 caracteres"
            )
        post = await post_collection.find_one({"_id": ObjectId(_id)})
        post["_id"] = str(post["_id"])
        if post is None:
            raise HTTPException(status_code=404, detail="Post não encontrado")
        return post

    except HTTPException:
        raise  

@router.delete(
    "/posts/remover",
    response_description= "Removendo o post"
)
async def remover_post(_id: str):
    try:
        if not ObjectId.is_valid(_id):
            raise HTTPException(
                status_code=400, 
                detail="ID inválido, precisa ser um ObjectId de 24 caracteres"
            )
        delete_post = await post_collection.find_one_and_delete({"_id": ObjectId(_id)})

        
        if delete_post is None:
            raise HTTPException(status_code=404, detail="Post não encontrado")
        
        foto_removida_url =  delete_post.get('foto_url')

        nome_arquivo = [os.path.basename(url) for url in foto_removida_url]

        await delete_post_supabase(nome_arquivo)

        return {
            "msg": "post excluido",
            "url": foto_removida_url   
            }
    
    except HTTPException:
        raise

@router.put("/posts/atualizar_fotos",
        response_description= "Atualizando as fotos"
)
async def atualizar_fotos(_id: str, foto_files: list[UploadFile]):
    try:
        if not ObjectId.is_valid(_id):
            raise HTTPException(
                status_code=400,
                detail="ID inválido, precisa ser um ObjectId de 24 caracteres"
            )

        post_antigo = await post_collection.find_one({"_id": ObjectId(_id)})
        if post_antigo is None:
            raise HTTPException(status_code=404, detail="Post não encontrado")

        fotos_antigas = post_antigo.get("foto_url", [])
        arquivos_antigos = [os.path.basename(url) for url in fotos_antigas]
        await delete_post_supabase(arquivos_antigos)

        novas_urls = []
        for foto in foto_files:
            resultado = await upload_file(foto)
            novas_urls.append(resultado["url"])

        await post_collection.find_one_and_update(
            {"_id": ObjectId(_id)},
            {"$set": {"foto_url": novas_urls}}
        )

        return {
            "msg": "Fotos atualizadas com sucesso",
            "foto_nova_url": novas_urls
        }

    except HTTPException:
        raise

@router.put("/posts/atualizar_comentario",
        response_description="Atualizando o comentario"         
)
async def atualizar_comentario(_id: str, foto_comentario: str = Form(...)):
    try:
        if not ObjectId.is_valid(_id):
            raise HTTPException(
                status_code=400,
                detail="ID inválido, precisa ser um ObjectId de 24 caracteres"
            )

        post_antigo = await post_collection.find_one({"_id": ObjectId(_id)})
        if post_antigo is None:
            raise HTTPException(status_code=404, detail="Post não encontrado")

        await post_collection.find_one_and_update(
            {"_id": ObjectId(_id)},
            {"$set": {"foto_comentario": foto_comentario}}
        )

        return {
            "msg": "Comentário atualizado com sucesso",
            "foto_comentario_novo": foto_comentario
        }

    except HTTPException:
        raise