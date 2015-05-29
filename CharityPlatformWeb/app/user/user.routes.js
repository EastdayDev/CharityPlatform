'use strict';

angular.module('epUserModule').config(['$stateProvider', function ($stateProvider) {

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: '/app/user/views/user.login.html',
            controller: 'epUserLoginController'
        })
        .state('list.passwd', {
            url: '/passwd',
            templateUrl: '/app/user/views/user.passwd.html',
            controller: 'epUserPasswdController'
        })
		.state('list', {
		    url: '/list',
		    templateUrl: '/app/user/views/user.list.html',
		    controller: 'epUserListController'
		})

        .state('list.userEdit', {
            url: '/edit',
            templateUrl: '/app/user/views/user.edit.html',
            controller: 'epUserEditController'
        })
}]);