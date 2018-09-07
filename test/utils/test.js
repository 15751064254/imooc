var a = require('../../public/lib/utils/hexStringToByte');
var b = require('../../public/lib/utils/byteToHexString');
var str = '7E0100002B0185005258650001000B006F373031313437303131343030310000000000000000000000003138353030353204B7E1CCEF3836D17E';
var array = a.hexStringToByte(str);
console.log(array.toString());
var hexStr = b.byteToHexString(array);
console.log(hexStr);

console.log('\r\n');
console.log('str:\t' + str);
console.log('hexStr:\t' + hexStr);
console.log(str === hexStr);
