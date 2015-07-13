'use strict';

angular.module('donationModule').controller('DonationListController', ['$scope',
  '_donation', '_user',
  function($scope, _donation, _user) {

    $scope.$on('$viewContentLoaded', function() {
      _donation.USP_Donation_Projects(_user.userId, function(data) {
        $scope.projects = data;
      });
    });
  }
]);
