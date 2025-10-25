# Postgress SQL

```mermaid
classDiagram

class Usuarios {
    int ID PK
    string NOME
    string EMAIL UNIQUE
    string SENHA
    string USERNAME UNIQUE
    datetime DATA_DE_CRIACAO
    string PAIS
}

class Seguidores {
    int ID_Usuario
    int ID_Seguidor
}

```

# MongoDB

class Posts {
    string Id
    int id_usuario
    string[] foto_url
    string foto_comentario
    string comentario
    int curtidas
}

# Cassandra

class posts_curtidos {
    int id_usuario
    string id_post
}

class posts_comentados {
    int id_usuario
    string id_post
}