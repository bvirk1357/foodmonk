'use strict';

// Schedules controller
angular.module('schedules').controller('SchedulesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Schedules',
	function($scope, $stateParams, $location, Authentication, Schedules) {
		$scope.authentication = Authentication;

    $scope.$on('handleBroadcast', function(event, args) {
    		console.log('\n\nhandleBroadcast recieved.\n\n');
        $scope.message = 'ONE: ' + args.message;
        $scope.find();
    });

		// Create new Schedule
		$scope.create = function() {
			// Create new Schedule object
			var schedule = new Schedules ({
				name: this.name
			});

			// Redirect after save
			schedule.$save(function(response) {
				$location.path('schedules/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Schedule
		$scope.remove = function(schedule) {
			if ( schedule ) {
				schedule.$remove();

				for (var i in $scope.schedules) {
					if ($scope.schedules [i] === schedule) {
						$scope.schedules.splice(i, 1);
					}
				}
			} else {
				$scope.schedule.$remove(function() {
					$location.path('schedules');
				});
			}
		};

		// Update existing Schedule
		$scope.update = function() {
			var schedule = $scope.schedule;

			schedule.$update(function() {
				$location.path('schedules/' + schedule._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Schedules
		$scope.find = function() {
			$scope.schedules = Schedules.query();
			console.log('hey schedule here' + $scope.schedules);
		};

		// Find existing Schedule
		$scope.findOne = function() {
			$scope.schedule = Schedules.get({
				scheduleId: $stateParams.scheduleId
			});
		};

		$scope.journey = function(){
      $scope.username = user.username;
      $scope.journeylatlng = Schedules.query();
    };

     var activeInfoWindow = 0
    $scope.showInfowindow = function(event, p) {
      // var image = 'http://png.clipart.me/graphics/thumbs/200/buddhist-monk-cartoon-illustration_200890463.jpg';
      if (activeInfoWindow !== 0){
        activeInfoWindow.close();
      }
      // var lat = p.lat + (Math.random()/100);
      // var lng = parseFloat(p.long) + (Math.random()/100);
      var infoWindow = new google.maps.InfoWindow();
      var center = new google.maps.LatLng(p.lat,p.long);
      console.log(parseFloat(p.long));
      console.log(p);
      // infoWindow.setTitle("Title");
      infoWindow.setContent(
        '<p><b>' + p.name + '</b></p>' +
        '<p><img src=' + p.pic + ' height="100" width="100"></p>' +
        '<p><a href=#!/dishes/' + p._id + '>See details</a><p>'
        );

      infoWindow.setPosition(center);
      infoWindow.open($scope.objMapa);
      activeInfoWindow = infoWindow
    };
	}
]);
