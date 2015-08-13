'use strict';

//Confirmations service used to communicate Confirmations REST endpoints
angular.module('confirmations').factory('Confirmations', ['$resource',
      function($resource) {
      	return $resource('confirmations/:confirmationId', { confirmationId: '@_id', confirmation_dishname: '@dishname', confirmation_username: '@username'
      	}, {
                  'get':    {method:'GET'},
                  'save':   {method:'POST'},
                  'confirm': {method:'PUT', isArray: true},
                  'query':  {method:'GET', isArray:true},
                  'remove': {method:'DELETE'},
                  'delete': {method:'DELETE'}
      	});
      }
]);

angular.module('confirmations').run(function($rootScope) {
    /*
        Receive emitted message and broadcast it.
        Event names must be distinct or browser will blow up!
    */
    $rootScope.$on('handleEmit', function(event, args) {
      console.log('\n\nhandleEmit recieved in the Service.\n\n');
      $rootScope.$broadcast('handleBroadcast', args);
    });
});
