
'use strict';

angular.module('auditModule').factory('_audit', ['_http',
  function(_http) {
    var service = {};

    var apiController = 'Audit';

    service.submit = function(project, callback) {
      _http.ajaxPost(apiController, 'Submit', project, callback);
    }

    service.Usp_Check_List = function(userId, filterValue, pageIndex,
      pageSize, callback) {
      _http.ajaxGet(apiController, 'Usp_Check_List', {
        userId: userId,
        filterValue: filterValue,
        pageIndex: pageIndex,
        pageSize: pageSize
      }, callback);
    }

    service.audit = function(owner, userId, auditType, auditDesc, callback) {
      var checkObject = {
        Id: owner,
        UserId: userId,
        AuditType: auditType,
        AuditDesc: auditDesc
      };
      _http.ajaxPost(apiController, 'Audit', checkObject, callback);
    }

    return service;
  }
]);
