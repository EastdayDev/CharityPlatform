'use strict';

angular.module('epAuditModule').factory('epAuditBudgetInternal', ['epHttp', function (epHttp) {
    var service = {}; 
    
    ///获取内部预算分类
    service.GetBudgetInternalKinds = function (callback) {
        epHttp.ajaxGet('Helper', 'GetBudgetInternalKinds', null, function (data) {
            if (callback) callback(data);
        });
    }

    ///保存内部预算
    service.BudgetAuditInternalInsert = function (budgetInternals, callback) {
        var param = { BudgetInternals: budgetInternals };
        epHttp.ajaxPost('Audit', 'BudgetAuditInternalInsert', param, callback);
    }
    return service;
}]);