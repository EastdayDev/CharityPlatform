'use strict';

angular.module('userModule').controller('UserEditController',
['$scope', '$stateParams', '_user', '_partner', '_app', '$state', '$window', 'epModal', 
function ($scope, $stateParams, _user, _partner, _app, $state, $window, epModal) {  
	$scope.cancel = function(){
		$window.history.back();
	} 

	$scope.save = function(user, org){
		if (org){
			_partner.Usp_UserOrg_Insert(user, org, function(data){			
				if (data!=='1'){			 				
					epModal.info('服务器操作发生异常, 请联系系统管理员!');
				} else {
					$window.history.back();
				}
			});
		} else {
			_user.Usp_User_Insert(user, function(data){
				if (data !== '1'){			 				
					epModal.info('服务器操作发生异常, 请联系系统管理员!');
				} else {
					$window.history.back();
				}
			});
		}
	} 

	$scope.$on('$viewContentLoaded', function(e){		
		_partner.Usp_Org_ById($stateParams.id, function(data){
			if (data && data.length > 0){
				$scope.org = data[0];
			}
		});

		_user.Usp_UserInfo_ById($stateParams.id, function(data){
			if (data && data.length > 0){
				$scope.user = data[0];
			}
		});
	});
}]);


