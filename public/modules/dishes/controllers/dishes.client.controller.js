'use strict';

angular.module('dishes').controller('DishesController', ['$scope', '$stateParams', '$location', 'Dishes',
	function($scope, $stateParams, $location, Dishes) {


    $scope.create = function(){
      var dish = new Dishes({
        username: '',
        name: this.name,
        pic: this.pic,
        origin: this.origin,
        description: this.description,
        user_story: this.user_story,
        cost: this.cost,
        ingredients: this.ingredients,
        prep_time: this.prep_time,
        availability: this.availability
      });

      dish.$save(function(response) {
        $location.path('/dishes/{{user.username}}');
        //Placeholder for resetting form fields.
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    $scope.find = function() {
      console.log('test: ');
       $scope.dishes = Dishes.query();
    };


    $scope.read = function() {
      console.log('\n\nread: ');

      var dishSrv = new Dishes({
        _id: $stateParams.id
      });

      dishSrv.$get(function(response) {
        console.log('This is the read rbody: ' + response.body);
        $scope.dish = response.dish;
        $scope.reviews = response.reviews;
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });

      console.log('$scope.dish: ' + $scope.dish + '.\n\n');

    };
    //   $scope.getPin = function(address) {
    //     var geocoder = new google.maps.Geocoder();
    //     var image = 'http://png.clipart.me/graphics/thumbs/200/buddhist-monk-cartoon-illustration_200890463.jpg';
    //     if (activeInfoWindow !== 0){
    //       activeInfoWindow.close();
    //     }
    //     // var lat = p.lat + (Math.random()/100);
    //     // var lng = parseFloat(p.long) + (Math.random()/100);
    //     var infoWindow = new google.maps.InfoWindow();
    //     var center = new google.maps.LatLng(p.lat + 10,p.long);
    //     console.log(parseFloat(p.long));
    //     console.log(p);
    //     // infoWindow.setTitle("Title");
    //     infoWindow.setContent(
    //       '<a href=#!/dishes/' + p._id + '>See Page</a>');

    //     infoWindow.setPosition(center);
    //     infoWindow.open($scope.objMapa);
    //     activeInfoWindow = infoWindow
    // };

	}
]);
