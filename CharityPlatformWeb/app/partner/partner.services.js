
'use strict';


angular.module('partnerModule').factory('_partner', ['_http', '_user',
  '_cookie', 'appKey',
  function(_http, _user, _cookie, appKey) {
    var service = {};

    var apiController = 'Partner';

    service.Usp_Org_List = function(filterValue, pageIndex, pageSize,
      callback) {
      var param = {
        userId: _user.userId,
        filterValue: filterValue,
        pageIndex: pageIndex,
        pageSize: pageSize
      };
      _http.ajaxGet(apiController, 'Usp_Org_List', param, callback);
    }

    service.Usp_Org_Insert = function(org, callback) {
      _http.ajaxPost(apiController, 'Usp_Org_Insert', org, callback);
    }

    service.Usp_UserOrg_Insert = function(user, org, callback) {
      var param = {
        User: user,
        Org: org
      }
      _http.ajaxPost(apiController, 'Usp_UserOrg_Insert', param, callback);
    }

    service.OrgSubmitAudit = function(id, callback) {
      _http.ajaxGet(apiController, 'OrgSubmitAudit', {
        Id: id
      }, callback);
    }

    service.Usp_Org_ById = function(id, callback) {
      _http.ajaxGet(apiController, 'Usp_Org_ById', {
        id: id
      }, callback);
    }

    service.Usp_Partner_List = function(userId, callback) {
      _http.ajaxGet(apiController, 'Usp_Partner_List', {
        userId: userId
      }, callback);
    }

    service.USP_Partner_Projects = function(userId, callback) {
      _http.ajaxGet(apiController, 'USP_Partner_Projects', {
        userId: userId
      }, callback);
    }
    return service;
  }
]);
