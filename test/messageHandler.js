const test = require('tape');
const sinon = require('sinon');
const handler = require('../server/message_handler');

test('>>> MessageHandler', (mT) => {
  const toStub = sinon.stub();
  const emitStub = sinon.stub();
  const validSocket = {
    to: toStub.returns({
      emit: emitStub,
    }),
    id: '__id__',
  };


  mT.test('when passing a bad socket', (t) => {
    t.throws(handler.bind(null, null, {}), 'TypeError: invalid socket');
    t.end();
  });


  mT.test('when passing bad message', (t) => {
    t.throws(handler.bind(null, {}, null), 'TypeError: invalid message');
    t.end();
  });


  mT.test('when message.type equal offer', (t) => {
    const message = {
      type: 'offer',
      offer: '__offer__',
      destination: '__destination__',
    };

    handler(validSocket, message);

    t.ok(toStub.lastCall, 'should be call toStub');
    t.deepEqual(toStub.lastCall.args, ['__destination__'], 'it should call `to` with destination');
    t.ok(emitStub.lastCall, 'it should call `emit`');
    t.equal(emitStub.lastCall.args[0], 'message', 'it should call `emit` with message first args');
    t.deepEqual(emitStub.lastCall.args[1], {
      type: 'offer',
      offer: '__offer__',
      source: '__id__',
    }, 'it should call `emit` with correct data as second args');

    t.end();
  });


  mT.test('when message.type equal ICECandidate', (t) => {
    const message = {
      type: 'ICECandidate',
      ICECandidate: '__ice__',
      destination: '__destination__',
    };

    handler(validSocket, message);

    t.ok(toStub.lastCall, 'should be call toStub');
    t.deepEqual(toStub.lastCall.args, ['__destination__'], 'it should call `to` with destination');
    t.ok(emitStub.lastCall, 'it should call `emit`');
    t.equal(emitStub.lastCall.args[0], 'message', 'it should call `emit` with message first args');
    t.deepEqual(emitStub.lastCall.args[1], {
      type: 'ICECandidate',
      ICECandidate: '__ice__',
      source: '__id__',
    }, 'it should call `emit` with correct data as second args');

    t.end();
  });


  mT.test('when message.type equal answer', (t) => {
    const message = {
      type: 'answer',
      answer: '__answer__',
      destination: '__destination__',
    };

    handler(validSocket, message);

    t.ok(toStub.lastCall, 'should be call toStub');
    t.deepEqual(toStub.lastCall.args, ['__destination__'], 'it should call `to` with destination');
    t.ok(emitStub.lastCall, 'it should call `emit`');
    t.equal(emitStub.lastCall.args[0], 'message', 'it should call `emit` with message first args');
    t.deepEqual(emitStub.lastCall.args[1], {
      type: 'answer',
      answer: '__answer__',
      source: '__id__',
    }, 'it should call `emit` with correct data as second args');

    t.end();
  });


  mT.test('when type is invalid for messageHandler', (t) => {
    t.throws(handler.bind(null, {}, {}), 'TypeError: invalid message type');
    t.end();
  });
});
