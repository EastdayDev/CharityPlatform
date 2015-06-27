'use strict'
var filterApp = angular.module('filterModule');

filterApp.filter('dictFilter', ['_sys', function (_sys) {
    return function (value) {
        var length = _sys.words.length;
        for (var i = 0; i < length; i++) {
            if (_sys.words[i].Id === value) return _sys.words[i].C_Name;
        }
        return '未知';
    }
}]);