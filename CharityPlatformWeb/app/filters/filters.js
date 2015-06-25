'use strict'
var filterApp = angular.module('filterModule');

filterApp.filter('userCategory', [function () {
    return function (value) {
        switch (value) {
            case 101: return "基金会";
            case 105: return "机构用户";
            case 110: return "普通用户";
            default: return "未知";
        }
    }
}]);

filterApp.filter('flag', [function () {
    return function (value) {
        switch (value) {
            case 0: return "无效";
            case 1: return "有效";            
            default: return "未知";
        }
    }
}]);

filterApp.filter('auditState', [function () {
    return function (value) {
        switch (value) {
            case 185: return "通过";
            case 190: return "未通过";            
            default: return "未知";
        }
    }
}]);