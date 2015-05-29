'use strict';

var listController = ['$scope', '$state', 'epAuditOver', 'epAuditList', 'epAuth', 'epUser', 'epHelper', 'epModal',
function ($scope, $state, epAuditOver, epAuditList, epAuth, epUser, epHelper, epModal) {

    $scope.$emit('onResetFloatMenu', -1);

    $scope.$emit('onChangeTitle', '已审列表');
    $scope.pagesize = 10;
    $scope.query = "";
    $scope.index = 1;
    $scope.epAuditOver = epAuditOver;
    $scope.epAuditOver.page = {};


    $scope.$on('$viewContentLoaded', function () {
        QueryChecklistover(1);
    });

    $scope.$on('onPageChanged', function (event, index) {
        QueryChecklistover(index)
    });

    var QueryChecklistover = function (index) {
        $scope.epAuditOver.GetCheckListOver(index, $scope.pagesize, $scope.query, epUser.userId, function (data) {
            if (data.length > 0) {
                $scope.list = data;
                $scope.epAuditOver.page.index = index;
                $scope.epAuditOver.page.total = ($scope.list[0].Total / $scope.pagesize);
                $scope.epAuditOver.page.total = (($scope.list[0].Total % $scope.pagesize) != 0 ? parseInt($scope.epAuditOver.page.total) + 1 : $scope.epAuditOver.page.total);
                $scope.epAuditOver.page.total = ($scope.epAuditOver.page.total == 0 ? 1 : $scope.epAuditOver.page.total);
            } else {
                $scope.list = [];
            }
        });
    }

    $scope.NavView = function (item) {
        switch (item.I_Category) {
            case 1:
                $state.go('projectDetail', { id: item.Id });
                return;
            case 2:
                $state.go('budgetView', { id: item.Id });
                return;
            case 3:
                $state.go('contractView', { id: item.Id });
                return;
            case 4:
                $state.go('expenseView', { expenseId: item.Id });
                return;
            case 5:
                $state.go('receiptView', { receiptId: item.Id, id: item.I_Project });
                return;
            case 6:
                $state.go('workView', { workId: item.Id, id: item.I_Project });
                return;
            default:
                return;
        }
    }

    $scope.NavUpdate = function (item) {
        switch (item.I_Category) {
            case 1:
                $state.go('projectEdit', { id: item.Id });
                return;
            case 2:
                $state.go('projectChildren.budgetEdit', { id: item.I_Project, budgetid: item.Id });
                return;
            case 3:
                $state.go('projectChildren.contractEdit', { contractid: item.Id, id: item.I_Project });
                return;
            case 4:
                $state.go('projectChildren.expenseEdit', { expenseId: item.Id, id: item.I_Project });
                return;
            case 5:
                $state.go('projectChildren.receiptEdit', { receiptId: item.Id, id: item.I_Project });
                return;
            case 6:
                $state.go('projectChildren.workEdit', { workId: item.Id, id: item.I_Project });
                return;
            default:
                return;
        }
    }

    $scope.$on('onFireEdit', function (event, item) {
        $scope.NavUpdate(item);
    });
    //查看按钮
    $scope.$on('onFireDetail', function (event, item) {
        $scope.NavView(item);
    });
}];

angular.module('epAuditModule').controller('epAuditOverController', listController);