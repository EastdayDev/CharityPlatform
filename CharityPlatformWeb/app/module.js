'use strict';

angular.module('epCommonModule', []);

angular.module('epUtilModule', ['epCommonModule']);

angular.module('epComponentModule', []);

angular.module('epAuthModule', []);

angular.module('epUserModule', []);

angular.module('epProjectModule', []);

angular.module('epAuditModule', []);

angular.module('epFlowModule', []);

angular.module('epFileModule', []);

angular.module('epDirectiveModule', []);

angular.module('app', [
    'ui.router'
    ,'ui.bootstrap'
    , 'checklist-model'
    , 'ngCookies'
    , 'epUtilModule'
    , 'epComponentModule'
    , 'epUserModule'
    , 'epAuthModule'
    , 'epProjectModule'
    , 'epFileModule'
    , 'epDirectiveModule'
]);