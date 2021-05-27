//3rd party library
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const httpStatus = require('http-status');
const passport = require('passport');

const { errorConverter, errorHandler } = require('./middlewares/error.mdw');
const ApiError = require('./utils/ApiError');

require('dotenv').config();
const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.options('*', cors());
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.status(200).json('Hello world');
});

app.get('/hahaha', function (req, res) {
  res.status(200).json({ name: 'john' });
});

app.get('/hihihi', function (req, res) {
  res.status(200).json({ name: 'hienhhcc' });
});

require('./middlewares/routes.mdw')(app);

// 404 error for unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Route not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;

