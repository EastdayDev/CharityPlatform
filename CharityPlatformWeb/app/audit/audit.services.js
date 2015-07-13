
'use strict';

angular.module('auditModule').factory('_audit', ['_http',
  function(_http) {
    var service = {};

    var apiController = 'Audit';

    service.submit = function(project, callback) {
      _http.ajaxPost(apiController, 'Submit', project, callback);
    }
    return service;
  }
]);
