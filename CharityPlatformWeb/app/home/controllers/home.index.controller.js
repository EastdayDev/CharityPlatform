'use strict';

angular.module('homeModule').controller('HomeController',
['$scope', function ($scope) {
	var slides = $scope.slides = [];
    // 添加轮播图源
    slides.push({ image: '/images/rollpic_1.png', text: '' });
    slides.push({ image: '/images/rollpic_2.png', text: '' });
    slides.push({ image: '/images/rollpic_3.png', text: '' });
}]);
    