/* global io, oueb */

const socket = io.connect();
socket.emit('users:new');

socket.on('users:list', (users, currentUser) => {
  console.log('DEBUG', users);
  oueb.dom.clearList();
  oueb.dom.fillList(users, (id) => {
    oueb.caller.init(socket, id, currentUser.id);
  });
});
