'use strict';

/* App Module */
var pokerTimerApp = angular.module('pokerTimerApp', [ 'ngRoute', 'pokerTimerControllers', 'pokerTimerDirectives', 'pokerTimerServices','shoppinpal.mobile-menu']);

pokerTimerApp.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/timers', {
		templateUrl : 'partials/timer-list.html',
		controller : 'TimerListCtrl'
	}).when('/timers/:timerId', {
		templateUrl : 'partials/timer-detail.html',
		controller : 'TimerDetailCtrl'
	}).otherwise({
		redirectTo : '/timers'
	});
} ]);