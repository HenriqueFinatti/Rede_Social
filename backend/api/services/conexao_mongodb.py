import os
from pymongo import AsyncMongoClient
from dotenv import load_dotenv

load_dotenv()

def conexao_mongo():
    MONGO_URL =  os.getenv("MONGO_URL")
    client = AsyncMongoClient(MONGO_URL)

    db = client.rede_social
    post_collection = db.get_collection("posts")

    return post_collection