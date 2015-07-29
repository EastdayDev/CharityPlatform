'use strict';

angular.module('donationModule').controller('DonationPayController', ['$scope',
  '$state', '_donation', '_user', 'epModal',
  function($scope, $state, _donation, _user, epModal) {

    $scope.donation = {
      M_Balance: 0
    };

    $scope.pay = function(donation) {
      donation.I_User = _user.userId;
      donation.I_Category = 130;
      _donation.Usp_UserFund_Insert(donation, function(data) {
        if (data !== '-1') {
          $state.history.back();
        } else {
          epModal.info('服务器发生异常，本次充值未成功！');
        }
      });
    }

    $scope.$on('$viewContentLoaded', function() {
      _user.Usp_User_Balance(_user.userId, function(data) {
        $scope.M_Balance = data;
      });
    });
  }
]);
