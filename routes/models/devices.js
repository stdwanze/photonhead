
var callback, devices;
var spark = require('spark');
var _token = null;
var _inited = false;


var clear = function (){
    callback = null;
    devices = null;
}
var access = function ()
{
    devices =  null;
    var devicesPr = spark.listDevices();

    devicesPr.then(
    function(devs){
        
        devices = devs;
        console.log('Devices: ', devices);
        
        if(callback != null)
        {
            callback(devices);
        }
        
    },
    function(err) {
        console.log('List devices call failed: ', err);
          if(callback != null)
        {
            callback(null);
        }
    }
    );
}
var accessDevice= function (id, funcName, value, callback)
{
 spark.getDevice(id, function(err, device) {
  

        device.callFunction(funcName, value, function(err, data) {
        if (err) {
              
           callback('An error occurred: ' + err);
            console.log('An error occurred:', err);
        } else {
            callback('Function called succesfully:' + data);
            console.log('Function called succesfully:', data);
        }
        });
        console.log('Device name: ' + device.name);
    });

}
module.exports = {
    init: function (cb){
       if(!_inited && _token != null)
       {
           spark.login({accessToken: _token},cb);
       } 
    },
    setAccessToken : function (token)
    {
        _token = token;
    },
    getDevices:    function (cb){
    clear();
    callback = cb;
    access();
    },
    callDeviceFunc: accessDevice
}
