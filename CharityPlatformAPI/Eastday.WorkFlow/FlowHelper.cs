using CharityPlatform.Data;
using CharityPlatform.Entity;
using Eastday.WorkFlow;
using Eastday.WorkFlowEngine;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CharityPlatform.WorkFlow
{
    public class FlowHelper
    {
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
        public static void Commit(int id, int userId, IList<UserEntity> users, bool isSubmit)
        {
            FlowEngine flowEngine = FlowHelper.Build(id, userId, users);
            if (isSubmit) FlowManager.Instance().Delete(id);
            FlowManager.Instance().FlowSave(flowEngine);
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
        public static FlowEngine Build(int id, int userId, IList<UserEntity> users)
        {
            using (AppBLL bll = new AppBLL())
            {
                //获取当前模板
                int flowKindId = (int)bll.GetDataItem<ProjectEntity>("USP_Project_Get", new { Id = id }).I_FlowType;
                FlowKinkEntity flowKindEntity = bll.GetDataItem<FlowKinkEntity>("USP_Flow_Template", new { Id = flowKindId });
                FlowAttachment flowAttachment = new FlowAttachment() { Owner = id, Kind = flowKindEntity.id };
                flowAttachment.Creater = userId;

                FlowManager flowMgr = FlowManager.Instance();
                FlowEngine flowEngine = flowMgr.TemplateLoad(flowKindEntity.C_Template);
                flowEngine.Attachment = flowAttachment;

                if (users != null && users.Any())
                {
                    FunctionEntity funcEntry = null;
                    funcEntry = bll.GetDataItem<FunctionEntity>("Usp_Func_Get", new { Id = 10100 });
                    FlowHelper.AddCountersign(flowEngine, funcEntry, users);
                }
                FlowHelper.Concat(id, flowEngine);

                return flowEngine;
            }
        }

        /// <summary>
        /// 拼接当前流程至已存在流程后
        /// </summary>
        /// <param name="id">编号</param>
        /// <param name="category">分类</param>
        /// <param name="flowEngine">新流程</param>
        public static void Concat(int id, FlowEngine newFlowEngine)
        {
            FlowManager flowMgr = FlowManager.Instance();
            if (flowMgr.FlowExists(id))
            {
                int index = 0;
                FlowEngine oldFlowEngine = flowMgr.Load(id);

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
        /// 增加会签
        /// </summary>
        /// <param name="flowEngine">流程</param>
        /// <param name="funcEntry"></param>        
        /// <param name="users"></param>
        private static void AddCountersign(FlowEngine flowEngine, FunctionEntity funcEntry, IList<UserEntity> users)
        {
            Step firstStep = flowEngine.FlowSteps.First();
            Step newStep = null;
            foreach (var user in users)
            {
                newStep = new StepGeneral();
                Participant participant = new Participant() { Department = -1, Category = 1, Reference = (long)funcEntry.Id };
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
    }
}
