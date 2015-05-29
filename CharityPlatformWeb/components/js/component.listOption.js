/**
 * Created by dev-01 on 2015/4/7.
 */
'use strict';

angular.module('epComponentModule').directive('epListOption', ['$state', 'epUser', 'epAuth', '$rootScope', 'epFeedBackHold', 'epModal',
    function ($state, epUser, epAuth, $rootScope, epFeedBackHold, epModal) {
    var directive = {};

    directive.restrict = 'EA';

    directive.scope = {
        item: '=',
        disableEdit: '=',
        disableAudit: '=',
        disableRemove: '=',
        disableSubmit: '=',
        disableView: '=',
        disableUpload: '=',
        disableFeedBack: '=',
        disablePrint: '=',
    }

    directive.templateUrl = '/Components/html/list.option.html';

    directive.controller = function ($scope) {
        $scope.epAuth = epAuth;

        $scope.onFire = function (eventName, item) {
            $rootScope.$broadcast(eventName, item);
        } 

        $scope.navEdit = function (item) {
            switch (item.I_Category) {
                case 1:
                    $state.go('projectEdit', { id: item.Id });
                    break;
                case 2:
                    $state.go('projectChildren.budgetEdit', { id: item.I_Project, budgetid: item.Id });
                    break;
                case 3:
                    $state.go('projectChildren.contractEdit', { id: item.I_Project, contractid: item.Id });
                    break;
                case 4:
                    $state.go('projectChildren.expenseEdit', { expenseId: item.Id });
                    break;
                case 5:
                    $state.go('projectChildren.receiptEdit', { receiptId: item.Id });
                    break;
                case 6:
                    $state.go('projectChildren.workEdit', { id: item.I_Project, workId: item.Id });
                    break;
            }
        }

        $scope.navView = function (item) {
            switch (item.I_Category) {
                case 1:
                    $state.go('projectDetail', { id: item.Id });
                    break;
                case 2:
                    $state.go('budgetView', { id: item.Id });
                    break;
                case 3:
                    $state.go('contractView', { id: item.Id });
                    break;
                case 4:
                    $state.go('expenseView', { expenseId: item.Id });
                    break;
                case 5:
                    $state.go('receiptView', { receiptId: item.Id, id: item.I_Project });
                    break;
                case 6:
                    $state.go('workView', { id: item.I_Project, workId: item.Id });
                    break;
            }
        }

        $scope.submit = function (item) {
            $state.go('auditsubmit', { id: item.Id, category: item.I_Category });
        }

        $scope.upload = function (item) {
            $state.go('fileUpload', { id: item.I_Project, ownerId: item.Id, Category: item.I_Category });
        }

        $scope.showFeedBack = function (item) {
            epFeedBackHold.feed = { id: item.Id, category: item.I_Category };
            epModal.showModal('/app/feedback/views/feedback.html', 'epFeedBackController', 'lg');
        }
    }

    return directive;
}]);