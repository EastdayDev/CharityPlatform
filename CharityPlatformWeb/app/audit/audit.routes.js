'use strict';

angular.module('epAuditModule').config(['$stateProvider', function ($stateProvider) {

    $stateProvider
        .state('audit', {
            url: '/audit',
            templateUrl: '/app/audit/views/audit.start.html',
            controller: 'epAuditController'
        })
        .state('auditlist', {
            url: '/audit/list',
            templateUrl: '/app/audit/views/audit.list.html',
            controller: 'epAuditListController'
        })
        .state('auditover', {
            url: '/audit/over',
            templateUrl: '/app/audit/views/audit.over.html',
            controller: 'epAuditOverController'
        })
        .state('auditsubmit', {
            url: '/audit/submit/:category/:id',
            templateUrl: '/app/audit/views/audit.submit.html',
            controller: 'epAuditSubmitController'
        })
}]);