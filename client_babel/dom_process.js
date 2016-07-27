/* global oueb */

const clearList = () => {
  const usersDiv = document.querySelector('#users');
  usersDiv.innerHTML = '';
};

const fillList = (users, cb) => {
  const usersDiv = document.querySelector('#users');

  Object.keys(users).forEach(user => {
    const currentUser = users[user];
    const name = currentUser.name || currentUser.id;
    usersDiv.innerHTML += `<div>${ name }</div>`;
    cb(currentUser.id);
  });
};

oueb.dom.clearList = clearList;
oueb.dom.fillList = fillList;