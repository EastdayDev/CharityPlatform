'use strict';

angular.module('componentModule').factory('epModal', ['$modal', function ($modal) {
    var service = {};

    service.msg = '';

    service.confirm = function (msg, okFn, cancelFn) {
        service.msg = msg;
        var modalInstance = $modal.open({
            animation: false,
            backdrop: true,
            templateUrl: '/components/html/modal.html',
            controller: 'ConfirmController',
            size: '' 
        });

        modalInstance.result.then(function () {
            if (okFn) okFn();
        }, function (item) {
            if (cancelFn) cancelFn();
        });
    }

    service.info = function (msg, okFn, cancelFn) {
        service.msg = msg;
        var modalInstance = $modal.open({
            animation: true,
            backdrop: true,
            templateUrl: '/components/html/modal.html',
            controller: 'InfoController',
            size: ''
        });

        modalInstance.result.then(function () {
            if (okFn) okFn();
        }, function (item) {
            if (cancelFn) cancelFn();
        });
    }

    service.showModal = function (url, ctrl, size) {
        $modal.open({
            animation: false,
            backdrop: true,
            templateUrl: url,
            controller: ctrl,
            size: size || ''
        });

        //modalInstance.result.then(function () {
        //    if (okFn) okFn();
        //}, function (item) {
        //    if (cancelFn) cancelFn();
        //});
    }

    return service;
}]);

angular.module('componentModule').controller('ConfirmController',
    ['$scope', '$modalInstance', 'epModal', 'appname', function ($scope, $modalInstance, epModal, appname) {

        $scope.epModal = epModal;

        $scope.title = appname;

        $scope.disabledCancel = false;

        $scope.ok = function () {
            $modalInstance.close();
        }

        $scope.cancel = function () {
            $modalInstance.dismiss();
        }
    }]);


angular.module('componentModule').controller('InfoController',
    ['$scope', '$modalInstance', 'epModal', 'appname', function ($scope, $modalInstance, epModal, appname) {

        $scope.epModal = epModal;

        $scope.title = appname;

        $scope.disabledCancel = true;

        $scope.ok = function () {
            $modalInstance.close();
        }
    }]); 

angular.module('componentModule').controller('ModalController', ['$rootScope', '$scope', '$modalInstance', function ($rootScope, $scope, $modalInstance) {

    $scope.msgContent = '';

    $scope.modal = function (item) {
        $rootScope.$broadcast('OnModalClose', item);
        $modalInstance.close(item);
    }
}]);