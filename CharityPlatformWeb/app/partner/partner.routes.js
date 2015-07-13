'use strict';

angular.module('partnerModule').config(['$stateProvider', function ($stateProvider) {

    $stateProvider
        .state('partner', {
            url: '/partner',
            templateUrl: '/app/partner/views/partner.index.html',
            controller: 'PartnerController'
        })
}]);
