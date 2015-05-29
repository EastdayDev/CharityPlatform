'use strict';

angular.module('epCommonModule').value('version', '0.1');

angular.module('epCommonModule').constant('appKey', 'CharityPlatform');

angular.module('epCommonModule').constant('appname', '上海浦东慈善基金会');

angular.module('epCommonModule').constant('epApiPrefix', 'http://localhost:8080/api');

angular.module('epCommonModule').value('epPageSize', 10);

angular.module('epCommonModule').factory('epHttp', ['$http', '$q', '$rootScope', 'epCookie', 'epApiPrefix',
    function ($http, $q, $rootScope, epCookie, epApiPrefix) {
        var service = {};

        var buildToken = function () {
            var token = '';
            if (epCookie.appCookie()) {
                var user = epCookie.appCookie();
                if (user.Token) {
                    var userToken = JSON.stringify(user.Token);
                    token = 'Basic ' + userToken.replace(/,/g, '$#@!');
                }
            }
            return token;
        }

        service.buildTokenNotBasic = function () {
            var token = '';
            if (epCookie.appCookie()) {
                var user = epCookie.appCookie();
                if (user.Token) {
                    var userToken = JSON.stringify(user.Token);
                    token = userToken.replace(/,/g, '**');
                }
            }
            return token;
        }

        service.ajaxGet = function (controller, method, param, callback) {
            var url = epApiPrefix + '/' + controller + '/' + method;
            if (!!param) {
                url += '?'
                angular.forEach(param, function (value, key) {
                    url += key + '=' + value + '&';
                });
                url = url.substring(0, url.length - 1);
            }
            var token = buildToken();
            $http.get(url, { headers: { 'Authorization': token } }).success(function (data) {
                if (callback) callback(data);
            }).error(function (message, status) {
                $rootScope.$broadcast('onError', status, message, url);
            });
        }

        service.ajaxPost = function (controller, method, param, callback) {
            var token = buildToken();
            var url = epApiPrefix + '/' + controller + '/' + method;
            $http.post(url, param, { headers: { 'Authorization': token } }).success(function (data) {
                if (callback) callback(data);
            }).error(function (message, status) {
                $rootScope.$broadcast('onError', status, message, url);
            });
        }

        service.promiseGet = function (controller, method, param) {
            var url = epApiPrefix + '/' + controller + '/' + method;
            if (!!param) {
                url += '?'
                angular.forEach(param, function (value, key) {
                    url += key + '=' + value + '&';
                });
                url = url.substring(0, url.length - 1);
            }
            var deferred = $q.defer();
            var token = buildToken();
            $http.get(url, { headers: { 'Authorization': token } })
                .success(function (data) { deferred.resolve(data); })
                .error(function (reason) { deferred.reject(reason) });

            return deferred.promise;
        }

        service.promisePost = function (controller, method, param) {
            var url = epApiPrefix + '/' + controller + '/' + method;
            var deferred = $q.defer();
            var token = buildToken();
            $http.post(url, param, { headers: { 'Authorization': token } })
                .success(function (data) { deferred.resolve(data); })
                .error(function (reason) { deferred.reject(reason) });

            return deferred.promise;
        }

        service.run = function (promises, thenFn) {
            $q.all(promises).then(function (results) {
                thenFn(results);
            });
        }

        return service;
    }]);
