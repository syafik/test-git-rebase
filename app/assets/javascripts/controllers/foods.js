function FoodsCtrl($scope, Session, Foods) {
    "use strict";

    $scope.user = Session.requestCurrentUser();
    $scope.foods = Foods.index();

    $scope.logout = function() {
        Session.logout();
    };

}

function FoodNewCtrl($scope, $location, Foods, Food) {
    "use strict";
    $scope.food = {};
    console.log($scope.food)

    $scope.create = function(food) {
        var foodsService = new Foods(food);
        foodsService.$create(function(food) {
            $location.path('/foods/' + food.id);
        });
    }
}

function FoodShowCtrl($scope, $location, $routeParams, $dialog, Food) {
    "use strict";

    $scope.food = Food.show({
        food_id : $routeParams.food_id
    });

    $scope.remove = function(id) {
        var title = 'Delete Food?', msg = 'Are you sure you want to delete this food?', btns = [{
            result : 'cancel',
            label : 'Cancel'
        }, {
            result : 'ok',
            label : 'OK',
            cssClass : 'btn-primary'
        }];

        $dialog.messageBox(title, msg, btns).open().then(function(result) {
            if (result === 'ok') {
                Food.destroy({
                    food_id : id
                }, function() {
                    $location.path('/foods');
                });
            }
        });
    };

    $scope.convertBoolean = function(val) {
        return val ? 'Yes' : 'No';
    };

}

function FoodEditCtrl($scope, $routeParams, $location, Food) {
    "use strict";
    $scope.master = {};
    var food_id = $routeParams.food_id;
    $scope.food = Food.show({
        food_id : food_id
    }, function(resource) {
        $scope.master = angular.copy(resource);
    });

    $scope.update = function(food) {
        food.$update({
            food_id : food_id
        }, function(updatedFood) {
            $location.path('/foods/' + updatedFood.id);
        });
    }
}


