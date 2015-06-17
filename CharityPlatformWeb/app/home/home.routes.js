'use strict';

angular.module('homeModule').config(['$stateProvider', function ($stateProvider) {

    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: '/app/home/views/home.index.html',
            controller: 'HomeController'
        })
        .state('about', {
            url: '/about',
            templateUrl: '/app/home/views/home.about.html'            
        })
}]);