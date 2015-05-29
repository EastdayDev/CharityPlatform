'use strict';

angular.module('epProjectModule').factory('epProject', ['epHttp', 'epUser', function (epHttp, epUser) {
    var service = {};

    var apiUrl = 'Project';

    service.GetList = function (page, size, filter, callback) {
        var param = { page: page, size: size, filter: filter, userId: epUser.userId };
        epHttp.ajaxGet(apiUrl, 'GetList', param, callback);
    }

    service.Remove = function (id, callback) {
        var param = { Id: id };
        epHttp.ajaxGet(apiUrl, 'Remove', param, callback);
    }

    service.GetDetail = function (id, callback) {
        var param = { Id: id };
        epHttp.ajaxGet(apiUrl, 'GetDetail', param, function (data) {
            if (callback) {
                if (data && data.length > 0) {
                    callback(data[0]);
                } else callback(data);
            }
        });
    }

    service.GetOthers = function (id, user, callback) {
        var param = { Id: id, User: user };
        epHttp.ajaxPost(apiUrl, 'GetOthers', param, callback);
    }

    service.GetVirtuals = function (page, size, filter, callback) {
        var param = { page: page, size: size, filter: filter, userId: epUser.userId }
        epHttp.ajaxGet(apiUrl, 'GetVirtuals', param, callback);
    }

    service.Edit = function (project, businesslist, callback) {
        var param = { project: project, businesslist: businesslist };
        epHttp.ajaxPost(apiUrl, 'Edit', param, callback);
    }

    service.GetBusinessByProjectId = function (projectid, callback) {
        var param = { ProjectId: projectid };
        epHttp.ajaxGet(apiUrl, 'GetBusinessByProjectId', param, callback);
    }

    service.GetBudgetMoney = function (id, state, callback) {
        var param = { Id: id, I_State: state };
        epHttp.ajaxGet(apiUrl, 'GetBudgetMoney', param, callback);
    }

    service.GetExpenseWorkMoney = function (id, callback) {
        var param = { Id: id };
        epHttp.ajaxGet(apiUrl, 'GetExpenseWorkMoney', param, callback);
    }

    service.GetAllFeedBack = function (id, callback) {
        var param = { id: id };
        epHttp.ajaxGet(apiUrl, 'GetAllFeedBack', param, callback);
    }

    service.GetProjectFiles = function (id, callback) {
        var param = { projectId: id };
        epHttp.ajaxPost(apiUrl, 'GetProjectFiles', param, callback);
    }

    service.FileDelete = function (id, callback) {
        var param = { id: id };
        epHttp.ajaxPost(apiUrl, 'FileDelete', param, callback);
    }

    service.GetUserDeptByFunc = function (id, user, callback) {
        var param = { func: id, User: user };
        epHttp.ajaxPost(apiUrl, 'GetUserDeptByFunc', param, callback);
    }



    service.GetDeptByUid = function (uid, callback) {
        var param = { Uid: uid };
        epHttp.ajaxGet(apiUrl, 'GetDeptByUid', param, callback);
    }

    service.GetBusinessByIds = function (ids, callback) {
        var param = { Ids: ids };
        epHttp.ajaxGet(apiUrl, 'GetBusinessByIds', param, callback);
    }

    service.GetProjectById = function (id, callback) {
        var param = { id: id };
        epHttp.ajaxGet(apiUrl, 'GetProjectById', param, callback);
    }
    service.GetBusinessKindParent = function (uid, callback) {
        var param = { uid: uid };
        epHttp.ajaxGet(apiUrl, 'GetBusinessKindParent', param, callback);
    }

    service.DeleteBaseDataById = function (id, callback) {
        epHttp.ajaxGet(apiUrl, 'DeleteBaseDataById', { id: id }, callback);
    }

    service.GetBaseDataId = function (callback) {
        epHttp.ajaxGet(apiUrl, 'GetBaseDataId', {}, callback);
    }

    service.GetVirtuals = function (page, size, filter, userId, callback) {
        var param = { page: page, size: size, filter: filter, userId: userId };
        epHttp.ajaxGet(apiUrl, 'GetVirtuals', param, callback);
    }

    

   

    return service;
}]);
