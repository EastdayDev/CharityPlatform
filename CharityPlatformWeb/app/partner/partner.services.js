'use strict';

angular.module('partnerModule').factory('_partner', ['_http', '_cookie', 'appKey',
    function (_http, _cookie, appKey) {
        var service = {};

        service.userDepts = [];

        var apiController = 'User';

        service.user = {};
        service.userId = '-1';

        if (_cookie.get(appKey)) {
            service.user = _cookie.get(appKey);
            service.userId = service.user.Id;
            service.GetUserDepts();
        }
        
        service.register = function(user, callback){
        	var postParameter = {proc: 'Usp_User_Insert', entity: user};
        	_http.ajaxPost(postParameter, callback);
        }

        service.login = function (user, callback) {        	
            var postParameter = {proc: 'Usp_User_Login', entity: user};
        	_http.ajaxPost(postParameter, callback);
        }

        service.ChangePwd = function (user, callback) {
            _http.ajaxPost(apiController, 'ChangePwd', user, callback);
        }
       
        return service;
    }]);
