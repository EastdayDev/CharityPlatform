'use strict';

angular.module('epProjectModule').controller('epProjectVirtualController',
    ['$scope', '$stateParams', 'epProject', 'epProjectListHold', 'epProjectChildrenHold', '$rootScope', 'epUser', '$state',
        function ($scope, $stateParams, epProject, epProjectListHold, epProjectChildrenHold, $rootScope, epUser, $state) {

            $scope.$emit('onChangeTitle', '年度项目');

            $scope.hold = epProjectListHold;

            var QueryVirtualProjectList = function (index, size, filterValue, userid) {
                epProject.GetVirtuals(index, size, filterValue, userid, function (data) {
                    if (data && data.length > 0) {
                        $scope.items = data;
                        $scope.hold.page.total = Math.ceil($scope.items[0].Total / size)
                    } else {
                        $scope.items.length = 0;
                    }
                });
            }

            $scope.$on('$viewContentLoaded', function () {
                QueryVirtualProjectList(1, $scope.hold.size, $scope.hold.filterValue, epUser.userId);
            });

            $scope.$on('onPageChanged', function (event, index) {
                $scope.hold.page.index = index;
                QueryVirtualProjectList(index, $scope.hold.size, $scope.hold.filterValue, epUser.userId);
            })

            $scope.NavToChildren = function (item) {
                $state.go('projectChildren.contractList', { id: item.Id });
            }

            $scope.NavToView = function (item) {
                $state.go('projectDetail', { id: item.Id });
            }

        }]);