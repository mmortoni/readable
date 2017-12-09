const supertest = require('supertest');
var objectId = require("node-time-uuid");

const app = require('../../server');
const readableAPI = supertest.agent(app);

const token = Math.random()
    .toString(36)
    .substr(-8);

const headers = {
    Accept: "application/json",
    Authorization: token,
    "Content-Type": "application/json"
}

describe('Testes Udacity Readable API', () => {
    var categorias;

    it('GET /                ==> Retorno text/html; charset=utf-8', done => {
        readableAPI
            .get('/')
            .set(headers)
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                done();
            });
    });
  
    it('GET /categories      ==> Array de objeto', done => {
        readableAPI
        .get('/categories')
        .set(headers)
        .expect(200)
        .then(res => {
            categorias = res.body.categories;
            expect(res.body.categories).toBeInstanceOf(Array);
            done();
        })
    });

    it('GET /:category/posts ==> Obter todas as postagens para uma categoria específica', done => {
        categorias.forEach((categoria) => {
            readableAPI
            .get(`/:${categoria.name}/posts`)
            .set(headers)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                console.log('Categoria: ', categoria.name);
                done();
            });
        });        
    });

    it('GET /posts           ==> Array de objeto', done => {
        readableAPI
        .get('/posts')
        .set(headers)
        .expect(200)
        .then(res => {
            expect(res.body).toBeInstanceOf(Array);
            done();
        })
    });

    var id = new objectId();
    var buffer = id.get().toString('base64');
    var timestamp = parseInt(new Date().getTime()/1000, 10);

    let post = {
        id: buffer.toLowerCase(),
        timestamp: id.getTimestamp(),
        title: 'Inclusao de postagem na fase de testes',
        body: 'corpo da postagem .',
        author: 'author',
        category: 'react',
        voteScore: 0,
        deleted: false,
        commentCount: 0
    }; 

    console.log(post);

    it('POST /posts           ==> Adicionar uma nova postagem', done => {
        readableAPI
        .post('/posts')
        .set(headers)
        .send(post)
        .expect(200)
        .then(res => {
            post.voteScore = 1;
            expect(res.body).toEqual(post);
            done();
        })
    });

    it('GET /posts/:id        ==> Obter os detalhes de uma única postagem', done => {
        readableAPI
        .get('/posts/8xf0y6ziyjabvozdd253nds')
        .set(headers)
        .expect(200)
        .then(res => {
            expect(res.body.id).toEqual('8xf0y6ziyjabvozdd253nds');
            done();
        })
    });
});
