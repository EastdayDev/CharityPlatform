'use strict';

angular.module('app').config(['$stateProvider', '$locationProvider', '$urlRouterProvider',
    function ($stateProvider, $locationProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/#');
        $locationProvider.html5Mode(false).hashPrefix('!');
    }]);

angular.module('app').run(['$templateCache', '$rootScope', '$state', '$stateParams',
    '$location', '_cookie', 'appKey','appname',
    function ($templateCache, $rootScope, $state, $stateParams, $location, _cookie, appKey, appname) {

        var view = angular.element('#ui-view');

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $rootScope.appname = appname;        

        $rootScope.$on('onError', function (event, status, message, url) {
            switch (status) {
                case 0: //ajax 未初始化 服务器无响应
                    $location.path('/login');
                    break;
                case 401: /// 访问限制 应转至提示页面                    
                    break;
                default:
                    break;
            }
        });

        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            $rootScope.fromState = fromState;
            $rootScope.fromParams = fromParams;
            $rootScope.toState = toState;
            $rootScope.toParams = toParams; 
        });        
        
    }]);
