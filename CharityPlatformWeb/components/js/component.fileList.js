'use strict';

angular.module('epComponentModule').directive('epFileList', ['epFile', 'epModal', function (epFile, epModal) {
    var directive = {};

    directive.restrict = 'EA';

    directive.scope = {
        owner: '=',
        category: '='
    }

    directive.templateUrl = '/Components/html/fileList.html';

    directive.controller = function ($scope) {
        $scope.items = [];   
        $scope.delete = function (id) {
            epModal.confirm("您确定要删除该文件吗", function () {
                epFile.FileDelete(id, function (data) {
                    if (data != '') {
                        epModal.info(data);
                        for (var i = 0; i < $scope.items.length; i++) {
                            if ($scope.items[i].Id === id) {
                                $scope.items[i].I_Flag = 0;
                            }
                        }
                    }
                });
            });
        }
        epFile.GetFilesById($scope.owner, function (data) {
            if (data && data.length > 0) {
                $scope.items = data;
            }
        });
    }

    return directive;
}]);