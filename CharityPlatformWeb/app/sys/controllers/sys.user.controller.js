'use strict';

angular.module('sysModule').controller('SysUserController',
['$scope', '_user', '_sys', 'epModal', function ($scope, _user, _sys, epModal) { 
	
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

	$scope.showEdit = function(item){
		_sys.editItem = item;
		angular.copy(_sys.editItem, _sys.copyItem);
		epModal.showModal('/app/sys/views/user.edit.html', 'UserEditController');
	}
	
	$scope.$on('$viewContentLoaded', function () {
		 $scope.search($scope.filterValue);
    });
}]);

angular.module('sysModule').controller('UserEditController',
['$scope', '$rootScope', '$modalInstance', '_sys', '_user', 'epModal',
function ($scope, $rootScope, $modalInstance, _sys, _user, epModal) { 
	
	$scope._sys = _sys;
	$scope.save = function(){
		_user.Usp_User_Insert(_sys.editItem, function(data){
			if (data) {
				$modalInstance.close();
				if (_sys.editItem.Id === -1) _sys.editItem.Id = parseInt(data);
				$rootScope.$broadcast('onSaveSuccess', _sys.editItem);				
			}
		});
	}

	$scope.close = function () {
        $modalInstance.close();
        angular.copy(_sys.copyItem, _sys.editItem);
    }     
}]);