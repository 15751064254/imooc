'use strict';

module.exports.byteToHexString = function(array) {
  var hexString = '';
  for (var i = 0; i < array.length; i++) {
    var tmp = array[i].toString(16);
    if (tmp.length === 1) {
      tmp = '0' + tmp;
    }

    hexString += tmp;
  }

  return hexString.toUpperCase();
};
