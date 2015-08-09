'use strict';

//Setting up route
angular.module('dishes').config(['$stateProvider',
	function($stateProvider) {
		// Dishes state routing
		$stateProvider.
		state('create-dish', {
			url: '/dishes/create',
			templateUrl: 'modules/dishes/views/create-dish.client.view.html'
		}).
		state('dishes', {
			url: '/dishes',
			templateUrl: 'modules/dishes/views/dishes.client.view.html'
		}).
		state('dish', {
			url: '/dishes/:id',
			templateUrl: 'modules/dishes/views/dish.client.view.html'
		});
	}
]);
