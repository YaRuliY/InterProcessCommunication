var api = {};
global.api = api;
api.net = require('net');
var clients = [];
var request = [1,2,3,4,5,6,7,8,9,10];

var server;
server = api.net.createServer(function (socket) {
    clients.push((socket));

    var num = request.length / clients.length;
    for (var i = 0; i < clients.length; i++)
        clients[i].write(JSON.stringify({
            id: i,
            data: request.slice(i * num, (i + 1) * num)
        }));

    console.log('connected: ' + socket.localAddress);

    socket.on('data', function (data) {
        console.log('response from ' +
            socket.localAddress + ': ' + data);
    });

    console.log('count of clients: ' + clients.length);
}).listen(2000);