from fastapi import FastAPI
from routes import postgress, mongodb, cassandra

app = FastAPI()

app.include_router(postgress.router)
app.include_router(mongodb.router)
app.include_router(cassandra.router)

@app.get("/")
def inicio():
    return{"Projeto" : "Tópico Avançados de banco de dados"}

