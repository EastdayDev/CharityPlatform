'use strict';

///项目列表数据持久化
angular.module('epProjectModule').factory('epProjectListHold', function () {
    var service = {};

    service.page = {
        index: 1,       //页码
        total: 0        //记录数
    };

    service.filterValue = ''; //模糊查询内容
    service.size = 10;

    return service;
});

angular.module('epProjectModule').factory('epProjectChildrenHold', function () {
    var service = {};

    service.page = {
        index: 1,       //页码
        total: 0        //记录数
    };

    return service;
})