'use strict';

// Likes controller
angular.module('likes').controller('LikesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Likes',
	function($scope, $stateParams, $location, Authentication, Likes) {
		$scope.authentication = Authentication;

		$scope.liked = false;

		// Create new Like
		$scope.create = function(dishname) {

			console.log('likes.client.controller.create(), dishname: ' + dishname + '\n');

			// Create new Like object
			var like = new Likes ({
				dishname: dishname
			});

			// Redirect after save
			like.$save(function(response) {

				console.log('Liked this dish');

				$scope.liked = true;
				// $location.path('likes/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Like
		$scope.remove = function(like) {
			if ( like ) {
				like.$remove();

				for (var i in $scope.likes) {
					if ($scope.likes [i] === like) {
						$scope.likes.splice(i, 1);
					}
				}
			} else {
				$scope.like.$remove(function() {
					$location.path('likes');
				});
			}
		};

		// Update existing Like
		$scope.update = function() {
			var like = $scope.like;

			like.$update(function() {
				$location.path('likes/' + like._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Likes
		$scope.find = function() {
			$scope.likes = Likes.query();
		};

		// Find existing Like
		$scope.findOne = function() {
			$scope.like = Likes.get({
				likeId: $stateParams.likeId
			});
		};
	}
]);
