'use srict';


const onOffer = (offer, destination, socket) => {
  console.log('Offer from peer:', socket.id, 'to peer', destination);
  socket
    .to(destination)
    .emit('message', {
      type: 'offer',
      offer,
      source: socket.id,
    });
};


const onICECandidate = (ICECandidate, destination, socket) => {
  console.log('ICECandidate from peer:', socket.id, 'to peer', destination);
  socket
    .to(destination)
    .emit('message', {
      type: 'ICECandidate',
      ICECandidate,
      source: socket.id,
    });
};

const onAnswer = (answer, destination, socket) => {
  console.log('answer from peer:', socket.id, 'to peer', destination);
  socket
    .to(destination)
    .emit('message', {
      type: 'answer',
      answer,
      source: socket.id,
    });
};

const messageHandler = (socket, message) => {
  if (!socket) {
    throw new TypeError('invalid socket');
  }

  if (!message) {
    throw new TypeError('invalid message');
  }

  switch (message.type) {
    case 'offer':
      onOffer(message.offer, message.destination, socket);
      break;
    case 'ICECandidate':
      onICECandidate(message.ICECandidate, message.destination, socket);
      break;
    case 'answer':
      onAnswer(message.answer, message.destination, socket);
      break;
    default:
      throw new TypeError('invalid message type');
  }
};

module.exports = messageHandler;
