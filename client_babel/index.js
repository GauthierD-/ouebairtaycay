/* global io */

const socket = io.connect();

socket.emit('users:new');

socket.on('users:list', usersList => {
  console.log('DEBUG', usersList);
  const usersDiv = document.querySelector('#users');
  usersDiv.innerHTML = '';
  Object.keys(usersList).forEach(user => {
    const currentUser = usersList[user];
    const name = currentUser.name || currentUser.id;
    usersDiv.innerHTML += `<div>${ name }</div>`;
  });
});