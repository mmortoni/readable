var app = require('../../server');
var request = require('supertest')(app);

const token = Math.random()
    .toString(36)
    .substr(-8);

const headers = {
    Accept: "application/json",
    Authorization: token,
    "Content-Type": "application/json"
}

describe('GET /', function () {
    it('respond with json', function (done) {
        request
            .get('/')
            .set(headers)
            .expect('Content-Type', 'text/html; charset=utf-8')
            .expect(200, done);
    });
});
