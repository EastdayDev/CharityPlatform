'use strict';

//angular.module('epComponentModule').directive('epDatePicker', [function () {
//    var directive = {};

//    directive.restrict = 'E';

//    directive.scope = {
//        dtValue: '=',
//        hideLeftButton: '='
//    }

//    directive.templateUrl = '/Components/html/datePicker.html';

//    directive.controller = function ($scope) {

//        $scope.open = function ($event) {
//            $event.preventDefault();
//            $event.stopPropagation();
//            $scope.opened = true;
//        }

//        $scope.dateOptions = {
//            formatDay: 'd',
//            formatMonth: 'M',
//            formatYear: 'yyyy',
//            formatDayHeader: 'EEE',
//            formatDayTitle: 'MM yyyy',
//            formatMonthTitle: 'yyyy',
//            datepickerMode: 'day',
//            minMode: 'day',
//            maxMode: 'year',
//            showWeeks: false,
//            startingDay: 1,
//            yearRange: 20,
//            minDate: null,
//            maxDate: null 
//        };
//    }

//    return directive;
//}]);


//angular.module('epComponentModule').directive('epDateRangePicker', [function () {
//    var directive = {};

//    directive.restrict = 'E';

//    directive.scope = {
//        startDate: '=',
//        endDate: '='
//    }

//    directive.templateUrl = '/Components/html/dateRangePicker.html'; 

//    return directive;
//}]);

angular.module('epComponentModule').directive('bootstrapdatepicker', function () {
    return function (scope, element, attrs) {
        element.datepicker({
            inline: true,
            format: 'yyyy-mm-dd',
            language: 'zh-CN',
            autoclose: true,
            todayHighlight: true
        });
    }
});

angular.module('epComponentModule').directive('epDatePicker', [function () {
    var directive = {};

    directive.restrict = 'E';

    directive.scope = {
        dtValue: '='
    }

    directive.templateUrl = '/Components/html/date-picker.html';

    return directive;
}]);


angular.module('epComponentModule').directive('epDateRangePicker', [function () {
    var directive = {};

    directive.restrict = 'E';

    directive.scope = {
        startDate: '=',
        endDate: '='
    }

    directive.templateUrl = '/Components/html/date-range-picker.html';

    return directive;
}]);