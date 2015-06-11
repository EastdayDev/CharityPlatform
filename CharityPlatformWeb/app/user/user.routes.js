'use strict';

angular.module('epUserModule').config(['$stateProvider', function ($stateProvider) {

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: '/app/user/views/user.login.html',
            controller: 'UserLoginController'
        })
        .state('list.passwd', {
            url: '/passwd',
            templateUrl: '/app/user/views/user.passwd.html',
            controller: 'UserPasswdController'
        })
		.state('list', {
		    url: '/list',
		    templateUrl: '/app/user/views/user.list.html',
		    controller: 'UserListController'
		})
        .state('list.userEdit', {
            url: '/edit',
            templateUrl: '/app/user/views/user.edit.html',
            controller: 'UserEditController'
        })
        .state('userRegister', {
            url: '/edit',
            templateUrl: '/app/user/views/user.register.html',
            controller: 'UserRegisterController'
        })
}]);