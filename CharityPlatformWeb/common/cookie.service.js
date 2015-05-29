'use strict';

angular.module('epUtilModule').factory('epCookie', ['appKey', function (appKey) {
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