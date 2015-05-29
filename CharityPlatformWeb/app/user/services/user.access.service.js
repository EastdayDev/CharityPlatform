'use strict';

angular.module('epUserModule').factory('epUser', ['epHttp', 'epCookie', 'appKey',
    function (epHttp, epCookie, appKey) {
        var service = {};

        service.userDepts = [];

        var apiController = 'User';

        service.GetUserDepts = function(){
            var param = {userId: service.userId};
            epHttp.ajaxGet('Dept', 'GetUserDepts', param, function(data){
                service.userDepts = data;
            });
        }

        service.GetDepartmentByUid = function (uid,callback) {
            var param = { Uid: uid };
            epHttp.ajaxGet('Dept', 'GetDepartmentByUid', param, callback);
        }

        service.GetCompanyName = function (id, callback) {
            var param = { id: id };
            epHttp.ajaxGet('Dept', 'GetCompanyName', param, callback);
        }
        
        service.user = {};
        service.userId = '-1';

        if (epCookie.get(appKey)) {
            service.user = epCookie.get(appKey);
            service.userId = service.user.Id;
            service.GetUserDepts();
        }

        service.Verify = function (userName, pwd, callback) {
            var param = {C_Login: userName, C_Password: pwd};
            epHttp.ajaxPost(apiController, 'Verify', param, callback);
        }

        service.ChangePwd = function (user, callback) {
            epHttp.ajaxPost(apiController, 'ChangePwd', user, callback);
        }

        service.GetUserALL = function (callback) {            
            epHttp.ajaxGet(apiController, 'GetUserALL', null, callback);
        }

        service.GetUidByProjectIdAndUserId = function (projectId, callback) {
            var param = { projectId: projectId, userId: service.user.Id };
            epHttp.ajaxGet(apiController, 'GetUidByProjectIdAndUserId', param, callback);
        }

        service.EditUserInfo = function (user, callback) {
            epHttp.ajaxPost(apiController, 'EditUserInfo', user, callback);
        }

        service.IsLeader = function (userId, callback) {
            var param = { userId: userId };
            epHttp.ajaxGet(apiController, 'IsLeader', param, callback);
        }

        return service;
    }]);
