'use strict';

// Reviews controller
angular.module('reviews').controller('ReviewsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Reviews',
	function($scope, $stateParams, $location, Authentication, Reviews) {
		$scope.authentication = Authentication;

		// Create new Review
		$scope.create = function(dishname) {
			console.log('Hit the review create');
			// Create new Review object
			var review = new Reviews ({
				dishname: dishname,
				review: this.review
			});

			// Redirect after save
			review.$save(function(response) {
				$location.path('/dishes');
				console.log('Review made');

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Review
		$scope.remove = function(review) {
			if ( review ) {
				review.$remove();

				for (var i in $scope.reviews) {
					if ($scope.reviews [i] === review) {
						$scope.reviews.splice(i, 1);
					}
				}
			} else {
				$scope.review.$remove(function() {
					$location.path('reviews');
				});
			}
		};

		// Update existing Review
		$scope.update = function() {
			var review = $scope.review;

			review.$update(function() {
				$location.path('reviews/' + review._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Reviews
		$scope.find = function(dishname) {
			console.log('Made it to review find ' + dishname);
			var reviewDishSrv = new Reviews({
				dishname: dishname
			})
			$scope.reviews = reviewDishSrv.$query();
		};

		// Find existing Review
		$scope.findOne = function() {
			$scope.review = Reviews.get({
				reviewId: $stateParams.reviewId
			});
		};
	}
]);
