'use strict';

angular.module('sysModule').config(['$stateProvider', function($stateProvider) {

  $stateProvider
    .state('sys', {
      abstract: 'true',
      url: '/sys',
      templateUrl: '/app/sys/views/sys.main.html',
      controller: 'SysMainController'
    })
    .state('sys.user', {
      url: '/user',
      templateUrl: '/app/sys/views/sys.user.html',
      controller: 'SysUserController'
    })
    .state('sys.role', {
      url: '/role',
      templateUrl: '/app/sys/views/sys.role.html',
      controller: 'SysRoleController'
    })
    .state('sys.permission', {
      url: '/permission',
      templateUrl: '/app/sys/views/sys.permission.html',
      controller: 'SysPermissionController'
    })
    .state('sys.partner', {
      url: '/partner',
      templateUrl: '/app/sys/views/sys.partner.html',
      controller: 'SysPartnerController'
    })
    .state('sys.checklist', {
      url: '/checklist',
      templateUrl: '/app/sys/views/sys.checklist.html',
      controller: 'SysCheckListController'
    })
}]);
