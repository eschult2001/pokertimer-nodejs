// define globals
var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

//io.configure(function () {
    io.set("transports", ["websocket", "xhr-polling"]); // support both
    io.set("polling duration", 10);
    io.set("log level", 3);
//});

// set up our socket server
require('./sockets/base')(io);

// start the server
server.listen(3000);

// optional - set socket.io logging level
io.set('log level', 1000);

// for production
app.use(express.static(__dirname +  '/public'));

module.exports = app;
