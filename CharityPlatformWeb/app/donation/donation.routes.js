
'use strict';

angular.module('donationModule').config(['$stateProvider', function(
  $stateProvider) {

  $stateProvider
    .state('donationList', {
      url: '/donationList',
      templateUrl: '/app/donation/views/donation.list.html',
      controller: 'DonationListController'
    })
    .state('donationPay', {
      url: '/donationPay',
      templateUrl: '/app/donation/views/donation.pay.html',
      controller: 'DonationPayController'
    })
}]);
