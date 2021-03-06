const mongoose = require('mongoose');
const app = require('./app');
const { socketService } = require('./services');
const PORT = process.env.PORT;

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.y0eny.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.Promise = Promise;

const server = app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

const io = require('./utils/socketio').init(server);
socketService.listenToConnectionEvent(io);
