'use strict';

/* Controllers */

var pokerTimerControllers = angular.module('pokerTimerControllers', []);

pokerTimerControllers.controller('TimerListCtrl', [ '$scope', '$http', 'socket', function($scope, $http, socket) {

	socket.on('getTimersReply', function(data){
		$scope.$apply(function(){
			//console.log(data);
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
		//console.dir("statusUpdate:" , data);
		$scope.$apply(function(){
			$scope.status = data;
		});
	});

	socket.on('tick', function(data) {
		//console.dir("statusUpdate:" , data);
		$scope.$apply(function(){
			$scope.status.currentTime = 0 + data;
		});
	});

	socket.on('tournamentUpdate', function(data) {
		//console.dir("tournamentUpdate:" , data);
		$scope.$apply(function(){
			$scope.timer = data;
		});
	});

	$scope.status = {
	};

	$scope.timer = {
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
		//console.log("startClock event");
		socket.emit("start");
	};

	$scope.stopClock = function() {
		//console.log("stopClock event");
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
