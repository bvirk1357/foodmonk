'use strict';

//Reviews service used to communicate Reviews REST endpoints
angular.module('reviews').factory('Reviews', ['$resource',
	function($resource) {
		return $resource('reviews/:reviewId', { reviewId: '@_id', name: '@name'
		}, {
      'get':    {method:'GET'},
      'save':   {method:'POST'},
      'query':  {method:'GET', isArray:true},
      'remove': {method:'DELETE'},
      'delete': {method:'DELETE'}
		});
	}
]);
