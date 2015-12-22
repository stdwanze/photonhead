var on = 0;

function toggleLED(id)
{
    var data = {
        id: id,
        value : on? "on" : "off"
    };
    if(on == 0) on = 1;
    else on = 0;
    
   var request = $.ajax({url:'/photon/devices/toggle' ,type:'POST', data:data });
   request.done(function(ret) {
   $("#LED").text(data.value);
 
  }).fail(function (xhr){
    alert("failed: "+xhr);
  });
}