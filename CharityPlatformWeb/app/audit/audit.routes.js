
'use strict';

angular.module('auditModule').config(['$stateProvider', function(
  $stateProvider) {

  $stateProvider
    .state('audit', {
      url: '/audit/:id',
      templateUrl: '/app/audit/views/audit.start.html',
      controller: 'AuditStartController'
    })

}]);
