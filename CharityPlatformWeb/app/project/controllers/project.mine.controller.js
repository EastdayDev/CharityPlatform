
'use strict';

angular.module('projectModule').controller('ProjectMineController', ['$scope',
  '$state', '$stateParams', '_project', '_user', '_tool', 'epModal',
  function($scope, $state, $stateParams, _project, _user, _tool, epModal) {

    $scope._user = _user;

    $scope.navToAdd = function() {
      _project.editProjectItem = {};
      _project.randomId = _tool.randomBy(81234567, 91234567);
      $state.go('projectEdit', {
        id: -1
      });
    }

    $scope.navToEdit = function(item) {
      _project.randomId = item.Id;
      $state.go('projectEdit', {
        id: item.Id
      });
    }

    $scope.navToPublish = function(item) {

    }

    $scope.navToDonationOrEdit = function(item) {
      if (_user.user.I_Category === 105) {
        /// 当前用户为机构 则进入项目编辑页面
        _project.randomId = item.Id;
        $state.go('projectEdit', {
          id: item.Id
        });
      } else {
        $state.go('projectDonation', {
          id: item.Id
        });
      }
    }

    $scope.$on('$viewContentLoaded', function() {
      _project.USP_Project_List(_user.userId, function(data) {
        $scope.projects = data;
      });
    });

  }
]);
