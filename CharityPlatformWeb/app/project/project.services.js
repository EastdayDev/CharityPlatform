'use strict';

angular.module('projectModule').factory('_project', ['_http', '_cookie',
  'appKey',
  function(_http, _cookie, appKey) {
    var service = {};

    var apiController = 'Project';

    service.editProjectItem = {
      Fields: []
    };

    /// 新增时保存图片 临时使用
    service.randomId = 999;

    service.Usp_Project_Insert = function(project, callback) {
      _http.ajaxPost(apiController, 'Usp_Project_Insert', project,
        callback);
    }

    service.Usp_Project_Get = function(id, callback) {
      _http.ajaxGet(apiController, 'Usp_Project_Get', {
        id: id
      }, callback);
    }

    service.USP_Project_List = function(userId, callback) {
      _http.ajaxGet(apiController, 'USP_Project_List', {
        userId: userId
      }, callback);
    }

    return service;
  }
]);
