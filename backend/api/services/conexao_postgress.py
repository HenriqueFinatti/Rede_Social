import os
import urllib.parse
from sqlalchemy import create_engine
from dotenv import load_dotenv

load_dotenv()

def conexao_postgress():
    USUARIO = os.getenv("USUARIO")
    SENHA = urllib.parse.quote_plus(os.getenv("SENHA"))
    HOST = os.getenv("HOST")
    PORTA = os.getenv("PORTA")
    DBNAME = os.getenv("DBNAME")

    URL_DATABASE = f"postgresql+psycopg2://{USUARIO}:{SENHA}@{HOST}:{PORTA}/{DBNAME}?sslmode=require"

    engine = create_engine(URL_DATABASE)
    return engine