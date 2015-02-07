'use strict';

/* Controllers */

var pokerTimerControllers = angular.module('pokerTimerControllers', []);

pokerTimerControllers.controller('TimerListCtrl', [ '$scope', '$http', 'socket', function($scope, $http, socket) {

	socket.on('getTimersReply', function(data){
		$scope.$apply(function(){
			console.log(data);
			$scope.timers = data;
		});
	});

	socket.emit("getTimers");
	socket.emit("join",{id: '-'});

	$scope.orderProp = 'id';
} ]);

pokerTimerControllers.controller('TimerDetailCtrl', [ '$scope', '$routeParams', '$http', 'socket', function($scope, $routeParams, $http, socket) {

	var NOLEVEL = {
		'smallBlind' : '',
		'bigBlind' : '',
		'ante' : ''
	};

	socket.on('statusUpdate', function(data) {
		console.dir("statusUpdate:" , data);
		$scope.$apply(function(){
			$scope.status = data;
		});
	});

	socket.on('tournamentUpdate', function(data) {
		console.dir("tournamentUpdate:" , data);
		$scope.$apply(function(){
			$scope.timer = data;
		});
	});

	$scope.status = {
		"id" : "unset",
		"currentPlayers" : 1,
		"currentLevel" : 1,
		"currentTime" : 100,
		"totalPlayers" : 16,
		"initialStack" : 17500,
		"running" : false
	};
	
	$scope.timer = {
		    "id":"mwpt-monthly",
		    "name": "MWPT Monthly Tournament",
		    "headerImg": "img/mwpt.png",
		    "levelSeconds": 900,
		    "levels":[
		        {"ante":0, "smallBlind":25,"bigBlind":50},
		        {"ante":0, "smallBlind":50 ,"bigBlind":100},
		        {"ante":0, "smallBlind":100 ,"bigBlind":200},
		        {"ante":25, "smallBlind":100 ,"bigBlind":200},
		        {"ante":50, "smallBlind":200 ,"bigBlind":400},
		        {"ante":75, "smallBlind":300 ,"bigBlind":600},
		        
		        {"break": true, "label":"Chip-up 25s and 50s"},
		        
		        {"ante":100, "smallBlind":400 ,"bigBlind":800},
		        {"ante":200, "smallBlind":600 ,"bigBlind":1200},
		        {"ante":300, "smallBlind":800 ,"bigBlind":1600},
		        {"ante":300, "smallBlind":1000 ,"bigBlind":2000},
		        
		        {"break": true, "label":"Chip-up 100s"},

		        {"ante":500, "smallBlind":1500 ,"bigBlind":3000},
		        {"ante":500, "smallBlind":2000 ,"bigBlind":4000},

		        {"break": true, "label":"Chip-up 500s"},

		        {"ante":1000, "smallBlind":3000 ,"bigBlind":6000},
		        {"ante":1000, "smallBlind":4000 ,"bigBlind":8000},
		        {"ante":2000, "smallBlind":6000 ,"bigBlind":12000},
		        {"ante":3000, "smallBlind":8000 ,"bigBlind":16000},
		        {"ante":3000, "smallBlind":10000 ,"bigBlind":20000},
		        {"ante":5000, "smallBlind":15000 ,"bigBlind":30000}
		    ]
		};

	$scope.clockStyle = {};
	$scope.lastLevel = $scope.activeLevel = $scope.nextLevel = NOLEVEL;

	$scope.advance = function() {
		socket.emit('advance');
	};

	$scope.backup = function() {
		socket.emit('back');
	};

	$scope.getLevel = function(lvl) {
		if ($scope.timer && $scope.timer.levels && lvl >= 0 && lvl < $scope.timer.levels.length) {
			return $scope.timer.levels[lvl];
		} else {
			return NOLEVEL;
		}
	};

	$scope.getLastLevel = function() {
		return $scope.getLevel($scope.status.currentLevel - 1);
	};

	$scope.getActiveLevel = function() {
		return $scope.getLevel($scope.status.currentLevel);
	};

	$scope.getNextLevel = function() {
		return $scope.getLevel($scope.status.currentLevel + 1);
	};

	$scope.startClock = function() {
		console.log("startClock event");
		socket.emit("start");
	};

	$scope.stopClock = function() {
		console.log("stopClock event");
		socket.emit("stop");
	};

	$scope.toggleClock = function() {
		if ($scope.status.running) {
			$scope.stopClock();
		} else {
			$scope.startClock();
		}
	};

	$scope.sendState = function() {
		//var delta = {};
		//delta[opt] = $scope.status[opt];
		//console.log(delta);
		socket.emit("statusUpdate", $scope.status);
	};

	$scope.$watch('status.running', function(newValue, oldValue) {
		var runFlag = newValue || false;
		$scope.isRunning = runFlag;
		var sound2 = 'running.' + oldValue + '.' + newValue;
		sound.play(sound2);
	});

	$scope.$watch('status.currentTime', function(newValue, oldValue) {
		var sound1 = 'time.' + oldValue + '.' + newValue;
		sound.play(sound1);
	});

	$scope.$watchCollection('[status.currentTime,status.running]', function(newValues, oldValues) {
		var time = newValues[0];
		var runFlag = newValues[1];
		time = time || 0;
		runFlag = runFlag || false;
		$scope.isWarning = runFlag && time < 60;
		$scope.clock = ("0" + Math.floor(time / 60)).slice(-2) + ":" + ("0" + time % 60).slice(-2);
	});

	$scope.$watchCollection('[status.currentPlayers,status.totalPlayers,status.initialStack]', function(newValues, oldValues) {
		var curr = newValues[0];
		var total = newValues[1];
		var stack = newValues[2];
		$scope.totalChips = total * stack;
		$scope.avgStack = $scope.totalChips / curr;
	});

	$scope.$watch('status.currentLevel', function(newValue, oldValue) {
		$scope.nextLevel = $scope.getNextLevel();
		$scope.activeLevel = $scope.getActiveLevel();
		$scope.lastLevel = $scope.getLastLevel();
	});

	socket.emit("join", {id: $routeParams.timerId});

	// $http.get('timers/' + $routeParams.timerId + '.json').success(function(data) {
	// 	$scope.timer = data;
	// 	//$scope.lastLevel = $scope.activeLevel = $scope.nextLevel = NOLEVEL;
	// 	$http.get('status/' + $routeParams.timerId + '.json').success(function(data) {
	// 		$scope.status = data;
	// 	});
	// });

	// window.setInterval(function() {
	// 	if ($scope.isRunning) {
	// 		$scope.$apply(function(scope) {
	// 			scope.status.currentTime = scope.status.currentTime - 1;
	// 			// console.log(scope.currentTime);
	// 			if (scope.status.currentTime <= 0) {
	// 				scope.advance();
	// 			}
	// 		});
	// 	}
	// }, 1000);


} ]);
