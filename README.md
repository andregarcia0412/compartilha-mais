
# ➕ Compartilha Mais - Sistema de Indicação

<div style="display: flex; gap: 10px; align-items: center;">
  <img src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=java&logoColor=white" height="28"/>
  <img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white" height="28"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" height="28"/>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" height="28"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" height="28"/>
</div>

Compartilha Mais é uma aplicação web desenvolvida para o processo seletivo da **Vortex - UNIFOR**. A plataforma permite que os usuários compartilhem links e ganhem pontos e níveis através de um sistema de gamificação, tornando a experiência mais envolvente e divertida. O projeto foi desenvolvido utilizando Java no backend, com frontend em HTML, CSS e JavaScript, focando em uma interface intuitiva e responsiva.

# 📌 Funcionalidades
- Cadastro e login de usuários com validação de dados.

- Sistema de sessão para manter o usuário logado.

- Indicação de amigos através de links de referência.

- Sistema de pontos e níveis baseado nas indicações.

- Compartilhamento fácil via redes sociais (WhatsApp, Facebook, Telegram).

- Interface responsiva e moderna para desktop e mobile.

 # ⚙ Tecnologias Utilizadas
- Java + Spring Boot: Backend, gerenciamento de sessões, endpoints REST.

- HTML, CSS, JavaScript: Frontend interativo e responsivo.

- Banco de dados MySQL em nuvem

## Motivo da escolha das tecnologias:
Spring Boot oferece rápida configuração de APIs REST e integração com Java, o que permite a criação de APIs mais robustas e evitando erros devido ao Java ser uma linguagem fortemente tipada. HTML, CSS e JS foram escolhidos pela simplicidade e controle completo do layout e comportamento da interface. Por fim, MySQL foi escolhido como banco de dados em nuvem pela simplicidade, velocidade e integração nativa com Spring Boot.

# 💻 Como Executar Localmente

# 🔒 Backend

### 1️⃣ Usando Maven

1. Clone o repositório:

   ```
     git clone https://github.com/andregarcia0412/compartilha-mais
   ```

2. Acesse a pasta do backend:

   ```
    cd backend
   ```

3. Instale as dependências e rode:
   ```
   mvn clean install
   mvn spring-boot:run
   ```

- Backend estará disponivel em http://localhost:8080

### 2️⃣ Usando JAR

1. Baixe a última versão do JAR nas [releases do projeto](https://github.com/andregarcia0412/compartilha-mais/releases/tag/v1.0.0)

2. Execute o JAR no terminal:
    ```
    java -jar vortex-project-0.0.1-SNAPSHOT.jar
    ```

# 🌐 Frontend

1. Acesse a pasta do frontend:
    ```
    cd frontend/projeto-vortex
    ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Rode o projeto em modo de desenvolvimento:
   ```
   npm run dev
   ```

- Frontend estará disponivel em http://localhost:5173

# 🗂 Estrutura do Projeto
```
C:.
├───.idea/ (...)
├───backend
│   ├───src
│   │   ├───main
│   │   │   ├───java
│   │   │   │   └───com/vortex_project/vortex_project
│   │   │   │       │   VortexProjectApplication.java
│   │   │   │       │
│   │   │   │       ├───controller
│   │   │   │       │       UserController.java
│   │   │   │       │
│   │   │   │       ├───database
│   │   │   │       │       DBConnection.java
│   │   │   │       │
│   │   │   │       ├───domain
│   │   │   │       │       LoginDTO.java
│   │   │   │       │       User.java
│   │   │   │       │       UserDTO.java
│   │   │   │       │
│   │   │   │       └───service
│   │   │   │               UserService.java
│   │   │   │
│   │   │   └───resources/ (...)
│   │   │
│   │   └───test
│   │       └───java
│   │           └───com/vortex_project/vortex_project
│   │                   VortexProjectApplicationTests.java
│   │
│   └───target/ (...)
│
└───frontend
    └───projeto-vortex
        │   auth.html
        │   index.html
        │
        ├───node_modules/ (...)
        ├───public/ (...)
        └───src
                auth.css
                auth.js
                main.css
                main.js
```

# 🤖 Colaboração com a IA
- Criação de Documentação: O esqueleto deste README.md foi gerado com o auxílio de IA para garantir que todas as seções obrigatórias fossem cobertas de forma clara e profissional.
- Resolução de Problemas e Debugging: Em momentos de bloqueio, a IA foi consultada para diagnosticar mensagens de erro complexas e sugerir diferentes abordagens para resolver bugs específicos.
- Aprendizado e Exploração: Utilizei a IA para entender conceitos novos antes não conhecidos, pedindo exemplos de código e explicações detalhadas sobre seu funcionamento.
