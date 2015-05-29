/**
 * Created by dev-01 on 2015/4/3.
 */
'use strict';

angular.module('epAuditModule').factory('epAuditList', ['epHttp', '$filter', function (epHttp, $filter) {
    var service = {};

    var apiController = 'Audit';

    service.category = -1;
    service.page = { index: 1, total: 0 };

    //时间格式转换
    var dateFormat = function (v) {
        var re = /-?\d+/;
        var m = re.exec(v);
        var d = new Date(parseInt(m[0]));
        // 按【2012-02-13 09:09:09】的格式返回日期
        return d;
    }

    //排序（全部类型）
    var dataSort = function (data) {
        data.sort(function (obj1, obj2) {
            var a = dateFormat(obj1.D_Create);
            var b = dateFormat(obj2.D_Create);

            var resultDate = -(a.valueOf() - b.valueOf());//倒序
            //var resultName = obj1.ProjectName.localeCompare(obj2.ProjectName);//升序
            var resultName = -(obj1.I_Project - obj2.I_Project);//倒序
            var resultCategory = obj1.I_Category - obj2.I_Category;//升序

            if (resultName == 0 && resultCategory == 0) return resultDate;
            else if (resultName == 0) return resultCategory;
            else return resultName;
        });
    }

    service.reset = function () {
        service.checks.length = 0;
        service.category = -1;
    }

    service.checks = [];

    service.allData = [];

    service.allProjects = [];
    service.allBudgetAndContracts = [];
    service.allExpenses = [];
    service.allReceipts = [];
    service.allWorks = [];

    ///将数据分类划分
    service.SplitData = function () {
        service.allProjects.length = 0;
        service.allBudgetAndContracts.length = 0;
        service.allExpenses.length = 0;
        service.allReceipts.length = 0;
        service.allWorks.length = 0;
        if (service.allData.length === 0) return;
        angular.forEach(service.allData, function (item) {
            item.visbale = true;
            switch (item.I_Category) {
                case 1: service.allProjects.push(item); break;
                case 2:
                case 3: service.allBudgetAndContracts.push(item); break;
                case 4: service.allExpenses.push(item); break;
                case 5: service.allReceipts.push(item); break;
                default: service.allWorks.push(item); break;
            }
        });
    }

    /// 获得用户待审数量
    service.GetUserAuditCount = function (userId, callback) {
        var param = { userId: userId };
        epHttp.ajaxGet(apiController, 'GetUserAuditCount', param, callback);
    }

    service.CanSubmit = function (flowState) {
        return flowState == 0 || flowState == 2 || flowState == 4;
    }

    service.GetSubmitDepartments = function (projectId, callback) {
        var param = { id: projectId };
        epHttp.ajaxGet(apiController, 'GetSubmitDepartments', param, callback);
    }

    service.Submit = function (id, category, wrap, centers, children, callback) {
        var param = { Id: id, Category: category, Wrap: wrap, Centers: centers, Children: children };
        epHttp.ajaxPost(apiController, 'Submit', param, callback);
    }

    service.GetAuditListAll = function (userId, callback) {
        var param = { userId: userId };
        epHttp.ajaxGet(apiController, 'GetAuditListAll', param, function (data) {
            service.allData = data;
            dataSort(service.allData);
            if (callback) callback(data);
        });
    }

    ///移除待审列表
    service.remove = function (item) {
        var length = service.allData.length;
        for (var i = length - 1; i >= 0; i--) {
            if (service.allData[i].Id === item.Id) {
                service.allData.splice(i, 1);
                break;
            }
        }
        var items = [];
        switch (item.I_Category) {
            case 1:
                items = service.allProjects;
                break;
            case 2:
            case 3:
                items = service.allBudgetAndContracts;
                break;
            case 4:
                items = service.allExpenses;
                break;
            case 5:
                items = service.allReceipts
                break;
            default:
                items = service.allWorks;
                break;
        }
        var length = items.length;
        for (var i = length - 1; i >= 0; i--) {
            if (items[i].Id === item.Id) {
                items.splice(i, 1);
                break;
            }
        }
    }

    service.GetCheckById = function (id, callback) {
        var param = { id: id };
        epHttp.ajaxGet(apiController, 'GetCheckById', param, callback);
    }

    return service
}]);

