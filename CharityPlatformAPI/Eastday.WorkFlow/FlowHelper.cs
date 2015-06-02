using Eastday.Data;
using Eastday.Entity;
using Eastday.Util;
using Eastday.WorkFlowEngine;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eastday.WorkFlow
{
    public class FlowHelper
    {
        /// <summary>
        /// 打包提交
        /// </summary>
        /// <param name="id">项目编号</param>                
        /// <param name="uid">创建人</param>
        /// <param name="depLevel1">中心及职能部门</param>
        /// <param name="depLevel2">中心下属部门</param>
        /// <returns></returns>
        public static bool CommitWrap(int id, long uid, IList<DepartmentEntity> centers, IList<DepartmentEntity> children)
        {
            try
            {
                //提交项目
                FlowHelper.Commit(id, Category.Project, uid, centers, children, true);
                using (ProjectBLL bll = new ProjectBLL())
                {
                    List<DataHeadEntity> dataList = bll.GetProjectChildren(id);
                    foreach (var data in dataList)
                    {
                        if (data.I_Category == (int)Category.Budget || data.I_Category == (int)Category.Contract)
                        {
                            FlowHelper.Commit(data.Id, (Category)data.I_Category, uid, centers, children, true);
                        } 
                    }
                    return true;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 提交流程
        /// </summary>
        /// <param name="id">编号</param>        
        /// <param name="category">分类</param>
        /// <param name="uid">创建人</param>
        /// <param name="depLevel1">中心及职能部门</param>
        /// <param name="depLevel2">中心下属部门</param>
        /// <param name="IsSubmit">1说明是提交流程，需要执行DeleteWorkFlow删除流程数据</param>
        /// <returns></returns>
        public static void Commit(int id, Category category, long uid, IList<DepartmentEntity> centers, IList<DepartmentEntity> children, bool isSubmit)
        { 
            FlowEngine flowEngine = FlowHelper.Build(id, category, uid, centers, children);
            if (isSubmit) FlowManager.Instance().Delete(id);
            FlowManager.Instance().Save(flowEngine, category);
        }

        /// <summary>
        /// 创建流程实例(不保存入库)
        /// </summary>
        /// <param name="id">编号</param>
        /// <param name="category">分类</param>
        /// <param name="uid">创建人</param>
        /// <param name="depLevel1">中心及职能部门</param>
        /// <param name="depLevel2">中心下属部门</param>
        /// <returns>流程实例</returns>
        public static FlowEngine Build(int id, Category category, long uid, IList<DepartmentEntity> centers, IList<DepartmentEntity> children)
        {
            FunctionEntity funcEntry = null;
            using (SysFunctionBLL bll = new SysFunctionBLL())
            {
                funcEntry = bll.GetFunctionById(100, 10100);
            }

            using (SystemBLL bll = new SystemBLL())
            {
                if (category == Category.Budget)
                {
                    AssignBudgetInternal(id, centers, children); 
                }

                //获取当前模板
                BusinessKindEntity flowKind = bll.GetKind(id);

                FlowAttachment flowAttachment = new FlowAttachment() { Owner = id, Kind = flowKind.id };
                flowAttachment.Creater = uid;

                FlowManager flowMgr = FlowManager.Instance();

                FlowEngine flowEngine = flowMgr.TemplateLoad(flowKind.C_Template);
                flowMgr.Assign(flowEngine, flowAttachment);

                if (centers.Any())
                {
                    FlowHelper.AddLevel1(flowEngine, funcEntry, centers);
                }
                if (children.Any())
                {
                    FlowHelper.AddLevel2(flowEngine, funcEntry, children);
                }
                //if (requiredOld)
                //{
                //    FlowHelper.Concat(id, category, flowEngine);
                //}
                FlowHelper.Concat(id, category, flowEngine);

                return flowEngine;
            }
        }

        /// <summary>
        /// 日常预算需要将涉及的部门加入流程
        /// </summary>
        /// <param name="id">预算编号</param>
        /// <param name="depLevel1">中心部门</param>
        /// <param name="depLevel2">中心下属</param>
        private static void AssignBudgetInternal(int id, IList<DepartmentEntity> centers, IList<DepartmentEntity> children)
        {
            using (SystemBLL bll = new SystemBLL())
            {
                List<DepartmentEntity> departmentBudgetInternal = bll.GetDepartmentByBudgetInternal(id);
                if (departmentBudgetInternal.Any())
                {
                    foreach (var dep in departmentBudgetInternal)
                    {
                        if (dep.I_Level >= 20)
                        {
                            if (!children.Contains(dep))
                            {
                                children.Add(dep);
                            }
                        }
                        else
                        {
                            if (!centers.Contains(dep))
                            {
                                centers.Add(dep);
                            }
                        }
                    }
                }
            }
        }

        /// <summary>
        /// 拼接当前流程至已存在流程后
        /// </summary>
        /// <param name="id">编号</param>
        /// <param name="category">分类</param>
        /// <param name="flowEngine">新流程</param>
        public static void Concat(int id, Category category, FlowEngine newFlowEngine)
        {
            FlowManager flowMgr = FlowManager.Instance();
            if (flowMgr.FlowExists(category, id))
            {
                int index = 0;
                FlowEngine oldFlowEngine = flowMgr.Load(category, id);

                Step returnedStep = FindLastReturned(oldFlowEngine);
                if (returnedStep == null) return;
                SetDisableAtReturned(oldFlowEngine, returnedStep);
                foreach (var step in oldFlowEngine.FlowSteps)
                {
                    newFlowEngine.Insert(step, index++);
                }
            }
        }

        /// <summary>
        /// 拼接当前流程至已存在流程后
        /// </summary>         
        /// <param name="newFlowEngine">新流程</param>
        /// <param name="oldFlowEngine">old流程</param>
        public static void Concat(FlowEngine newFlowEngine, FlowEngine oldFlowEngine)
        {
            foreach (var step in newFlowEngine.FlowSteps)
            {
                oldFlowEngine.Add(step);
            }
        }

        private static Step FindLastReturned(FlowEngine flowEngine)
        {
            IEnumerable<Step> reverseSteps = flowEngine.FlowSteps.Reverse();
            foreach (var step in reverseSteps)
            {
                foreach (var node in step.Nodes)
                {
                    if (node.AuditType == AuditType.Returned)
                        return step;
                }
            }
            return null;
        }

        private static void SetDisableAtReturned(FlowEngine flowEngine, Step returnedStep)
        {
            LinkedListNode<Step> stepNode = flowEngine.FlowSteps.Find(returnedStep);
            if (stepNode == null) return;
            stepNode = stepNode.Next;
            while (stepNode != null)
            {
                Step step = stepNode.Value;
                foreach (var node in step.Nodes)
                {
                    if (node.AuditType != AuditType.Disable)
                    {
                        node.AuditType = AuditType.Disable;
                    }
                }
                stepNode = stepNode.Next;
            }
        }

        /// <summary>
        /// 增加中心级部门
        /// </summary>
        /// <param name="flowEngine">流程</param>
        /// <param name="funcEntry">中心级部门指定功能</param>        
        /// <param name="centers">中心部门编号</param>
        private static void AddLevel1(FlowEngine flowEngine, FunctionEntity funcEntry, IList<DepartmentEntity> centers)
        {
            Step zrStep = FindByReference(flowEngine, 10200);
            Step firstStep = zrStep == null ? flowEngine.FlowSteps.First() : zrStep;
            Step newStep = null;
            foreach (var dep in centers)
            {
                newStep = new StepGeneral();
                Participant participant = new Participant() { Department = Convert.ToInt64(dep.Id), Category = 1, Reference = (long)funcEntry.Id };
                newStep.Add(new Node(funcEntry.C_Name, participant) { Description = funcEntry.C_Name });

                flowEngine.AddAfter(firstStep, newStep);
                firstStep = newStep;
            }
            if (zrStep != null)
            {
                newStep = new StepGeneral();
                foreach (var node in zrStep.Nodes)
                {
                    Participant p = (Participant)node.Participant.Clone();
                    Node newNode = new Node(node.Name, p);
                    newStep.Add(newNode);
                }
                flowEngine.AddAfter(firstStep, newStep);
            }
        }

        /// <summary>
        /// 增加中心下属部门
        /// </summary>
        /// <param name="flowEngine">流程</param>
        /// <param name="funcEntry">中心下属部门指定功能</param>        
        /// <param name="children">中心下属部门编号</param>
        private static void AddLevel2(FlowEngine flowEngine, FunctionEntity funcEntry, IList<DepartmentEntity> children)
        {
            Step firstStep = flowEngine.FlowSteps.First();
            Step newStep = null;
            foreach (var dep in children)
            {
                newStep = new StepGeneral();
                Participant participant = new Participant() { Department = Convert.ToInt64(dep.Id), Category = 1, Reference = (long)funcEntry.Id };
                newStep.Add(new Node(funcEntry.C_Name, participant) { Description = funcEntry.C_Name });

                flowEngine.AddAfter(firstStep, newStep);
                firstStep = newStep;
            }
        }

        private static Step FindByReference(FlowEngine flowEngine, long reference)
        {
            foreach (var step in flowEngine.FlowSteps)
            {
                foreach (var node in step.Nodes)
                {
                    if (node.AuditType == AuditType.UnAudit && node.Participant.Reference == reference)
                    {
                        return step;
                    }
                }
            }
            return null;
        }

        private static Hashtable BuildWorkDepts(int id, long uid)
        {
            Hashtable workDepts = new Hashtable();
            //获取该工单信息
            using (WorkBLL workBLL = new WorkBLL())
            {
                IList<WorkDept> references = workBLL.GetWorkParticipants(id, uid);
                foreach (var reference in references)
                {
                    if (!workDepts.ContainsKey(reference.FuncId))
                    {
                        workDepts.Add(reference.FuncId, reference);
                    }
                }
                return workDepts;
            }
        }

        public static void CommitWork(int id, long uid)
        {
            //获取当前模板
            using (SystemBLL bll = new SystemBLL())
            {
                BusinessKindEntity flowKind = bll.GetKind(id);

                FlowAttachment attachment = new FlowAttachment() { Creater = uid, Owner = id };

                FlowEngine flowEngine = FlowManager.Instance().TemplateLoad(flowKind.C_Template, attachment);

                FlowManager.Instance().Assign(flowEngine, attachment);
                Hashtable workDepts = BuildWorkDepts(id, uid);

                foreach (var step in flowEngine.FlowSteps)
                {
                    Node node = step.Nodes.First();
                    if (node.Participant.Reference == 15100) continue;
                    WorkDept workDept = (WorkDept)workDepts[(int)node.Participant.Reference];
                    switch (node.Participant.Category)
                    {
                        case 0:
                            node.Participant.Department = workDept.Dept;
                            break;
                        default:
                            node.Participant.Department = workDept.Dept;
                            break;
                    }
                }
                FlowManager.Instance().Save(flowEngine, Category.Work);
            }
        } 

    } 
}
