## Projeto Readable

### Pré-requisitos

Para executar este aplicativo, você precisará do seguinte:

* Node.js
* Linha de comando (Windows: cmd / Mac: terminal)
* YARN ou NPM

### Início

1. Clone este repositório: `git clone https://github.com/mmortoni/Readable.git`
2. Mover para a pasta: `cd Readable\api-server (execute o passo 4)`.<br />
3. Mover para a pasta: `cd Readable\frontend (execute o passoa 4)`.<br />

4. Para executar:

```
yarn install
```
ou
```
npm install
```

5. Mover para a pasta: `cd Readable`.<br />
```
executa.bat
```
ou 

```
node index.js
```

##### Abrir  http://localhost:3001/

##### Funcionalidades:

###### Página Principal

![POSTS](public/posts.png?raw=true "CRUD de POSTS")

![COMMENTS](public/comments.png?raw=true "CRUD de COMMENTS")

###### Routing      
- [x] A página principal - Posts conecta-se à página de Comments, por meio do HREF do título do Post.
- [x] A página de Comments conecta-se de volta à página principal, clicando-se na aba Posts.
