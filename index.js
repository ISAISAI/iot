//服务账号
//productKey:1000193944
//productSecret:pP0ySZAr2JmbhSl5
//
//第一台设备账号
//deviceName:zhuxiaozhi_001
//deviceId:0gZtZqdZnl9FONHSL
//deviceSecret:GTlw97YqiF3U7jhj


'use strict'
var gpio = require("gpio");

const mqtt = require('mqtt');
// 加解密
const crypto = require('crypto');
let productKey = "1000193944";
let productSecret = "pP0ySZAr2JmbhSl5"
// 版本号码
let deviceType = "1";
let sdkVersion = "1.0.0";
//device info
let deviceName = "zhuxiaozhi_001";
let deviceSecret = "GTlw97YqiF3U7jhj";
//topic ，定时上报门锁状态
let topic = '/1000193944/zhuxiaozhi_001/doorState';


//生成client_id
var make_client_id = (productKey, deviceName, deviceType, sdkVersion) => {
    return `${productKey}:${deviceName}:${deviceType}:${sdkVersion}`;
}

//生成UserName
var make_username = (productKey, productSecret, deviceName, deviceSecret) => {
    var key = `${productKey}${productSecret}${deviceName}${deviceSecret}`;
    const hash = crypto.createHash('md5');
    hash.update(key);
    // console.log(hash.digest('hex'));
    return hash.digest('hex').toLocaleUpperCase();
}


var settings = {
    keepalive: 100,
    protocolId: 'MQIsdp',
    protocolVersion: 3,
    clientId: make_client_id(productKey, deviceName, deviceType, sdkVersion),
    clean: false,
    username: make_username(productKey, productSecret, deviceName, deviceSecret),
    port: 8000,
    host: "iot-as.aliyuncs.com"
}

var client = mqtt.connect(settings);

var doorState = "closed";
var ready = false
// 核心代码: 这里开始调用GPIO 接口 做硬件控制 使用第21 针脚   右下角
var doorIO = gpio.export(21, {
    // 数据输出端口
    direction: 'out',
    // ready 是一步的
    ready: function () { 
        ready = true;
    }
});

client.on('message', function (topic, message) {
    // message is Buffer
       console.log(topic+message.toString())

    if (ready) {
        doorIO.set(function () {
            setTimeout(function () {
                doorIO.set(0)
                console.log('set0');
            }, 7000)

            console.log(doorIO.value);    // should log 1
        });
    }


})

client.on('connect', function () {
    console.log('>>> connected')
    // 订阅 开门消息
    //https://www.npmjs.com/package/mqtt#subscribe   # 是通配符  或者直接使用  /1000193944/zhuxiaozhi_001/openDoor	,可以是数组或字符串
    //  client.subscribe(['#/get','#/oepnDoor'])
    client.subscribe('/1000193944/zhuxiaozhi_001/openDoor')
    setInterval(
        ()=> {
            doorState = doorState == "closed" ? "open" : "closed";
            client.publish(topic, doorState);
        },
        10000
    );

})
