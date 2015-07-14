'use strict';

angular.module('auditModule').controller('AuditStartController', ['$scope',
  '$state', '$stateParams', '$window',
  '_sys', '_user', '_audit', 'epModal',
  function($scope, $state, $stateParams, $window, _sys, _user, _audit,
    epModal) {

    $scope.item = {
      auditType: 10,
      auditDesc: ''
    };
    $scope.audit = function(item) {
      if (item.auditType === 30 && !item.auditDesc) {
        epModal.info('退回流程必须说明退回原由!');
        return;
      }

      _audit.audit($stateParams.id, _user.userId, item.auditType, item.auditDesc,
        function(data) {
          if (data === '-1') {
            epModal.info('服务器操作发生异常, 请联系系统管理员!');
          } else {
            $window.history.back();
          }
        })
    }
  }
]);
