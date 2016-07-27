/* global io, oueb, sendMessage */

// const RTCSessionDescription = window.RTCSessionDescription;
const RTCPeerConnection = window.webkitRTCPeerConnection;
// const RTCIceCandidate = window.RTCIceCandidate;
const servers = { iceServers: [{ urls: 'stun:stun.1.google.com:19302' }] };

const initPeer = peerId => {
  const pc = new RTCPeerConnection(servers, {
    optional: [{
      DtlsSrtpKeyAgreement: true
    }]
  });

  pc.createOffer(offer => {
    pc.setLocalDescription(offer);
    sendMessage('offer', offer, peerId);
  }, e => {
    console.error(e);
  });
};

const createPeerConnection = peerId => {
  console.log('--->', peerId);
  const pc = new RTCPeerConnection(servers, {
    optional: [{
      DtlsSrtpKeyAgreement: true
    }]
  });

  return pc;
};

oueb.initPeer = initPeer;
oueb.createPeerConnection = createPeerConnection;