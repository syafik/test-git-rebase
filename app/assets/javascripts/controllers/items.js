function ItemsCtrl($scope, Session, Items) {
    "use strict";

    $scope.user = Session.requestCurrentUser();
    $scope.items = Items.index();

    $scope.logout = function() {
        Session.logout();
    };
}

function ItemNewCtrl($scope, $location, Items, Item) {
    "use strict";
    $scope.item = {};
    console.log($scope.item)

    $scope.create = function(item) {
        var itemsService = new Items(item);
        itemsService.$create(function(item) {
            $location.path('/items/' + item.id);
        });
    }
}

function ItemShowCtrl($scope, $location, $routeParams, $dialog, Item) {
    "use strict";

    $scope.item = Item.show({
        item_id : $routeParams.item_id
    });

    $scope.remove = function(id) {
        var title = 'Delete Item?', msg = 'Are you sure you want to delete this item?', btns = [{
            result : 'cancel',
            label : 'Cancel'
        }, {
            result : 'ok',
            label : 'OK',
            cssClass : 'btn-primary'
        }];

        $dialog.messageBox(title, msg, btns).open().then(function(result) {
            if (result === 'ok') {
                Item.destroy({
                    item_id : id
                }, function() {
                    $location.path('/items');
                });
            }
        });
    };

    $scope.convertBoolean = function(val) {
        return val ? 'Yes' : 'No';
    };

}

function ItemEditCtrl($scope, $routeParams, $location, Item) {
    "use strict";
    $scope.master = {};
    var item_id = $routeParams.item_id;
    $scope.item = Item.show({
        item_id : item_id
    }, function(resource) {
        $scope.master = angular.copy(resource);
    });

    $scope.update = function(item) {
        item.$update({
            item_id : item_id
        }, function(updatedItem) {
            $location.path('/items/' + updatedItem.id);
        });
    }
}


