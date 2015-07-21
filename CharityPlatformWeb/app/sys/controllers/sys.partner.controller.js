'use strict';

angular.module('sysModule').controller('SysPartnerController',
['$scope', '_sys', '_user', '_partner', 'epModal', function ($scope, _sys, _user, _partner, epModal) {

	var pageSize = 10;
	$scope.filterValue = '';
	$scope._sys = _sys;
	_sys.resetHold(2);

	$scope.search = function(filterValue){
		_partner.Usp_Org_List(filterValue, _sys.hold.pageIndex, pageSize, function(data){
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
		epModal.showModal('/app/sys/views/partner.edit.html', 'PartnerEditController');
	}

	$scope.$on('onSaveSuccess', function(e, editItem){
		var length = $scope.items.length;
		for (var i = 0; i < length; i++) {
			if ($scope.items[i].Id === editItem.Id) return;
		};
		$scope.items.insert(0, editItem);
	});

	// $scope.audit = function(item){
	// 	_sys.editItem = item;
	// 	angular.copy(_sys.editItem, _sys.copyItem);
	// 	epModal.showModal('/app/sys/views/partner.audit.html', 'PartnerAuditController');
	// }

 	$scope.audit = function(item, auditType){
 		_sys.editItem = item;
 		_sys.editItem.I_Auditer = _user.userId;
 		_sys.editItem.I_Audited = auditType;
		_partner.Usp_Org_Insert(_sys.editItem, function(data){
			if (!data) {
				angular.copy(_sys.copyItem, _sys.editItem);
			}
		});
 	}

	$scope.$on('$viewContentLoaded', function () {
		 $scope.search($scope.filterValue);
    });
}]);


angular.module('sysModule').controller('PartnerEditController',
['$scope', '$rootScope', '$modalInstance', '_sys', '_user', '_partner', 'epModal',
function ($scope, $rootScope, $modalInstance, _sys, _user, _partner, epModal) {

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
		_partner.Usp_Org_Insert(_sys.editItem, function(data){
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



// angular.module('sysModule').controller('PartnerAuditController',
// ['$scope', '$rootScope', '$modalInstance', '_sys', '_user', 'epModal',
// function ($scope, $rootScope, $modalInstance, _sys, _user, epModal) {

// 	$scope._sys = _sys;
// 	$scope.save = function(){
// 		_sys.editItem.I_Auditer = _user.userId;
// 		_sys.Usp_Org_Insert(_sys.editItem, function(data){
// 			if (data) {
// 				$modalInstance.close();
// 				$rootScope.$broadcast('onSaveSuccess', _sys.editItem);
// 			} else {
// 				angular.copy(_sys.copyItem, _sys.editItem);
// 			}
// 		});
// 	}

// 	$scope.close = function () {
//         $modalInstance.close();
//         angular.copy(_sys.copyItem, _sys.editItem);
//     }
// }]);
