
'use strict';

angular.module('fileModule').controller('FileImageUploadController', ['$scope',
<<<<<<< HEAD
  '$stateParams', '$state', '$window', '_fileServer', '_user', 'epModal',
  function($scope, $stateParams, $state, $window, _fileServer, _user,
    epModal) {

    $scope._fileServer = _fileServer;

    $scope.$on('onUploadFinished', function() {
      $window.history.back();
=======
  '$stateParams', '$state', '$window', '_fileServer', 'epModal',
  function($scope, $stateParams, $state, $window, _fileServer, epModal) {
    $scope._fileServer = _fileServer;

    $scope.$on('onUploadFinished', function(v){
        console.log('onUploadFinished');
        $window.history.back();
>>>>>>> d806c79fa582aaba438e52cb820c52e114e91dca
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
