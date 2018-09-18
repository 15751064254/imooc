'use strict';

const iconv = require('iconv-lite');
//const generateSendData = require('../message/generateSendData');


const SUBLEN = 2;

function hexStringToByte(hexString) {
  let length = hexString.length;
  let hexArray = [];
  if (length % SUBLEN !== 0) {
    return hexArray;
  }

  length /= SUBLEN;
  hexString = hexString.toUpperCase();
  for (let i = 0, pos = 0; i < length; i++ , pos += SUBLEN) {
    let str = hexString.substr(pos, SUBLEN);
    let v = parseInt(str, 16);
    hexArray.push(v);
  }

  return hexArray;
}

function byteToHexString(hexArray) {
  let hexs = '';
  for (let i = 0; i < hexArray.length; i++) {
    let hex = hexArray[i].toString(16);
    if (hex.length === 1) {
      hex = '0' + hex;
    }
    hexs += hex;
  }
  return hexs.toUpperCase();
}

function decToHexString(dec) {
  var hexString = parseInt(dec).toString(16);
  if (hexString.length < SUBLEN) {
    hexString = '0' + hexString;
  }
  //console.log(hexString + '\t' + dec);
  return hexString.toUpperCase();
}

function prefixZero(str, len){
  //console.log((Array(len).join(0) + str).slice(-len) + '\t\t\t\t\t' + str);
  return (Array(len).join(0) + str).slice(-len);
}

function suffixZero(str, len){
  //console.log((str + Array(len).join(0)).slice(0, len) + '\t\t\t\t\t' + str);
  return (str + Array(len).join(0)).slice(0, len);
}

function generateByHexString(hexString) {
  let length = hexString.length;
  let hexs = '';
  if (length % SUBLEN !== 0) {
    return hexs;
  }

  length /= SUBLEN;
  for (let i = 0, pos = 0; i < length; i++ , pos += SUBLEN) {
    let str = hexString.substr(pos, SUBLEN);
    if (str === '7D') {
      hexs += '7D01'
    } else if (str === '7E') {
      hexs += '7D02'
    } else {
      hexs += str;
    }
  }

  return hexs;
}

function getStringGbkByHexString(str){
  let buf = iconv.encode(str, 'gbk');
  let hexString = buf.toString('hex').toUpperCase();
  //console.log(iconv.decode(Buffer.from(utils.hexStringToByte(hexString)), 'gbk') + '\t\t' + str);
  return hexString;
  //return iconv.encode(plateNumber, 'gbk').toString('hex').toUpperCase();
}

function generateCheckCode(hexString) {
  let code = 0;
  let length = hexString.length;

  if (length % SUBLEN !== 0) {
    return decToHexString(code);
  }

  length /= SUBLEN;
  for (let i = 0, pos = 0; i < length; i++ , pos += SUBLEN) {
    let str = hexString.substr(pos, SUBLEN);
    let v = parseInt(str, 16);
    code = code ^ v;
  }

  return decToHexString(code);
}


function generateDate(messageId, terminalPhoneNo, messageNo, messageBody) {

  let messageNumber = prefixZero(messageNo, 4);
  //let messageBodyAttribute = prefixZero(decToHexString(messageBodyLength / 2), 4);
  let messageBodyAttribute = decToHexString(messageBody.length / 2);
  messageBodyAttribute = prefixZero(messageBodyAttribute, 4)
  let header = `${messageId}${messageBodyAttribute}${terminalPhoneNo}${messageNumber}`;
  let body = `${header}${messageBody}`;
  let checkCode = generateCheckCode(body);
  let hexString = generateByHexString(`${body}${checkCode}`);
  let messageDate = `7E${hexString}7E`;

  return messageDate;

}


module.exports = exports = {
  hexStringToByte,
  byteToHexString,
  decToHexString,
  prefixZero,
  suffixZero,
  generateByHexString,
  getStringGbkByHexString,
  generateCheckCode,
  generateDate
}
