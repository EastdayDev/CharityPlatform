'use strict';

angular.module('userModule').controller('UserLoginController', ['$scope',
	'_user', '_app', '$state', 'epModal',
	function($scope, _user, _app, $state, epModal) {

		$scope.userName = 'admin';
		$scope.password = '123';

		$scope.login = function(userName, password) {
			_user.login(userName, password, function(data) {
				if (data) {
					_app.user = _user.user;
					if (_app.user.I_Category === 101) {
						/// 基金会用户
						$state.go('sys.checklist');
					} else if (_app.user.I_Category === 100) {
						/// 系统管理员
						$state.go('sys.user');
					} else {
						var stateName = $scope.fromState.name || 'home';
						$state.go(stateName);
					}
				} else {
					epModal.info('用户名密码错误！');
				}
			});
		}
	}
]);
