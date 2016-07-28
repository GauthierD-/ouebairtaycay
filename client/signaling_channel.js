/* global oueb */


const signaling = {
  id: '__empty__',
  socket: '__empty__',
  sendMessage(type, data, destination) {
    const message = {};
    message.type = type;
    message[type] = data;
    message.destination = destination;
    this.socket.send(message);
  },
  sendICECandidate(ICECandidate, destination) {
    this.sendMessage('ICECandidate', ICECandidate, destination);
  },
  sendOffer(offer, destination) {
    this.sendMessage('offer', offer, destination);
  },
  sendAnswer(answer, destination) {
    this.sendMessage('answer', answer, destination);
  },
  onICECandidate() { },
  onOffer() { },
  onAnswer() { },
};

const signalingFactory = (socket, id) => {
  const signal = Object.assign(Object.create(signaling), {
    socket,
    id,
  });

  socket.on('message', (objMessage) => {
    switch (objMessage.type) {
      case 'ICECandidate':
        signal.onICECandidate(objMessage.ICECandidate, objMessage.source);
        break;
      case 'offer':
        signal.onOffer(objMessage.offer, objMessage.source);
        break;
      case 'answer':
        signal.onAnswer(objMessage.answer, objMessage.source);
        break;
      default:
        throw new Error('invalid message type');
    }
  });

  return signal;
};


oueb.signalingChannel = signalingFactory;
