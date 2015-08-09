'use strict';

//Likes service used to communicate Likes REST endpoints
angular.module('likes').factory('Likes', ['$resource',
	function($resource) {
		return $resource('likes/:likeId', { likeId: '@_id', name: '@name'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
