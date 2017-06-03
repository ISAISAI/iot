var bleno = require('bleno');
var util = require('util');

var AuthenticateCharacteristic = require('./characteristics/authenticate');
var DoorStatusCharacteristic = require('./characteristics/doorStatus');
var OpenDoorCharacteristic = require('./characteristics/openDoor');

function SystemInformationService() {

  bleno.PrimaryService.call(this, {
    uuid: 'ee51b30e-d7e2-4d93-8842-a7c4a57dfb07',
    characteristics: [
      new AuthenticateCharacteristic(),
      new DoorStatusCharacteristic(),
      new OpenDoorCharacteristic()
    ]
  });
};

util.inherits(SystemInformationService, bleno.PrimaryService);
module.exports = SystemInformationService;
