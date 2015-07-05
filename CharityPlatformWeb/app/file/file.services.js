'use strict';

angular.module('fileModule').factory('epFile', ['_http',
    function(_http) {
        var service = {};

        var apiController = 'File';

        service.Usp_File_List = function(owner, category, callback) {
            var param = {
                owner: owner,
                category: category
            };
            epHttp.ajaxGet(apiUrl, 'Usp_File_List', param, callback);
        }

        return service;
    }
]);