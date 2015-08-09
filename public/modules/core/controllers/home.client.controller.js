'use strict';


angular.module('core').controller('HomeController', ['$scope', '$location', 'Authentication', 'HomeService',
	function($scope, $location, Authentication, HomeService) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

    $scope.initiatePin = function(){
      $scope.disheslatlng = HomeService.query();
      console.log('Dish location:' + $scope.disheslatlng);
    };

    //marker link
    $scope.gotolink= function(event,i) {
      console.log('\n\ngotolink(): ' + i + '.\n\n');
      $location.path('dishes/'+ i._id);
    };

	}
]);
