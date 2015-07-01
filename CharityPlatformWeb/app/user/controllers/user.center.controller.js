'use strict';

angular.module('userModule').controller('UserCenterController',
['$scope', '_user', '_app', '$state', 'epModal', 
function ($scope, _user, _app, $state, epModal) {  
}]);
    

angular.module('userModule').controller('UserDetailController',
['$scope', '_user', '_app', '$state', 'epModal', 
function ($scope, _user, _app, $state, epModal) { 	
 
 	$scope.submitAudit = function(){
 		if (!$scope.user.I_Audited){

 		}
 	}

 	$scope.$on('$viewContentLoaded', function(e){
		_user.Usp_UserInfo_ById(_user.user.Id, function(data){
			if (data && data.length > 0){
				$scope.user = data[0];				
				$scope.auditState = $scope.user.I_Audited===185 ? '/images/ystg.png' : '/images/wsh.png';
			}
		});
	});
}]);


angular.module('userModule').controller('UserProjectController',
['$scope', '_user', '_app', '$state', 'epModal', 
function ($scope, _user, _app, $state, epModal) { 
	 
}]);    