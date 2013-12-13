angular.module('foodsService', ['ngResource'])
    .factory('Foods', function($resource) {
        return $resource('foods.json', {}, {
            index: { method: 'GET', isArray: true},
            create: { method: 'POST' }
        });
    })
    .factory('Food', function($resource){
        return $resource('foods/:food_id.json', {}, {
            show: { method: 'GET' },
            update: { method: 'PUT' },
            destroy: { method: 'DELETE' }
        });
    });