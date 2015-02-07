'use strict';

var app = angular.module('pokerTimerServices',[]);

/* Services */
app.service('socket', function(){ 
  var socket = io.connect(location.origin);

  socket.on('connect', function(){
  	socket.emit('ping', {msg: "hello"});
  });

  socket.on('pong', function (data) {
    console.log("pong: "+data);
  });
  
  return socket;
},{$eager:true}); 
