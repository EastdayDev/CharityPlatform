'use strict';

angular.module('userModule').controller('UserEditController',
['$scope', '_user', '_partner', '_app', '$state', '$window', 'epModal', 
function ($scope, _user, _partner, _app, $state, $window, epModal) {  
	$scope.cancel = function(){
		$window.history.back();
	}

	$scope.save = function(){
		_user.Usp_User_Insert($scope.user, function(data){

		});

		_partner.Usp_Org_Insert($scope.org, function(data){

		});
	}

	$scope.$on('$viewContentLoaded', function(e){		
		_partner.Usp_Org_ById(_user.user.Id, function(data){
			if (data && data.length > 0){
				$scope.org = data[0];
			}
		});

		_user.Usp_UserInfo_ById(_user.user.Id, function(data){
			if (data && data.length > 0){
				$scope.user = data[0];
			}
		});
	});
}]);


