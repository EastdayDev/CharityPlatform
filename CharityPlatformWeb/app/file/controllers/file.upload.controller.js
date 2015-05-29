'use strict';

angular.module('epFileModule').controller('epFileUploadController', ['$scope', '$stateParams', 'epFile', 'epProject', 'epAuth', 'epModal', '$state', 'epContract', '$http',
    function ($scope, $stateParams, epFile, epProject, epAuth, epModal, $state, epContract, $http) {

        $scope.projectid = $stateParams.id;

        $scope.OwnerObject = {};
        $scope.OwnerObject.Owner = parseInt($stateParams.ownerId);
        $scope.OwnerObject.Category = parseInt($stateParams.Category);
        $scope.OwnerObject.FileTitle = '';
        $scope.OwnerObject.Remark = '';

        $scope.files = [];
        $scope.items = [];

        var findFileById = function (values, id) {
            var length = values.length;
            for (var i = 0; i < length; i++) {
                if (values[i].Id == id) {
                    return values[i];
                }
            }
        }
        $scope.uploadfiles = function (files, ownerObject) {
            if (files[0].size / 1024 / 1024 > 20) {
                epModal.info("文件大小超出限制");
                return;
            }
            ownerObject.Owner = $scope.belong.Id;
            epFile.upload(files, ownerObject, function (data) {
                if (data > 0) {
                    epModal.info('上传成功！');
                    $scope.bindFiles();
                } else {
                    epModal.info('上传失败！');
                }

            });
        }
        $scope.bindFiles = function () {
            epProject.GetProjectFiles($scope.projectid, function (data) {
                if (data && data.length > 0) {
                    $scope.items = data;
                }
            });
        }
        //删除功能
        $scope.delete = function (id) {
            epModal.confirm("您确定要删除该文件吗", function () {
                epFile.FileDelete(id, function (data) {
                    if (data != '') {
                        init();
                    }
                });
            });
        }
        $scope.GetCategoryByFile = function (value, title) {
            switch (value) {
                case 1: return "项目：" + title;
                case 2: return "预算：" + title;
                case 3: return "合同：" + title;
                case 4: return "报销：" + title;
                case 5: return "发票：" + title;
                case 6: return "工单：" + title;
                default: return "未知";
            }
        }
        $scope.Download = function (category, fullName, originalName) {
            //var param = { category: category, fullName: fullName, originalName: originalName };
            //$.ajax({
            //    url: "http://localhost:27681/api/File/Download",
            //    type: 'GET',
            //    data: param,
            //    dataType: 'JSONP',
            //    success: function (data) {
            //        console.log(data);
            //    }
            //});

            epFile.Download(category, fullName, originalName);
        }
       
        //初始化
        $scope.$on('$viewContentLoaded', function () {
            epFile.GetBelong($scope.projectid, function (data) {
                if (data && data.length > 0) {
                    $scope.array = data;
                    $scope.belong = findFileById($scope.array, $scope.OwnerObject.Owner);
                }
            });
            $scope.bindFiles();
        });
    }]);