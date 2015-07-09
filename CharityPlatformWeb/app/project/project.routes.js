
'use strict';

angular.module('projectModule').config(['$stateProvider', function(
  $stateProvider) {
  ///我的项目
  $stateProvider
    .state('user.projectMine', {
      url: '/project',
      templateUrl: '/app/project/views/project.mine.html',
      controller: 'ProjectMineController'
    })
    .state('projectEdit', {
      url: '/project/edit/:id',
      templateUrl: '/app/project/views/project.edit.html',
      controller: 'ProjectEditController'
    })
    .state('projectList', {
      url: '/project/list/:id',
      templateUrl: '/app/project/views/project.List.html',
      controller: 'ProjectListController'
    })
    .state('projectView', {
      url: '/project/view/:id',
      templateUrl: '/app/project/views/project.view.html',
      controller: 'ProjectViewController'
    })
}]);
