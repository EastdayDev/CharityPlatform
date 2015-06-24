'use strict';

angular.module('userModule').factory('_user', ['_http', '_cookie', 'appKey',
    function (_http, _cookie, appKey) {
        var service = {};

        service.userDepts = [];

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
            var method = user.isOrganization === 0 ? 'Usp_User_Register' : 'Usp_Org_Register'
            user.I_Category = user.isOrganization === 0 ? 3 : 2;
        	_http.ajaxPost(apiController, method, user, callback);
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

        service.ChangePwd = function (user, callback) {
            _http.ajaxPost(apiController, 'ChangePwd', user, callback);
        }
       
        return service;
    }]);
