# Rede Social — Projeto de Banco de Dados

## 📌 Tema do Projeto
O projeto desenvolvido pelo grupo consiste em uma **Rede Social**, escolhida por ser um tema que integra de forma prática o uso de diferentes tecnologias, como API, front-end e múltiplos bancos de dados. Além disso, permite simular funcionalidades reais como criação de usuários, posts, curtidas, relacionamentos e feed personalizado.

---

## 🗃️ Bancos de Dados Utilizados e Justificativas

### **1. PostgreSQL (Relacional)**
**Usado para:**
- informações dos usuários  
- relação de seguidores entre usuários  

**Justificativa:**  
Os dados de usuários possuem relacionamentos bem definidos, exigindo integridade referencial e consultas que envolvem joins. O PostgreSQL oferece consistência, segurança e suporte robusto para esse tipo de modelo.

---

### **2. MongoDB (Não Relacional — Documentos)**
**Usado para:**
- posts  
- comentários  
- curtidas  
- URLs das imagens armazenadas no Supabase Storage  

**Justificativa:**  
Posts têm estrutura flexível e podem incluir diversos tipos de conteúdo (texto, imagem, vídeo). O MongoDB permite armazenar documentos com formatos variados sem necessidade de esquema rígido, o que facilita o desenvolvimento e escala.

---

### **3. Cassandra (Distribuído — Orientado a Colunas)**
**Usado para:**
- posts curtidos pelos usuários  
- consultas rápidas para geração do feed  

**Justificativa:**  
Cassandra oferece desempenho ideal para operações de leitura e escrita em larga escala, comuns em interações como likes, deslikes e montagem de feeds. Trabalha muito bem com acesso por chave primária, garantindo alta performance.

---

## 🧩 Arquitetura dos Serviços (S1 e S2)

### **S1 — Serviço Cliente**
Responsável por simular ações de usuário:
- criar usuário  
- criar post  
- curtir post  
- buscar feed  
- etc.

O S1 envia requisições para o S2 e armazena as respostas para validação do comportamento do sistema.

---

### **S2 — Serviço Backend**
Serviço responsável por processar as requisições do S1 e persistir os dados nos bancos.

O backend pode ser pensado em módulos:

- **S2-Users:** CRUD de usuários → PostgreSQL  
- **S2-Posts:** CRUD de posts → MongoDB  
- **S2-Feed:** gerenciamento de curtidas e feed → Cassandra  

O serviço escolhe automaticamente qual banco usar de acordo com o tipo de dado manipulando.

---

## ▶️ Como Executar o Projeto

### **1. Iniciar a API (Backend)**
Execute o comando:

```bash
fastapi dev .\backend\api\main.py
