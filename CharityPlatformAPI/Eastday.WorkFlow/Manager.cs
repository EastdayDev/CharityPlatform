/* **************************************************************
  * Copyright(c) 2014 Eastday, All Rights Reserved.    
  * File             : FlowManager.cs
  * Description      : 流程管理  *                    
  * Author           : zhaotianyu
  * Created          : 2014-03-19
  * Revision History : 
******************************************************************/
namespace Eastday.WorkFlow
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using CharityPlatform.Data;
    using Eastday.WorkFlowEngine;
    using System.Collections;
    using CharityPlatform.Entity;

    class FlowKey
    {
        public int Owner = -1;

        public override int GetHashCode()
        {
            return Owner;
        }

        public override bool Equals(object obj)
        {
            FlowKey other = (FlowKey)obj;
            return this.Owner == other.Owner;
        }
    }
    /// <summary>
    /// 流程管理
    /// </summary>
    public class FlowManager
    {
        private static FlowManager flowManager = null;

        private IDictionary<FlowKey, FlowEngine> dicFlow = null;
        /// <summary>
        /// Initializes a new instance of the <see cref="FlowEngine"/> class.
        /// </summary>
        private FlowManager()
        {
            this.dicFlow = new Dictionary<FlowKey, FlowEngine>();
        }

        /// <summary>
        /// 单例模式
        /// </summary>
        /// <returns>FlowManager</returns>
        public static FlowManager Instance()
        {
            if (flowManager == null)
            {
                flowManager = new FlowManager();
            }
            return flowManager;
        }

        /// <summary>
        /// 统一创建流程引擎
        /// </summary>
        /// <returns></returns>
        public FlowEngine BuildEngine()
        {
            FlowEngine flowEngine = new FlowEngine();
            flowEngine.FinishedHandler -= new FlowEngine.FinishedEventHandler(FlowManager.FlowFinished);
            flowEngine.FinishedHandler += new FlowEngine.FinishedEventHandler(FlowManager.FlowFinished);
            return flowEngine;
        }

        #region Actor Condition

        /// <summary>
        /// 普通节点设置IActor
        /// 条件节点设置ICondition
        /// </summary>
        /// <param name="flowEngine">流程对象</param>
        public void Assign(FlowEngine flowEngine, FlowAttachment flowAttachment)
        {
            foreach (var step in flowEngine.FlowSteps)
            {
                foreach (var node in step.Nodes)
                {
                    //node.Participant.Actor = new DepartmentActor();
                    if (node is NodeCondition)
                    {
                        ((NodeCondition)node).Condition = new RevenuCondition();
                    }
                }
            }
            flowEngine.Reset(flowAttachment);
        }
        /// <summary>
        /// 检查流程是否存在
        /// </summary>
        /// <param name="category">流程分类</param>
        /// <param name="owner">属主</param>
        /// <returns></returns>
        public bool FlowExists(int owner)
        {
            string fullName = GetFlowFile(owner);
            return System.IO.File.Exists(fullName);
        }

        public void Delete(int I_Owner)
        {
            using (WorkFlowBLL workFlowBLL = new WorkFlowBLL())
            {
                workFlowBLL.Usp_Workflow_Delete(I_Owner);
            }
        }

        #endregion

        #region file load and save

        /// <summary>
        /// 加载流程文件
        /// </summary>
        /// <param name="category">分类</param>
        /// <param name="owner">属主</param>
        /// <returns></returns>
        public FlowEngine Load(int owner)
        {
            FlowKey flowKey = new FlowKey() { Owner = owner };
            if (this.dicFlow.ContainsKey(flowKey))
            {
                return this.dicFlow[flowKey];
            }
            string fileName = FlowManager.GetFlowFile(owner);
            FlowEngine flowEngine = FlowEngine.Load(fileName);
            flowEngine.FinishedHandler -= new FlowEngine.FinishedEventHandler(FlowManager.FlowFinished);
            flowEngine.FinishedHandler += new FlowEngine.FinishedEventHandler(FlowManager.FlowFinished);
            if (flowEngine.FlowState != FlowState.Finished && !this.dicFlow.ContainsKey(flowKey))
            {
                this.dicFlow.Add(flowKey, flowEngine);
            }
            return flowEngine;
        }

        public void Remove(int owner)
        {
            FlowKey flowKey = new FlowKey() { Owner = owner };
            if (this.dicFlow.ContainsKey(flowKey))
            {
                this.dicFlow.Remove(flowKey);
            }
        }

        private void Save(FlowEngine flowEngine)
        {
            if (flowEngine.Attachment.Owner == -1)
            {
                throw new ArgumentException("Owner is null");
            }
            if (flowEngine.FlowState != FlowState.Finished)
            {
                FlowKey flowKey = new FlowKey() { Owner = flowEngine.Attachment.Owner };
                if (!this.dicFlow.ContainsKey(flowKey))
                {
                    this.dicFlow.Add(flowKey, flowEngine);
                }
                else if (flowEngine.GetCurrent() == null)
                {
                    this.dicFlow.Remove(flowKey);
                }
                else if (this.dicFlow.ContainsKey(flowKey))
                {
                    this.dicFlow[flowKey] = flowEngine;
                }
            }
            string fileName = FlowManager.GetFlowFile(flowEngine.Attachment.Owner);
            FlowEngine.Save(fileName, flowEngine);
        }

        /// <summary>
        /// 流程文件名
        /// </summary>
        /// <param name="category">业务分类</param>
        /// <param name="owner">文件属主</param>
        /// <returns>全路径文件名</returns>
        private static string GetFlowFile(int owner)
        {
            string directory = string.Empty;
            string path = System.Configuration.ConfigurationManager.AppSettings["FlowPath"];
            return string.Format("{0}/Flow_{1}.bin", path, owner);
        }

        /// <summary>
        /// 模板文件全名
        /// </summary>
        /// <param name="name">模板名称</param>
        /// <returns></returns>
        private string GetTemplateFile(string name)
        {
            string path = System.Configuration.ConfigurationManager.AppSettings["FlowPath"];
            return string.Format("{0}.bin", System.IO.Path.Combine(path, "Template", name));
        }

        /// <summary>
        /// 保存模板
        /// </summary>
        /// <param name="template">模板名称</param>
        /// <param name="flowEngine">流程</param>
        /// <remarks>命名: TEMP_0001  TEMP_002</remarks>
        public void TemplateSave(string template, FlowEngine flowEngine)
        {
            string file = this.GetTemplateFile(template);
            string directory = System.IO.Path.GetDirectoryName(file);
            if (!System.IO.Directory.Exists(directory))
            {
                System.IO.Directory.CreateDirectory(directory);
            }
            FlowEngine.Save(file, flowEngine);
        }

        /// <summary>
        /// 加载模板
        /// </summary>
        /// <param name="template"></param>
        /// <returns></returns>
        public FlowEngine TemplateLoad(string template)
        {
            string file = this.GetTemplateFile(template);
            FlowEngine flowEngine = FlowEngine.Load(file);
            flowEngine.FinishedHandler -= new FlowEngine.FinishedEventHandler(FlowManager.FlowFinished);
            flowEngine.FinishedHandler += new FlowEngine.FinishedEventHandler(FlowManager.FlowFinished);
            flowEngine.FlowState = FlowState.SelfWaiting;
            flowEngine.ResetIdentity();
            return flowEngine;
        }

        /// <summary>
        /// 加载模板，并初始化流程
        /// </summary>
        /// <param name="template">模板名称</param>
        /// <param name="flowAttachment">流程附属数据</param>
        /// <returns></returns>
        public FlowEngine TemplateLoad(string template, FlowAttachment flowAttachment)
        {
            string file = this.GetTemplateFile(template);
            FlowEngine flowEngine = FlowEngine.Load(file);
            flowEngine.ResetIdentity();
            flowEngine.Reset(flowAttachment);
            return flowEngine;
        }

        #endregion

        #region Data save

        /// <summary>
        /// 保存流程数据
        /// </summary>
        /// <param name="flowEngine">流程</param>
        /// <param name="category">分类</param>
        /// <param name="owner">具体业务数据对应的PK</param>
        public void FlowSave(Eastday.WorkFlowEngine.FlowEngine flowEngine)
        {
            using (WorkFlowBLL workFlowBLL = new WorkFlowBLL())
            {
                workFlowBLL.DbContext = workFlowBLL.CreateDbContext(true);
                WorkFlowEntity workFlowEntity = workFlowBLL.Usp_Flow_ByOwner(flowEngine.Attachment.Owner);
                if (workFlowEntity == null) workFlowEntity = new WorkFlowEntity();
                workFlowEntity.I_Owner = flowEngine.Attachment.Owner;
                workFlowEntity.I_State = (int)flowEngine.FlowState;
                workFlowEntity.I_Flag = 1;

                //ParticipantEntity
                var aCurrent = flowEngine.GetCurrent();
                var steps = from step in flowEngine.FlowSteps where !(step is StepEnd) select step;
                List<ParticipantEntity> participants = new List<ParticipantEntity>();
                foreach (var step in steps)
                {
                    foreach (var node in step.Nodes)
                    {
                        ParticipantEntity participantEntity = new ParticipantEntity();
                        participantEntity.I_Reference = node.Participant.Reference;
                        participantEntity.I_WorkFlow = workFlowEntity.Id;
                        participantEntity.C_Step = step.Identification;
                        participantEntity.C_Node = node.Identification;
                        participantEntity.I_Auditer = node.Conclusion.Auditer;
                        participantEntity.D_Audit = node.Conclusion.AuditDate;
                        participantEntity.I_Bind = node.Participant.Category;
                        participantEntity.I_Current = step == aCurrent && node.AuditType == AuditType.UnAudit ? 1 : (int)node.Conclusion.AuditType;

                        participants.Add(participantEntity);
                    }
                }

                if (workFlowBLL.Usp_Flow_Insert(workFlowEntity, participants) > 0)
                {
                    workFlowBLL.DbContext.CommitTransaction();
                }
            }
        }

        #endregion

        #region Audit

        /// <summary>
        /// 流程审核
        /// </summary>
        /// <param name="flowEngine">流程</param>
        /// <param name="auditType">审核类型</param>
        /// <param name="auditDesc">审核描述</param>
        /// <param name="userId">Sys_User.Id</param>
        /// <returns>true 审核成功 false 不能审核</returns>
        public bool Audit(FlowEngine flowEngine, AuditType auditType, string auditDesc, int userId)
        {
            using (AppBLL bll = new AppBLL())
            {
                Participant participant = null;
                Conclusion conclusion = null;
                IList<FunctionEntity> userFuncs = bll.FillList<FunctionEntity>("Usp_Funcs_ByUser", new { UserId = userId });
                foreach (var userFunc in userFuncs)
                {
                    participant = new Participant() { Category = 1, Department = userId, Reference = (long)userFunc.Id };
                    conclusion = new Conclusion(auditType, (long)userId, DateTime.Now) { Description = auditDesc };
                    if (flowEngine.Audit(conclusion, participant))
                    {
                        return true;
                    }
                }

                participant = new Participant() { Category = 0, Department = userId, Reference = -1 };
                conclusion = new Conclusion(auditType, userId, DateTime.Now) { Description = auditDesc };
                if (flowEngine.Audit(conclusion, participant))
                {
                    return true;
                }
            }
            return false;
        }
        /// <summary>
        /// 判断是否属于当前人审核
        /// </summary>
        /// <param name="flowEngine"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        public bool CanAudit(FlowEngine flowEngine, int userId)
        {
            Step current = flowEngine.GetCurrent();
            if (current == null || current.NodeValidCount == 0) return false;
            IList<Node> nodes = current.Nodes;

            using (AppBLL bll = new AppBLL())
            {
                IList<FunctionEntity> userFuncs = bll.FillList<FunctionEntity>("Usp_Funcs_ByUser", new { UserId = userId });
                foreach (var userFunc in userFuncs)
                {
                    var auditNodes = from node in nodes
                                     where node.Participant.Reference == userFunc.Id || node.Participant.Department == userId
                                     select node;
                    if (auditNodes.Any()) return true;
                }
            }
            return false;
        }

        /// <summary>
        /// 流程退回
        /// </summary>
        /// <param name="flowEngine"></param>
        public bool Returned(FlowEngine flowEngine, AuditType auditType, string auditDesc, int userId)
        {
            if (this.Audit(flowEngine, auditType, auditDesc, userId))
            {
                flowEngine.Returned();
                return true;
            }
            return false;
        }

        /// <summary>
        /// 流程终止
        /// </summary>
        /// <param name="flowEngine"></param>
        public bool Abort(FlowEngine flowEngine, string auditDesc, int userId)
        {
            if (this.Audit(flowEngine, AuditType.Passed, auditDesc, userId))
            {
                flowEngine.Abort();
                return true;
            }
            return false;
        }

        /// <summary>
        /// 流程审核结束事件
        /// </summary>
        /// <param name="sender">流程对象</param>
        /// <param name="e">暂时为空值</param>
        private static void FlowFinished(object sender, EventArgs e)
        {
            FlowEngine flowEngine = (FlowEngine)sender;
            using (WorkFlowBLL bll = new WorkFlowBLL())
            {
                bll.USP_Flow_Confirm(flowEngine.Attachment.Owner);
            }
        }

        #endregion

        /// <summary>
        /// 生成用户的参与者身份
        /// </summary>
        /// <param name="userId">用户编号</param>
        /// <returns>参与者身份列表</returns>
        //private static List<Participant> BuildParticipants(long userId)
        //{
        //    List<Participant> participants = new List<Participant>();
        //    using (SystemBLL bll = new SystemBLL())
        //    {
        //        List<Entity.UserAuthEntity> userAuths = bll.GetSysAuthByUser(userId);
        //        foreach (var userAuth in userAuths)
        //        {
        //            participants.Add(new Participant() { Department = userAuth.Department, Reference = userAuth.FuncId });
        //        }
        //    }

        //    return participants;
        //}         
    }
}
