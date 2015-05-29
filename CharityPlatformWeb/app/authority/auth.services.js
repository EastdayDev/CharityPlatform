'use strict';


angular.module('epAuthModule').factory('epAuth', ['epHttp', 'epCookie', 'epUser', 'appKey',
    function (epHttp, epCookie, epUser, appKey) {
        var service = {};

        var apiController = 'Auth';

        var auths = [];

        service.GetAuthes = function (userId) {
            var param = { userId: userId };
            epHttp.ajaxGet(apiController, 'FindAuthes', param, function (data) {
                auths = data;
            });
        }

        if (epCookie.get(appKey)) {
            var userId = epCookie.get(appKey).Id;
            service.GetAuthes(userId);
        }

        /// 检测该数据是否允许修改
        service.CanEdit = function (creater, flowstate, category) {
            ///流程结束任何人都不允许修改
            if (flowstate === 3) return false; 

            var funcId = -1;

            switch (category) {
                case 1: funcId = 10900; break;
                case 2: funcId = 11200; break;
                case 3: funcId = 12000; break;
                case 4: funcId = 12400; break;
                case 5: funcId = 12700; break;
                case 6: 
                    return flowstate === 0 || flowstate === 2;
            }

            /// 如果有特殊修改权限允许修改
            var length = auths.length;
            for (var i = 0; i < length; i++) {
                if (auths[i].funId === 13800) return true;
            }

            /// 审核中不允许修改
            if (flowstate === 1) return false;

            /// 拥有该编辑权限并是创建人，则允许修改
            var canEdit = false;
            for (var i = 0; i < length; i++) {
                if (auths[i].funId === funcId) {
                    canEdit = true;
                    break;
                }
            }
            /// 没有该项修改权限，不允许修改
            if (canEdit === false) return false;

            length = epUser.userDepts.length;
            for (var i = 0; i < length; i++) {
                if (epUser.userDepts[i].Uid === creater) {
                    /// 是创建人，则允许修改
                    return true;
                }
            }
            return false;
        }

        /// 检测数据是否允许删除
        service.CanDel = function (creater, flowstate) {
            ///审核中或流程结束不允许删除
            if (flowstate === 1 || flowstate === 3) return false;

            var length = epUser.userDepts.length;
            for (var i = 0; i < length; i++) {
                if (epUser.userDepts[i].Uid === creater) {
                    /// 是创建人，则允许删除
                    return true;
                }
            }
            return false;
        }

        /// 检测该数据是否允许提交
        service.CanSubmit = function (creater, flowstate) {
            ///审核中或流程结束不允许提交
            if (flowstate === 1 || flowstate === 3) return false;

            var length = epUser.userDepts.length;
            for (var i = 0; i < length; i++) {
                if (epUser.userDepts[i].Uid === creater) {
                    /// 是创建人，则允许提交
                    return true;
                }
            }
            return false;
        }
        ///检测是否能审核
        service.CanAudit = function (id, category, callback) {
            var param = { id: id, category: category, userId: epUser.user.Id };
            epHttp.ajaxGet('Audit', 'CanAudit', param, callback);
        }

        ///检测是否允许终止流程
        service.CanAbort = function (id, category, callback) {
            var param = { id: id, category: category, userId: epUser.user.Id };
            epHttp.ajaxGet('Flow', 'GetCurrentParticipants', param, function (data) {
                if (data) {
                    for (var i = 0; i < auths.length; i++) {
                        if (auths[i].funcId === 13400) {
                            ///拥有审核并终止权限
                            for (var k = 0; k < data.length; k++) {
                                if (data[k] === auths[i].I_Department) {
                                    if (callback) callback(true);
                                    return;
                                }
                            }
                        }
                    }
                }
                if (callback) callback(false);
            });
        }

        /// 检查能否新建项目
        service.CanNewProject = function () {
            var length = auths.length;
            for (var i = 0; i < length; i++) {
                if (auths[i].funcId === 10800) return true;
            }
            return false;
        }

        /// 检查能否新建预算，合同
        service.CanNewChildren = function (funcId, uid) {
            var length = auths.length;
            for (var i = 0; i < length; i++) {
                if (uid === auths[i].Uid && funcId === auths[i].funId) return true;

            }
            return false;
        }
        /// 检查能否新建报销，发票
        service.CanNewOther = function (projectDepId, funcId) {
            var length = auths.length;
            for (var i = 0; i < length; i++) {
                if (projectDepId === auths[i].depId && funcId === auths[i].funId) return true;
            }
            return false;
        }

        ///是否能修改流程
        service.CanChangeFlow = function (flowState) {
            return flowState === 0 || flowState === 2 || flowState === 4
        }

        //获取登陆用户在该部门下的UID
        service.GetUid = function (depId) {
            var length = auths.length;
            for (var i = 0; i < length; i++) {
                if (depId == auths[i].depId) {
                    return auths[i].Uid;
                }
            }
        }
        return service;
    }]);