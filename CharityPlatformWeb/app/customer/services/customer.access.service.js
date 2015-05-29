'use strict';

angular.module('epCustomerModule').factory('epCustomer', ['epHttp', 'epUser', function (epHttp, epUser) {
    var service = {};

    var apiUrl = 'Customer';

    service.GetCustomers = function (uid, callback) {
        var param = { Uid: uid };
        epHttp.ajaxGet(apiUrl, 'GetCustomers', param, callback);
    }

    service.GetCustomByUid = function (uid, callback) {
        epHttp.ajaxGet(apiUrl, 'GetCustomByUid', { uid: uid }, callback);
    }

    return service;
}]);