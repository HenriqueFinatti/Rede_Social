import uuid
import os
from fastapi import FastAPI, UploadFile, HTTPException
from supabase import create_client
from dotenv import load_dotenv

load_dotenv()
# Pegue isso no painel do Supabase
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
BUCKET_NAME = os.getenv("BUCKET_NAME")

supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

async def upload_file(file: UploadFile):
    # Lê o conteúdo do arquivo enviado
    contents = await file.read()

    #Gerando um nome unico para caso o usuario queria inserir a mesma imagem mais de uma vez:
    valor_unico = "{}_{}".format(uuid.uuid4(), file.filename)
    

    # Faz upload pro bucket
    supabase.storage.from_(BUCKET_NAME).upload(valor_unico, contents)
       
    return {
        #"message": "Upload concluído",
        #"file_name": file.filename, 
        "url": 'https://ttoxfvfdonwfwfwwgfhn.supabase.co/storage/v1/object/public/imagens/{}'.format(valor_unico)
        }

async def delete_post_supabase(arquivos: list[str]):
    try:
        for arquivo in arquivos:
            supabase.storage.from_(BUCKET_NAME).remove([arquivo])
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao remover imagem do Supabase: {str(e)}")