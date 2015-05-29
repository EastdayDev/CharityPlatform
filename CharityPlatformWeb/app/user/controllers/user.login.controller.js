'use strict';

angular.module('epUserModule').controller('epUserLoginController',
    ['$scope', '$location', 'epUser', 'epCookie', 'epAuth','appKey', 'epAuditList','epModal',
    function ($scope, $location, epUser, epCookie, epAuth, appKey, epAuditList, epModal) {
    $scope.userName = 'sunpengxiang';
    $scope.password = '123';

    $.idcode.setCode();

    $scope.$emit('disableFloatMenu');
    $scope.$emit('onHasLayout', false);
    $scope.$emit('onChangeTitle', '用户登录');

    var checkIDCode = function () {
        var code = $("#ehong-code-input").val();
        if (code == "" || !$.idcode.validateCode()) {
            epModal.info("验证码错误，请重新输入");
            return false;
        }
        return true;
    }

    $scope.login = function () {

        epUser.Verify($scope.userName, $scope.password, function (data) {
            if (!!data) {
                epUser.user = data;
                epUser.userId = epUser.user.Id;
                /// 加载权限
                epAuth.GetAuthes(epUser.userId);
                /// 加载用户部门【uid】
                epUser.GetUserDepts();
                ///记录Cookie
                epUser.IsLeader(epUser.userId, function (data) {
                    epUser.user.IsLeader = data;
                    epCookie.put(appKey, epUser.user, { expireMinutes: 180 });
                });
                ///检查待审核数
                epAuditList.GetUserAuditCount(epUser.userId, function (data) {
                    if (data > 0) {
                        $location.path('/audit/list');
                    } else {
                        $location.path('/project/list');
                    }
                });
                $scope.$emit('onHasLayout', true);
            } else {
                $scope.password = "";
                epModal.info("用户名/密码错误，请重新输入");
            } 
        });
    }
}]);