'use strict';

angular.module('epFileModule').factory('epFile', ['epHttp', 'epUser', '$http', '$window', 'epApiPrefix', function (epHttp, epUser, $http, $window, epApiPrefix) {
    var service = {};

    var apiUrl = 'File';

    service.GetBelong = function (projectId, callback) {
        var param = { projectId: projectId };
        epHttp.ajaxGet(apiUrl, 'GetBelong', param, callback);
    }
    service.FileDelete = function (id, callback) {
        var param = { id: id, user: epUser.user };
        epHttp.ajaxPost(apiUrl, 'FileDelete', param, callback);
    }
    service.GetFilesById = function (Id, callback) {
        epHttp.ajaxGet(apiUrl, 'GetFilesById', { Id: Id }, callback);
    }
    service.Download = function (category, fullName, originalName) {

        var token = epHttp.buildTokenNotBasic();
        var url = epApiPrefix + "/File/DownUpload?category=" + category + "&originalName=" + originalName + "&fullName=" + fullName + "&token=" + token;
        $window.location.href = url;
    }

    service.upload = function (files, ownerObject, callback) {
        var formData = new FormData();
        for (var i in files) {
            formData.append('file_' + i, files[i]);
        }
        formData.append('title', ownerObject.FileTitle);
        formData.append('category', ownerObject.Category);
        formData.append('owner', ownerObject.Owner);
        formData.append('remark', ownerObject.Remark);
        formData.append('userId', epUser.user.Id);

        $http({ method: 'POST', url: epApiPrefix + '/File/FileUpload', data: formData, headers: { 'Content-Type': undefined }, transformRequest: angular.identity })
        .success(function (data, status, headers, config) {
            if (callback) callback(data);
        })
        .error(function () {
            if (callback) callback('上传失败');
        });
    }

    return service;
}]);