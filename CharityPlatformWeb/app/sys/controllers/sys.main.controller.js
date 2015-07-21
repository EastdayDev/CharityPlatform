'use strict';

angular.module('sysModule').controller('SysMainController', ['$scope', '$state',
	'_sys', '_user', '_cookie', 'appKey',
	function($scope, $state, _sys, _user, _cookie, appKey) {

		$scope._sys = _sys;
		$scope._user = _user;

		///检查Cookie
		if (!_cookie.get(appKey)) {
			$state.go('login');
		}

	}
]);
