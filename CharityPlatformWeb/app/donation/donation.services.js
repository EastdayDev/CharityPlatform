
'use strict';

angular.module('partnerModule').factory('_donation', ['_http', '_cookie',
  'appKey',
  function(_http, _cookie, appKey) {
    var service = {};

    var apiController = 'Donation';

    service.USP_Donation_Projects = function(userId, callback) {
      _http.ajaxGet(apiController, 'USP_Donation_Projects', {
        userId: userId
      }, callback);
    }

    service.Usp_Donation_Insert = function(donation, callback) {
      _http.ajaxPost(apiController, 'Usp_Donation_Insert', donation,
        callback);
    }
    return service;
  }
]);
