e strict'

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
var make_username = (productKey, productSecret, deviceName, deviceSecret) =>
{
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

client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString())
})

client.on('connect', function () {
    console.log('>>> connected')
    setInterval(
        ()=> {
            doorState = doorState == "closed" ? "open" : "closed";
            client.publish(topic, doorState);
        },
        3000x
    );

})

