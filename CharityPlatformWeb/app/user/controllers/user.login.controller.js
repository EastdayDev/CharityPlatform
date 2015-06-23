'use strict';

angular.module('userModule').controller('UserLoginController',
['$scope', '_user', function ($scope, _user) { 
	$scope.login = function(userName, password){
		_user.login(userName, password, function(data){
			if (data){

			}
		});
	} 
}]);
    