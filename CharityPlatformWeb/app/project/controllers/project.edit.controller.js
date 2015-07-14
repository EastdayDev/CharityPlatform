'use strict';

angular.module('projectModule').controller('ProjectEditController', ['$scope',
  '$state', '$stateParams', '$window', '_project', '_file', '_user',
  '_partner', '$rootScope', 'epModal', '_tool', '_audit',
  function($scope, $state, $stateParams, $window, _project, _file, _user,
    _partner, $rootScope, epModal, _tool, _audit) {

    $scope.project = _project.editProjectItem;

    $scope.navToUpload = function(category) {
      var stateName = category === 142 ? 'imageUpload' : 'fileUpload';
      var owner = $stateParams.id === '-1' ? _project.randomId :
        $stateParams.id;
      $state.go(stateName, {
        owner: owner,
        category: category
      });
    }

    $scope.submit = function(project) {
      project.I_FlowType = 101;
      project.I_State = 160; /// 审核中
      _audit.submit(project, function(data) {
        if (data === '-1') {
          epModal.info('服务器操作发生异常, 请联系系统管理员!');
        } else {
          $window.history.back();
        }
      })
    }

    $scope.save = function(project) {
      project.I_Creater = _user.userId;
      project.Id = _project.randomId;
      project.C_Field = project.Fields.join(',');
      _project.Usp_Project_Insert(project, function(data) {
        if (data === '-1') {
          epModal.info('服务器操作发生异常, 请联系系统管理员!');
        } else {
          if (parseInt(data) !== _project.randomId) {
            _file.DirectoryRename(_project.randomId, data);
          }
          $window.history.back();
        }
      })
    }

    $scope.cancel = function() {
      $window.history.back();
    }

    $scope.$on('$viewContentLoaded', function() {
      /// 项目图片
      var userId = -1;
      var projectId = $stateParams.id;
      if ($stateParams.id === '-1') {
        userId = _user.userId;
        projectId = _project.randomId;
      } else {
        _project.Usp_Project_Get(projectId, function(data) {
          _project.editProjectItem = data[0];
          _project.editProjectItem.Fields = data[0].C_Field.split(
            ',');
          $scope.project = _project.editProjectItem;
          //$scope.project.Fields = [1, 2, 3];
        })
      }

      _partner.Usp_Org_ById(_user.userId, function(data) {
        if (data && data.length > 0) {
          $scope.org = data[0];
        }
      });

      _file.Usp_File_List(projectId, -1, userId, function(
        data) {
        $scope.files = [];
        $scope.files = data;
      });


    })
  }
]);
