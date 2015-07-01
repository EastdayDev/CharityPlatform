'use strict';


angular.module('partnerModule').factory('_partner', 
['_http', '_cookie', 'appKey',
function (_http, _cookie, appKey) {
    var service = {};

    var apiController = 'Partner';   

    service.Usp_Org_List = function(filterValue, pageIndex, pageSize, callback){
        var param = {
            userId: _user.userId,
            filterValue: filterValue,
            pageIndex: pageIndex,
            pageSize: pageSize};
        _http.ajaxGet(apiController, 'Usp_Org_List', param, callback);            
    }

    service.Usp_Org_Insert = function(org, callback) {
        _http.ajaxPost(apiController, 'Usp_Org_Insert', org, callback);
    }

    service.Usp_Org_ById = function (id, callback) {
        _http.ajaxGet(apiController, 'Usp_Org_ById', {id: id}, callback);
    }

    return service;
}]);