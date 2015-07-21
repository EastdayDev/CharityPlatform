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
    .state('sys.userEdit', {
      url: '/userEdit/id',
      templateUrl: '/app/sys/views/user.edit.html',
      controller: 'SysUserEditController'
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
    .state('partnerEdit', {
      url: '/partner/edit/:id',
      templateUrl: '/app/sys/views/partner.edit.html',
      controller: 'PartnerEditController'
    })
    .state('sys.checklist', {
      url: '/checklist',
      templateUrl: '/app/sys/views/sys.checklist.html',
      controller: 'SysCheckListController'
    })
    .state('sys.password', {
      url: '/pwd',
      templateUrl: '/app/user/views/user.passwd.html',
      controller: 'UserPwdController'
    })
}]);
