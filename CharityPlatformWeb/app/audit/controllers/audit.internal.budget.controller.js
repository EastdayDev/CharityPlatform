'use strict';

var epAuditInternalBudget = ['$scope', '$modalInstance', 'epAuditBudgetInternal', 'epAudit', 'epModal',
function ($scope, $modalInstance, epAuditBudgetInternal, epAudit, epModal) {

    $scope.epAudit = epAudit;

    ///选中的内部预算项
    $scope.checks = [];

    $scope.update = function () {
        var I_Budget = epAudit.budgetInternals[0].I_Budget;
        angular.forEach($scope.checks, function (checkItem) {
            checkItem.I_Kind = checkItem.Id;
            checkItem.I_Budget = I_Budget;
        });

        epAuditBudgetInternal.BudgetAuditInternalInsert($scope.checks, function (data) {
            if (!data){
                epModal.info('保存内部预算时，服务器发生异常！');
            } else {
                angular.forEach($scope.checks, function (checkItem) {
                    var notExists = true;
                    angular.forEach(epAudit.budgetInternals, function (oldItem) {
                        if (oldItem.I_Kind === checkItem.Id) {
                            notExists = false;
                            oldItem.F_Amount = checkItem.F_Amount;
                        }
                        oldItem.I_Flag = 1;
                    });
                    ///新增的项目
                    if (notExists) {
                        var newItem = angular.copy(checkItem);
                        newItem.I_Kind = newItem.Id;
                        epAudit.budgetInternals.push(newItem);
                    }
                });
            }
            $modalInstance.close();
        });
    }

    $scope.close = function () {
        $modalInstance.close();
    }

    epAuditBudgetInternal.GetBudgetInternalKinds(function (data) {
        $scope.items = data;
        angular.forEach($scope.items, function (item) {
            angular.forEach(epAudit.budgetInternals, function (checkItem) {
                if (item.Id === checkItem.I_Kind) {
                    item.I_Budget = checkItem.I_Budget;
                    item.I_BudgetInternalId = checkItem.I_BudgetInternalId;
                    item.F_Amount = checkItem.F_Amount;
                    item.I_Kind = item.Id;
                    item.disabled = true;
                    this.push(item);
                }
            }, $scope.checks);
        });
    });

}];

angular.module('epAuditModule').controller('epAuditInternalBudget', epAuditInternalBudget);