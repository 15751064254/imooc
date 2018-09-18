'use strict'

const utils = require('../tools/utils');
const terminalRegistration = require('../message/terminalRegistration_0x0100');

function sendDataMessage(messageNo) {
  let data = {};
  let str = terminalRegistration.generateMessage(messageNo, data);
  console.log('\t' + str);
  const array = utils.hexStringToByte(str);
  const sendBuffer = Buffer.from(array);
  return sendBuffer;
}

function send(socket, messageNo){
  //let data = {};
  //let str = terminalRegistration.generateMessage(messageNo, data);
  //str = '7E0100002B0185005258650001000C007D02313235000031323600000000000000000000000000000000003031383530303104B7E1CCEF3836F37E';
  //console.log('\t' + str);
  //const array = utils.hexStringToByte(str);
  //const sendBuf = Buffer.from(array);

  const sendBuffer = sendDataMessage(messageNo);
  socket.write(sendBuffer);
}

function closeSocket(socket){
  socket.destroy();
}

module.exports = {
  send,
  closeSocket
};
