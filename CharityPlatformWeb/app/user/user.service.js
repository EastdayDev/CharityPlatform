'use strict';

angular.module('UserModule').factory('cmUser', ['cmHttp', 'cmCookie', 'appKey',
    function (cmHttp, cmCookie, appKey) {
        var service = {};

        service.userDepts = [];

        var apiController = 'User';

        service.user = {};
        service.userId = '-1';

        if (cmCookie.get(appKey)) {
            service.user = cmCookie.get(appKey);
            service.userId = service.user.Id;
            service.GetUserDepts();
        }
        
        service.register = function(user, callback){
        	var postParameter = {proc: 'Usp_User_Insert', entity: user};
        	cmHttp.ajaxPost(postParameter, callback);
        }

        service.login = function (user, callback) {        	
            var postParameter = {proc: 'Usp_User_Login', entity: user};
        	cmHttp.ajaxPost(postParameter, callback);
        }

        service.ChangePwd = function (user, callback) {
            cmHttp.ajaxPost(apiController, 'ChangePwd', user, callback);
        }
       
        return service;
    }]);
