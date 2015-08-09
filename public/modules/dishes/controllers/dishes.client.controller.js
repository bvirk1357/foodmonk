'use strict';

angular.module('dishes').controller('DishesController', ['$scope', '$stateParams', '$location', 'Dishes',
	function($scope, $stateParams, $location, Dishes) {


    $scope.create = function(){
      console.log('\n\nuser.username: ' + user.username + '\n\n');
      console.log('Path hit');
      var dish = new Dishes({
        username: user.username,
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
	}
]);
