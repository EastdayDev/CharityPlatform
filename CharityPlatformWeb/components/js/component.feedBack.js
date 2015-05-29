'use strict';

angular.module('epComponentModule').directive('epFeedBack', ['epFeedBackService', 'epFeedBackHold', '$modal', function (epFeedBackService, epFeedBackHold, $modal) {
    var directive = {};

    directive.restrict = 'EA';
    
    directive.templateUrl = '/Components/html/feedBack.html';

    directive.link = function (scope, elem, iAttrs) {
    }
    directive.controller = function ($scope) {
        var load = function () {
            epFeedBackService.GetFeedbackList(epFeedBackHold.page.index, epFeedBackHold.size, $scope.id, function (data) {
                if (data && data.length > 0) {
                    $scope.fbItems = data;
                    epFeedBackHold.page.total = Math.ceil($scope.fbItems[0].Total / epFeedBackHold.size)
                } else {
                    $scope.fbItems.length = 0;
                }
            });
        }

        $scope.$on('onPageChanged', function (event, index) {
            epFeedBackHold.page.index = index;
            load();
        })

        $scope.$on('onFeedBackLoad', function (event, entity) {
            $scope.id = entity.id;
            $scope.category = entity.category
            if ($scope.id > 0) { 
                var modalInstance = $modal.open({
                    animation: true,
                    backdrop: false,
                    templateUrl: '/components/html/feedBack.html',
                    controller: directive.controller,
                    size: ''
                });
                if ($("#layoutFeedback").length > 0) {
                    $("#layoutFeedback")[0].style.height = "32px";
                }
                $scope.fbItems = [];
                $scope.hold = epFeedBackHold;
                $scope.AddFeedBack = function (item) {
                    epFeedBackService.InsertFeedBack(item, $scope.id, $scope.category, function (data) {
                        if (data > 0) {
                            load();
                            $scope.data.T_Content = '';
                        }
                    });
                }
                load();
            }
        });
    }    

    return directive;
}]);