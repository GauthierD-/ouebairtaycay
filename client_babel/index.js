/* global io, oueb */

const socket = io.connect();
socket.emit('users:new');

socket.on('users:list', users => {
  console.log('DEBUG', users);
  oueb.dom.clearList();
  oueb.dom.fillList(users, id => {
    oueb.initPeer(id);
  });
});

socket.on('offer', ({ source, offer }) => {
  console.log('JE SUIS LA', source, offer);

  const peerConnection = oueb.createPeerConnection(source);
  console.log(peerConnection);
  // peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
  // peerConnection.createAnswer(function(answer){
  //   peerConnection.setLocalDescription(answer);
  //   console.log('send answer');
  //   signalingChannel.sendAnswer(answer, source);
  //
  // }, function (e){
  //   console.error(e);
  //
  // });
});

const sendMessage = (type, data, destination) => {
  const message = {};
  message.type = type;
  message[type] = data;
  message.destination = destination;
  socket.emit('message', message);
};

window.sendMessage = sendMessage;