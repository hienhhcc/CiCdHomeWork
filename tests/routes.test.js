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