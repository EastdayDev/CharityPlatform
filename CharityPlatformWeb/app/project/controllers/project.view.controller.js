'use strict';

angular.module('epProjectModule').controller('epProjectViewController',
    ['$scope', '$stateParams', 'epProject', 'epUser', '$state', '$sce',
        function ($scope, $stateParams, epProject, epUser, $state, $sce) {

            $scope.$emit('onChangeTitle', '项目详情');

            $scope.$on('$viewContentLoaded', function () {
                $scope.PropertyShow = true;
                $scope.projectid = $stateParams.id;
                $scope.category = 1;

                if (!$scope.projectid || $scope.projectid <= 0) return;
                //项目信息
                epProject.GetDetail($scope.projectid, function (data) {
                    $scope.item = data;
                    //$scope.item.C_Remark = $sce.trustAsHtml($scope.item.C_Remark);
                    if ($scope.item.I_Support == 0 && $scope.item.I_OutSourcing == 0 && $scope.item.I_Introduction == 0 && $scope.item.I_Effect == 0 && $scope.item.I_Sales == 0) {
                        $scope.PropertyShow = false;
                    }
                    $scope.$emit('onResetFloatMenu', $scope.item.Id);
                });
                //业务类型
                epProject.GetBusinessByProjectId($scope.projectid, function (data) {
                    $scope.BusinessString = "";
                    $scope.Business = data;
                    for (var a = 0; a < $scope.Business.length; a++) {
                        $scope.BusinessString += "、" + $scope.Business[a].C_Name;
                    }
                    $scope.BusinessString = $scope.BusinessString.substring(1);
                });
                //预决算
                epProject.GetBudgetMoney($scope.projectid, 0, function (data) {
                    $scope.array1 = data[0];
                    epProject.GetBudgetMoney($scope.projectid, 1, function (data) {
                        $scope.array2 = data[0];
                        epProject.GetBudgetMoney($scope.projectid, 3, function (data) {
                            $scope.array3 = data[0];

                            //预计盈利
                            var shouru1 = $scope.array1.shouru - $scope.array1.chengben - $scope.array1.richang - $scope.array1.neibu;
                            var shouruBai1 = shouru1 > 0 ? (shouru1 / $scope.array1.shouru) * 100 : 0;
                            //审核中盈利
                            var shouru2 = $scope.array2.shouru - $scope.array2.chengben - $scope.array2.richang - $scope.array2.neibu;
                            var shouruBai2 = shouru2 > 0 ? (shouru2 / $scope.array2.shouru) * 100 : 0;
                            //审核完
                            var shouru3 = $scope.array3.shouru - $scope.array3.chengben - $scope.array3.richang - $scope.array3.neibu;
                            var shouruBai3 = shouru3 > 0 ? (shouru3 / $scope.array3.shouru) * 100 : 0;
                            //统计情况
                            $scope.shouru1 = shouru1;
                            $scope.shouruBai1 = shouruBai1.toFixed(2);
                            $scope.shouru2 = shouru2;
                            $scope.shouruBai2 = shouruBai2.toFixed(2);
                            $scope.shouru3 = shouru3;
                            $scope.shouruBai3 = shouruBai3.toFixed(2);
                        });
                    });
                });
                epProject.GetExpenseWorkMoney($scope.projectid, function (data) {
                    $scope.ExpenseData = data[0];
                });
                //项目其它信息
                epProject.GetOthers($scope.projectid, epUser.user, function (data) {
                    $scope.array = data;
                });
                //意见反馈
                epProject.GetAllFeedBack($scope.projectid, function (data) {
                    $scope.Fbitems = data;
                });
            });

            setTimeout(function () {
                var arealist = $("textarea");
                for (var a = 0; a < arealist.length; a++) {
                    arealist[a].style.height = arealist[a].scrollHeight + 'px';
                }
            }, 500);

            $scope.Img = function (value) {
                if ($("#" + value).is(":hidden")) {
                    return "add.png";
                } else {
                    return "8.jpg";
                }
            }
            $scope.DeleteFile = function (item) {
                if (confirm("您确定要删除该文件吗")) {
                    epProject.FileDelete(item.Id, function (data) {
                        if (data != "") {
                            $scope.file1.splice(item);
                            $scope.file2.push(item);
                        }
                    });
                }
            }
            $scope.detailSwitch = function (id) {
                $(id).toggle()
            }
            $scope.NavToView = function (category, id) {
                switch (category) {
                    case 2:
                        $state.go('budgetView', { id: id });
                        return;
                    case 3:
                        $state.go('contractView', { id: id });
                        return;
                    case 4:
                        $state.go('expenseView', { expenseId: id });
                        return;
                    case 5:
                        $state.go('receiptView', { id: id });
                        return;
                    case 6:
                        $state.go('workView', { id: id });
                        return;
                    default: return;

                }
            }
        }]);