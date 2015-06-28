'use strict';

angular.module('componentModule').directive('bootStrapPage', function () {
    var directive = {};

    directive.restrict = 'EA';

    directive.scope = {
        pageIndex: '=',
        pageTotal: '='
    }

    directive.templateUrl = '/Components/html/bootstrap.pager.html';

    directive.controller = ['$scope', function($scope){
    	///每组显示页标签数
    	var groupSize = 5;    	

        $scope.hideStyle = true;

    	$scope.totals = [];
    	$scope.maxGroupIndex = Math.ceil($scope.pageTotal / groupSize) 
    	$scope.groupIndex = Math.ceil($scope.pageIndex / groupSize) 

    	var resetPageItems = function(groupIndex){ 
    		var maxPageIndex = Math.min(groupIndex * groupSize, $scope.pageTotal);
 			var startPageIndex = (groupIndex - 1) * groupSize + 1; 
 			$scope.totals.length = 0;
			for (var i = startPageIndex; i <= maxPageIndex; i++) {
	    		$scope.totals.push(i);
	    	}
    	}		

		$scope.$watch('pageTotal', function(e){
			$scope.totals = [];
    		$scope.maxGroupIndex = Math.ceil($scope.pageTotal / groupSize) 
    		$scope.groupIndex = Math.ceil($scope.pageIndex / groupSize) 
			resetPageItems($scope.groupIndex); 
		});

    	$scope.previousGroup = function() {    		
            if ($scope.groupIndex > 1) {
    			resetPageItems($scope.groupIndex - 1);
    			$scope.pageIndex = $scope.totals[$scope.totals.length - 1];			
    			$scope.groupIndex = Math.ceil($scope.pageIndex / groupSize);
    			$scope.changePage($scope.pageIndex); 
            }
    	}

    	$scope.nextGroup = function() {    		
            if ($scope.groupIndex < $scope.maxGroupIndex){
        		resetPageItems($scope.groupIndex + 1);
        		$scope.pageIndex = $scope.totals[0];
        		$scope.groupIndex = Math.ceil($scope.pageIndex / groupSize);
        		$scope.changePage($scope.pageIndex);
            }
    	}

    	$scope.changePage = function(index){
    		$scope.$emit('onPageChanged', index);	
    	}

    	$scope.next = function () {
            if ($scope.pageIndex < $scope.pageTotal){
            	$scope.changePage($scope.pageIndex + 1);                
            }
        }

        $scope.previous = function () {
            if ($scope.pageIndex > 1){
            	$scope.changePage($scope.pageIndex - 1);                
            }
        }
    }];

    return directive;
});