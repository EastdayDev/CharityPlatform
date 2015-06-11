'use strict'

angular.module('epProjectModule').filter('ProjectType', [function () {
    return function (value) {
        switch (value) {
            case 0: return "创收项目";
            case 1: return "成本项目";
            case 2: return "合作项目";
            default: return "未知";
        }
    }
}]);

angular.module('epProjectModule').filter('I_SupportString', [function () {
    return function (value) {
        switch (value) {
            case 1: return "内部支持";
            default: return "";
        }
    }
}]);

angular.module('epProjectModule').filter('I_OutSourcingString', [function () {
    return function (value) {
        switch (value) {
            case 1: return "外包";
            default: return "";
        }
    }
}]);

angular.module('epProjectModule').filter('I_IntroductionString', [function () {
    return function (value) {
        switch (value) {
            case 1: return "领导介绍";
            default: return "";
        }
    }
}]);

angular.module('epProjectModule').filter('I_EffectString', [function () {
    return function (value) {
        switch (value) {
            case 1: return "基于影响力而开展活动的创收";
            default: return "";
        }
    }
}]);

angular.module('epProjectModule').filter('I_SalesString', [function () {
    return function (value) {
        switch (value) {
            case 1: return "特价销售";
            default: return "";
        }
    }
}]);

angular.module('epProjectModule').filter('Category', [function () {
    return function (value) {
        switch (value) {
            case 1: return "项目";
            case 2: return "预算";
            case 3: return "合同";
            case 4: return "报销";
            case 5: return "发票";
            case 6: return "工单";
            default: return "未知";
        }
    }
}]);

angular.module('epProjectModule').filter('FlowNumber', [function () {
    return function (value) {
        return value == null ? value : "A" + value;
    }
}]);

angular.module('epProjectModule').filter('FilterParentId', function () {
    return function (inputArray, v) {
        var array = [];
        if (inputArray != undefined) {
            for (var i = 0; i < inputArray.length; i++) {
                if (inputArray[i].I_Parent > v) {
                    array.push(inputArray[i]);
                }
            }
        }
        return array;
    }
});
