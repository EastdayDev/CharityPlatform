'use strict';

angular.module('sysModule').controller('SysUserController', ['$scope', '_user',
	'_sys', 'epModal',
	function($scope, _user, _sys, epModal) {

		var pageSize = 10;
		$scope.filterValue = '';
		$scope._sys = _sys;
		_sys.resetHold(3);

		$scope.search = function(filterValue) {
			_user.Usp_User_List(filterValue, _sys.hold.pageIndex, pageSize, function(
				data) {
				$scope.items = data;
				_sys.hold.total = 0;
				if (data && data.length > 0) {
					_sys.hold.total = Math.ceil($scope.items[0].Total / pageSize)
				}
			});
		}

		$scope.$on('onPageChanged', function(e, pageIndex) {
			_sys.hold.pageIndex = pageIndex;
			$scope.search($scope.filterValue);
		});

		$scope.$on('onUserEditSuccess', function() {
			$scope.search($scope.filterValue);
		})

		$scope.showEdit = function(item) {
			_sys.editItem = item;
			angular.copy(_sys.editItem, _sys.copyItem);
			epModal.showModal('/app/sys/views/user.edit.html',
				'SysUserEditController');
		}

		$scope.showUserRole = function(item) {
			_sys.editItem = item;
			angular.copy(_sys.editItem, _sys.copyItem);
			epModal.showModal('/app/sys/views/user.role.html', 'UserRoleController');
		}

		$scope.$on('$viewContentLoaded', function() {
			$scope.search($scope.filterValue);
		});
	}
]);

angular.module('sysModule').controller('SysUserEditController', ['$scope',
	'$rootScope', '_sys', '_user', '$modalInstance', 'epModal',
	function($scope, $rootScope, _sys, _user, $modalInstance, epModal) {

		$scope._sys = _sys;
		$scope._user = _user;

		var verify = function() {
			if (!_sys.editItem.C_Login) {
				epModal.info('登录名不能为空！');
				return false;
			}
			if (!_sys.editItem.C_Name) {
				epModal.info('姓名不能为空！');
				return false;
			}
			return true;
		}

		var userInsert = function() {
			if (_sys.editItem.Id === -1) {
				_sys.editItem.I_Flag = 1;
				_sys.editItem.I_Category = 101;
			}
			_user.Usp_User_Insert(_sys.editItem, function(data) {
				if (data) {
					if (_sys.editItem.Id === -1) _sys.editItem.Id = parseInt(data);
					$modalInstance.close();
					$rootScope.$broadcast('onUserEditSuccess');
				}
				angular.copy(_sys.copyItem, _sys.editItem);
			});

		}

		$scope.save = function() {
			if (!verify()) return;

			if (_sys.editItem.Id === -1) {
				_user.Usp_UserInfo_ByLogin(_sys.editItem.C_Login, function(data) {
					if (data && data.length > 0) {
						epModal.info('登录名已经存在！');
					} else {
						userInsert();
					}
				});
			} else {
				userInsert();
			}

		}


		$scope.cancel = function() {
			$modalInstance.close();
			angular.copy(_sys.copyItem, _sys.editItem);
		}
	}
]);


angular.module('sysModule').controller('UserRoleController', ['$scope',
	'$rootScope', '$modalInstance', '_sys', '_auth', '_user', 'epModal',
	function($scope, $rootScope, $modalInstance, _sys, _auth, _user, epModal) {

		$scope._sys = _sys;
		$scope._auth = _auth;
		$scope.userRoles = [];

		_auth.Usp_Roles_ByUser(_sys.editItem.Id, function(data) {
			angular.forEach(data, function(item) {
				this.push(item.Id);
			}, $scope.userRoles);
			//$scope.userRoles = data;
		})

		$scope.save = function() {
			if ($scope.userRoles.length === 0) return;
			var userId = _sys.editItem.Id;
			var userRoleInsertItems = [];
			angular.forEach($scope.userRoles, function(item) {
				this.push({
					I_Role: item,
					I_User: userId
				});
			}, userRoleInsertItems);
			_auth.Usp_UserRole_Insert(userRoleInsertItems, function(data) {
				if (data) {
					$modalInstance.close();
				} else {
					epModal.info('权限设置发生异常!');
				}
			});
		}

		$scope.close = function() {
			$modalInstance.close();
		}
	}
]);
