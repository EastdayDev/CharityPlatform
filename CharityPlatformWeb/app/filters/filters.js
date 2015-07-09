
'use strict'
var filterApp = angular.module('filterModule');

filterApp.filter('dictFilter', ['_sys', function(_sys) {
  return function(value) {
    var length = _sys.words.length;
    for (var i = 0; i < length; i++) {
      if (_sys.words[i].Id == value) return _sys.words[i].C_Name;
    }
    return '未知';
  }
}]);

filterApp.filter('projectPhotoFilter', [function() {
  return function(files, category) {
    var newFiles = [];
    angular.forEach(files, function(file) {
      if (file.I_Category === category) {
        this.push(file);
      }
    }, newFiles);
    return newFiles;
  }
}]);

filterApp.filter('projectOtherFileFilter', [function() {
  return function(files) {
    var newFiles = [];
    angular.forEach(files, function(file) {
      if (file.I_Category >= 145 && file.I_Category <= 150) {
        this.push(file);
      }
    }, newFiles);
    return newFiles;
  }
}]);
