 
'use strict'
var gpio = require("gpio");

var open =false;

var button = gpio.export(21, {
    
    direction: 'in',
     
    ready: function () { 
        setInterval(function(){
deng.set(button.value)
console.log(button.value);
         // if(button.value)
	//{
	
	  //open = !open;
          //;
	//}
      },200)
    }
});



var deng = gpio.export(20, {
    // 数据输出端口
    direction: 'out',
    // ready 是一步的
    ready: function () {   
	     deng.set(0); 
    }
});

