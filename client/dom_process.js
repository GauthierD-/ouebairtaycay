/* global oueb */

const myBtn = document.querySelector('#myBtn');
const myMsg = document.querySelector('#myMsg');
const myTextBox = document.querySelector('#myTextBox');

const clearList = () => {
  const usersDiv = document.querySelector('#users');
  usersDiv.innerHTML = '';
};


const fillList = (users, cb) => {
  const usersDiv = document.querySelector('#users');

  Object.keys(users).forEach((user) => {
    const currentUser = users[user];
    const name = currentUser.name || currentUser.id;
    usersDiv.innerHTML += `<div>${name}</div>`;
    cb(currentUser.id);
  });
};


const addText = (text) => {
  myTextBox.innerHTML += `<h4>${text}</h4>`;
};


myBtn.addEventListener('click', () => {
  const value = myMsg.value;
  if (value) {
    let sender;
    if (oueb.com.caller && oueb.com.caller.readyState === 'open') {
      sender = oueb.com.caller;
    } else if (oueb.com.callee && oueb.com.callee.readyState === 'open') {
      sender = oueb.com.callee;
    } else {
      throw new Error('[ERROR]: 😱  cannot send message');
    }
    addText(`Moi: ${value}`);
    sender.send(value);
  }
  // reset input
  myMsg.value = '';
}, false);


oueb.dom.clearList = clearList;
oueb.dom.fillList = fillList;
oueb.dom.addText = addText;
