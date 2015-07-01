'use strict';

angular.module('userModule').factory('_user', 
['_http', '_cookie', 'appKey',
function (_http, _cookie, appKey) {
    var service = {};

    var apiController = 'User';

    service.userPage = {index: 1, total: 0};
    service.orgPage = {index: 1, total: 0};

    service.user = {};
    service.userId = '-1';

    if (_cookie.get(appKey)) {
        service.user = _cookie.get(appKey);
        service.userId = service.user.Id;            
    }
    
    service.register = function(user, callback){                    	        
        user.I_Category = user.isOrganization === 0 ? 105 : 110;
    	_http.ajaxPost(apiController, 'Usp_User_Register', user, callback);
    }

    service.login = function (userName, password, callback) {        
        var user = {loginName: userName, password: password};            
    	_http.ajaxGet(apiController, 'Usp_User_Login', user, function(data){
            if (data && data.length > 0){
                service.user = data[0];
                service.userId = service.user.Id;
                _cookie.put(appKey, service.user, { expireMinutes: 180 });
                if (callback) callback(true);
            } else {
                if (callback) callback(false);
            }                                
        });
    }

    service.Usp_User_List = function(filterValue, pageIndex, pageSize, callback){
        var param = {
            userId: service.userId,
            filterValue: filterValue,
            pageIndex: pageIndex,
            pageSize: pageSize};
        _http.ajaxGet(apiController, 'Usp_User_List', param, callback);            
    }

    service.Usp_User_Insert = function(user, callback){
        _http.ajaxPost(apiController, 'Usp_User_Insert', user, callback);
    }

    service.Usp_Change_Pwd = function (user, callback) {
        _http.ajaxPost(apiController, 'Usp_Change_Pwd', user, callback);
    }

    service.Usp_UserInfo_ById = function(userId, callback){
        _http.ajaxGet(apiController, 'Usp_UserInfo_ById', {userId: userId}, callback);  
    }
   
    return service;
}]);
