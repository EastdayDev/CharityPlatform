'use strict';

angular.module('epFileModule').config(['$stateProvider', function ($stateProvider) {

    $stateProvider
        .state({
            name: 'upload',
            url: '/file/upload/:ownerId/:id/:Category',
            templateUrl: '/app/file/views/file.upload.html',
            controller: 'epFileUploadController'
        })        
}]);