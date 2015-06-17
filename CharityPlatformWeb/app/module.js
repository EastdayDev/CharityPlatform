'use strict';

angular.module('commonModule', []);

angular.module('componentModule', ['commonModule']);

angular.module('authModule', []);

angular.module('userModule', []);

angular.module('projectModule', []);

angular.module('auditModule', []);
 
angular.module('fileModule', []);

angular.module('directiveModule', []);

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
]);