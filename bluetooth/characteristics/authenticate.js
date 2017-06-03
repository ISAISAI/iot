var bleno = require('bleno');
var os = require('os');
var util = require('util');

var BlenoCharacteristic = bleno.Characteristic;

var AuthenticateCharacteristic = function() {
 AuthenticateCharacteristic.super_.call(this, {
    uuid: 'ee51b30e-d7e2-4d93-8842-a7c4a57dfb10',
    properties: ['write','notify'],
    descriptors: [
      new bleno.Descriptor({
        uuid: '2901',
        value: 'userID must > 4 bytes'
      })
    ]
  });

 this._value = new Buffer(0);
};

// data;    we only accept bool value, 1: open door,  0 : not implemented
AuthenticateCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
  if (offset) {
    callback(this.RESULT_ATTR_NOT_LONG);
  }
  else if (data.length <= 4) {
    callback(this.RESULT_INVALID_ATTRIBUTE_LENGTH);
  }
  else {
    var userID = data.toString();
    //authenticate here
    console.log('receive userID value ' +
      userID
    );
    var self = this;
    // self.updateValueCallback(data);
    callback(this.RESULT_SUCCESS);
  }
};

util.inherits(AuthenticateCharacteristic, BlenoCharacteristic);
module.exports = AuthenticateCharacteristic;
