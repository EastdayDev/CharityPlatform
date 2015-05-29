'use strict';

angular.module('epProjectModule').config(['$stateProvider', function ($stateProvider) {
    ///项目列表
    var list = {
        name: 'projectList',
        url: '/project/list',
        templateUrl: '/app/project/views/project.list.html',
        controller: 'epProjectListController'
    };
    ///新建、编辑项目
    var edit = {
        name: 'projectEdit',
        url: '/project/edit/:id',
        templateUrl: '/app/project/views/project.edit.html',
        controller: 'epProjectEditController'
    };
    ///项目详情
    var detail = {
        name: 'projectDetail',
        url: '/project/view/:id',
        templateUrl: '/app/project/views/project.view.html',
        controller: 'epProjectViewController'
    };
    ///虚拟项目 (年度项目)
    var virtual = {
        name: 'virtual',
        url: '/project/virtual',
        templateUrl: '/app/project/views/project.virtual.html',
        controller: 'epProjectVirtualController'
    };

    var children = {
        name: 'projectChildren',
        url: '/project/children/:id',
        templateUrl: '/app/project/views/project.children.html',
        controller: 'epProjectChildrenController'
    }
    var fileUpload = {
        name: 'fileUpload',
        url: '/file/upload/:ownerId/:id/:Category',
        templateUrl: '/app/file/views/file.upload.html',
        controller: 'epFileUploadController'
    }

    $stateProvider
        .state(list)
        .state(edit)
        .state(detail)
        .state(children)
        .state(virtual)
        .state(fileUpload);
}]);