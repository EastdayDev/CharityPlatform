'use strict';

angular.module('epGlobalModule').factory('epGlobal', ['epHttp', 'epUser', 'epHelper', function (epHttp, epUser, epHelper) {
    var service = {};

    service.items = [];

    service.page = { index: 1, size: 10, total: 0 };

    service.globalFind = function (category, filterValue, index, size) {
        service.items.length = 0;
        epHelper.GlobalFind(epUser.user.Id, category, filterValue,
            'D_Create', index, size, function (data) {
                service.items = data;
                if (service.items && service.items.length > 0) {
                    service.page.total = Math.ceil(service.items[0].I_Total / service.page.size)
                } 
            });
    }

    return service;
}]);
