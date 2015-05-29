'use strict';

angular.module('epComponentModule').directive('epMainMenu', ['$location', 'epCookie', 'appKey', '$state', 'epMessage','epAuditList',
    function ($location, epCookie, appKey, $state, epMessage, epAuditList) {
        var directive = {};

        directive.restrict = 'EA';


        directive.scope = {
            messageCount: '=',
            onShowExpense: '&',
            onShowReceipt: '&',
            onShowContract: '&',
            //onProjectList: '&',
            //onMessage: '&',
            //onLogout: '&',
            //onUnAuditList: '&',
            //onAuditList: '&',
            //onExpenseList: '&',
            //onReceiptList: '&',
            //onConfirmContracts: '&',
            //onYearProjectList: '&'
        }

        directive.templateUrl = '/Components/html/mainMenu.html';

        directive.link = function (scope, elem, iAttrs) {
            elem.find('#dh3').mouseenter(function () {
                var menuLeft = $('#dh3').offset().left - 30 + 'px';
                var menuTop = $('#dh3').offset().top - 30 + $('#dh3').height() + '2em;';
                $('#shortMenu').css({
                    position: 'absolute',
                    top: menuTop,
                    left: menuLeft,
                    width: '165px',
                    textAlign: 'left'
                });
                $('#shortMenu').css('display', 'block');
            });

            elem.find('#dh7').mouseenter(function () {
                var menuLeft = $('#dh7').offset().left - 30 + 'px';
                var menuTop = $('#dh7').offset().top - 30 + $('#dh7').height() + '2em;';
                $('#isoMenu').css({
                    position: 'absolute',
                    top: menuTop,
                    left: menuLeft,
                    width: '165px',
                    textAlign: 'left'
                });
                $('#isoMenu').css('display', 'block');
            });

            elem.find('#dh2,#dh4,#dh5,#dh6').mouseenter(function () {
                $('#shortMenu').css('display', 'none');
                $('#isoMenu').css('display', 'none');
            });


            $("#dh2,#dh3,#dh4,#dh5,#dh6,#dh7").hover(
                function () { $(this).removeClass("mleave").addClass("mhover"); },
                function () { $(this).removeClass("mhover").addClass("mleave"); }
            );

            elem.find('#dh3').mouseenter(function () {
                $('#isoMenu').css('display', 'none');
            }); 

            elem.find('#dh7').mouseenter(function () {
                $('#shortMenu').css('display', 'none');
            }); 

            $('html').click(function () {
                $('#shortMenu').css('display', 'none');
            });
        }

        directive.controller = function ($scope, $element) {

            epMessage.GetMessageLength(function (data) {
                $scope.messageCount = data;
            });

            $scope.projectNew = function () {
                $state.go('projectEdit', { id: -1 });

            }

            $scope.logout = function () {
                ///退出后要重置审核列表选择项
                epAuditList.reset();
                epCookie.expired(appKey);
                $state.go('login');
            }
        }

        return directive;
    }]);
