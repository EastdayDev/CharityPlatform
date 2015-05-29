'use strict';

angular.module('epComponentModule').directive('epPager', [function () {
    var directive = {};

    directive.restrict = 'EA';

    directive.scope = {
        index: '=',
        total: '='
    }

    directive.templateUrl = '/Components/html/pager.html';

    directive.controller = function ($scope, $element) {

        $scope.next = function () {
            if ($scope.index < $scope.total){
                $scope.$emit('onPageChanged', $scope.index + 1);
            }
        }

        $scope.previous = function () {
            if ($scope.index > 1){
                $scope.$emit('onPageChanged', $scope.index - 1);
            }
        }
    }
    return directive;
}]);