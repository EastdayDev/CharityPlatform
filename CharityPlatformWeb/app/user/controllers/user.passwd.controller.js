'use strict';

angular.module('epUserModule').controller('epUserPasswdController',
    ['$scope', '$window', 'epUser', 'epCookie', 'epModal',
        function ($scope, $window, epUser, epCookie, epModal) {

            $scope.$emit('disableFloatMenu');
            $scope.$emit('onChangeTitle', '修改密码');

            $scope.user = {};

            var user = epCookie.appCookie();
            $scope.user.C_Name = user.C_Name;
            $scope.user.C_Login = user.C_Login;

            $scope.user.C_OldPwd = '';
            $scope.user.C_NewPwd = '';
            $scope.user.C_ConfirmPwd = '';

            $scope.error = '';

            $scope.ChangePwd = function () {
                if ($scope.user.C_NewPwd.length < 8) {
                    epModal.info('密码长度必须大于8位');
                    return;
                }

                if ($scope.user.C_ConfirmPwd !== $scope.user.C_NewPwd) {
                    epModal.info('两次输入密码不一致，请重新输入');
                    $scope.newPwd = '';
                    $scope.confirmPwd = '';
                    return;
                }

                epUser.ChangePwd($scope.user, function (data) {
                    if (data === 1) {
                        epModal.info('密码修改成功！')
                        // $window.history.back(1);
                    } else if (data === 0) {
                        epModal.info('原密码输入错误！');
                    } else {
                        epModal.info('修改密码发生错误！');
                    }
                });
            }
        }]);