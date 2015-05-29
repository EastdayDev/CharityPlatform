'use strict';

angular.module('epComponentModule').directive('epFeedBackList', ['epFeedBackService', 'epFeedBackHold', function (epFeedBackService, epFeedBackHold) {
    var directive = {};

    directive.restrict = 'EA';

    directive.scope = {
        owner: '='
    }
    
    directive.templateUrl = '/Components/html/feedBackList.html';

    directive.link = function (scope, elem, iAttrs) {
    }
    directive.controller = function ($scope, epFeedBackService, epFeedBackHold) {
        $scope.Fbitems = [];
        epFeedBackService.GetAllFeedBack($scope.owner, function (data) {
            if (data && data.length > 0) {
                $scope.Fbitems = data;
            }
        });
        $scope.Img = function (value) {
            if ($("#" + value).is(":hidden")) {
                return "add.png";
            } else {
                return "8.jpg";
            }
        }
        $scope.detailSwitch = function (id) {
            $(id).toggle()
        }
    }

    return directive;
}]);