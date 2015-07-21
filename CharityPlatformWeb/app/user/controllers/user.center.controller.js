'use strict';

angular.module('userModule').controller('UserCenterController', ['$scope',
	'_user', '_app', '$state', '_cookie', 'appKey', 'epModal',
	function($scope, _user, _app, $state, _cookie, appKey, epModal) {
		if (!_cookie.get(appKey)) {
			$state.go('login');
		}

		$scope.$on('$viewContentLoaded', function() {
			_user.Usp_User_Balance(_user.userId, function(data) {
				$scope.M_Balance = data[0].M_Balance;
			});
		})
	}
]);


angular.module('userModule').controller('UserDetailController', ['$scope',
	'$state', '_user', '_partner', '_app', 'epModal',
	function($scope, $state, _user, _partner, _app, epModal) {

		$scope.submitAudit = function(id) {
			_partner.OrgSubmitAudit(id, function(data) {
				if (data == 1) {
					$scope.user.I_Audited = 195;
					epModal.info('机构数据已经提交审核！');
				}
			});
		}

		$scope.$on('$viewContentLoaded', function(e) {
			if (_user.userId !== '-1') {
				_user.Usp_UserInfo_ById(_user.user.Id, function(data) {
					if (data && data.length > 0) {
						$scope.user = data[0];
						$scope.auditState = $scope.user.I_Audited === 185 ?
							'/images/ystg.png' : '/images/wsh.png';
					}
				});


			}
		});


	}
]);


angular.module('userModule').controller('UserProjectController', ['$scope',
	'_user', '_app', '$state', 'epModal',
	function($scope, _user, _app, $state, epModal) {

	}
]);
