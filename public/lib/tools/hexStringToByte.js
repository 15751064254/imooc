'use strict';

module.exports.hexStringToByte = function (hexString) {
  var length = hexString.length;
  var array = [];
  if (length % 2 !== 0) {
    return array;
  }

  length /= 2;
  for (var i = 0, pos = 0; i < length; i++ , pos += 2) {
    var str = hexString.toUpperCase().substr(pos, 2);
    var v = parseInt(str, 16);
    array.push(v);
  }

  return array;
};
