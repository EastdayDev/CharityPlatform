﻿'use strict';

angular.module('fileModule').factory('_fileServer', ['apiPrefix', function(apiPrefix){
    var service = {};
    service.url = apiPrefix + '/file/UploadFiles';
    service.imageExts = 'gif,png,jpg,jpeg,bmp';
    service.uploadParameter = {I_Owner: -1};
    return service;
}]);

angular.module('fileModule').factory('_file', ['_http',
    function(_http) {
        var service = {};

        var apiController = 'File';

        service.Usp_File_List = function(owner, category, callback) {
            var param = {
                owner: owner,
                category: category
            };
            _http.ajaxGet(apiController, 'Usp_File_List', param, callback);
        }

        return service;
    }
]);