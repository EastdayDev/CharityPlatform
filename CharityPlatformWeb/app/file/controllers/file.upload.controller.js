
'use strict';

angular.module('fileModule').controller('FileUploadController', ['$scope',
  '$stateParams', '$state', '_fileServer', 'epModal',
  function($scope, $stateParams, $state, _fileServer, epModal) {

    $scope._fileServer = _fileServer;

    //初始化
    $scope.$on('$viewContentLoaded', function() {

    });
  }
]);
