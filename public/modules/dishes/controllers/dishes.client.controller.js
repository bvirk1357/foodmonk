'use strict';

angular.module('dishes').controller('DishesController', ['$scope', '$stateParams', '$location', 'Dishes',
	function($scope, $stateParams, $location, Dishes) {


    $scope.create = function(){
      var location;
      var formData = {
        name: this.name,
        pic: this.pic,
        origin: this.origin,
        description: this.description,
        user_story: this.user_story,
        cost: this.cost,
        ingredients: this.ingredients,
        prep_time: this.prep_time,
        availability: this.availability
      };
      $scope.getCoordinates( this.origin, formData, function(result, formData){

        var dish = new Dishes({
          username: '',
          name: formData.name,
          pic: formData.pic,
          lat: result.G,
          long: result.K,
          origin: formData.origin,
          description: formData.description,
          user_story: formData.user_story,
          cost: formData.cost,
          ingredients: formData.ingredients,
          prep_time: formData.prep_time,
          availability: formData.availability
        });

        dish.$save(function(response) {
          console.log("This is the dish id:" + dish._id)
          $location.path('/dishes/'+dish._id);
          //Placeholder for resetting form fields.
        }, function(errorResponse) {
          $scope.error = errorResponse.data.message;
        });
      });
      console.log('Got the location:' + location);

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

        // Set gravatar URL for the cook
        var email_hash = CryptoJS.MD5('bikram.virk@gmail.com'); //response.cook_email);
        $scope.gravatar_url = '//www.gravatar.com/avatar/' + email_hash + '.jpg';
        console.log('gravatar url: ' + $scope.gravatar_url + '.\n');

      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });

      console.log('$scope.dish: ' + $scope.dish + '.\n\n');

    };

    $scope.getCoordinates = function(address, formData, callback){
      console.log('This is the address:' + address);
      var geocoder = new google.maps.Geocoder();
      var coordinates;
      geocoder.geocode({address: address}, function (results, status){
        coordinates = results[0].geometry.location;
        callback(coordinates, formData);
      })
    }

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
