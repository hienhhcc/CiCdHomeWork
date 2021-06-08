//3rd party library
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const httpStatus = require("http-status");
const passport = require("passport");

const { errorConverter, errorHandler } = require("./middlewares/error.mdw");
const ApiError = require("./utils/ApiError");

require("dotenv").config();
const app = express();

app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());
app.options("*", cors());
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.status(200).json("Hello world");
});

app.get("/hahaha", function (req, res) {
  res.status(200).json({ name: "john" });
});

app.get("/hihihi", function (req, res) {
  res.status(200).json({ name: "hienhhcc" });
});

app.post("/user", function (req, res) {
  res.status(200).json({ name: "minhhoang" });
});

app.get("/user/:id", function (req, res) {
  if (req.params.id === "101") {
    return res.json("User 101 found");
  }
  return res.status(404).json("User not found !!!");
});

app.get("/hello", function (req, res) {
  res.send("hello");
});

app.get("/hi", function (req, res) {
  console.log("haha");
  res.cookie("ettique", "hello"); // set ettique = hello
  res.send();
});

app.get("/post/:id", function (req, res) {
  if (req.params.id == 1) {
    return res.json({ title: "This is a post" });
  } else {
    return res.status(406).json({ message: "PostId invalid" });
  }
});

app.get("/post/:id/comments", function (req, res) {
  if (req.params.id == 1) {
    return res.json({ commentId: 1, content: "This is a comment" });
  } else {
    return res.status(406).json({ message: "PostId invalid" });
  }
});

app.post("/post", function (req, res) {
  if (req.body.title == null) {
    return res.status(400).json({ message: "Required title" });
  }
  if (req.body.content == null) {
    return res.status(400).json({ message: "Required content" });
  }
  return res.json({ title: req.body.title, content: req.body.content });
});


app.get("/api/users/:userid", function (req, res) {
  if (req.params.userid == null) {
    return res.status(400).json({ message: "Invalid" });
  }
  
  return res.json([
    {name:'ho hieu',email:"hieu1@gmail.com"},
    {name:'ho hieu 2',email:"hieu2@gmail.com"},
  ]);
});

require("./middlewares/routes.mdw")(app);

// 404 error for unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Route not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
