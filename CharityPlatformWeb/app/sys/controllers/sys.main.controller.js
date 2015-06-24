'use strict';

angular.module('sysModule').controller('SysMainController',
['$scope', '$state', '_cookie', 'appKey', function ($scope, $state, _cookie, appKey) { 
	
	$scope.targetState = 'sys.user';

	$scope.nav = function(stateName){
		$scope.targetState = stateName;
		$state.go(stateName);
	}	

	console.log('ddddddddddddddddddddddddd');

	 ///检查Cookie
    if (!_cookie.get(appKey)) {
        $state.go('login');
    }

}]);