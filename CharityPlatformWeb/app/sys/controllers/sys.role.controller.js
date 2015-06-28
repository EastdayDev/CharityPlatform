'use strict';

angular.module('sysModule').controller('SysRoleController',
['$scope', '_sys', '_auth', 'epModal', function ($scope, _sys, _auth, epModal) { 
	var pageSize = 10;
	$scope.filterValue = '';
	$scope.currentRole = {};
	$scope._sys = _sys;
	_sys.resetHold(0);

	$scope.search = function(filterValue){  		
		_auth.Usp_Role_List(filterValue, _sys.hold.pageIndex, pageSize, function(data){
			$scope.items = data;
			_sys.hold.total = 0;
			if (data && data.length > 0){
        		_sys.hold.total = Math.ceil($scope.items[0].Total / pageSize); 
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
		epModal.showModal('/app/sys/views/role.edit.html', 'RoleEditController');
	}

	$scope.pickRole = function(item){
		$scope.currentRole = item;
		_auth.Usp_Funcs_ByRole(item.Id, function(data){
		 	$scope.roleFuncs = data;
		 })
	}

	$scope.$on('onSaveSuccess', function(e, editItem){
		var length = $scope.items.length;
		for (var i = 0; i < length; i++) {
			if ($scope.items[i].Id === editItem.Id) return;
		};
		$scope.items.insert(0, editItem);		
	}); 

	$scope.setRoleFunc = function(funcItem){
		if (!$scope.currentRole) return;
		_auth.Usp_RoleFunc_Insert()
	}

	$scope.$on('$viewContentLoaded', function () {
		 $scope.search($scope.filterValue);

		 _auth.Usp_Func_List(function(data){
		 	$scope.funcs = data;
		 })
    });
}]);

angular.module('sysModule').controller('RoleEditController',
['$scope', '$rootScope', '$modalInstance', '_sys', '_auth', '_user', 'epModal',
function ($scope, $rootScope, $modalInstance, _sys, _auth, _user, epModal) { 
	
	$scope._sys = _sys;
	$scope.save = function(){
		if (!_sys.editItem.C_Name){
			epModal.info('角色名称');
			return;
		}
		if (_sys.editItem.Id === -1) {
			///新增数据设置默认值
			_sys.editItem.I_Flag = 1;					 
		}
		_auth.Usp_Role_Insert(_sys.editItem, function(data){
			if (data) {
				$modalInstance.close();
				if (_sys.editItem.Id === -1) _sys.editItem.Id = parseInt(data);
				$rootScope.$broadcast('onSaveSuccess', _sys.editItem);				
			} else {
				angular.copy(_sys.copyItem, _sys.editItem);
			}
		});
	}

	$scope.close = function () {
        $modalInstance.close();
        angular.copy(_sys.copyItem, _sys.editItem);
    }     
}]);