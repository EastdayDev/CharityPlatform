'use strict';

angular.module('sysModule').factory('_sys', 
['_http', '_cookie', 'appKey', '_user',
function (_http, _cookie, appKey, _user) {
    var service = {}; 

    var apiController = 'Sys';

    service.hold = {tab: 0, pageIndex: 1, total: 0};

    service.words = [];

    if (_cookie.get(appKey)) {    
        ///获取词语列表
        _http.ajaxGet(apiController, 'Usp_Words_List', {flag: -1}, function(data){
            service.words = data;
        });
    }       

    service.resetHold = function(tab){
        service.hold.tab = tab;
        service.hold.pageIndex = 1;
        service.hold.total = 0;
    }

    service.Usp_Org_List = function(filterValue, pageIndex, pageSize, callback){
        var param = {
            userId: _user.userId,
            filterValue: filterValue,
            pageIndex: pageIndex,
            pageSize: pageSize};
        _http.ajaxGet('Partner', 'Usp_Org_List', param, callback);            
    }
   
    return service;
}]);
