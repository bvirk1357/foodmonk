'use strict';

angular.module('dishes').controller('DishesController', ['$scope', '$stateParams', '$location', 'Dishes',
	function($scope, $stateParams, $location, Dishes) {


    $scope.create = function(){
      var dish = new Dishes({
        username: '',
        name: this.name,
        pic: this.pic,
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
        $scope.dish = response;
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });

      console.log('$scope.dish: ' + $scope.dish + '.\n\n');

    };
	}
]);
