'use strict';

angular.module('projectModule').factory('_project', 
['_http', '_cookie', 'appKey',
function (_http, _cookie, appKey) {
    var service = {}; 

    var apiController = 'Project';      
    
    service.Usp_Project_Insert = function(project, callback){
        _http.ajaxPost(apiController, 'Usp_Project_Insert', project, callback);
    }
    
   
    return service;
}]);
