'use strict';


angular.module('authModule').factory('_auth', ['_http', '_cookie', '_user', 'appKey',
    function (_http, _cookie, _user, appKey) {
        var service = {};

        var apiController = 'Auth';

        var auths = [];

        service.GetAuthes = function (userId) {
            var param = { userId: userId };
            _http.ajaxGet(apiController, 'FindAuthes', param, function (data) {
                auths = data;
            });
        }

        service.Usp_Role_List = function(filterValue, pageIndex, pageSize, callback){
            var param = {
                userId: _user.userId,
                filterValue: filterValue,
                pageIndex: pageIndex,
                pageSize: pageSize};
            _http.ajaxGet(apiController, 'Usp_Role_List', param, callback);            
        }

        service.Usp_Role_Insert = function(role, callback) {
            _http.ajaxPost(apiController, 'Usp_Role_Insert', role, callback);
        }

        service.Usp_Funcs_ByRole = function(roleId, callback){
            var param = {roleId: roleId };
            _http.ajaxGet(apiController, 'Usp_Funcs_ByRole', param, callback);            
        }
    
        service.Usp_Func_List = function(callback){
            _http.ajaxGet(apiController, 'Usp_Func_List', null, callback);            
        }
 
        return service;
    }]);