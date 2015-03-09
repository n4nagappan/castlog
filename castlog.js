var WebSocket = require('ws');
var ws = new WebSocket('ws://107.170.209.244/wss');
//var ws = new WebSocket('ws://localhost:9999');

process.stdin.setEncoding('utf8');
ws.on('open', function(){
    process.stdin.on('readable', function(){
        var data = process.stdin.read();
        if( data != null){
            ws.send(data);
        }
    });
});


ws.on('message', function( data, flags ){
    console.log("Received a message from server : " + data);
});
