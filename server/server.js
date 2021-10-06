const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 8081;
const bodyParser = require('body-parser');
const db = require('./db/index');

// Express Configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));

// ROUTERS
const loginApiRoutes = require('./routes/login');
app.use('/api/login', loginApiRoutes(db));
const usersApiRoutes = require('./routes/users');
app.use('/api/users', usersApiRoutes(db));
const genresApiRoutes = require('./routes/genres');
app.use('/api/genres', genresApiRoutes(db));
const bandsApiRoutes = require('./routes/bands');
app.use('/api/bands', bandsApiRoutes(db));
const spotsApiRoutes = require('./routes/spots');
app.use('/api/spots', spotsApiRoutes(db));
const instrumentsApiRoutes = require('./routes/instruments');
app.use('/api/instruments', instrumentsApiRoutes(db));
const searchApiRoutes = require('./routes/search');
app.use('/api/search', searchApiRoutes(db));
const applicationsApiRoutes = require('./routes/applications');
app.use('/api/applications', applicationsApiRoutes(db));
const signupApiRoutes = require('./routes/signup');
app.use('/api/signup', signupApiRoutes(db));

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});

//Handle webSocket Connections

const users = {};
let connected = 0;

const getUser = function (username) {
  for (const user in users) {
    if (users[user] === username) {
      return user;
    }
  }
};

const getUsersList = () => {
  return Object.keys(users);
};

const sendStatus = function () {
  const active = Object.keys(users).length;
  const status = { connected, active };
  console.log(status);
  io.emit('status', status);
};

io.on('connection', (socket) => {
  socket.on('send-username', (username) => {
    users[username] = socket.id;
    console.log(users);
    io.to(socket.id).emit('notify', `${username}`);
    io.emit('users-list', getUsersList());
    connected++;
    sendStatus(io);
  });

  socket.on('disconnect', () => {
    console.log(socket.id, 'LOGGED OUT');
    connected--;

    const user = getUser(socket.id);
    if (user) {
      delete users[user];
    }
    io.emit('users-list', getUsersList());
    sendStatus();
  });

  socket.on('chat', (message) => {
    console.log('got chat', message);
    console.log('users after chat', users, 'from:', message.fromUser);

    const destSocket = users[message.toUser];
    if (!destSocket) {
      server.to(socket.id).emit('status', msg.to + ' is not active');
      return;
    }
    const from = message.fromUser;
    const text = message.message;
    const chatHistory = message.chatHistory;
    io.to(destSocket).emit('private', { from: from, text: text });
    console.log('users after msg send', users);
  });
});
