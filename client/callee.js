/* global oueb, window */

const initCallee = (socket, calleeId) => {
  const RTCPeerConnection = window.webkitRTCPeerConnection;
  const RTCSessionDescription = window.RTCSessionDescription;
  const RTCIceCandidate = window.RTCIceCandidate;
  const servers = { iceServers: [{ urls: 'stun:stun.1.google.com:19302' }] };

  const signalingChannel = oueb.signalingChannel(socket, calleeId);

  const createPeerConnection = (peerId) => {
    const pc = new RTCPeerConnection(servers, {
      optional: [{
        DtlsSrtpKeyAgreement: true,
      }],
    });

    pc.onicecandidate = (evt) => {
      if (evt.candidate) {
        signalingChannel.sendICECandidate(evt.candidate, peerId);
      }
    };

    signalingChannel.onICECandidate = (ICECandidate, source) => {
      console.log('receiving ICE candidate from ', source);
      pc.addIceCandidate(new RTCIceCandidate(ICECandidate));
    };

    pc.ondatachannel = (event) => {
      const receiveChannel = event.channel;
      console.log('channel received');
      oueb.com.callee = receiveChannel;
      receiveChannel.onmessage = (message) => {
        console.log('CALLEE', message);
        oueb.dom.addText(`God: ${message.data}`);
      };
    };

    return pc;
  };

  signalingChannel.onOffer = (offer, source) => {
    console.log('receive offer');
    const peerConnection = createPeerConnection(source);
    peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
    peerConnection.createAnswer((answer) => {
      peerConnection.setLocalDescription(answer);
      console.log('send answer');
      signalingChannel.sendAnswer(answer, source);
    }, (e) => {
      console.error(e);
    });
  };
};


oueb.callee.init = initCallee;
