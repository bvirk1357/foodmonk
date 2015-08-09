'use strict';

//Setting up route
angular.module('confirmations').config(['$stateProvider',
	function($stateProvider) {
		// Confirmations state routing
		$stateProvider.
		state('listConfirmations', {
			url: '/confirmations',
			templateUrl: 'modules/confirmations/views/list-confirmations.client.view.html'
		}).
		state('createConfirmation', {
			url: '/confirmations/create',
			templateUrl: 'modules/confirmations/views/create-confirmation.client.view.html'
		}).
		state('viewConfirmation', {
			url: '/confirmations/:confirmationId',
			templateUrl: 'modules/confirmations/views/view-confirmation.client.view.html'
		}).
		state('editConfirmation', {
			url: '/confirmations/:confirmationId/edit',
			templateUrl: 'modules/confirmations/views/edit-confirmation.client.view.html'
		});
	}
]);