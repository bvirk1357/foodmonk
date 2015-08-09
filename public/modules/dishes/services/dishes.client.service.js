'use strict';

angular.module('dishes').factory('Dishes', ['$resource',
	function($resource) {
		return $resource('dishes/:id', { id: '@_id', username: '@username', name: '@name', pic: '@pic', description: '@description', user_story: '@user_story', cost: '@cost', ingredients: '@ingredients', prep_time: '@prep_time', availability: '@availability' }, {
			'get':    {method:'GET'},
		  'save':   {method:'POST'},
		  'query':  {method:'GET', isArray:true},
		  'remove': {method:'DELETE'},
		  'delete': {method:'DELETE'}
		});
	}

]);
