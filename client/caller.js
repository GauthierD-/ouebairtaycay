/* global oueb */

const initCaller = (socket, peerId, callerId) => {
  const RTCPeerConnection = window.webkitRTCPeerConnection;
  const RTCSessionDescription = window.RTCSessionDescription;
  const RTCIceCandidate = window.RTCIceCandidate;
  const servers = { iceServers: [{ urls: 'stun:stun.1.google.com:19302' }] };

  const signalingChannel = oueb.signalingChannel(socket, callerId);

  const pc = new RTCPeerConnection(servers, {
    optional: [{
      DtlsSrtpKeyAgreement: true,
    }],
  });

  signalingChannel.onAnswer = (answer, source) => {
    console.log('receive answer from ', source);
    pc.setRemoteDescription(new RTCSessionDescription(answer));
  };

  signalingChannel.onICECandidate = (ICECandidate, source) => {
    console.log('receiving ICE candidate from ', source);
    pc.addIceCandidate(new RTCIceCandidate(ICECandidate));
  };

  pc.onicecandidate = (evt) => {
    if (evt.candidate) { // empty candidate (wirth evt.candidate === null) are often generated
      signalingChannel.sendICECandidate(evt.candidate, peerId);
    }
  };

  // :warning the dataChannel must be opened BEFORE creating the offer.
  const commChannel = pc.createDataChannel('communication', {
    reliable: false,
  });

  pc.createOffer((offer) => {
    pc.setLocalDescription(offer);
    console.log('send offer to', peerId);
    signalingChannel.sendOffer(offer, peerId);
  }, (e) => {
    console.error(e);
  });

  commChannel.onclose = (evt) => {
    console.log('dataChannel closed', evt);
  };

  commChannel.onerror = (evt) => {
    console.error('dataChannel error', evt);
  };

  commChannel.onopen = () => {
    console.log('dataChannel opened');
  };

  commChannel.onmessage = (message) => {
    console.log('CALLER', message);
    oueb.dom.addText(`God: ${message.data}`);
  };

  oueb.com.caller = commChannel;
};

oueb.caller.init = initCaller;
