'use strict';

angular.module('sysModule').config(['$stateProvider', function ($stateProvider) {

    $stateProvider
        .state('sys', {
            abstract: 'true',
            url: '/sys',
            templateUrl: '/app/user/views/sys.main.html'            
        }) 
        .state('sys.permission', {
            url: '/permission',
            templateUrl: '/app/sys/views/sys.permission.html',
            controller: 'SysPermissionController'
        })
}]);