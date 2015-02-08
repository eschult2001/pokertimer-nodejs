// define globals
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//io.set("transports", ["websocket", "xhr-polling"]); // support both
//io.set("polling duration", 10);
//io.set("log level", 3);

// set up our socket server
require('./sockets/base')(io);

// start the server
http.listen(server_port, server_ip_address, function () {
  console.log( "Listening on " + server_ip_address + ", server_port " + server_port )
});

// Static Content
app.use('/components', express.static(__dirname +  '/bower_components'));
app.use(express.static(__dirname +  '/public'));


if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
  });
 
}
 
// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
