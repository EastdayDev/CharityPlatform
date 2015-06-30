'use strict';

angular.module('userModule').controller('UserLoginController',
['$scope', '_user', '_app', '$state', 'epModal', 
function ($scope, _user, _app, $state, epModal) { 
	
	$scope.userName = '13585513045';
	$scope.password = '123';

	$scope.login = function(userName, password){
		_user.login(userName, password, function(data){
			if (data){				
				_app.user = _user.user;
				var stateName = $scope.fromState.name || 'home'; 
				$state.go(stateName);			
			} else {
				epModal.info('用户名密码错误！');
			}
		});
	} 
}]);
    