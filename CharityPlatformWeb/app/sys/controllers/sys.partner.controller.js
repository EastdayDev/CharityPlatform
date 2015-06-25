'use strict';

angular.module('sysModule').controller('SysPartnerController',
['$scope', '_sys', 'epModal', function ($scope, _sys, epModal) { 
	
	var pageSize = 10;
	$scope.filterValue = '';
	$scope._sys = _sys;
	_sys.resetHold(2);

	$scope.search = function(filterValue){  		
		_sys.Usp_Org_List(filterValue, _sys.hold.pageIndex, pageSize, function(data){
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

	$scope.showPartnerEdit = function(editId){
		_sys.editId = editId;
		epModal.showModal('/app/sys/views/partner.edit.html', 'PartnerEditController');
	}

	$scope.$on('onSaveSuccess', function(e, editItem){
		console.log(editItem);
	});

	$scope.$on('$viewContentLoaded', function () {
		 $scope.search($scope.filterValue);
    });
}]);


angular.module('sysModule').controller('PartnerEditController',
['$scope', '$modalInstance', '_sys', function ($scope, $modalInstance, _sys) { 
	
	$scope._sys = _sys;
	$scope.save = function(){
		_sys.Usp_Org_Insert(_sys.editItem, function(data){
			if (data) {
				$scope.$emmit('onSaveSuccess', _sys.editItem);
				$modalInstance.close();
			}
		});
	}

	$scope.close = function () {
        $modalInstance.close();
    }     
}]);