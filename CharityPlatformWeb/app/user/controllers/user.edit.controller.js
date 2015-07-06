'use strict';

angular.module('userModule').controller('UserEditController', ['$scope', '$stateParams', '_user', '_partner', '_app', '_file', '$state', '$window', 'epModal', '_fileServer',
	function($scope, $stateParams, _user, _partner, _app, _file, $state, $window, epModal, _fileServer) {
		$scope.cancel = function() {
			$window.history.back();
		}

		$scope.save = function(user, org) {
				if (org) {
					_partner.Usp_UserOrg_Insert(user, org, function(data) {
						if (data !== '1') {
							epModal.info('服务器操作发生异常, 请联系系统管理员!');
						} else {
							$window.history.back();
						}
					});
				} else {
					_user.Usp_User_Insert(user, function(data) {
						if (data !== '1') {
							epModal.info('服务器操作发生异常, 请联系系统管理员!');
						} else {
							$window.history.back();
						}
					});
				}
			}
			///上传图片参数  140 展示图片 
		// var imageUploadParam = {
		// 	I_Owner: -1,
		// 	I_Category: 140,
		// 	I_Uploader: -1,
		// 	C_Remark: ''
		// };

		var showFileList = function(id, category) {
			_file.Usp_File_List($stateParams.id, category, function(data) {
				$scope.files = [];
				angular.forEach(data, function(file) {
					file.C_FileName = '/files/' + file.I_Owner + '/' + file.C_FileName;
					this.push(file);
				}, $scope.files);
			});
		}

		$scope.navToUpload = function() { 
			$state.go('');
		}

		$scope.$on('$viewContentLoaded', function(e) {
			_fileServer.uploadParameter.I_Owner = $stateParams.id;
			_fileServer.uploadParameter.I_Uploader = _user.userId;

			_partner.Usp_Org_ById($stateParams.id, function(data) {
				if (data && data.length > 0) {
					$scope.org = data[0];
					showFileList($stateParams.id, 141)
				}
			});

			_user.Usp_UserInfo_ById($stateParams.id, function(data) {
				if (data && data.length > 0) {
					$scope.user = data[0];
					if ($scope.user.I_Category === 105) {
						///机构用户
						_fileServer.uploadParameter.I_Category = 141; ///机构用户展示图片
					} else {
						_fileServer.uploadParameter.I_Category = 140; /// 普通用户头像
					}
					showFileList($stateParams.id, _fileServer.uploadParameter.I_Category);
				}
			});

		});
	}
]);