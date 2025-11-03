from psycopg2.errors import UniqueViolation
from fastapi import APIRouter
from sqlalchemy import text

from model.data_types import *
from services.conexao_postgress import *

router = APIRouter()

@router.get("/usuarios/visualizar_todos")
def ver_usuario_todos():
    engine = conexao_postgress()
    try:
        with engine.connect() as conn:
            query = conn.execute(
                text("SELECT * FROM USUARIOS")
            )
            usuarios = query.fetchall()
            
            if usuarios:
                lista_usuarios = [dict(usuario._mapping) for usuario in usuarios]
                return {
                    "usuarios": lista_usuarios
                }
            return{
                "Usuario: ": "Usuarios nao cadastrados"
            }
    except Exception as e:
        print("Erro na conexao: ", e)
        return {
            "erro": str(e)
        }

@router.get("/usuarios/visualizar_especifico")
def ver_usuario_especifico(usuario_email: str):
    engine = conexao_postgress()
    try:
        with engine.connect() as conn:
            query = conn.execute(
                text("SELECT * FROM USUARIOS WHERE EMAIL = :email"),
                {"email": usuario_email}
            )
            usuario = query.fetchone() 
            print(usuario)
            if usuario:
                return {
                    "usuario": dict(usuario._mapping)
                }
            else:
                return {"usuario": "Não encontrado"}            
    except Exception as e:
        print("Erro na conexão:", e)
        return {"erro": str(e)}
    
@router.get("/usuarios/visualizar_especifico_por_id")
def ver_usuario_especifico_por_id(usuario_id: str):
    engine = conexao_postgress()
    try:
        with engine.connect() as conn:
            query = conn.execute(
                text("SELECT * FROM USUARIOS WHERE ID = :id"),
                {"id": usuario_id}
            )
            usuario = query.fetchone() 
            print(usuario)
            if usuario:
                return {
                    "usuario": dict(usuario._mapping)
                }
            else:
                return {"usuario": "Não encontrado"}            
    except Exception as e:
        print("Erro na conexão:", e)
        return {"erro": str(e)}

@router.post("/usuarios/adicionar")
def adicionar_usuario(usuario: Usuario):
    engine = conexao_postgress()
    try:
        with engine.connect() as conn:
            conn.execute(
                text(
                    "INSERT INTO USUARIOS (NOME, EMAIL, SENHA, USERNAME, PAIS) VALUES (:nome, :email, :senha, :username, :pais)"
                    ),
                    {
                        "nome": usuario.nome,
                        "email": usuario.email,
                        "senha": usuario.senha,
                        "username": usuario.username,
                        "pais": usuario.pais
                    }
            )
            conn.commit()
            return {"msg": "Usuário inserido com sucesso"}
        
    except Exception as e:
        print("Erro na conexao", e)
        if isinstance(e.orig, UniqueViolation):
            return{"erro": "Esse email já foi cadastrado"}
        else:
            return {"erro": str(e)}    

@router.put("/usuarios/atualizar_senha")
def atualizar_senha(usuario_email: str, nova_senha: str):
    engine = conexao_postgress()
    try:
        with engine.connect() as conn:
            query = conn.execute(
                text("""
                    UPDATE USUARIOS
                    SET SENHA = :senha
                    WHERE EMAIL = :email
                """),
                {
                    "email": usuario_email,
                    "senha": nova_senha
                }
            )
            conn.commit()

            if query.rowcount == 0:
                return {"msg": "Usuário não encontrado"}
            
            return {"msg": "Senha atualizada com sucesso!"}

    except Exception as e:
        print("Erro na conexão:", e)
        return {"erro": str(e)}

@router.delete("/usuarios/remover")
def remover_usuarios(usuario_email: str):
    engine = conexao_postgress()
    try:
        with engine.connect() as conn:
            query = conn.execute(
                text("DELETE FROM USUARIOS WHERE EMAIL = :email"),
                {
                    "email" : usuario_email
                }
            )
            conn.commit()

            if query.rowcount == 0:
                return{
                    "msg": "Usuário {} não encontrado".format(usuario_email)
                }
            return {
                "msg" : "Usuário {} removido com sucesso".format(usuario_email)
            }
    except Exception as e:
        return{
            "Erro": str(e)
        }

@router.post("/usuarios/gerar_relacioamento")
def gerar_relacionamento(relacionamento: Relacionamento):
    engine = conexao_postgress()
    try:
        with engine.connect() as conn:
            conn.execute(
                text("INSERT INTO RELACIONAMENTO (ID_USUARIO, ID_SEGUIDOR) VALUES(:id_usuario, :id_seguidor)"),
                {
                    "id_usuario" : relacionamento.id_usuario,
                    "id_seguidor" : relacionamento.id_seguidor
                }
            )
            conn.commit() 
            return{
                "msg": "Relacionamento gerado com sucesso"
            }
    except Exception as e:
        return{
            "Erro" : str(e)
        }

