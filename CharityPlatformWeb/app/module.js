'use strict';

angular.module('commonModule', []);

angular.module('componentModule', ['commonModule']);

angular.module('authModule', []);

angular.module('homeModule', []);

angular.module('userModule', ['componentModule']);

angular.module('partnerModule', []);

angular.module('donationModule', []);

angular.module('projectModule', []);

angular.module('auditModule', []);
 
angular.module('fileModule', []);

angular.module('sysModule', []);

angular.module('filterModule', [])

angular.module('directiveModule', []);

angular.module('hbUploaderModule', []);

angular.module('app', [
    'ui.router'
    ,'ui.bootstrap'
    , 'checklist-model'
    , 'ngCookies'
    , 'commonModule'
    , 'componentModule'
    , 'authModule'
    , 'userModule'
    , 'projectModule'
    , 'auditModule'
    , 'fileModule'
    , 'directiveModule'
    , 'homeModule'
    , 'partnerModule'
    , 'donationModule'
    , 'sysModule'
    , 'filterModule'
    , 'hbUploaderModule'
]);