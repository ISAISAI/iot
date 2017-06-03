var bleno = require('bleno');
var os = require('os');
var util = require('util');

var BlenoCharacteristic = bleno.Characteristic;

var OpenDoorCharacteristic = function() {

 OpenDoorCharacteristic.super_.call(this, {
    uuid: 'ee51b30e-d7e2-4d93-8842-a7c4a57dfb09',
    properties: ['write'],
    descriptors: [
      new bleno.Descriptor({
        uuid: '2902',
        value: 'accept open door instruction, 1 to open, otherwise no action.'
      })
    ]
  });

 this._value = new Buffer(0);
};


OpenDoorCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG);
  }
  else if (data.length !== 1) {
    callback(this.RESULT_INVALID_ATTRIBUTE_LENGTH);
  }
  else {
    var shouldOpenDoor = data.readUInt8(0);
    //open door here
    console.log('receive open door action ' +
      shouldOpenDoor
    );
    var self = this;
    // self.updateValueCallback(data);
    callback(this.RESULT_SUCCESS);
  }
};

util.inherits(OpenDoorCharacteristic, BlenoCharacteristic);
module.exports = OpenDoorCharacteristic;
