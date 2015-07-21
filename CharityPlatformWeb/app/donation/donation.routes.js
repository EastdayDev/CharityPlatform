'use strict';

angular.module('donationModule').config(['$stateProvider', function ($stateProvider) {

    $stateProvider
        .state('donationList', {
            url: '/donationList',
            templateUrl: '/app/donation/views/donation.list.html',
            controller: 'DonationListController'
        })
}]);
