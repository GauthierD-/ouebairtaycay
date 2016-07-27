'use srict';


const onOffer = (offer, destination, source, socket) => {
  socket
    .to(destination)
    .emit('offer', {
      type: 'offer',
      offer,
      source,
    });
};


const messageHandler = (socket, message) => {
  switch (message.type) {
    case 'offer':
      onOffer(message.offer, message.destination, socket.id, socket);
      break;
    default:
      console.log('ERROR: invalid message');
  }
};


module.exports = messageHandler;
