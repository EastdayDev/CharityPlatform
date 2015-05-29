'use strict';

angular.module('epGlobalModule').controller('epGlobalListController',
    ['$scope', '$location', '$state', 'epUser', 'epGlobal', 'epProject', 'epHelper', 'epModal', '$stateParams',
        function ($scope, $location, $state, epUser, epGlobal, epProject, epHelper, epModal, $stateParams) {

            $scope.$emit('onResetFloatMenu', -1);
            $scope.$emit('onChangeTitle', '全局搜索');

            $scope.epGlobal = epGlobal;

            $scope.$on('onPageChanged', function (event, index) {
                epGlobal.page.index = index;
                epGlobal.globalFind(epGlobal.page.index, epGlobal.page.size);
            })

            $scope.$on('onFireSubmit', function (event, item) {
                $state.go('auditsubmit', { id: item.Id, category: 1 });
            });

            $scope.$on('onFireUpload', function (event, item) {
                $state.go('fileUpload', { id: item.I_Project, ownerId: item.Id, Category: item.I_Category });
            });

            $scope.$on('onFireEdit', function (event, item) {
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
            });

            $scope.$on('onFireDetail', function (event, item) {
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
            });

            var itemRemove = function (item) {
                var length = epGlobal.items.length;
                for (var i = 0; i < length; i++) {
                    if (item.Id === epGlobal.items[i].Id) {
                        epGlobal.items.splice(i, 1);
                        break;
                    }
                }
            }

            $scope.$on('onFireRemove', function (event, item) {
                epModal.confirm('确定删除吗？', function () {
                    epProject.DeleteBaseDataById(item.Id, function (data) {
                        if (data > 0) itemRemove(item);
                    });
                })
            });
            //$scope.$on('$viewContentLoaded', function () {
            //    epGlobal.globalFind(epGlobal.page.index, epGlobal.page.size);
            //});


        }]);
