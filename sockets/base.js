

module.exports = function (io,passport) {
  'use strict';

  var statusService = require('../app/statusService');
 
/*  io.set('authorization', function (data, accept) {
      // check if there's a cookie header
      if (data.headers.cookie) {
          // if there is, parse the cookie
          data.cookie = parseCookie(data.headers.cookie);
          // note that you will need to use the same key to grad the
          // session id, as you specified in the Express setup.
          data.sessionID = data.cookie['express.sid'];
      } else {
         // if there isn't, turn down the connection with a message
         // and leave the function.
         return accept('No cookie transmitted.', false);
      }
      // accept the incoming connection
      accept(null, true);
  });
*/

  io.on('connection', function (socket) {

    //console.log('a user connected');
    //console.dir(socket.request, {colors: true, depth: 2});

    socket.on('join', function (msg) {
      console.log('recieved join message ', JSON.stringify(msg));
      if (socket.currentRoom) {
        socket.leave(socket.currentRoom);
      }
      var clock = statusService.findStatusById(msg.id);
      var tournament = statusService.findTournamentById(msg.id);
      if (clock && tournament) {
        console.log("Joining room ", msg.id);
        socket.currentRoom = msg.id;
        socket.join(msg.id);
        socket.emit("statusUpdate", clock);
        socket.emit("tournamentUpdate", tournament);
      }
    });

    socket.on('getTimers', function() {
      console.log('recieved getTimers message');
      var reply = statusService.listTournaments();
      console.log("getTimersReply " + reply);
      socket.emit("getTimersReply", reply);
    });

    socket.on('advance', function(msg) {
      console.log('recieved advance message ', JSON.stringify(msg));
      withStatus(doAdvance);
    });

    socket.on('back', function(msg) {
      console.log('recieved back message ', JSON.stringify(msg));
      withStatus(function(timer,status){
        if (status.currentLevel > 0) {
          status.currentLevel--;

          if (timer.levels[status.currentLevel].break) {
            status.running = false;
            status.currentTime = 0;
          } else {
            status.currentTime = timer.levelSeconds;
          }
          return true;
        } else {
          return false;
        }
      });
    });

    socket.on('start', function(msg){
      console.log('recieved start message ', JSON.stringify(msg));
      withStatus(function(timer,status) {
        if (!status.running) {
          status.running = true;
          return true;
        } else {
          return false;
        }
      });
    });

    socket.on('stop', function(msg){
      console.log('recieved stop message ', JSON.stringify(msg));
      withStatus(function(timer,status) {
        if (status.running) {
          status.running = false;
          return true;
        } else {
          return false;
        }
      });
    });

    socket.on('statusUpdate', function(msg){
      console.log('recieved status message ', JSON.stringify(msg));
      withStatus(function(timer,status) {
        if (msg.id === status.id) {
          for (var attrname in msg) {
            if (status.hasOwnProperty(attrname)) {
              status[attrname] = msg[attrname];
            }
          }
          return true;
        } else {
          return false;
        }
      });
    });

    var withStatus = function(cb) {
      var id = socket.currentRoom;
      console.log("current room ",id);
      if (id) {
          var timer = statusService.findTournamentById(id);
          var status = statusService.findStatusById(id);
          if (timer && status) {
            var doBroadcast = cb(timer,status);
            validateStatus(status);
            if (doBroadcast) {
              broadcast(id);
            }
          }
        }
      }

  });


  function validateStatus(status) {
    // totalPlayers >= 0
    status.totalPlayers = Math.max(status.totalPlayers, 0);
    // currentPlayers >= 0
    status.currentPlayers = Math.max(status.currentPlayers, 0);
    // currentPlayers <= totalPlayers
    status.currentPlayers = Math.min(status.currentPlayers, status.totalPlayers);
    // currentLevel >= 0
    status.currentLevel = Math.max(status.currentLevel,0);
    // initialStack >= 0
    status.initialStack = Math.max(status.initialStack,0);
  }


  function doAdvance(timer,status){
    if (status.currentLevel < (timer.levels.length-1)) {
      status.currentLevel++;
    }

    if (timer.levels[status.currentLevel].break) {
      status.running = false;
      status.currentTime = 0;
    } else {
      status.currentTime = timer.levelSeconds;
    }
    return true;
  }

  function broadcast(id) {
    io.sockets.in(id).emit('statusUpdate', statusService.findStatusById(id));
  }

  setInterval(function() {
       //console.log("in setInterval()");
       var stati = statusService.listStatus();
       for(var i=0; i<stati.length; i++) {
         var state = stati[i];
         if (state.running) {
           if (state.currentTime > 0 ) {
             state.currentTime--
           } else {
             var timer = statusService.findTournamentById(state.id);
             doAdvance(timer,state)
           }
           broadcast(state.id);
         }
       }
    }, 1000);

};
