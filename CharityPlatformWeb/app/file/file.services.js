
'use strict';

angular.module('fileModule').factory('_fileServer', ['apiPrefix', function(
  apiPrefix) {
  var service = {};
  service.url = apiPrefix + '/file/UploadFiles';
  service.imageExts = 'gif,png,jpg,jpeg,bmp';
  ///文件上传支持的扩展名
  service.supportExts = ['mp4', 'wmv', 'asf', 'flv', 'swf', 'mp3', 'wma',
    'avi', 'rm', 'zip', 'rar', 'zip',
    'jpg', 'jpeg', 'gif', 'png', 'bmp', 'xls', 'doc', 'ppt', 'xlsx',
    'docx', 'pptx', 'pdf', 'txt', 'chm'
  ];
  service.uploadParameter = {
    I_Owner: -1
  };
  return service;
}]);

angular.module('fileModule').factory('_file', ['_http',
  function(_http) {
    var service = {};

    var apiController = 'File';
    var fileWebDirectory = 'files';



    service.Usp_File_List = function(owner, category, callback) {
      var param = {
        owner: owner,
        category: category
      };
      _http.ajaxGet(apiController, 'Usp_File_List', param, function(data) {
        var files = [];
        angular.forEach(data, function(file) {
          file.C_FileName = '/' + fileWebDirectory + '/' + file.I_Owner +
            '/' + file.C_FileName;
          this.push(file);
        }, files);
        if (callback) callback(files);
      });
    }
    return service;
  }
]);
