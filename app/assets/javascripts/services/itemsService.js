angular.module('itemsService', ['ngResource'])
    .factory('Items', function($resource) {
        return $resource('items.json', {}, {
            index: { method: 'GET', isArray: true},
            create: { method: 'POST' }
        });
    })
    .factory('Item', function($resource){
        return $resource('items/:item_id.json', {}, {
            show: { method: 'GET' },
            update: { method: 'PUT' },
            destroy: { method: 'DELETE' }
        });
    });