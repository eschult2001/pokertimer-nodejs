// define globals
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
http.listen(3000, function(){
  console.log('listening on *:3000');
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
