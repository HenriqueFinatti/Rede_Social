import os
from astrapy import DataAPIClient
from dotenv import load_dotenv

load_dotenv()

def conexao_cassandra():
    API_ENDPOINT = os.getenv("API_ENDPOINT")
    API_TOKEN = os.getenv("API_TOKEN")

    client = DataAPIClient(API_TOKEN)
    return client.get_database(API_ENDPOINT)