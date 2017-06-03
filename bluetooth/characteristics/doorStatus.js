var bleno = require('bleno');
var os = require('os');
var util = require('util');

var BlenoCharacteristic = bleno.Characteristic;

var DoorStatusCharacteristic = function() {
 DoorStatusCharacteristic.super_.call(this, {
    uuid: 'ee51b30e-d7e2-4d93-8842-a7c4a57dfb08',
    properties: ['read'],
  });

 this._value = new Buffer(0);
};

DoorStatusCharacteristic.prototype.onReadRequest = function(offset, callback) {

  if(!offset) {

    this._value = new Buffer(JSON.stringify({
      'doorStatus' : '1'
    }));
  }

    console.log('DoorStatusCharacteristic - onReadRequest: value = ' +
      this._value.slice(offset, offset + bleno.mtu).toString()
    );

  callback(this.RESULT_SUCCESS, this._value.slice(offset, this._value.length));
};

util.inherits(DoorStatusCharacteristic, BlenoCharacteristic);
module.exports = DoorStatusCharacteristic;
