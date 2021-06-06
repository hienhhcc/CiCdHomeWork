const app = require('../app');
const request = require('supertest');

let server;
beforeAll(() => {
  server = app.listen(process.env.PORT);
});

afterAll((done) => {
  server.close(done);
});

describe('GET /hahaha', function () {
  it('responds with json', function (done) {
    request(app)
      .get('/hahaha')
      .set('Accept', 'application/json')
      .expect('Content-Type', /text/)
      .expect(200, done);
  });
});

describe('POST /user', function(){
  it('responds with status 200', function(done) {
    request(app)
      .post('/user', {
        json: true,
        body: '{"id":"1","name":"Minh Hoang"}'
      })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400) // in fact respond status 200 instead
      .end(done);
  });
});

describe('GET /user/:id', function () {
  it('respond with json containing a single user', function (done) {
      request(app)
          .get('/user/202') // Params should be 101 instead, result: status 404
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200, done);
  });
});

describe('GET /hello', function() {
  it('should send hello', function(done) {
    request(app)
    .get('/hello')
    .expect('hi', done);
  });

  it('should save cookies', function(done) {
    request(app)
    .get('/hi')
    .expect('set-cookie', 'ettique=hi; Path=/', done); // should be ettique=hello instead
  });
});