'use strict'

angular.module('epFlowModule').filter('FlowState', [function () {
    return function (v) {
        switch (v) {
            case 0: return "未提交";
            case 1: return "审核中";
            case 2: return "已退回";
            case 3: return "审核完毕";
            case 4: return "未出部门";
            case 5: return "未提交";
            default: return "未提交";
        }
    }
}]);


angular.module('epFlowModule').filter('FlowStyle', [function () {
    return function (v) {
        switch (v) {
            case 0: return "stateInHand";
            case 1: return "stateProcessing";
            case 2: return "stateReturned";
            case 3: return "stateOver";
            default: return "stateDept";
        }
    }
}]);
