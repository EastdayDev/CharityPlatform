'use strict';

angular.module('epUserModule').controller('epUserEditController',
    ['$scope', '$window', 'epUser', 'epCookie', 'epModal', 'appKey',
        function ($scope, $window, epUser, epCookie, epModal, appKey) {

            $scope.userInfo = {};

            $scope.error = '';
            $scope.userInfo.C_Name = epUser.user.C_Name;
            $scope.userInfo.C_Mobile = epUser.user.C_Mobile;
            $scope.userInfo.C_Remark = epUser.user.C_Remark;
            $scope.userInfo.Id = epUser.user.Id;           

            $scope.EditUserInfo = function () {
                if ($scope.userInfo.C_Name == null) {
                    epModal.info("请填写姓名");
                    return;
                }

                var regBox = {
                    regMobile: /^1[3|4|5|8][0-9]\d{4,8}$/, //手机和电话格式
                    regTel: /^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$/
                }
                var mflag = regBox.regMobile.test($scope.userInfo.C_Mobile);
                var tflag = regBox.regTel.test($scope.userInfo.C_Mobile);
                if (!(mflag||tflag)) {
                    epModal.info("请填写联系方式，或者您的联系方式格式有误");
                    return;
                }

                epUser.EditUserInfo($scope.userInfo, function (data) {
                    if (data > 0) {
                        epUser.user.C_Name = $scope.userInfo.C_Name;
                        epUser.user.C_Mobile = $scope.userInfo.C_Mobile;
                        epUser.user.C_Remark = $scope.userInfo.C_Remark;
                        ///记录Cookie
                        epCookie.put(appKey, epUser.user, { expireMinutes: 180 });
                        epModal.info('信息修改成功！');
                       
                    } else {
                        epModal.info('信息修改失败！');
                    }
                    
                });
                
            }           
        }]);