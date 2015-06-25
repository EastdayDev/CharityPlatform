'use strict';

angular.module('sysModule').controller('SysUserController',
['$scope', '_user', '_sys', function ($scope, _user, _sys) { 
	
	var pageSize = 10;
	$scope.filterValue = '';
	$scope._sys = _sys;
	_sys.resetHold(3);

	$scope.search = function(filterValue){  		
		_user.Usp_User_List(filterValue, _sys.hold.pageIndex, pageSize, function(data){
			$scope.items = data;
			_sys.hold.total = 0;
			if (data && data.length > 0){
        		_sys.hold.total = Math.ceil($scope.items[0].Total / pageSize) 
        	}
		});
	}

	$scope.$on('onPageChanged', function(e, pageIndex){
		_sys.hold.pageIndex = pageIndex;	
		$scope.search($scope.filterValue);	
	});

	$scope.$on('$viewContentLoaded', function () {
		 $scope.search($scope.filterValue);
    });
}]);