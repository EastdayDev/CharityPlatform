'use strict';

angular.module('commonModule').value('version', '0.1');

angular.module('commonModule').constant('appKey', 'CharityPlatform');

angular.module('commonModule').constant('appname', '上海浦东慈善基金会');

angular.module('commonModule').constant('apiPrefix', 'http://localhost:4972/api');
 
angular.module('commonModule').factory('_cookie', ['appKey', function (appKey) {
    var service = {};

    /** 
    * @description
    * Sets a value for given cookie key
    *
    * sample : epCookieService.put('epCookie', { name: 'ddd', value: 'ttt' }, { expireMinutes: 60 });
    *
    * @param {string} key Id for the `value`.
    * @param {string} json object value
    * @param {Object=} options Options object. only expireMinutes, path, domain
    */
    service.put = function (name, value, option) {
        var str = name + "=" + JSON.stringify(value);
        if (option) {
            //如果设置了过期时间
            if (option.expireMinutes) {
                var date = new Date();
                var ms = option.expireMinutes * 60 * 1000;
                date.setTime(date.getTime() + ms);
                str += "; expires=" + date.toGMTString();
            }
            if (option.path) str += "; path=" + path;   //设置访问路径
            if (option.domain) str += "; domain" + domain; //设置访问主机
            if (option.secure) str += "; true";    //设置安全性
        }
        document.cookie = str;
    }

    service.expired = function(name) {
        var str = name + '=' + ' ';
        var date = new Date();
        date.setTime(date.getTime() - 1000);
        str += "; expires=" + date.toGMTString();
        document.cookie = str;
    }

    //读取cookies
    service.get = function (name) {
        if (document.cookie.indexOf(name) === -1) return null;
        var cookieItems = document.cookie.split(';');
        var length = cookieItems.length;
        for(var i = 0; i < length; i ++){
            var items = cookieItems[i].split('=');
            if (items[0].trim() === name) return JSON.parse(items[1]);
        }
        return null;
    } 

    service.appCookie = function(){
        return service.get(appKey);
    }
    return service;
}]);


angular.module('commonModule').factory('_http', ['$http', '$q', '$rootScope', '_cookie', 'apiPrefix',
    function ($http, $q, $rootScope, _cookie, apiPrefix) {
        var service = {};

        var buildToken = function () {
            var token = '';
            if (_cookie.appCookie()) {
                var user = _cookie.appCookie();
                if (user.Token) {
                    var userToken = JSON.stringify(user.Token);
                    token = 'Basic ' + userToken.replace(/,/g, '$#@!');
                }
            }
            return token;
        }

        service.buildTokenNotBasic = function () {
            var token = '';
            if (_cookie.appCookie()) {
                var user = _cookie.appCookie();
                if (user.Token) {
                    var userToken = JSON.stringify(user.Token);
                    token = userToken.replace(/,/g, '**');
                }
            }
            return token;
        }

        service.ajaxGet = function (controller, method, param, callback) {
            var url = apiPrefix + '/' + controller + '/' + method;
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
            var url = apiPrefix + '/' + controller + '/' + method;
            $http.post(url, param, { headers: { 'Authorization': token } }).success(function (data) {
                if (callback) callback(data);
            }).error(function (message, status) {
                $rootScope.$broadcast('onError', status, message, url);
            });
        }
        
        /// BaseController 获得Table
        service.postTable = function(param, callback){
        	service.ajaxPost('Base', 'PostTable', param, callback);
        }

        /// BaseController 提交数据方式
        service.postEntity = function(param, callback){
        	service.ajaxPost('Base', 'PostEntity', param, callback);
        }
        
        service.promiseGet = function (controller, method, param) {
            var url = apiPrefix + '/' + controller + '/' + method;
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
            var url = apiPrefix + '/' + controller + '/' + method;
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
