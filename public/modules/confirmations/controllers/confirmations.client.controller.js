'use strict';

// Confirmations controller
angular.module('confirmations').controller('ConfirmationsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Confirmations',
	function($scope, $stateParams, $location, Authentication, Confirmations) {
		$scope.authentication = Authentication;

		// Create new Confirmation
		$scope.create = function() {
			// Create new Confirmation object
			var confirmation = new Confirmations ({
				name: this.name
			});

			// Redirect after save
			confirmation.$save(function(response) {
				$location.path('confirmations/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Confirmation
		$scope.remove = function(confirmation) {
			if ( confirmation ) { 
				confirmation.$remove();

				for (var i in $scope.confirmations) {
					if ($scope.confirmations [i] === confirmation) {
						$scope.confirmations.splice(i, 1);
					}
				}
			} else {
				$scope.confirmation.$remove(function() {
					$location.path('confirmations');
				});
			}
		};

		// Update existing Confirmation
		$scope.update = function() {
			var confirmation = $scope.confirmation;

			confirmation.$update(function() {
				$location.path('confirmations/' + confirmation._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Confirmations
		$scope.find = function() {
			$scope.confirmations = Confirmations.query();
		};

		// Find existing Confirmation
		$scope.findOne = function() {
			$scope.confirmation = Confirmations.get({ 
				confirmationId: $stateParams.confirmationId
			});
		};
	}
]);