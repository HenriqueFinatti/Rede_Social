from pydantic.functional_validators import BeforeValidator
from typing_extensions import Annotated
from pydantic import BaseModel, Field
from typing import Optional

PyObjectId = Annotated[str, BeforeValidator(str)]

class PostModel(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    id_usario: int
    foto_url: list[str]
    foto_comentario: str
    comentario : list[str]
    curtidas: int

class Usuario(BaseModel):
    nome: str
    email: str
    senha: str
    username: str
    pais: str

class Relacionamento(BaseModel):
    id_usuario: int
    id_seguidor: int

class PostCurtido(BaseModel):
    id_usuario: int