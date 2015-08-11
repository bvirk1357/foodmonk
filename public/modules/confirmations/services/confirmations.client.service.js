'use strict';

//Confirmations service used to communicate Confirmations REST endpoints
angular.module('confirmations').factory('Confirmations', ['$resource',
	function($resource) {
		return $resource('confirmations/:confirmationId', { confirmationId: '@_id', confirmation_dishname: '@dishname', confirmation_username: '@username'
		}, {
      'get':    {method:'GET'},
      'save':   {method:'POST'},
      'confirm': {method:'PUT'},
      'query':  {method:'GET', isArray:true},
      'remove': {method:'DELETE'},
      'delete': {method:'DELETE'}
		});
	}
]);