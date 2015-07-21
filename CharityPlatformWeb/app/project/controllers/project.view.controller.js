
'use strict';

angular.module('projectModule').controller('ProjectViewController', ['$scope',
  '$stateParams', '$window', '$timeout', '$location', '$anchorScroll',
  '_project',
  '_file', '_donation',
  '_sys',
  '_user', '$state', 'epModal',
  function($scope, $stateParams, $window, $timeout, $location,
    $anchorScroll,
    _project, _file,
    _donation, _sys,
    _user, $state, epModal) {

    $scope._sys = _sys;

    $scope.donation = {
      I_Method: 215,
      I_From: 120,
      I_RequiredReceipt: false
    }

    $scope.hidePay = true;

    $scope.toIdPay = function() {
      $scope.hidePay = false;
      var outPromise = $timeout(function() {
        $location.hash('idPay');
        $anchorScroll();
        $timeout.cancel(outPromise);
      }, 10);
    }



    var verifyDonation = function(donation) {
      if (!donation.M_Money || donation.M_Money <= 0) {
        epModal.info('捐款金额必须大于零');
        return false;
      }

      if (donation.I_From === '115' && donation.M_Balance < donation.M_Money) {
        epModal.info('账户余额不足,请选择其他支付方式！');
        return false;
      }

      if (donation.I_RequiredReceipt === false) return true;

      if (!donation.C_ReceiptTitle) {
        epModal.info('发票抬头必须填写！');
        return false
      }
      if (!donation.C_ReceiptName) {
        epModal.info('收件人必须填写！');
        return false
      }
      if (!donation.C_ReceiptMobile) {
        epModal.info('联系方式必须填写！');
        return false
      }
      if (!donation.C_ReceiptAddress) {
        epModal.info('联系地址必须填写！');
        return false
      }
      return true;
    }

    $scope.pay = function(donation) {
      if (!verifyDonation(donation)) return;
      donation.I_Project = $stateParams.id;
      donation.I_User = _user.userId;
      donation.C_Remark = '';
      donation.I_Flag = 1;
      donation.I_RequiredReceipt = donation.I_RequiredReceipt === false ?
        0 : 1;
      _donation.Usp_Donation_Insert(donation, function(data) {
        if (data === '-1') {
          epModal.info('服务器操作发生异常, 请联系系统管理员!');
        } else {
          $window.history.back();
        }
      });
    }

    $scope.$on('$viewContentLoaded', function() {
      $scope.donation.C_ReceiptName = _user.user.C_Name;
      $scope.donation.C_ReceiptMobile = _user.user.C_Mobile;
      $scope.donation.C_ReceiptAddress = _user.user.C_Address;
      _project.USP_Project_View(_user.userId, $stateParams.id, function(
        data) {
        $scope.project = data[0];
        $scope.project.Fields = $scope.project.C_Field.split(',');
        $scope.donation.M_Balance = $scope.project.M_Balance;
      });

      _file.Usp_File_List($stateParams.id, -1, _user.userId, function(
        data) {
        $scope.files = [];
        $scope.files = data;
      });


    });
  }
]);
