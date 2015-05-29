'use strict';

angular.module('app').factory('epHelper', ['epHttp', 'epCookie', 'appKey',
    function (epHttp, epCookie, appKey) {
        var service = {};

        service.words = [];


        if (epCookie.get(appKey)) {
            epHttp.ajaxGet('Helper', 'GetWords', null, function (data) {
                service.words = data;
            });
        }

        //service.GetWords = function (callback) {
        //    epHttp.ajaxGet('Helper', 'GetWords', null, callback);
        //}

        service.GetWordsById = function (id, category) {
            var length = service.words.length;
            for (var i = 0; i < length; i++) {
                if (service.words[i].I_Category == category && service.words[i].C_Name == id) {
                    return parseInt(service.words[i].C_Value);
                }
            }
            return 0;
        }

        service.GetTaxIds = function (id, category) {
            var rs = [];
            var length = service.words.length;
            for (var i = 0; i < length; i++) {
                if (service.words[i].I_Category == category && service.words[i].C_Name == id) {
                    rs.push(parseInt(service.words[i].C_Value));
                }
            }
            return rs.length > 0 ? rs : [1, 2, 3];
        }

        service.GetBaseData = function (Id, callback) {
            if (isNaN(Id)) { return; }
            epHttp.ajaxGet('Helper', 'GetBaseData', { Id: Id }, callback);
        }

        service.IsLeader = function (uid) {
            var length = service.words.length;
            for (var i = 0; i < length; i++) {
                if (service.words[i].I_Category === 20 && service.words[i].C_Value == uid) {
                    return true;
                }
            }
            return false;
        }
        ///1 当前用户审核，跳转到审核页面 0 是当前用户审核，跳转到详情页面
        service.AnalyzeBarCode = function (barCode, userId, callback) {
            var param = { barCode: barCode, userId: userId };
            epHttp.ajaxGet('Helper', 'AnalyzeBarCode', param, callback);
        }

        service.GlobalFind = function (userId, category, filterValue, sortField, pageIndex, pageSize, callback) {
            var param = {
                userId: userId,
                category: category,
                filterValue: filterValue,
                sortField: sortField,
                pageIndex: pageIndex,
                pageSize: pageSize
            };
            epHttp.ajaxGet('Helper', 'GlobalFind', param, callback);
        }
        return service;
    }]);