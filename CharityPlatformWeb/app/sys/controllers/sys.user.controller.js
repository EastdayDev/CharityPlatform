'use strict';

angular.module('sysModule').controller('SysUserController',
['$scope', '_user', '_http', function ($scope, _user, _http) { 
	
	var pageSize = 10;

	$scope.filterValue = '';

	$scope.search = function(filterValue){
		var param = {
			proc: 'Usp_user_List', 
			entity: {
				pageIndex: _user.userPage.index, 
				filter: filterValue, 
				pageSize: pageSize}
		};
        _http.postTable(param, function(data){
        	$scope.users = data;
        	_user.userPage.total = Math.ceil($scope.users[0].Total / pageSize)
        });
	}

	$scope.$on('$viewContentLoaded', function () {
		 $scope.search($scope.filterValue);
    });
}]);