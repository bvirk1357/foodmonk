'use strict';


angular.module('core').controller('HomeController', ['$scope', '$location', 'Authentication', 'HomeService',
	function($scope, $location, Authentication, HomeService) {
		// This provides Authentication context.
		$scope.authentication = Authentication;

    $scope.initiatePin = function(){
      $scope.usertype = user.usertype;
      $scope.disheslatlng = HomeService.query();
      console.log('Dish location:' + $scope.disheslatlng);
    };

    //marker link
    $scope.gotolink= function(event,i) {
      console.log('\n\ngotolink(): ' + i + '.\n\n');
      $location.path('dishes/'+ i._id);
    };

    $scope.$on('mapInitialized', function (event, map) {
      $scope.objMapa = map;
    });

    var activeInfoWindow = 0

    $scope.showInfowindow = function(event, p) {
      if (activeInfoWindow !== 0){
        activeInfoWindow.close();
      }
      // var lat = p.lat + (Math.random()/100);
      // var lng = parseFloat(p.long) + (Math.random()/100);
      var infoWindow = new google.maps.InfoWindow();
      var center = new google.maps.LatLng(p.lat,p.long);
      console.log(parseFloat(p.long));
      console.log(p);
      infoWindow.setContent('<h3>' + p.lat + '</h3>');

      infoWindow.setPosition(center);
      infoWindow.open($scope.objMapa);
      activeInfoWindow = infoWindow
    };

	}
]);
