'use strict';

function hexStringToByte(hexString) {
  let length = hexString.length;
  let hexArray = [];
  if (length % 2 !== 0) {
    return hexArray;
  }

  length /= 2;
  for (let i = 0, pos = 0; i < length; i++, pos +=2) {
    let str = hexString.toUpperCase().substr(pos, 2);
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

module.exports = exports = {
  hexStringToByte,
  byteToHexString
}
