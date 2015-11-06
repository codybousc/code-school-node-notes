var EventEmitter = require('events').EventEmitter;

var logger = new EventEmitter();

logger.on('error', function(message) {
  console.log('Err: ' + message);
});

logger.emit('error', 'Spliled Milk');


//Two ways to write this (below)

http.createServer(function(request, response) {...});
var server = http.createServer();
server.on('request', function(request, response) {...});

//ex
//if we wanted to listen to the close event on our server
//we could write
server.on('close', function() {...}); 
