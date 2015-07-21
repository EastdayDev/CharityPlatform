'use strict';

angular.module('homeModule').controller('HomeController', ['$scope',
	'_donation', '_user',
	function($scope, _donation, _user) {
		var slides = $scope.slides = [];
		// 添加轮播图源
		slides.push({
			image: '/images/rollpic_1.png',
			text: ''
		});
		slides.push({
			image: '/images/rollpic_2.png',
			text: ''
		});
		slides.push({
			image: '/images/rollpic_3.png',
			text: ''
		});

		$scope.logon = _user && _user.userId > 0;

		$scope.$on('$viewContentLoaded', function() {
			_donation.USP_Donation_Projects(_user.userId, function(data) {
				if (data.length > 3) {
					data.splice(3)
				}
				$scope.projects = data;

			});
		});

	}
]);
