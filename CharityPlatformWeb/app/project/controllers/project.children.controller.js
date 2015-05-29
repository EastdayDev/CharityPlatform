'use strict';

angular.module('epProjectModule').controller('epProjectChildrenController',
    ['$scope', '$location', '$state', '$stateParams', 'epProject', 'epProjectChildrenHold', '$rootScope', 'epPageSize','epModal',
        function ($scope, $location, $state, $stateParams, epProject, epProjectChildrenHold, $rootScope, epPageSize, epModal) {

            $scope.$emit('onResetFloatMenu', -1);

            $scope.hold = epProjectChildrenHold;

            $scope.$on('$viewContentLoaded', function () {
                epProject.GetDetail($stateParams.id, function (data) {
                    $scope.item = data;
                });
            });

            $scope.$on('onFireSubmit', function (event, item) {
                if (item.I_Category !== 1) return;
                $state.go('auditsubmit', { id: item.Id, category: 1 });
            });

            $scope.$on('onFireDetail', function (event, item) {
                if (item.I_Category !== 1) return;
                $state.go('projectDetail', { id: item.Id });
            });

            $scope.$on('onFireEdit', function (event, item) {
                if (item.I_Category !== 1) return;
                $state.go('projectEdit', { id: item.Id });
            });

            $scope.$on('onFireRemove', function (event, item) {
                if (item.I_Category !== 1) return;
                if (epModal.confirm('确定删除该项目吗？')) {
                    epProject.Remove(item.Id, function (data) {
                        if (!!data.d) return;
                        for (var i = 0; i < $scope.items.length; i++) {
                            if ($scope.items[i].Id === item.Id) {
                                $scope.items.splice(i, 1);
                                break;
                            }
                        }
                    });
                }
            });

        }]);
