'use strict';

angular.module('sysModule').controller('SysCheckListController', ['$scope',
  '$state',
  '_sys', '_user', '_audit',
  function($scope, $state, _sys, _user, _audit) {

    var pageSize = 10;
    $scope.search = function(filterValue) {
      if (!filterValue) filterValue = '';
      _audit.Usp_Check_List(_user.userId, filterValue, _sys.hold.pageIndex,
        pageSize,
        function(data) {
          $scope.projects = data;
          _sys.hold.total = 0;
          if (data && data.length > 0) {
            _sys.hold.total = Math.ceil($scope.projects[0].Total /
              pageSize);
          }
        });
    }

    $scope.$on('onPageChanged', function(e, pageIndex) {
      _sys.hold.pageIndex = pageIndex;
      $scope.search($scope.filterValue);
    });

    $scope.$on('$viewContentLoaded', function() {
      $scope.search($scope.filterValue);
    });
  }
]);
