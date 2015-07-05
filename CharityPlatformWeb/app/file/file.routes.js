'use strict';

angular.module('fileModule').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

      // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
      $urlRouterProvider 
        .when('/', '/contacts/:id') 
        .otherwise('/');
		// $stateProvider
		//     .state({
		//         name: 'upload',
		//         url: '/file/upload/:ownerId/:id/:Category',
		//         templateUrl: '/app/file/views/file.upload.html',
		//         controller: 'epFileUploadController'
		//     })        
	}
]);