'use strict';

angular.module('epComponentModule').directive('epFloatMenu',
    ['$window', '$stateParams', 'epAuth', function ($window, $stateParams, epAuth) {
        var directive = {};

        directive.restrict = 'EA';

        //directive.scope = {}

        directive.templateUrl = '/Components/html/floatMenu.html';

        directive.link = function (scope, elem, iAttrs) {
            elem.find('#btnBack').bind('click', function () {
                $window.history.back();

            });
        }

        directive.controller = ['$scope', '$state', '$element', 'epAudit', 'epAuditList', 'epHelper', function ($scope, $state, $element, epAudit, epAuditList, epHelper) {
            ///默认为不可见，隐藏
            $scope.disabled = false;

            $scope.item = {};

            $scope.canEdit = false;
            $scope.canAudit = false;
            $scope.canSubmit = false;
            $scope.canFeed = false;

            ///重置菜单 根据外部数据，设置菜单各功能显隐
            $scope.$on('onFireFloatMenu', function (event, id) {
                $scope.canEdit = false;
                $scope.canAudit = false;
                $scope.canSubmit = false;
                $scope.canFeed = false;

                if (id === -1) return;

                epHelper.GetBaseData(id, function (data) {
                    if (!data) return;

                    $scope.item = data;

                    epAuth.CanAudit($scope.item.Id, $scope.item.I_Category, function (data) {
                        $scope.canAudit = data;
                    });

                    $scope.canSubmit = epAuth.CanSubmit($scope.item.I_Creater, $scope.item.I_FlowState);

                    $scope.canEdit = epAuth.CanEdit($scope.item.I_Creater, $scope.item.I_FlowState, $scope.item.I_Category);

                    $scope.canDel = epAuth.CanDel($scope.item.I_Creater, $scope.item.I_FlowState);
                });
            });

            ///激活浮动菜单  设置显隐
            $scope.$on('onDisableFloatMenu', function (event, disabled) {
                $scope.disabled = disabled;
            });

            $scope.onAudit = function () {
                epAuditList.GetCheckById($scope.item.Id, function (data) {
                    var checks = [];
                    checks.push(data);
                    epAudit.decideAudits($scope.item.I_Category, checks, function () {
                        $state.go('audit');
                    });
                });
            }

            $scope.onEdit = function () {
                switch ($scope.item.I_Category) {
                    case 1:
                        $state.go('projectEdit', { id: $scope.item.Id });
                        break;
                    case 2:
                        $state.go('projectChildren.budgetEdit', { id: $scope.item.I_Project, budgetid: $scope.item.Id });
                        break;
                    case 3:
                        $state.go('projectChildren.contractEdit', { id: $scope.item.I_Project, contractid: $scope.item.Id });
                        break;
                    case 4:
                        $state.go('projectChildren.expenseEdit', { id: $scope.item.I_Project, expenseId: $scope.item.Id });
                        break;
                    case 5:
                        $state.go('projectChildren.receiptEdit', { id: $scope.item.I_Project, receiptId: $scope.item.Id });
                        break;
                    case 6:
                        $state.go('projectChildren.workEdit', { id: $scope.item.I_Project, workId: $scope.item.Id });
                        break;
                }
            }

            $scope.onSubmit = function () {
                $state.go('auditsubmit', { category: $scope.item.I_Category, id: $scope.item.Id });
            }

            $scope.onFeed = function () {
                $scope.$broadcast('onFeedBackLoad', { id: $scope.item.Id, category: $scope.item.I_Category });;
            }

        }];

        return directive;
    }]);