@router.get("/usuarios/visualizar_relacionamento_todos")
def visualizar_todos_relacionamentos():
    engine = conexao_postgress()
    try:
        with engine.connect() as conn:
            query = conn.execute(
                text("SELECT * FROM RELACIONAMENTO")
            )
            relacionamentos = query.fetchall()
            if relacionamentos:
                lista_relacionamento = [dict(relacionamento._mapping) for relacionamento in relacionamentos]
                return{
                    "relacionamentos": lista_relacionamento
                }
            return{
                "msg" : "Não há relacionamentos"
            }
    except Exception as e:
        return{
            "Erro" : str(e)
        }

@router.get("/usuarios/visualizar_seguidores")
def visualizar_seguidores(id_usuario: int):
    engine = conexao_postgress()
    try:
        with engine.connect() as conn:
            query = conn.execute(
                text("SELECT ID_SEGUIDOR FROM RELACIONAMENTO WHERE ID_USUARIO = :id_usuario"),
                {
                    "id_usuario": id_usuario
                }
            )
            seguidores = query.fetchall()
            if seguidores:
                lista_seguidores = [dict(seguidor._mapping) for seguidor in seguidores]
                return{
                    "Seguidores" : lista_seguidores
                }
            return{
                "msg": "Você não possui seguidores"
            }
    except Exception as e:
        return{
            "Erro": str(e)
        }

@router.get("/usuarios/visualizar_seguindos")
def visualizar_seguindos(id_seguidor: int):
    engine = conexao_postgress()
    try:
        with engine.connect() as conn:
            query = conn.execute(
                text("SELECT ID_USUARIO FROM RELACIONAMENTO WHERE ID_SEGUIDOR = :id_seguidor"),
                {
                    "id_seguidor": id_seguidor
                }
            )
            seguindos = query.fetchall()
            if seguindos:
                lista_seguindos = [dict(seguindo._mapping) for seguindo in seguindos]
                return{
                    "Seguindos" : lista_seguindos
                }
            return{
                "msg": "Você nao segue ninguem"
            }
    except Exception as e:
        return{
            "Erro": str(e)
        }
    
@router.delete("/usuarios/remover_seguidor")
def remover_seguidor(relacionamento : Relacionamento):
    engine = conexao_postgress()
    try:
        with engine.connect() as conn:
            query = conn.execute(
                text("DELETE FROM RELACIONAMENTO WHERE ID_SEGUIDOR = :id_seguidor AND ID_USUARIO = :id_usuario"),
                {
                    "id_seguidor": relacionamento.id_seguidor,
                    "id_usuario": relacionamento.id_usuario
                }
            )
            conn.commit()
            if query.rowcount == 0:
                return{
                    "msg" : "Esse seguidor não seguia o usuário informado."
                }
            return{
                "msg": "seguidor removido com sucesso"
            }
    except Exception as e:
        return{
            "Erro": str(e)
        }
    
@router.post("/usuarios/adicionar/muitos")
def adicionar_muitos_usuario(usuarios: list[Usuario]):
    engine = conexao_postgress()
    try:
        with engine.connect() as conn:
            valores = [
                {
                    "nome": u.nome,
                    "email": u.email,
                    "senha": u.senha,
                    "username": u.username,
                    "pais": u.pais
                }
                for u in usuarios
            ]

            conn.execute(
                text(
                    "INSERT INTO USUARIOS (NOME, EMAIL, SENHA, USERNAME, PAIS) "
                    "VALUES (:nome, :email, :senha, :username, :pais)"
                ),
                valores
            )
            
            conn.commit()
            return {"msg": f"{len(usuarios)} usuários inseridos com sucesso!"}

    except Exception as e:
        print("Erro na conexao:", e)
        if hasattr(e, "orig") and isinstance(e.orig, UniqueViolation):
            return {"erro": "Um ou mais emails já foram cadastrados"}
        else:
            return {"erro": str(e)}
        
@router.post("/usuarios/gerar_relacioamento/muitos")
def gerar_relacionamento(relacionamentos: list[Relacionamento]):
    engine = conexao_postgress()
    try:
        with engine.connect() as conn:

            valores = [
                {
                    "id_usuario": relacionamento.id_usuario,
                    "id_seguidor": relacionamento.id_seguidor,
                }
                for relacionamento in relacionamentos
            ]
            conn.execute(
                text("INSERT INTO RELACIONAMENTO (ID_USUARIO, ID_SEGUIDOR) VALUES(:id_usuario, :id_seguidor)"),
                valores
            )
            conn.commit()
            return{
                "msg": "Relacionamento gerado com sucesso"
            }
    except Exception as e:
        return{
            "Erro" : str(e)
        }