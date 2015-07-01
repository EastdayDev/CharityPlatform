'use strict';

angular.module('userModule').config(['$stateProvider', function ($stateProvider) {

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: '/app/user/views/user.login.html',
            controller: 'UserLoginController'
        }) 
        .state('register', {
            url: '/register',
            templateUrl: '/app/user/views/user.register.html',
            controller: 'UserRegisterController'
        })
        .state('user', {
            abstract: true,
            url: '/user',
            templateUrl: '/app/user/views/user.center.html',
            controller: 'UserCenterController'
        })
        .state('user.detail', {            
            url: '/detail',
            templateUrl: '/app/user/views/user.detail.html',
            controller: 'UserDetailController'
        })
        .state('user.project', {            
            url: '/project',
            templateUrl: '/app/user/views/user.project.html',
            controller: 'UserProjectController'
        })  
        .state('userEdit', {            
            url: '/user/edit',
            templateUrl: '/app/user/views/user.edit.html',
            controller: 'UserEditController'
        })  
        .state('changepwd', {            
            url: '/changepwd',
            templateUrl: '/app/user/views/user.passwd.html',
            controller: 'UserPwdController'
        })       
}]);