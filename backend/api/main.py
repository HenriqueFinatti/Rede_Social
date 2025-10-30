from fastapi import FastAPI
from routes import postgress, mongodb, cassandra
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://127.0.0.1:5500",  # origem do seu frontend
    "http://localhost:5500"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # quem pode acessar
    allow_credentials=True,
    allow_methods=["*"],  # quais métodos (GET, POST, etc.)
    allow_headers=["*"],  # quais cabeçalhos são permitidos
)

app.include_router(postgress.router)
app.include_router(mongodb.router)
app.include_router(cassandra.router)

@app.get("/")
def inicio():
    return{"Projeto" : "Tópico Avançados de banco de dados"}

