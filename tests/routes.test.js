const app = require('../app');
const request = require('supertest');

let server;
beforeAll(() => {
  // jest.useFakeTimers();
  // mongoose.connect(
  //   `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.y0eny.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`,
  //   { useNewUrlParser: true, useUnifiedTopology: true }
  // );
  // mongoose.Promise = Promise;
  server = app.listen(process.env.PORT);
});

afterAll((done) => {
  // mongoose.connection.close();
  server.close(done);
});

describe('GET /hahaha', function () {
  it('responds with json', function (done) {
    request(app)
      .get('/hahaha')
      .set('Accept', 'application/json')
      .expect('Content-Type', /text/)
      .expect(201, done);
  });
});
