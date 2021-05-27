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
