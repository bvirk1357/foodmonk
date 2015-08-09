'use strict';

//Menu service used for managing  menus
angular.module('core').factory('HomeService', ['$resource',
  function($resource) {
    return $resource('/alldishes/:id', { id: '@_id'}, {
      'get':    {method:'GET'},
      'save':   {method:'POST'},
      'query':  {method:'GET', isArray:true},
      'remove': {method:'DELETE'},
      'delete': {method:'DELETE'}
    });
  }

]);
