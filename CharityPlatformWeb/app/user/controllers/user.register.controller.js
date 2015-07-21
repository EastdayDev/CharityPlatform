'use strict';

angular.module('userModule').controller('UserRegisterController', ['$scope',
	'$state', '_user', '_app', 'epModal',
	function($scope, $state, _user, _app, epModal) {

		$scope.user = {
			isOrganization: 0,
			C_Name: '张三丰',
			C_Mobile: '13585513045',
			C_Password: '123',
			confirmPwd: '123'
		};
		$scope.lableSwitch = function(isOrganization) {
			$scope.user.isOrganization = isOrganization;
		}

		/// 产生随机数
		function generateMixed(under, over) {
			switch (arguments.length) {
				case 1:
					return parseInt(Math.random() * under + 1);
				case 2:
					return parseInt(Math.random() * (over - under + 1) + under);
				default:
					return 0;
			}
		}

		var code = generateMixed(100000, 999999);
		/// 暂时不做处理。待可发短信时由用户直接输入
		$scope.user.securityCode = code;

		$scope.generateCode = function() {
			code = generateMixed(100000, 999999);
			$scope.user.securityCode = code;
		}

		var verify = function() {
			if (!$scope.user.C_Password || $scope.user.C_Password.length < 8) {
				epModal.info('密码不能为空且长度至少为8个字符');
				return false;
			}

			if ($scope.user.C_Password !== $scope.user.confirmPwd) {
				epModal.info('两次密码输入不一致！');
				return false;
			}

			return true;
		}
		$scope.register = function(user) {
			if (!verify()) return;
			_user.register(user, function(data) {
				if (data === -2) {
					epModal.info('手机号码已经被使用！');
				} else {
					_user.login(user.C_Mobile, user.C_Password, function(data) {
						_app.user = _user.user;
						$state.go('home');
					});
				}
			});
		}
	}
]);
