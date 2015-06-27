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

angular.module('sysModule').controller('UserEditController',
['$scope', '$rootScope', '$modalInstance', '_sys', '_user', 'epModal',
function ($scope, $rootScope, $modalInstance, _sys, _user, epModal) { 
	
	$scope._sys = _sys;
	$scope.save = function(){
		if (!_sys.editItem.C_Name){
			epModal.info('请填写机构名称');
			return;
		}
		if (_sys.editItem.Id === -1) {
			///新增数据设置默认值
			_sys.editItem.I_Flag = 1;						
			_sys.editItem.I_Auditer = -1;
			_sys.editItem.I_Audited = 195; /// 新开户
			_sys.editItem.I_Creater = _user.userId;
		}
		_sys.Usp_Org_Insert(_sys.editItem, function(data){
			if (data) {
				$modalInstance.close();
				if (_sys.editItem.Id === -1) _sys.editItem.Id = parseInt(data);
				$rootScope.$broadcast('onPartnerSaveSuccess', _sys.editItem);				
			}
		});
	}

	$scope.close = function () {
        $modalInstance.close();
    }     
}]);