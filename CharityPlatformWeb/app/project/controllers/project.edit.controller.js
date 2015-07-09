'use strict';

angular.module('projectModule').controller('ProjectEditController', ['$scope',
  '$state', '$stateParams', '_project', '_file', '_user', '$rootScope',
  'epModal',
  '_tool',
  function($scope, $state, $stateParams, _project, _file, _user, $rootScope,
    epModal, _tool) {

    $scope.projectId = parseInt($stateParams.id);

    $scope.navToUpload = function(category) {
      var stateName = category === 142 ? 'imageUpload' : 'fileUpload';
      $state.go(stateName, {
        owner: $scope.projectId,
        category: category
      });
    }

    $scope.$on('$viewContentLoaded', function() {
      /// 项目图片
      if ($scope.projectId === -1 && _project.randomId === 999) {
        $scope.projectId = _tool.randomBy(81234567, 91234567);
      }
      var userId = $stateParams.id === '-1' ? _user.userId : -1;
      _file.Usp_File_List($scope.projectId, -1, userId, function(
        data) {
        $scope.files = [];
        $scope.files = data;
      });
    })
  }
]);
