'use strict';


angular.module('authModule').factory('_auth', ['_http', '_cookie', '_user', 'appKey',
    function (_http, _cookie, _user, appKey) {
        var service = {};

        var apiController = 'Auth';

        service.allAuths = [];
        service.allRoles = [];

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

        service.Usp_RoleFunc_Insert = function(roleFuncs, callback){
            _http.ajaxPost(apiController, 'Usp_RoleFunc_Insert', roleFuncs, callback);
        }

        service.Usp_UserRole_Insert = function(userRoles, callback){
            _http.ajaxPost(apiController, 'Usp_UserRole_Insert', userRoles, callback);
        }

        service.Usp_Funcs_ByRole = function(roleId, callback){
            var param = {roleId: roleId };
            _http.ajaxGet(apiController, 'Usp_Funcs_ByRole', param, callback);            
        }  

        service.Usp_Roles_ByUser = function(userId, callback){
            var param = {userId: userId};
            _http.ajaxGet(apiController, 'Usp_Roles_ByUser', param, callback);
        }

        
        _http.ajaxGet(apiController, 'Usp_Func_List', null, function(data){
            service.allAuths = data;
        });        

        service.Usp_Role_List('', 1, 100000, function(data){
            service.allRoles = data;
        });  

        return service;
    }]);