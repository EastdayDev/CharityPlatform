angular.module('epFileModule').directive('fileUploader', function () {
    var directive = {};

    directive.restrict = "E";
    directive.transclude = true;
    directive.template = '<div><input type="file" /></div>';

    directive.scope = {
        files: '=',
        fileTitle: '='
    }

    directive.link = function (scope, elem, iAttrs) {
        elem.find('input[type="file"]').bind('change', function (e) {
            scope.files = [];
            for (var i in e.target.files) {
                if (typeof e.target.files[i] == 'object') scope.files.push(e.target.files[i]);
            }
            scope.fileTitle = e.target.files[0].name.substr(0, e.target.files[0].name.lastIndexOf('.'));
            scope.$apply();
        });
    }
    return directive;
});