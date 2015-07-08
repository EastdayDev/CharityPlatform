
'use strict';

angular.module('fileModule').controller('FileImageUploadController', ['$scope',
  '$stateParams', '$state', '$window', '_fileServer', 'epModal',
  function($scope, $stateParams, $state, $window, _fileServer, epModal) {
    $scope._fileServer = _fileServer;

    $scope.$on('onUploadFinished', function(v){
        console.log('onUploadFinished');
        $window.history.back();
    });
    //初始化
    $scope.$on('$viewContentLoaded', function() {

    });
  }
]);
