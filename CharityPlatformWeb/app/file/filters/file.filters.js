'use strict'

angular.module('epFileModule').filter('FileFilter', [function () {
    return function (inputArray, v) {
        var array = [];
        if (inputArray != undefined) {
            for (var i = 0; i < inputArray.length; i++) {
                if (inputArray[i].I_Flag == v) {
                    array.push(inputArray[i]);
                }
            }
        }
        return array;
    }
}]);

