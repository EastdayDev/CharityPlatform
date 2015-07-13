'use strict';

angular.module('partnerModule').controller('PartnerController', ['$scope',
  '$state', '$stateParams', '_partner', '_user',
  function($scope, $state, $stateParams, _partner, _user) {

    $scope.$on('$viewContentLoaded', function() {
      _partner.Usp_Partner_List(_user.userId, function(data) {
        $scope.partners = data;
      });
      _partner.USP_Partner_Projects(_user.userId, function(data) {
        $scope.projects = data;
      });
    });
  }
]);
