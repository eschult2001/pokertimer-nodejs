'use strict';

/* Directives */
var pokerTimerDirectives = angular.module('pokerTimerDirectives', []);

pokerTimerControllers.directive('blindLevel', function() {
	return {
		restrict: 'AE',
		scope: {
			'title': '@',
			'level': '=',
			'click': '&'
		},
		templateUrl: 'partials/blindlevel-template.html'
	};
});
