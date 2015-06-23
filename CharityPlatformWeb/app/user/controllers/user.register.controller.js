'use strict';

angular.module('userModule').controller('UserRegisterController', ['$scope', '$state', '_user', 'epModal', 
	function ($scope, $state, _user, epModal) {

	$scope.user = {
		isOrganization: 0
		, C_Name: '测试01'
		, C_Mobile: '13585513045'
		, C_Password: '123'
		, confirmPwd: '123'
	};	
	$scope.lableSwitch = function(isOrganization) {
		$scope.user.isOrganization = isOrganization;
	}

	/// 产生随机数
	function generateMixed(under, over){ 
		switch(arguments.length){ 
		 	case 1: return parseInt(Math.random()*under+1); 
			case 2: return parseInt(Math.random()*(over-under+1) + under); 
			default: return 0; 
		} 
	} 

	var code = generateMixed(100000, 999999);
	/// 暂时不做处理。待可发短信时由用户直接输入
	$scope.user.securityCode = code;

	$scope.generateCode = function(){
		code = generateMixed(100000, 999999);
		$scope.user.securityCode = code;
	}

	$scope.register = function(user){		
		_user.register(user, function(data){
			if (data === -2){
				epModal.info('手机号码已经被使用！');
			} else {
				_user.login(user.C_Mobile, user.C_Password, function(data){					
					$state.go('home');
				});
			}
		});
	}
}]);
    