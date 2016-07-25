const path = require('path');
const _ = require('lodash');
const nodeStatic = require('node-static');
const http = require('http');
const socketIO = require('socket.io');

const fileServer = new nodeStatic.Server(path.resolve(`${__dirname}/../client_babel`));
const app = http.createServer((req, res) => {
  fileServer.serve(req, res);
});

app.listen(1234, () => console.log('localhost:1234'));

const io = socketIO.listen(app);

const users = {};

io.sockets.on('connection', (socket) => {
  console.log(`Connection socket: ${socket.id}`);
  users[socket.id] = { id: socket.id, connected: true };

  socket.on('users:new', () => {
    io.sockets.emit('users:list', users);
  });

  socket.on('user:update', (userObj) => {
    users[socket.id] = Object.assign({}, users[socket.id],
      _.omit(userObj, ['id', 'connected'])
    );
    socket.emit('users:update', users);
  });

  socket.on('disconnect', () => {
    delete users[socket.id];
    console.log(`user ${socket.id} disconnected`);
  });
});
