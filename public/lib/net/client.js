const utils = require('../utils/utils');
const net = require('net');
const socket = new net.Socket();

const host = '119.254.144.7';
const port = 7708;
//const host = '172.17.33.141';
//const port = 7008;


socket.setTimeout(3000);

socket.connect(port, host, () => {
  console.log('connected:' + host + ':' + port);
  //const array = utils.hexStringToByte(str);
  //const sendBuf = Buffer.from(array);
  //socket.write(sendBuf);
  send(socket);
});

socket.on('data', (data) => {
  const array = utils.byteToHexString(data);
  console.log('data:\t' + array);
  socket.destroy();
});

socket.on('timeout', () => {
  console.log('Socket timeout');
  socket.destroy();
});

socket.on('close', () => {
  console.log('Connection closed');
});

let messageNo = '0001';
//----------------------------------------------------//
function generateMessage(data){
  let terminalPhoneNo = getTerminalPhoneNoByString('18500525865');

  //let provinceId = '000B';
  //let cityId ='006F';
  let provinceId = getProvinceIdByHexString(11);
  let cityId = getCityIdByHexString(111);
  let manufacturerId = getManufacturerIdByHexString('70114');
  let terminalModel = getTerminalModelByHexString('70114001');
  let terminalId = getTerminalIdByHexString('1850052');
  let plateColor = getPlateColorByHexString('4');
  let plateNumber = getPlateNumberByHexString('丰田86');

  let authCode = '';

  let messageId = '0100';
  //let messageNo = '0001';
  let messageBodyAttribute = '002B';
  let messageheader = `${messageId}${messageBodyAttribute}${terminalPhoneNo}${messageNo}`;
  let terminalInfo = `${manufacturerId}${terminalModel}${terminalId}`;
  let vehicleInfo = `${plateColor}${plateNumber}`;
  let messageBody = `${messageheader}${provinceId}${cityId}${terminalInfo}${vehicleInfo}`;
  let checkCode = 'D1';
  let strHexString = `7E${messageBody}${checkCode}7E`;

  return strHexString;

}
var iconv = require('iconv-lite');

function getStringGbkByHexString(str){
  let buf = iconv.encode(str, 'gbk');
  let hexString = buf.toString('hex').toUpperCase();
  //console.log(iconv.decode(Buffer.from(utils.hexStringToByte(hexString)), 'gbk') + '\t\t' + str);
  return hexString;
  //return iconv.encode(plateNumber, 'gbk').toString('hex').toUpperCase();
}

function getPlateNumberByHexString(plateNumber){
  return getStringGbkByHexString(plateNumber);
  //let buf = iconv.encode(plateNumber, 'gbk');
  //let hexString = buf.toString('hex').toUpperCase();
  //console.log(iconv.decode(Buffer.from(hexStringToByte(hexString)), 'gbk') + '\t' + plateNumber);
  //return hexString;
  ////return iconv.encode(plateNumber, 'gbk').toString('hex').toUpperCase();
}

function getTerminalPhoneNoByString(terminalPhoneNo){
  return prefixZero(terminalPhoneNo, 12);
}

function getPlateColorByHexString(plateColor){
  let plateColorHex = decToHexString(plateColor);
	return plateColorHex;
}

function decToHexString(dec){
  var hexString = parseInt(dec).toString(16);
  if(hexString.length < 2) {
    hexString = '0' + hexString;
  }
  //console.log(hexString + '\t' + dec);
  return hexString.toUpperCase();
}

function getProvinceIdByHexString(provinceId){
  //let provinceId = '000B';
  let provinceIdHex = 0000;
  if(typeof(provinceId) === 'number') {
    provinceIdHex = decToHexString(provinceId);
  } else {
    provinceIdHex = getStringGbkByHexString(provinceId);
  }
  //console.log('000B');
  //console.log(provinceIdHex + '\t' + prefixZero(provinceIdHex, 4));
  return prefixZero(provinceIdHex, 4);
}

function getCityIdByHexString(cityId){
  //let cityId ='006F';
  let cityIdHex = 0000;
  if(typeof(cityId) === 'number') {
    cityIdHex = decToHexString(cityId);
  } else {
    cityIdHex = getStringGbkByHexString(cityId);
  }
  //console.log('006F');
  //console.log(cityIdHex + '\t' + prefixZero(cityIdHex, 4));
  return prefixZero(cityIdHex, 4);
}
function getManufacturerIdByHexString(manufacturerId){
  let manufacturerIdHex = getStringGbkByHexString(manufacturerId);
  return suffixZero(manufacturerIdHex, 10);
}

function getTerminalModelByHexString(terminalModel){
  let terminalModelHex = getStringGbkByHexString(terminalModel);
  return suffixZero(terminalModelHex, 40);
}

function getTerminalIdByHexString(terminalId){
  let terminalIdHex = getStringGbkByHexString(terminalId);
  return suffixZero(terminalIdHex, 14);
}

function prefixZero(str, len){
  //console.log((Array(len).join(0) + str).slice(-len) + '\t\t\t\t\t' + str);
	return (Array(len).join(0) + str).slice(-len);
}

function suffixZero(str, len){
  //console.log((str + Array(len).join(0)).slice(0, len) + '\t\t\t\t\t' + str);
	return (str + Array(len).join(0)).slice(0, len);
}

function send(socket, data){
  let str = generateMessage(data);
  console.log('\t' + str);
  const array = utils.hexStringToByte(str);
  const sendBuf = Buffer.from(array);
  socket.write(sendBuf);
}

function close(socket){
  socket.destroy();
}
