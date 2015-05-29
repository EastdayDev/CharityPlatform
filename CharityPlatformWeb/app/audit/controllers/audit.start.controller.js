'use strict';

var auditController = ['$scope', '$window', '$state', '$stateParams', '$rootScope', 'epAudit', 'epAuditList', 'epHelper', 'epModal', 'epUser', 'epAuth', 'epWork',
function ($scope, $window, $state, $stateParams, $rootScope, epAudit, epAuditList, epHelper, epModal, epUser, epAuth, epWork) {

    $scope.$emit('onResetFloatMenu', -1);
    //$scope.$emit('onGetAuditCount');

    ///编辑内部预算
    $scope.showAuditInternalBudget = function () {
        epModal.showModal('/app/audit/views/audit.internal.budget.html', 'epAuditInternalBudget', 'lg');
    }

    $scope.epAudit = epAudit;
    $scope.epAuditList = epAuditList;

    $scope.transfers = [];
    $scope.transChecks = [];
    $scope.assistantChecks = [];

    $scope.markAuditMethod = function (auditMethod) {
        $scope.pickAuditMethod = auditMethod;
    }

    /// 审核前校验
    var auditVerify = function () { 
        var auditId = $scope.pickAuditMethod.Id;
        ///传阅的情况校验
        if (($scope.assistantChecks.length > 0 || $scope.transChecks.length > 0)
            && auditId !== 20 && auditId !== 21 && auditId !== 23) {
            epModal.info('需要传阅时，请选择传阅的方式');
            return false;
        }
        if (($scope.assistantChecks.length === 0 && $scope.transChecks.length === 0)
            && (auditId === 20 || auditId === 21 || auditId === 23)) {
            epModal.info('以传阅的方式审核，必须选择传阅对象');
            return false;
        }
        ///工单回复校验
        if (epAudit.canWorkReply && epAudit.workReply && epAudit.workReply.M_Account <= 0) {
            epModal.info('内部成本决算必须填写');
            return false;
        }
        return true;
    }

    ///流程审核
    $scope.AuditFlows = function (isAbort) {
        if (!auditVerify()) return;
        var auditInfo = { AuditType: $scope.pickAuditMethod.Id, AuditDesc: $scope.auditDesc };
        ///通过并终止
        if (isAbort) auditInfo.AuditType = 11;
        var trasfers = angular.copy($scope.transChecks);
        angular.forEach($scope.assistantChecks, function (item) {
            this.push(item);
        }, trasfers);

        epAudit.AuditFlows(auditInfo, trasfers, function (data) {
            ///审核结果
            if (data && epAudit.checks.length === 0) { 
                $window.history.back();
            }
        });
    } 

    $scope.CanEdit = function (item) {
        switch (item.I_Category) {
            case 1:
                return epAuth.CanEdit(item.I_Creater, item.FlowState, 10900);
            case 2:
                return epAuth.CanEdit(item.I_Creater, item.FlowState, 11200);
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

    var canAbort = function () {
        ///检测是否允许审核并终止
        if (epAudit.items.length > 1) {
            ///多条数据不允许
            $scope.canAbort = false;
        } else {
            var item = epAudit.items[0];
            epAuth.CanAbort(item.Id, item.I_Category, function (data) {
                $scope.canAbort = data;
            });
        }
    }

    $scope.$on('onMoveRight', function (event, item) {
        var length = $scope.transChecks.length;
        for (var i = 0; i < length; i++) {
            if (item.Id === $scope.transChecks[i].Id) return;
        }
        $scope.transChecks.push(item);
    });

    $scope.$on('$viewContentLoaded', function () {
        if (epAudit.items.length === 0) {
            $window.history.back();
            return;
        }

        epAudit.workReply = {};

        epAudit.CanTransfer(function (canTransfer) {
            ///获得助理  工单不允许传阅助理
            if (canTransfer && epAuditList.category !== 6) {
                epAudit.GetAssistants(function (data) {
                    $scope.assistants = data;
                });
            }
            ///获取审核方式
            epAudit.GetAuditMethods(canTransfer, function (data) {
                $scope.auditMethods = data;
                $scope.pickAuditMethod = $scope.auditMethods[0];
            });
            ///获得传阅对象
            epAudit.GetTransferTrees(canTransfer, function (data) {
                $scope.transfers = data;
            });
        });

        if (epAuditList.category === 6 || (epAudit.items.length === 1 && epAudit.items[0].I_Category === 6)) {
            epAudit.InWorkExecutor();
            epWork.GetWorkReply(epAudit.items[0].Id, function (data) {
                $scope.workReplies = data;
            });
        }

        epAudit.GetAuditBudgetInternal();
        canAbort();
    });
}];

angular.module('epAuditModule').controller('epAuditController', auditController);