'use strict';

angular.module('epComponentModule').directive('epDeptPerson',
    ['$window', '$stateParams', 'epAuth', function ($window, $stateParams, epAuth) {
        var directive = {};

        directive.restrict = 'EA';

        directive.scope = {
            dept: '@',
            person: '@'
        }

        directive.templateUrl = '/Components/html/dept-person.html';

        return directive;
    }]);
