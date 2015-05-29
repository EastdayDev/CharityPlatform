'use strict';

var listController = ['$scope', '$state', 'epAudit', 'epAuditList', 'epAuth', 'epUser', 'epHelper', 'epModal',
function ($scope, $state, epAudit, epAuditList, epAuth, epUser, epHelper, epModal) {

    $scope.$emit('onResetFloatMenu', -1);

    $scope.$emit('onChangeTitle', '待审列表');

    //$scope.$emit('onGetAuditCount');

    $scope.epAuditList = epAuditList;

    $scope.data = [];

    var size = 100;
    $scope.page = { index: 1, total: 0 };
    $scope.projectPage = angular.copy($scope.page);
    $scope.budgetAndContractPage = angular.copy($scope.page);
    $scope.expensePage = angular.copy($scope.page);
    $scope.receiptPage = angular.copy($scope.page);
    $scope.workPage = angular.copy($scope.page);
    $scope.allPage = angular.copy($scope.page);

    $scope.switchData = function (category) {
        epAuditList.checks.length = 0;
        epAuditList.category = category;
        switch (category) {
            case 1:
                changePage(category, $scope.projectPage.index);
                break;
            case 2:
            case 3:
                changePage(category, $scope.budgetAndContractPage.index);
                break;
            case 4:
                changePage(category, $scope.expensePage.index);
                break;
            case 5:
                changePage(category, $scope.receiptPage.index);
                break;
            case 6:
                changePage(category, $scope.workPage.index);
                break;
            default:
                changePage(category, $scope.allPage.index);
                break;
        }
    }

    var buildPageData = function (index, data) {
        var pageData = [];
        var start = (index - 1) * size;
        var end = index * size;
        if (end > data.length) {
            end = data.length;
        }
        for (var i = start; i < end; i++) {
            pageData.push(data[i]);
        }
        return pageData;
    }

    var changePage = function (category, index) {
        epAuditList.category = category;
        $scope.data.length = 0;
        switch (category) {
            case 1:
                $scope.page = $scope.projectPage;
                $scope.data = buildPageData(index, epAuditList.allProjects);
                $scope.page.total = Math.ceil(epAuditList.allProjects.length / size);
                break;
            case 2:
                $scope.page = $scope.budgetAndContractPage;
                $scope.data = buildPageData(index, epAuditList.allBudgetAndContracts);
                $scope.page.total = Math.ceil(epAuditList.allBudgetAndContracts.length / size);
                break;
            case 4:
                $scope.page = $scope.expensePage;
                $scope.data = buildPageData(index, epAuditList.allExpenses);
                $scope.page.total = Math.ceil(epAuditList.allExpenses.length / size);
                break;
            case 5:
                $scope.page = $scope.receiptPage;
                $scope.data = buildPageData(index, epAuditList.allReceipts);
                $scope.page.total = Math.ceil(epAuditList.allReceipts.length / size);
                break;
            case 6:
                $scope.page = $scope.workPage;
                $scope.data = buildPageData(index, epAuditList.allWorks);
                $scope.page.total = Math.ceil(epAuditList.allWorks.length / size);
                break;
            default:
                $scope.page = $scope.allPage;
                $scope.data = buildPageData(index, epAuditList.allData);
                $scope.page.total = Math.ceil(epAuditList.allData.length / size);
                break;
        }
        $scope.page.index = index;
    }

    $scope.$on('onPageChanged', function (event, index) {
        changePage(epAuditList.category, index)
    });

    $scope.NavEdit = function (item) {
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
                $state.go('projectChildren.workEdit', { id: item.I_Project, budgetid: item.Id });
                break;
        }
    }

    $scope.NavView = function (item) {
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

    ///批量审核： 选择数据，转至审核页面
    $scope.batchAudit = function () {
        if (epAuditList.checks.length > 0) {
            epAudit.decideAudits(epAuditList.category, epAuditList.checks, function () {
                $state.go('audit');
            });
        }
    }

    ///单独审核
    $scope.NavAudit = function (item) {
        var checks = [];
        checks.push(item);
        epAudit.decideAudits(item.I_Category, checks, function () {
            $state.go('audit');
        });
    }

    $scope.CanEdit = function (item) {
        switch (item.I_Category) {
            case 1:
                return epAuth.CanEdit(item.I_Creater, item.FlowState, 10900);
            case 2:
                return epAuth.CanEdit(item.I_Creater, item.I_FlowState, 11200);
            case 3:
                return epAuth.CanEdit(item.I_Creater, item.FlowState, 12000);
            case 4:
                return epAuth.CanEdit(item.I_Creater, item.FlowState, 12400);
            case 5:
                return epAuth.CanEdit(item.I_Creater, item.FlowState, 12700);
            default:
                return false;
        }
    }

    $scope.$on('$viewContentLoaded', function () {
        epAuditList.GetAuditListAll(epUser.userId, function (data) {
            epAuditList.SplitData();
            if (epAuditList.category >= 1) {
                changePage(epAuditList.category, 1);
                return;
            }
            if (epAuditList.allProjects.length > 0) {
                epAuditList.category = 1;
                changePage(epAuditList.category, 1);
            } else if (epAuditList.allBudgetAndContracts.length > 0) {
                epAuditList.category = 2;
                changePage(epAuditList.category, 1);
            } else if (epAuditList.allExpenses.length > 0) {
                epAuditList.category = 4;
                changePage(epAuditList.category, 1);
            } else if (epAuditList.allReceipts.length > 0) {
                epAuditList.category = 5;
                changePage(epAuditList.category, 1);
            } else if (epAuditList.allWorks.length > 0) {
                epAuditList.category = 6;
                changePage(epAuditList.category, 1);
            }
        });
    });
}];

angular.module('epAuditModule').controller('epAuditListController', listController);