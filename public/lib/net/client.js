'use strict'


import { Socket } from 'net';

import { byteToHexString } from '../tools/utils';
import { send, closeSocket } from './mySocket';


const socket = new Socket();
const host = '119.254.144.7';
const port = 7708;
//const host = '172.17.33.141';
//const port = 7008;

let messageNo = 1;

socket.setTimeout(3000);

socket.connect(port, host, () => {
  console.log('connected:' + host + ':' + port);
  //const array = utils.hexStringToByte(str);
  //const sendBuf = Buffer.from(array);
  //socket.write(sendBuf);
  send(socket, messageNo++);
});

socket.on('data', (data) => {
  const array = byteToHexString(data);
  console.log('data:\t' + array);
  closeSocket(socket);
  //socket.destroy();
});

socket.on('timeout', () => {
  console.log('Socket timeout');
  socket.destroy();
});

socket.on('close', () => {
  console.log('Connection closed');
});
