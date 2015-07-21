angular.module('userModule').controller('UserPwdController', ['$scope', '_user',
	'_app', '$state', '$window', 'epModal',
	function($scope, _user, _app, $state, $window, epModal) {

		$scope._user = _user.user;
		$scope.user = {
			C_NewPwd: '',
			C_ConfirmPwd: '',
			C_OldPwd: ''
		};

		$scope.changePassword = function() {
			if ($scope.user.C_NewPwd.length < 8) {
				epModal.info('密码至少为8位的字母与数字组合！');
				return;
			}
			if ($scope.user.C_NewPwd !== $scope.user.C_ConfirmPwd) {
				epModal.info('两次密码输入不一致！');
				return;
			}
			$scope.user.Id = _user.user.Id;
			_user.Usp_Change_Pwd($scope.user, function(data) {
				if (data == 1) {
					$window.history.back();
					epModal.info('密码修改成功!');
				} else if (data == 2) {
					epModal.info('旧密码输入错误!');
				}
			});
		}

		$scope.cancel = function() {
			$window.history.back();
		}

	}
]);
