'use strict';

angular.module('epProjectModule').directive('epCategory', function () {
    var directive = {};

    directive.restrict = 'EA';

    directive.scope = {
        categoryId: '='
    }

    directive.templateUrl = '/app/project/directives/html/project.category.html';

    directive.controller = ['$scope', function ($scope) {

        $scope.GetCategoryColor = function (categoryId) {
            switch (categoryId) {
                case 1: return "project";
                case 2: return "budget";
                case 3: return "contract";
                case 4: return "expense";
                case 5: return "receipt";
                case 6: return "work";
                default: return "black";

            }
        }
    }];

    return directive;
});