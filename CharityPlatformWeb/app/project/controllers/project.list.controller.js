'use strict';

angular.module('projectModule').controller('ProjectListController',
['$scope', '$state', '_project', '$rootScope', 'epModal',
function ($scope, $state, _project, $rootScope, epModal) {

            $scope.items = [];
 
            $scope.hold.filterValue = "";

            var queryProjectList = function (index, size, filterValue) {
                epProject.GetList(index, size, filterValue, function (data) {
                    if (data && data.length > 0) {
                        $scope.items = data;
                        epProjectListHold.page.total = Math.ceil($scope.items[0].Total / size)
                    } else {
                        $scope.items.length = 0;
                    }
                });
            }

            $scope.$on('onPageChanged', function (event, index) {
                epProjectListHold.page.index = index;
                queryProjectList(index, epProjectListHold.size, epProjectListHold.filterValue);
            })

            $scope.$on('$viewContentLoaded', function () {
                queryProjectList(1, epProjectListHold.size, epProjectListHold.filterValue);
            });

            $scope.$on('onFireEdit', function (event, item) {
                $state.go('projectEdit', { id: item.Id });
            });

            $scope.$on('onFireRemove', function (event, item) {
                epModal.confirm('确定删除该项目吗？', function () {
                    epProject.Remove(item.Id, function (data) {
                        if (!!data.d) return;
                        for (var i = 0; i < $scope.items.length; i++) {
                            if ($scope.items[i].Id === item.Id) {
                                $scope.items.splice(i, 1);
                                break;
                            }
                        }
                    });
                })
            });

            $scope.$on('onFireSubmit', function (event, item) {
                $state.go('auditsubmit', { id: item.Id, category: 1 });
            });

            $scope.$on('onFireDetail', function (event, item) {
                $state.go('projectDetail', { id: item.Id });
            });

            $scope.NavToChildren = function (item) {
                $state.go('projectChildren.contractList', { id: item.Id });
            }

            $scope.$on('onFireUpload', function (event, item) {
                $state.go('fileUpload', { id: item.Id, ownerId: item.Id, Category: 1 });
            });

            $scope.$on('onFireFeed', function (event, item) {
                $scope.$broadcast('onFeedBackLoad', { id: item.Id, category: 1 });;
            });



        }]);
