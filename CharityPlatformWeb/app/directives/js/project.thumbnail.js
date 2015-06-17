'use strict';

angular.module('directiveModule').directive('projectThumbnail', ['$rootScope', function ($rootScope) {
    var directive = {};

    directive.restrict = 'EA';

    directive.scope = {
        items: '='
    }

    directive.templateUrl = '/app/directives/template/project.thumbnail.html';

    directive.controller = function ($scope, $element) {
         
    }

    return directive;
}]);