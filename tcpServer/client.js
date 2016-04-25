var api = {};
global.api = api;
api.net = require('net');

var socket = new api.net.Socket();
var obj;

socket.connect({
  port: 2000,
  host: '127.0.0.1'
}, function() {
  socket.on('data', function(data){
    obj = JSON.parse(data);
    console.log('Data received (by client): ' + data);
    for (var i=0; i<obj.data.length; i++)
      obj.data[i] *= 2;
    socket.write(JSON.stringify(obj));
  });
});
