'use strict';

angular.module('fileModule').config(['$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
 
		$stateProvider
		    .state({
		        name: 'imageUpload',
		        url: '/file/imageUpload',
		        templateUrl: '/app/file/views/file.imageUpload.html',
		        controller: 'FileImageUploadController'
		    })        
	}
]);