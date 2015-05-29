'use strict';

angular.module('epFlowModule').factory('epFlow', ['epHttp', function (epHttp) {
    var service = {};

    var apiUrl = 'Flow';

    service.GetFlowImageData = function (id, category, isSubmit, callback) {
        epHttp.ajaxGet(apiUrl, 'GetFlowImageData', { id: id, category: category, isSubmit: isSubmit }, callback);
    }

    service.GetWorkAuditer = function (owner, callback) {
        epHttp.ajaxGet(apiUrl, 'GetWorkAuditer', { owner: owner }, callback)
    }

    service.GetFlowEngine = function (id, category, callback) {
        epHttp.ajaxGet(apiUrl, 'GetFlowEngine', { id: id, category: category }, callback)
    }

    service.GetFlowEngineByCategory = function (id, category, callback) {
        epHttp.ajaxGet(apiUrl, 'GetFlowEngineByCategory', { id: id, category: category }, callback)
    }

    service.GetFlowState = function (id, type, callback) {
        epHttp.ajaxGet(apiUrl, 'GetFlowState', { id: id, type: type }, callback);
    }

    service.GetBusinessByUid = function (uid, callback) {
        epHttp.ajaxGet(apiUrl, 'GetBusinessByUid', { uid: uid }, callback);
    }

    return service;
}]);