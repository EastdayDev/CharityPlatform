
'use strict'
var filterApp = angular.module('filterModule');

filterApp.filter('dictNameFilter', ['_sys', function(_sys) {
  return function(value) {
    var length = _sys.words.length;
    for (var i = 0; i < length; i++) {
      if (_sys.words[i].Id == value) return _sys.words[i].C_Name;
    }
    return '未知';
  }
}]);

filterApp.filter('dictFilter', ['_sys', function(_sys) {
  return function(words, category) {
    var newWords = [];
    angular.forEach(words, function(item) {
      if (item.I_Category === category) this.push(item);
    }, newWords);
    return newWords;
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

filterApp.filter('partnerProjectFilter', [function() {
  return function(projects, partnerId) {
    var newProjects = [];
    angular.forEach(projects, function(project) {
      if (project.I_Creater === partnerId) {
        this.push(project);
      }
    }, newProjects);
    return newProjects;
  }
}]);

filterApp.filter('filePathFilter', [function() {
  return function(item) {
    return '/files/' + item.Id + '/' + item.C_Photo;
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

filterApp.filter('projectFieldFilter', [function() {
  return function(projects, field) {
    var newProjects = [];
    angular.forEach(projects, function(item) {
      if (item.C_Field.indexOf(field) > -1) {
        this.push(item);
      }
    }, newProjects);
    return newProjects;
  }
}]);

filterApp.filter('projectFieldNameFilter', [function() {
  return function(fields) {
    if (!fields) return;
    var newFields = [];
    var fieldIds = fields.split(',');
    angular.forEach(fieldIds, function(item) {
      switch (item) {
        case '1':
          this.push('安老');
          break;
        case '2':
          this.push('扶幼');
          break;
        case '3':
          this.push('助学');
          break;
        case '4':
          this.push('济困');
          break;
        default:
          this.push('其他');
      }
    }, newFields);
    return newFields.join('、');
  }
}]);
