//= require jquery
//= require suggest.min
//= require angular
//= require angular-strap.min
//= require angular-resource
//= require ui-bootstrap-tpls-0.2.0
//= require services/sessionService
//= require services/foodsService
//= require services/itemsService
//= require controllers/app
//= require controllers/foods
//= require controllers/items
//= require controllers/users

angular.module('Restaurant', ['sessionService', 'foodsService','$strap.directives', 'ui.bootstrap', 'itemsService'])
    .config(['$httpProvider', function($httpProvider){
    $httpProvider.defaults.headers.common['X-CSRF-Token'] = $('meta[name=csrf-token]').attr('content');

    var interceptor = ['$location', '$rootScope', '$q', function($location, $rootScope, $q) {
        function success(response) {
            return response
        };

        function error(response) {
            if (response.status == 401) {
                $rootScope.$broadcast('event:unauthorized');
                $location.path('/users/login');
                return response;
            };
            return $q.reject(response);
        };

        return function(promise) {
            return promise.then(success, error);
        };

    }];
    $httpProvider.responseInterceptors.push(interceptor);
}])
    .config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/', {templateUrl:'/dashboard/index.html.erb'})
        .when('/users/login', {templateUrl:'/users/login.html', controller:UsersCtrl})
        .when('/users/register', {templateUrl:'/users/register.html', controller:UsersCtrl})
        .when('/foods', {templateUrl:'/foods/index.html', controller:FoodsCtrl})
        .when('/foods/new', {templateUrl:'/foods/new.html', controller: FoodNewCtrl})
        .when('/foods/:food_id', {templateUrl:'/foods/show.html', controller: FoodShowCtrl})
        .when('/foods/:food_id/edit', {templateUrl:'/foods/edit.html', controller: FoodEditCtrl})
        .when('/items', {templateUrl:'/items/index.html', controller:ItemsCtrl})
        .when('/items/new', {templateUrl:'/items/new.html', controller: ItemNewCtrl})
        .when('/items/:item_id', {templateUrl:'/items/show.html', controller: ItemShowCtrl})
        .when('/items/:item_id/edit', {templateUrl:'/items/edit.html', controller: ItemEditCtrl})
        .otherwise({redirectTo: '/'});;
}]);

