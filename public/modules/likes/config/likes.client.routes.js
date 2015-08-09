'use strict';

//Setting up route
angular.module('likes').config(['$stateProvider',
	function($stateProvider) {
		// Likes state routing
		$stateProvider.
		state('listLikes', {
			url: '/likes',
			templateUrl: 'modules/likes/views/list-likes.client.view.html'
		}).
		state('createLike', {
			url: '/likes/create',
			templateUrl: 'modules/likes/views/create-like.client.view.html'
		}).
		state('viewLike', {
			url: '/likes/:likeId',
			templateUrl: 'modules/likes/views/view-like.client.view.html'
		}).
		state('editLike', {
			url: '/likes/:likeId/edit',
			templateUrl: 'modules/likes/views/edit-like.client.view.html'
		});
	}
]);