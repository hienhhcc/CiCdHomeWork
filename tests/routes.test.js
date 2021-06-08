const app = require("../app");
const request = require("supertest");
const { response } = require("../app");

let server;
beforeAll(() => {
  server = app.listen(process.env.PORT);
});

afterAll((done) => {
  server.close(done);
});

describe("GET /hahaha", function () {
  it("responds with json", function (done) {
    request(app)
      .get("/hahaha")
      .set("Accept", "application/json")
      .expect("Content-Type", /text/)
      .expect(401, done);
  });
});

describe("POST /user", function () {
  it("responds with status 200", function (done) {
    request(app)
      .post("/user", {
        json: true,
        body: '{"id":"1","name":"Minh Hoang"}',
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(400) // in fact respond status 200 instead
      .end(done);
  });
});

describe("GET /user/:id", function () {
  it("respond with json containing a single user", function (done) {
    request(app)
      .get("/user/202") // Params should be 101 instead, result: status 404
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("GET /hello", function () {
  it("should send hello", function (done) {
    request(app).get("/hello").expect("hi", done);
  });

  it("should save cookies", function (done) {
    request(app).get("/hi").expect("set-cookie", "ettique=hi; Path=/", done); // should be ettique=hello instead
  });
});

describe("GET /post/:id", function () {
  it("respond a post", function (done) {
    request(app)
      .get("/post/2") // Params 2 => result: status 406
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("GET /post/:id", function () {
  it("respond a post", function (done) {
    request(app)
      .get("/post/1") // Params 1 => result: status 200
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(406, done);
  });
});

describe("GET /post/:id/comments", function () {
  it("respond a list comments of a post", function (done) {
    request(app)
      .get("/post/2/comments") // Params 2 => result: status 406
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("POST /post", function () {
  it("respond a post", function (done) {
    request(app)
      .post("/post", {
        json: true,
        body: '{"title":"title"}',
      }) // missing content
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

test("GET /api/users/user", async () => {
  await request(app).get("/api/users/users")
    .expect(200)
    .then((response) => {
      expect(response.body.length).toEqual(1);
      //Expected: 1
      //Received: 2
    });
});

test("GET /api/users", async () => {
  await request(app).get("/api/users")
    .expect(200)
    .then((response) => {
      expect(Array.isArray(response.body)).toBeTruthy();
      //type is array
    });
});


describe("POST /api/users/register", function () {
  it("", function (done) {
    request(app)
      .post("/api/users/register", {
        json: true,
        body: '{"email":"hieuho@email.com","name":"hieu ho","password":"password"}',
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200) //missing first name and last name
      .end(done);
  });
});
