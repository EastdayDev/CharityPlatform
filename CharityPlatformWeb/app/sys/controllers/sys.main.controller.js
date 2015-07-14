'use strict';

angular.module('sysModule').controller('SysMainController', ['$scope', '$state',
	'_sys', '_cookie', 'appKey',
	function($scope, $state, _sys, _cookie, appKey) {

		$scope._sys = _sys;

		///检查Cookie
		if (!_cookie.get(appKey)) {
			$state.go('login');
		}

	}
]);
