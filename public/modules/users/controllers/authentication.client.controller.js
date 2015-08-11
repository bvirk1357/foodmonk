'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$scope.usertype = user.usertype;
			console.log('\n\nInside auth.client.ctrl.js\n\n');

			$http.post('/auth/signup', $scope.credentials).success(function(response) {

				console.log('\n\nauth.client.ctrl.js.signup.success()\n\n');

				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {

				console.log('\n\nauth.client.ctrl.js.signup.error()\n\n');

				$scope.error = response.message;
			});
		};
		$scope.usertype = function(){
      $scope.usertype = user.usertype;
    };
		$scope.signin = function() {
			$scope.usertype = user.usertype;
			$http.post('/auth/signin', $scope.credentials).success(function(response) {

				console.log('\n\nauth.client.ctrl.js.signin.success()\n\n');

				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {

				console.log('\n\nauth.client.ctrl.js.signin.error()\n\n');

				$scope.error = response.message;
			});
		};
	}
]);
