'use strict';

angular.module('epFlowModule').directive('epFlowChart', ['epFlow', function (epFlow) {
    var directive = {};

    directive.restrict = 'EA';

    directive.scope = {
        flowOwner: '=',
        ownerCategory: '=',
        isSubmit:'='
    }

    directive.templateUrl = '/app/flow/directives/html/flow.chart.html';

    directive.controller = function ($scope) {
        var isSubmit = $scope.isSubmit ? true : false;
        epFlow.GetFlowImageData($scope.flowOwner, $scope.ownerCategory, isSubmit, function (data) {
            $scope.imageData = 'data:image/gif;base64,' + data;
        });
    }

    return directive;
}]);

angular.module('epFlowModule').directive('epFlowChartData', ['epFlow', function (epFlow) {
    var directive = {};

    directive.restrict = 'EA';

    directive.scope = {
        owner: '=',
        category: '=',
    }

    directive.templateUrl = '/app/flow/directives/html/flow.chart.data.html';

    directive.controller = ['$scope', 'epAudit', function ($scope, epAudit) {

        $scope.epAudit = epAudit;

        $scope.nodes = [];
        var Auditers = [];


        epFlow.GetWorkAuditer($scope.owner, function (data) {
            if (data && data.length > 0) Auditers = data;
        });

        $scope.GetAuditerName = function (uid) {
            for (var i = 0; i < Auditers.length; i++) {
                if (Auditers[i].Uid == uid) return Auditers[i].UserName;
            }
            return "";
        }

        epFlow.GetFlowEngineByCategory($scope.owner, $scope.category, function (data) {
            if (data) {
                var flowEngine = JSON.parse(data);
                var stepCount = flowEngine.FlowSteps.length;
                for (var i = stepCount - 1; i >= 0; i--) {
                    var step = flowEngine.FlowSteps[i];
                    var nodeCount = step.Nodes.length;
                    for (var j = 0; j < nodeCount; j++) {
                        var conclusion = step.Nodes[j].conclusion;
                        if (step.Nodes[j].AuditType < 40) {
                            $scope.nodes.push(step.Nodes[j]);
                        }
                    }
                }
            }
        });
    }];

    return directive;
}]);