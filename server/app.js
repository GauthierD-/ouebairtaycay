const nodeStatic = require('node-static');
const socketIO = require('socket.io');
const path = require('path');
const http = require('http');
const _ = require('lodash');
const messageHandler = require('./message_handler');


const fileServer = new nodeStatic.Server(path.resolve(`${__dirname}/../client_babel`));
const app = http.createServer((req, res) => {
  fileServer.serve(req, res);
});

app.listen(1234, () => {
  console.log('localhost:1234');
});


const io = socketIO.listen(app);
const socketUsers = {};


io.sockets.on('connection', (socket) => {
  console.log(`Connection socket: ${socket.id}`);

  socketUsers[socket.id] = {
    id: socket.id,
    connected: true,
  };

  socket.on('users:new', () => {
    const users = _.omit(socketUsers, [socket.id]);
    // io.sockets.emit('users:list', users, socketUsers[socket.id]);
    socket.emit('users:list', users, socketUsers[socket.id]);
  });


  socket.on('message', (message) => {
    messageHandler(socket, message, io);
  });


  socket.on('disconnect', () => {
    delete socketUsers[socket.id];
    console.log(`user ${socket.id} disconnected`);
  });
});
