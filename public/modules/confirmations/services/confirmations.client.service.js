'use strict';

//Confirmations service used to communicate Confirmations REST endpoints
angular.module('confirmations').factory('Confirmations', ['$resource',
	function($resource) {
		return $resource('confirmations/:confirmationId', { confirmationId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);