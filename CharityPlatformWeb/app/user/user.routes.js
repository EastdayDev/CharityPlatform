'use strict';

angular.module('userModule').config(['$stateProvider', function ($stateProvider) {

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: '/app/user/views/user.login.html',
            controller: 'UserLoginController'
        }) 
        .state('register', {
            url: '/edit',
            templateUrl: '/app/user/views/user.register.html',
            controller: 'UserRegisterController'
        })
}]);