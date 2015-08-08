'use strict';

angular.module('dishes').controller('DishesController', ['$scope', '$location', 'Dishes',
	function($scope, $location, Dishes) {


    $scope.create = function(){

      var dish = new Dishes({
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
        $location.path('/dishes');
        //Placeholder for resetting form fields.
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
  };
      $scope.find = function() {
        $scope.dishes = Dishes.query();
      };
    }

	}
]);
