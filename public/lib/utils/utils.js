'use strict';

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


function decToHexString(dec) {
  var hexString = parseInt(dec).toString(16);
  if (hexString.length < SUBLEN) {
    hexString = '0' + hexString;
  }
  //console.log(hexString + '\t' + dec);
  return hexString.toUpperCase();
}

module.exports = exports = {
  hexStringToByte,
  byteToHexString,
  decToHexString,
  generateCheckCode,
  generateByHexString
}