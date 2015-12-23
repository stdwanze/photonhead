var express = require('express');
var router = express.Router();
var spark = require('./models/devices');
var access_token = "";
/* GET users listing. */
router.post('/photon/setinfo', function(req, res) {

    access_token = req.body.access_token;
    res.redirect('/photon/particleinfo');
});
router.get('/photon/particleinfo', function(req, res) {

    res.render('particleinfo', { access_t : access_token });
});

router.get('/photon/devices', function(req, res) {
    
    spark.setAccessToken(access_token);
    spark.init(function (){
        spark.getDevices(function (devices){
        res.render('photon',{ devices: devices, devicesFound : devices != null});
        })
    });
  
  });

router.post('/photon/devices/toggle', function (req, res){
    /*Each device has the following parameters:
name
connected
variables
functions
version
requiresUpgrade
Commands
And you can call the following commands on it:
CALLFUNCTION

Call a function in device
*/
    var id = req.body.id;
    var val = req.body.value;
    console.log("id: "+id + " val: "+val);
 
    spark.callDeviceFunc(id,"led",val,function (ret){
        res.json(ret);
    });
   
})
module.exports = router;
