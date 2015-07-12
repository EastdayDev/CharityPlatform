
'use strict';

angular.module('fileModule').controller('FileImageUploadController', ['$scope',
  '$stateParams', '$state', '$window', '_fileServer', '_user', 'epModal',
  function($scope, $stateParams, $state, $window, _fileServer, _user,
    epModal) {

    $scope._fileServer = _fileServer;

    $scope.$on('onUploadFinished', function() {
      $window.history.back();
    });
    //初始化
    $scope.$on('$viewContentLoaded', function() {
      _user.checkLogin(function(data) {
        if (data) {
          $state.go('login');
        } else {
          _fileServer.uploadParameter.I_Owner = $stateParams.owner;
          _fileServer.uploadParameter.I_Category = $stateParams.category;
          _fileServer.uploadParameter.I_Uploader = _user.userId;
        }
      })
    });
  }
]);
