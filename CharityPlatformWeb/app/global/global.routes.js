'use strict';

angular.module('epGlobalModule').config(['$stateProvider', function ($stateProvider) {   
    var list = {
        name: 'globalList',
        url: '/global/list/:filterValue/:category',
        templateUrl: '/app/global/views/global.list.html',
        controller: 'epGlobalListController'
    };

    $stateProvider
        .state(list);
}]);