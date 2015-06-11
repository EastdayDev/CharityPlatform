'use strict';

angular.module('app').config(['$stateProvider', '$locationProvider', '$urlRouterProvider',
    function ($stateProvider, $locationProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/#');
        //$stateProvider
        //     .state('Home', {
        //         url: '/',
        //         templateUrl: '/index.html'
        //     })
        $locationProvider.html5Mode(false).hashPrefix('!');
    }]);

angular.module('app').run(['$templateCache', '$rootScope', '$state', '$stateParams',
    '$location', 'epCookie', 'appKey','appname',
    function ($templateCache, $rootScope, $state, $stateParams, $location, epCookie, appKey, appname) {

        var view = angular.element('#ui-view');

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $rootScope.appname = appname;

        $rootScope.hasLayout = true;
        $rootScope.$on('onHasLayout', function (event, hasLayout) {
            $rootScope.hasLayout = hasLayout;
        });

        $rootScope.$on('onChangeTitle', function (event, title) {
            $rootScope.title = title;
        });

        $rootScope.slides = [];

        $rootScope.addSlide = function () {
            $rootScope.slides.push({
                active: true,
                image: $rootScope.slides.length % 2 === 0 ? '/images/287.jpg' : '/images/287.jpg',
                text:'dddd' 
            });
        };
        for (var i = 0; i < 8; i++) {
            $rootScope.addSlide();
        }


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