angular.module('epAuditModule').factory('epAudit', ['epHttp', 'epAuditList', 'epUser', 'epHelper',
    function (epHttp, epAuditList, epUser, epHelper) {
        var service = {};

        var apiController = 'Audit';

        service.isBatch = false;

        service.Title = '项目名称';

        service.reset = function () {
            service.isBatch = false;
            service.isBudgetInternal = false;
            service.items.length = 0;
            service.checks.length = 0;
        }

        service.auditMethods = [
        { Id: 10, Name: '通过', Visable: true },
        { Id: 30, Name: '退回', Visable: true },
        { Id: 22, Name: '异议流转', Visable: true },
        { Id: 20, Name: '传阅', Visable: true },
        { Id: 21, Name: '传阅并通过', Visable: true },
        { Id: 23, Name: '传阅并有条件同意', Visable: true },
        { Id: 40, Name: '无效', Visable: false },
        { Id: 50, Name: '未审', Visable: false }
        ]

        ///当前要审核的数据，来自于待审列表
        service.items = [];
        service.checks = [];
        service.budgetInternals = [];
        service.workReply = {};

        service.GetAuditType = function (uid, value) {
            var isLeader = epHelper.IsLeader(uid);
            switch (value) {
                case 10: return isLeader ? '同意' : '通过';
                case 20: return '传阅';
                case 21: return '传阅并通过';
                case 22: return '异议流转';
                case 23: return '传阅并有条件同意';
                case 30: return '退回';
                case 40: return '无效';
                case 50: return '未审';
                default: return '未知审核';
            }
        }


        /// 内部预算，若只选择了一条内部成本则为true
        service.isBudgetInternal = false;

        /// 设置审核数据 待审列表处调用
        service.decideAudits = function (category, listChecks, callback) {
            service.items.length = 0;
            service.checks.length = 0;

            angular.copy(listChecks, service.items);
            if (category === 1) {
                ///待审列表选择项目， 需要将项目下属的数据带过来 工单不能带
                angular.forEach(listChecks, function (project) {
                    angular.forEach(epAuditList.allData, function (item) {
                        if (item.I_Category !== 6 && item.I_Category !== 1 && project.Id === item.I_Project) {
                            this.push(item);
                        }
                    }, service.items);
                });
            }
            service.checks = angular.copy(service.items);
            service.isBatch = service.checks.length > 1;
            service.isBudgetInternal = service.checks.length === 1 && service.checks[0].I_BudgetInternal === 5;

            if (callback) callback();
        }

        ///审核方式
        service.GetAuditMethods = function (canTransfer, callback) {
            var methods = angular.copy(service.auditMethods);
            angular.forEach(methods, function (item) {
                ///不允许传阅
                if (!canTransfer && (item.Id === 20 || item.Id === 21 || item.Id === 23)) {
                    item.Visable = false;
                }
                ///领导 【通过】显示为【同意】
                if (epUser.user.IsLeader && item.Id === 10) {
                    item.Name = '同意';
                }
            });
            if (callback) callback(methods);
        }

        ///判断是否能传阅 涉及一个部门、且所有节点允许传阅
        service.CanTransfer = function (callback) {
            epHttp.ajaxPost(apiController, 'CanTransfer', service.items, function (data) {
                if (callback) callback(data);
            });
        }

        ///助理
        service.GetAssistants = function (callback) {
            epHttp.ajaxPost(apiController, 'GetAssistants', service.items, function (data) {
                if (callback) callback(data);
            });
        }

        ///获取传阅对象
        service.GetTransferTrees = function (canTransfer, callback) {
            if (!canTransfer) {
                if (callback) callback(null);
            } else {
                epHttp.ajaxPost(apiController, 'GetTransferTrees', service.items[0], function (data) {
                    if (callback) callback(data);
                });
            }
        }

        ///获取内部预算
        service.GetAuditBudgetInternal = function (callback) {
            if (service.checks.length > 0 && service.checks[0].I_BudgetInternal !== 5) {
                if (callback) callback(null);
            } else {
                var param = { budgetId: service.checks[0].Id };
                epHttp.ajaxGet(apiController, 'GetAuditBudgetInternal', param, function (data) {
                    service.budgetInternals = data;
                    if (callback) callback(service.budgetInternals);
                });
            }
        }
        service.canWorkReply = false;
        ///检测是否为工单执行人
        service.InWorkExecutor = function (callback) {
            epHttp.ajaxPost(apiController, 'InWorkExecutor', service.items, function (data) {
                service.canWorkReply = data;
            });
        }

        ///流程审核
        service.AuditFlows = function (auditInfo, transfers, callback) {
            var auditParameter = {
                userId: epUser.user.Id,
                AuditInfo: auditInfo,
                Checks: service.checks,
                Transfers: transfers
            };
            if (service.canWorkReply) {
                auditParameter.WorkReply = service.workReply;
            }
            epHttp.ajaxPost(apiController, 'AuditFlows', auditParameter, function (data) {
                if (data) {
                    angular.forEach(service.checks, function (checkItem) {
                        epAuditList.remove(checkItem);
                    });
                    service.checks.length = 0;
                }
                if (callback) callback(data);
            });
        }

        return service;
    }]);

angular.module('epAuditModule').factory('epAuditOver', ['epHttp', 'epAuditList', 'epUser', function (epHttp, epAuditList, epUser) {
    var service = {};

    var apiController = 'Audit';
    service.page = { index: 1, total: 0 };

    service.GetCheckListOver = function (current, pagesize, findvalue, userid, callback) {
        var param = { Current: current, pageSize: pagesize, findValue: findvalue, userid: userid };
        epHttp.ajaxGet(apiController, 'GetCheckListOver', param, callback);
    }

    return service;
}]);
