'use strict';

angular.module('epProjectModule').controller('epProjectEditController',
    ['$scope', '$stateParams', 'epHttp', 'epProject', 'epUser', 'epAuth', '$state', '$window', 'epModal', 'epCustomer', 'epFlow',
        function ($scope, $stateParams, epHttp, epProject, epUser, epAuth, $state, $window, epModal, epCustomer, epFlow) {

            var projectid = $stateParams.id;
            $scope.IsSonCompany = true;
            $scope.Cooperation = true;
            $scope.Isflowshow = true;
            $scope.IsNewProject = true;
            $scope.Customerlist = [];
            $scope.HeringTypeItem = {
                Items: []
            }
            $scope.BusinessTypeItem = {
                Items: []
            };
            $scope.EarnTypeItem = {
                Items: []
            };
            $scope.$emit('onChangeTitle', '项目编辑');

            $scope.$on('$viewContentLoaded', function () {

                var depts = epHttp.promiseGet('User', 'GetUserDeptByFunc', { userId: epUser.userId, funcId: 10800 });
                var customers = epHttp.promiseGet('Customer', 'GetCustomers', { userId: epUser.userId });
                var project = epHttp.promiseGet('Project', 'GetDetail', { id: projectid });
                var business = epHttp.promiseGet('Flow', 'GetBusinessByUserId', { userid: epUser.userId });
                epHttp.run({
                    depts: depts,
                    customers: customers,
                    project: project,
                    businesslist: business
                }, function (results) {
                    $scope.depts = results.depts;
                    $scope.customers = results.customers;
                    $scope.businessArray = results.businesslist;
                    BusinessFilter($scope.project.I_Creater);//流程
                    if ($scope.depts != null) {
                        $scope.project.I_Creater = $scope.depts[0].Uid;
                        $scope.project.I_ProType = 0;
                        $scope.ChangeFlowType($scope.project.I_Creater);
                        CustomerFilter($scope.project.I_Creater);
                    }
                    Bussnies();
                    if (projectid > 0) {
                        ///编辑                        
                        $scope.project = results.project[0];
                        $scope.IsNewProject = false;
                        if (!epAuth.CanChangeFlow($scope.project.flowstate)) {
                            $scope.Isflowshow = false;
                        }
                        /*编辑时 按创建人取客户、流程 防止特殊修改进入页面出错的问题*/
                        epCustomer.GetCustomByUid($scope.project.I_Creater, function (data) {
                            $scope.customers = data;
                            CustomerFilter($scope.project.I_Creater);
                            assignProject($scope.project);
                        });
                        epFlow.GetBusinessByUid($scope.project.I_Creater, function (data) {
                            $scope.businessArray = data;
                            BusinessFilter($scope.project.I_Creater);//流程
                            $scope.project.I_FlowType = findKindById($scope.businessKinds, $scope.project.I_FlowType);
                            
                        });

                    }
                });
            });
            //setTimeout(function () {
            //    var arealist = $("textarea");
            //    for (var a = 0; a < arealist.length; a++) {
            //        arealist[a].style.height = arealist[a].scrollHeight + 'px';
            //    }
            //}, 500);

            var Bussnies = function () {
                epProject.GetDeptByUid($scope.project.I_Creater, function (data) {
                    epProject.GetBusinessByIds(data, function (data) {
                        $scope.busunesslist = data;
                        if (projectid > 0) {
                            epProject.GetBusinessByProjectId(projectid, function (data) {
                                var list = data;
                                for (var a = 0; a < list.length; a++) {
                                    $scope.BusinessTypeItem.Items[a] = list[a].I_Business;
                                }
                            });
                        }
                    });
                });
            }
            var findCustomById = function (values, id) {
                var length = values.length;
                for (var i = 0; i < length; i++) {
                    if (values[i].Id == id) {
                        return values[i];
                    }
                }
            }
            function GetAddValue(value) {
                var rs = 0;
                for (var i = 0; i < value.length; i++) {
                    if (value[i] != null) {
                        rs = rs + parseInt(value[i]);
                    }
                }
                return rs;
            }
            function GetValue(value, rs) {
                var arr = new Array();
                for (var i = 0; i < value.length; i++) {
                    if ((value[i] & rs) > 0) {
                        arr.push(value[i]);
                    }
                }
                return arr;
            }
            var findKindById = function (values, id) {
                if (values) {
                    var length = values.length;
                    for (var i = 0; i < length; i++) {
                        if (values[i].id == id || values[i].Id == id) {
                            return values[i];
                        }
                    }
                }
            }
            var CustomerFilter = function (value) {
                $scope.Customerlist = [];
                for (var a = 0; a < $scope.customers.length; a++) {
                    if ($scope.customers[a].Uid == value) {
                        $scope.Customerlist.push($scope.customers[a]);
                    }
                }
            }
            var assignProject = function (data) {
                var rs = data;
                var HeringTypeModel = [1, 2];
                var EarnTypeModel = [1, 2, 4, 8];//收入类型选中的参照
                var BusinessTypeModel = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096, 8192, 16384];//业务类型参照

                $scope.HeringTypeItem.Items = GetValue(HeringTypeModel, rs.I_GatheringType);
                $scope.EarnTypeItem.Items = GetValue(EarnTypeModel, rs.I_EarnType);

                rs.I_Effect = rs.I_Effect == 1 ? true : false;
                rs.I_OutSourcing = rs.I_OutSourcing == 1 ? true : false;
                rs.I_Sales = rs.I_Sales == 1 ? true : false;
                rs.I_Support = rs.I_Support == 1 ? true : false;
                rs.I_Introduction = rs.I_Introduction == 1 ? true : false;

                $scope.project = rs;
                $scope.project.I_Custom = findKindById($scope.customers, $scope.project.I_Custom);
            }
            var BusinessFilter = function (value) {
                $scope.businessKinds = [];
                for (var a = 0; a < $scope.businessArray.length; a++) {
                    if ($scope.businessArray[a].Uid == value) {
                        $scope.businessKinds.push($scope.businessArray[a]);
                    }
                }
            }

            //项目类型监控
            $scope.$watch("project.I_ProType", function (a) {
                if (a == 0) {
                    $scope.Cooperation = true;
                    $scope.pay = false;
                    $scope.project.I_PaymentBasis = 0;
                    $scope.project.D_Payment = "";
                    $scope.IsSonCompany = true;//创收类项目 项目属性显示
                    Bussnies();
                } else if (a == 1) {
                    $scope.Cooperation = false;
                    $scope.pay = true;
                    $scope.project.I_Support = 0;
                    $scope.project.I_OutSourcing = 0;
                    $scope.project.I_Introduction = 0;
                    $scope.project.I_Effect = 0;
                    $scope.project.I_Transaction = 0;
                    $scope.project.I_Sales = 0;
                    $scope.project.I_Cooperative = -1;
                    $scope.project.I_GatheringType = 0;
                    $scope.IsSonCompany = false;//成本项目 项目属性隐藏
                } else {
                    $scope.Cooperation = false;
                    $scope.pay = false;
                    $scope.project.I_Support = 0;
                    $scope.project.I_OutSourcing = 0;
                    $scope.project.I_Introduction = 0;
                    $scope.project.I_Effect = 0;
                    $scope.project.I_Transaction = 0;
                    $scope.project.I_Sales = 0;
                    $scope.project.I_Cooperative = -1;
                    $scope.project.I_GatheringType = 0;
                    $scope.project.I_PaymentBasis = 0;
                    $scope.project.D_Payment = "";
                    $scope.IsSonCompany = false;//合作项目 项目属性隐藏
                }
            });
            //建项部门监控
            $scope.$watch('project.I_Creater', function (creater) {
                if ($scope.project.I_Creater != "" && $scope.project.I_Creater != undefined) {
                    Bussnies();
                    CustomerFilter($scope.project.I_Creater);
                }
            });
            //流程
            $scope.ChangeFlowType = function (uid) {
                BusinessFilter(uid);
            }
            //客户搜索框
            $scope.filterCustom = function () {
                if ($scope.customFilterValue == "") {
                    $scope.Customerlist = $scope.customers;
                } else {
                    var newCustoms = [];
                    var length = $scope.customers.length;
                    for (var i = 0; i < length; i++) {
                        if ($scope.customers[i].C_Name.indexOf($scope.customFilterValue) > -1) {
                            newCustoms[newCustoms.length] = $scope.customers[i];
                        }
                    }
                    if (newCustoms.length == 0) {
                        $scope.Customerlist = newCustoms;
                        $scope.project.I_Custom = null;
                    } else {
                        $scope.Customerlist = newCustoms;
                        $scope.project.I_Custom = findCustomById($scope.Customerlist, $scope.Customerlist[0].Id);
                    }
                }
            }
            var CheckCreate = function (project) {
                if (project.I_FlowType == null) {
                    epModal.info("请选择项目流程");
                    return false;
                }
                if (project.I_Custom == null) {
                    epModal.info("请选择客户");
                    return false;
                }
                if (project.I_ProType == 0) {
                    if ($scope.HeringTypeItem.Items.length == 0) {
                        epModal.info("请选择收款类型");
                        return false;
                    }
                    if ($scope.BusinessTypeItem.Items.length == 0) {
                        epModal.info("请选择业务类型");
                        return false;
                    }
                }
                if (project.D_Start > project.D_End) {
                    epModal.info("起始日期不能大于结束日期");
                    return false;
                }
                return true;
            }
            $scope.Save = function (project) {
                if (!CheckCreate(project)) return;
                project.I_Effect = project.I_Effect == true ? 1 : 0;
                project.I_OutSourcing = project.I_OutSourcing == true ? 1 : 0;
                project.I_Sales = project.I_Sales == true ? 1 : 0;
                project.I_Support = project.I_Support == true ? 1 : 0;
                project.I_Introduction = project.I_Introduction == true ? 1 : 0;

                project.I_GatheringType = GetAddValue($scope.HeringTypeItem.Items);
                project.I_EarnType = GetAddValue($scope.EarnTypeItem.Items);
                project.I_BusinessType = GetAddValue($scope.BusinessTypeItem.Items);

                project.I_FlowParent = project.I_FlowType.I_Parent;
                //特殊修改
                //if (!nameConverter.CanUpdate($scope.auth, 13800) && $scope.id > 0) {
                //    project.I_FlowType = $scope.project.I_FlowType;
                //} else {
                //    project.I_FlowType = project.I_FlowType.id;
                //}

                if (project.I_FlowType.id > 0 || project.I_FlowType.id != undefined) {
                    project.I_FlowType = project.I_FlowType.id;
                }
                project.I_Custom = project.I_Custom.Id;

                //projectinsert
                epProject.Edit(project, $scope.BusinessTypeItem.Items, function (data) {
                    if (data > 0) {
                        if (projectid < 0) {
                            epProject.GetBaseDataId(function (data) {
                                if (data.Id != undefined && data.Id > 0) {
                                    //****跳转合同列表页面
                                    $state.go('projectChildren.contractList', { id: data.Id });
                                }
                            });
                        } else {
                            $window.history.back();
                            epModal.info("项目已创建，未出部门，请提交！");
                        }
                    } else {
                        epModal.info("项目创建失败！");
                    }
                });
            }




        }]);