const utils = require('../utils/utils');
const net = require('net');
const iconv = require('iconv-lite');
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
  close(socket);
  //socket.destroy();
});

socket.on('timeout', () => {
  console.log('Socket timeout');
  socket.destroy();
});

socket.on('close', () => {
  console.log('Connection closed');
});

let messageNo = 1;
//----------------------------------------------------//
function generateMessage(data){

  let authCode = '';

  //let provinceId = '000B';
  //let cityId ='006F';
  //let provinceId = getProvinceIdByHexString('11');
  //let cityId = getCityIdByHexString('111');
  let provinceId = getProvinceIdByHexString(12);
  let cityId = getCityIdByHexString(126);
  let manufacturerId = getManufacturerIdByHexString('125');
  let terminalModel = getTerminalModelByHexString('126');
  //let terminalId = getTerminalIdByHexString('1850052');
  let terminalId = getTerminalIdByHexString('0185001');
  let plateColor = getPlateColorByHexString('4');
  let plateNumber = getPlateNumberByHexString('丰田86');
  //let plateNumber = getPlateNumberByHexString('BRZ86');
  let messageId = '0100';
  let terminalPhoneNo = getTerminalPhoneNoByString('18500525865');

  messageNo = utils.prefixZero(messageNo, 4);
  let terminalInfo = `${manufacturerId}${terminalModel}${terminalId}`;
  let vehicleInfo = `${plateColor}${plateNumber}`;
  let messageBody = `${provinceId}${cityId}${terminalInfo}${vehicleInfo}`;
  let messageBodyAttribute = utils.decToHexString(messageBody.length / 2);
  messageBodyAttribute = utils.prefixZero(messageBodyAttribute, 4)
  let header = `${messageId}${messageBodyAttribute}${terminalPhoneNo}${messageNo}`;
  let body = `${header}${messageBody}`;
  //let checkCode = 'D1';
  let checkCode = utils.generateCheckCode(body);
  let hexString = utils.generateByHexString(`${body}${checkCode}`);
  let messageDate = `7E${hexString}7E`;

  return messageDate;

}

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
  return utils.prefixZero(terminalPhoneNo, 12);
}

function getPlateColorByHexString(plateColor){
  let plateColorHex = utils.decToHexString(plateColor);
	return plateColorHex;
}


function getProvinceIdByHexString(provinceId){
  //let provinceId = '000B';
  let provinceIdHex = 0000;
  if(typeof(provinceId) === 'number') {
    provinceIdHex = utils.decToHexString(provinceId);
  } else {
    provinceIdHex = getStringGbkByHexString(provinceId);
  }
  //console.log('000B');
  //console.log(provinceIdHex + '\t' + utils.prefixZero(provinceIdHex, 4));
  return utils.prefixZero(provinceIdHex, 4);
}

function getCityIdByHexString(cityId){
  //let cityId ='006F';
  let cityIdHex = 0000;
  if(typeof(cityId) === 'number') {
    cityIdHex = utils.decToHexString(cityId);
  } else {
    cityIdHex = getStringGbkByHexString(cityId);
  }
  //console.log('006F');
  //console.log(cityIdHex + '\t' + utils.prefixZero(cityIdHex, 4));
  return utils.prefixZero(cityIdHex, 4);
}
function getManufacturerIdByHexString(manufacturerId){
  let manufacturerIdHex = getStringGbkByHexString(manufacturerId);
  return utils.suffixZero(manufacturerIdHex, 10);
}

function getTerminalModelByHexString(terminalModel){
  let terminalModelHex = getStringGbkByHexString(terminalModel);
  return utils.suffixZero(terminalModelHex, 40);
}

function getTerminalIdByHexString(terminalId){
  let terminalIdHex = getStringGbkByHexString(terminalId);
  return utils.suffixZero(terminalIdHex, 14);
}

function send(socket, data){
  let str = generateMessage(data);
  //str = '7E0100002B0185005258650001000C007D02313235000031323600000000000000000000000000000000003031383530303104B7E1CCEF3836F37E';
  console.log('\t' + str);
  const array = utils.hexStringToByte(str);
  const sendBuf = Buffer.from(array);
  socket.write(sendBuf);
}

function close(socket){
  socket.destroy();
}
