'use strict';

angular.module('epAuditModule').directive('epAuditDept', ['$rootScope', function ($rootScope) {
    var directive = {};

    directive.restrict = 'EA';

    directive.scope = {
        items: '='
    }

    directive.templateUrl = '/app/audit/directives/html/audit.dept.html';

    directive.controller = function ($scope, $element) {
        $scope.selectedItem = {};

        $scope.moveRight = function (treeItem) {
            $rootScope.$broadcast('onMoveRight', treeItem);
        }

        $scope.changeSelected = function (treeItem) {
            $scope.selectedItem = treeItem;
        }

        $scope.hasChildren = function (dept) {
            var length = $scope.items.length;
            for (var i = 0; i < length; i++) {
                if (dept.Id === $scope.items[i].I_Parent) return true;
            }
            return false;
        }
    }

    return directive;
}]);

angular.module('epAuditModule').directive('epAuditDeptPass', [function () {
    var directive = {};

    directive.restrict = 'EA';

    directive.scope = {
        depts: '=',
        title: '@'
    }

    directive.templateUrl = '/app/audit/directives/html/audit.dept.pass.html';

    directive.controller = function ($scope, $element) {

        $scope.selectedDept = {};

        var findIndex = function (dept) {
            var length = $scope.depts.length;
            for (var i = 0; i < length; i++) {
                if (dept.Id === $scope.depts[i].Id) return i;
            }
            return -1;
        }

        $scope.selected = function (dept) {
            $scope.selectedDept = dept;
        }

        //$scope.remove = function (index) {
        //    $scope.depts.splice(index, 1);
        //}

        $scope.up = function (dept) {
            var index = findIndex(dept);
            if (index === -1 || index === 0) return;
            var temp = angular.copy($scope.depts[index - 1]);
            $scope.depts[index - 1] = dept;
            $scope.depts[index] = temp;
        }

        $scope.down = function (dept) {
            var index = findIndex(dept);
            if (index === -1 || index === $scope.depts.length - 1) return;
            var temp = angular.copy($scope.depts[index + 1]);
            $scope.depts[index + 1] = dept;
            $scope.depts[index] = temp;
        } 
    }

    return directive;
}]);


