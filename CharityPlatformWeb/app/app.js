'use strict';

angular.module('app').factory('epHeader', ['$state', 'epCookie', 'appKey', 'epAuditList', 'epUser', 'epHelper', 'epGlobal',
    function ($state, epCookie, appKey, epAuditList, epUser, epHelper, epGlobal) {
        var service = {};

        service.epUser = epUser;

        service.globalItems = [
            { Name: '全部', Value: 0 },
            { Name: '项目', Value: 1 },
            { Name: '预算', Value: 2 },
            { Name: '合同', Value: 3 },
            { Name: '报销', Value: 4 },
            { Name: '发票', Value: 5 },
            { Name: '工单', Value: 6 }
        ]

        service.globalPicker = service.globalItems[0];

        var query = function () {
            if (!service.filterValue) return;

            epHelper.AnalyzeBarCode(service.filterValue, epUser.user.Id, function (data) {
                if (!data) {
                    ///非条码
                    $state.go('globalList', { filterValue: service.filterValue, category: service.globalPicker.Value });
                    epGlobal.page.index = 1;
                    epGlobal.globalFind(service.globalPicker.Value, service.filterValue, epGlobal.page.index, epGlobal.page.size);
                } else {
                    ///条码
                    var item = data[0];
                    service.NavView(item); 
                }
            })
        }

        service.NavView = function (item) {
            switch (item.I_Category) {
                case 1:
                    $state.go('projectDetail', { id: item.Id });
                    break;
                case 2:
                    $state.go('budgetView', { id: item.Id });
                    break;
                case 3:
                    $state.go('contractView', { id: item.Id });
                    break;
                case 4:
                    $state.go('expenseView', { expenseId: item.Id });
                    break;
                case 5:
                    $state.go('receiptView', { receiptId: item.Id, id: item.I_Project });
                    break;
                case 6:
                    $state.go('workView', { id: item.I_Project, workId: item.Id });
                    break;
            }
        }

        

        service.globalFilter = function () {
            if (service.filterValue) {
                query();
            }
        }

        service.keydown = function ($event) {
            if (($event.keyCode || $event.which) == 13) {
                query();
            }
        }

        service.Nav = function (stateName) {
            $state.go(stateName);
        };

        service.auditCount = 0;

        service.stopPropagation = function ($event) {
            $event.stopPropagation();
        }

        ///检查待审核数
        service.checkAuditCount = function (event) {
            if (epUser.userId === '-1') {
                service.auditCount = 0;
                return;
            }
            epAuditList.GetUserAuditCount(epUser.userId, function (data) {
                service.auditCount = data;
            });
        }

        return service;
    }]);


angular.module('app').config(['$stateProvider', '$locationProvider', '$urlRouterProvider',
    function ($stateProvider, $locationProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/#');
        $stateProvider
             .state('Home', {
                 url: '/',
                 templateUrl: '/app/project/views/project.list.html'
             })
        $locationProvider.html5Mode(false).hashPrefix('!');
    }]);

angular.module('app').run(['$templateCache', '$rootScope', '$state', '$stateParams',
    '$location', 'epCookie', 'appKey', 'epHeader',
    function ($templateCache, $rootScope, $state, $stateParams, $location, epCookie, appKey, epHeader) {

        var view = angular.element('#ui-view');

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;

        $rootScope.epHeader = epHeader;

        $rootScope.hasLayout = true;
        $rootScope.$on('onHasLayout', function (event, hasLayout) {
            $rootScope.hasLayout = hasLayout;
        });

        $rootScope.$on('onChangeTitle', function (event, title) {
            $rootScope.title = title;
        });

        /// 不显示浮云菜单，Id=-1
        $rootScope.$on('onResetFloatMenu', function (envent, Id) {
            $rootScope.$broadcast('onFireFloatMenu', Id);
        });


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

            epHeader.checkAuditCount();
        });

        ///检查Cookie
        if (!epCookie.get(appKey)) {
            $location.path('/login');
        }
    }]);
