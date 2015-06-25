'use strict';

angular.module('sysModule').controller('SysMainController',
['$scope', '$state', '_sys', '_cookie', 'appKey', 
function ($scope, $state, _sys, _cookie, appKey) { 
	
	$scope.targetState = 'sys.user';
	$scope._sys = _sys;

	$scope.nav = function(tab){
		_sys.hold.tab = tab;
		switch(_sys.hold.tab){
			case 0: $state.go('sys.role'); break;			
			case 1: $state.go('sys.permission'); break;
			case 2: $state.go('sys.partner'); break;
			default: $state.go('sys.user'); break;
		}
	}
	 ///检查Cookie
    if (!_cookie.get(appKey)) {
        $state.go('login');
    }

}]);