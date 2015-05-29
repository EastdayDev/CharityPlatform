'use strict'

angular.module('epAuditModule').filter('AuditType', function () {
    return function (value) {
        switch (value) {
            case 0: return "付款合同";
            case 1: return "收款合同";
            case 2: return "合作合同";
            default: return "";
        }
    }
});

angular.module('epAuditModule').filter('FilterParent', function () {
    return function (inputArray, v) {
        var array = [];
        if (inputArray != undefined) {
            for (var i = 0; i < inputArray.length; i++) {
                if (inputArray[i].I_Parent == v) {
                    array.push(inputArray[i]);
                }
            }
        }
        return array;
    }
});

angular.module('epAuditModule').filter('visbaleFilter', function () {
    return function (inputArray, v) {
        var array = [];
        if (inputArray != undefined) {
            for (var i = 0; i < inputArray.length; i++) {
                if (inputArray[i].disabled === v) {
                    array.push(inputArray[i]);
                }
            }
        }
        return array;
    }
});
