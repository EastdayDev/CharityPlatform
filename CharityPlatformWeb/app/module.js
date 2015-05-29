'use strict';

angular.module('epCommonModule', []);

angular.module('epUtilModule', ['epCommonModule']);

angular.module('epComponentModule', ['epCommonModule', 'epUtilModule']);

angular.module('epCustomerModule', ['epCommonModule']);

angular.module('epAuthModule', ['epCommonModule']);

angular.module('epUserModule', ['epCommonModule', 'epAuditModule', 'epAuthModule']);

angular.module('epProjectModule', ['epCommonModule', 'epFlowModule', 'epContractModule']);

angular.module('epContractModule', ['epCommonModule']);

angular.module('epBudgetModule', ['epCommonModule']);

angular.module('epAuditModule', ['epCommonModule']);

angular.module('epFlowModule', ['epCommonModule']);

angular.module('epMessageModule', ['epCommonModule']);

angular.module('epExpenseModule', ['epCommonModule']);

angular.module('epReceiptModule', ['epCommonModule']);

angular.module('epFileModule', ['epCommonModule']);

angular.module('epWorkModule', ['epCommonModule']);

angular.module('epFeedBackModule', ['epCommonModule']);

angular.module('epGlobalModule', ['epCommonModule']);

angular.module('epISOModule', ['epCommonModule']);

angular.module('app', [
    'ui.router'
    , 'ui.bootstrap'
    , 'checklist-model'
    , 'ngCookies'
    , 'epUtilModule'
    , 'epComponentModule'
    , 'epMessageModule'
    , 'epUserModule'
    , 'epAuthModule'
    , 'epProjectModule'
    , 'epBudgetModule'
    , 'epContractModule'
    , 'epExpenseModule'
    , 'epReceiptModule'
    , 'epCustomerModule'
    , 'epFileModule'
    , 'epWorkModule'
    , 'epFeedBackModule'
    , 'epGlobalModule'
    , 'epISOModule'
]);