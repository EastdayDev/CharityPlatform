'use strict';

var submitController = function ($scope, $window, $state, $stateParams, $rootScope, epAuditList, epHelper, epModal) {
    $scope.$emit('onResetFloatMenu', -1);

    $scope.id = $stateParams.id;
    $scope.category = $stateParams.category;

    //$scope.depts = [];
    $scope.centerDepts = [];
    $scope.childDepts = [];

    var checkExist = function (depts, dept) {
        var length = depts.length;
        for (var i = 0; i < length; i++) {
            if (dept.Id === depts[i].Id) return true;
        }
        return false;
    }

    $scope.$on('onMoveRight', function (event, dept) {
        if (dept.I_Level < 20) {
            if (!checkExist($scope.centerDepts, dept)) {
                $scope.centerDepts.push(dept);
            }
        } else {
            if (!checkExist($scope.childDepts, dept)) {
                $scope.childDepts.push(dept);
            }
        }
    });

    var canSubmit = function (baseData, callback) {
        if (baseData.I_Category !== 1) {
            ///项目提交后才允许提交项目下属数据
            var project = epHelper.GetBaseData(baseData.I_Project, function (data) {
                if (data.I_FlowState === 0) {
                    callback({ code: 500, message: '项目未提交审核，不允许提交' });
                    return;
                }
                /// 报销与发票，项目审核完成才允许提交
                if ((baseData.I_Category === 4 || baseData === 5) && data.I_FlowState !== 3) {
                    callback({ code: 500, message: '项目还未审核完成，不允许提交' });
                    return;
                }
            });
        }
        callback({ code: 200, message: '允许提交审核' });
    }

    var exeSubmit = function (id, category, wrap) {
        epAuditList.Submit(id, category, wrap, $scope.centerDepts, $scope.childDepts, function (data) {
            if (data) {
                $window.history.back();
            } else {
                epModal.info('提交未成功，请联系系统管理员');
            }
        });
    }

    $scope.submit = function () {
        canSubmit($scope.baseData, function (data) {
            if (data.code === 500) {
                epModal.info(data.message);
                return;
            }
            if ($scope.baseData.I_Category === 1) {
                epModal.confirm('需要将该项目下属数据打包提交吗？', function (data) {
                    exeSubmit($scope.baseData.Id, $scope.baseData.I_Category, true);
                }, function () {
                    exeSubmit($scope.baseData.Id, $scope.baseData.I_Category, false);
                });
            }
        });
    }

    $scope.$on('$viewContentLoaded', function () {

        epHelper.GetBaseData($stateParams.id, function (data) {
            $scope.baseData = data;
            epAuditList.GetSubmitDepartments($scope.baseData.I_Project, function (data) {
                $scope.depts = data;
            })
        });

    });
};

submitController.$injector = ['$scope', '$window', '$state', '$stateParams', '$rootScope', 'epAuditList', 'epHelper', 'epModal'];
angular.module('epAuditModule').controller('epAuditSubmitController', submitController);