'use strict'

const utils = require('../tools/utils');


function getPlateNumberByHexString(plateNumber){
  return utils.getStringGbkByHexString(plateNumber);
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
  //let provinceIdHex = 0000;
  let provinceIdHex = 0;
  if(typeof(provinceId) === 'number') {
    provinceIdHex = utils.decToHexString(provinceId);
  } else {
    provinceIdHex = utils.getStringGbkByHexString(provinceId);
  }
  //console.log('000B');
  //console.log(provinceIdHex + '\t' + utils.prefixZero(provinceIdHex, 4));
  return utils.prefixZero(provinceIdHex, 4);
}

function getCityIdByHexString(cityId){
  //let cityId ='006F';
  //let cityIdHex = 0000;
  let cityIdHex = 0;
  if(typeof(cityId) === 'number') {
    cityIdHex = utils.decToHexString(cityId);
  } else {
    cityIdHex = utils.getStringGbkByHexString(cityId);
  }
  //console.log('006F');
  //console.log(cityIdHex + '\t' + utils.prefixZero(cityIdHex, 4));
  return utils.prefixZero(cityIdHex, 4);
}

function getManufacturerIdByHexString(manufacturerId){
  let manufacturerIdHex = utils.getStringGbkByHexString(manufacturerId);
  return utils.suffixZero(manufacturerIdHex, 10);
}

function getTerminalModelByHexString(terminalModel){
  let terminalModelHex = utils.getStringGbkByHexString(terminalModel);
  return utils.suffixZero(terminalModelHex, 40);
}

function getTerminalIdByHexString(terminalId){
  let terminalIdHex = utils.getStringGbkByHexString(terminalId);
  return utils.suffixZero(terminalIdHex, 14);
}

function generateMessage(messageNo, data) {

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

  //let messageNumber = utils.prefixZero(messageNo, 4);
  let terminalInfo = `${manufacturerId}${terminalModel}${terminalId}`;
  let vehicleInfo = `${plateColor}${plateNumber}`;
  let messageBody = `${provinceId}${cityId}${terminalInfo}${vehicleInfo}`;
  //let messageBodyAttribute = utils.prefixZero(utils.decToHexString(messageBody.length / 2), 4);
  //messageBodyAttribute = utils.prefixZero(messageBodyAttribute, 4)
  //let header = `${messageId}${messageBodyAttribute}${terminalPhoneNo}${messageNumber}`;
  //let header = utils.generateHeader(messageId, terminalPhoneNo, messageNumber, messageBody);
  //let body = `${header}${messageBody}`;
  ////let checkCode = 'D1';
  //let checkCode = utils.generateCheckCode(body);
  //let hexString = utils.generateByHexString(`${body}${checkCode}`);
  //let messageDate = `7E${hexString}7E`;
  let messageDate = utils.generateDate(messageId, terminalPhoneNo, messageNo, messageBody);

  return messageDate;

}

module.exports = {
  generateMessage
};
