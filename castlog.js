#! /usr/bin/env node


// This is a simple command line tool to connect to the server and stream logs from the piped input stream

var WebSocket = require('ws');
var ws = new WebSocket('ws://107.170.209.244/wss');
//var ws = new WebSocket('ws://localhost:9999');

process.stdin.setEncoding('utf8');
ws.on('open', function(){
    process.stdin.on('readable', function(){
        var data = process.stdin.read();
        if( data != null){
            var obj = { event : "message" , data : data }; 
            ws.send(JSON.stringify(obj));
        }
    });
    // send heart beats to prevent the socket connection from closing down
    setInterval( heartbeat, 1000);
});


ws.on('message', function( data, flags ){
    console.log("Access your log stream at : " + data);
});

function heartbeat(){
    var obj = { event : "heartbeat" };
    ws.send(JSON.stringify(obj));
}
