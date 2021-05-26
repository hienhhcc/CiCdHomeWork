//3rd party library
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const httpStatus = require('http-status');
const passport = require('passport');

const { errorConverter, errorHandler } = require('./middlewares/error.mdw');
const ApiError = require('./utils/ApiError');
const { User } = require('./models');
const { socketService, roomService, userService } = require('./services');
require('dotenv').config();
const app = express();

const PORT = process.env.PORT || 4000;

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

// mongoose.connect(
//   `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.y0eny.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`,
//   { useNewUrlParser: true, useUnifiedTopology: true }
// );
// mongoose.Promise = Promise;

// const server = app.listen(PORT, () => {
//   console.log(`Server is running on PORT ${PORT}`);
// });

// const io = require('./utils/socketio').init(server);
// socketService.listenToConnectionEvent(io);
