
var callback, devices;
var spark = require('spark');

spark.login({accessToken: 'fdc2e9b4db16cc1af38d53d612ca4a332dfee032'});

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
    getDevices:    function (cb){
    clear();
    callback = cb;
    access();
    },
    callDeviceFunc: accessDevice
}
