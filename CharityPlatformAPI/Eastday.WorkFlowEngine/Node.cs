/* **************************************************************
  * Copyright(c) 2014 Eastday, All Rights Reserved.   
  * File             : Node.cs
  * Description      : 定义流程步骤的节点，每个节点表示一个审批环节
  * Author           : zhaotianyu
  * Created          : 2014-03-05  
  * Revision History : 
******************************************************************/
namespace Eastday.WorkFlowEngine
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;


    /// <summary>
    /// 传阅接口
    /// </summary>
    /// <typeparam name="T"></typeparam>
    interface ITransfer11<T>
    {
        IList<T> GetTransfers();
    }

    /// <summary>
    /// Step node
    /// </summary>   
    [Serializable]
    public class Node
    { 
        protected Participant participant;
        protected Conclusion conclusion;
        
        private string identification = string.Empty;
         
        /// <summary>
        /// Initializes a new instance of the <see cref="Node"/> class.
        /// </summary>        
        /// <param name="name">流程名称</param>ntnt
        /// <param name="participant">参与者</param>
        public Node(string name, Participant participant)
        {
            this.Name = name;            
            this.participant = participant;
            this.TransferKind = -1;
            this.conclusion = new Conclusion(AuditType.UnAudit, -1, null);
            this.identification = Guid.NewGuid().ToString().Replace("-", "");
        }

        /// <summary>
        /// 重置节点数据
        /// </summary>
        /// <param name="flowEngine">流程</param>
        public virtual void Reset(FlowAttachment flowAttachment)
        {            
            this.participant.Reset(flowAttachment);
        }

        public virtual void ResetIdentity()
        {
            this.identification = Guid.NewGuid().ToString().Replace("-", "");
        }

        #region Property

        /// <summary>
        /// 节点名称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 标识
        /// </summary>
        public string Identification
        {
            get { return this.identification; }
        }
        /// <summary>
        /// 节点描述
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// 传递对象分类 默认为 -1 不传递
        /// </summary>
        public int TransferKind { get; set; }

        /// <summary>
        /// 附属（外部应用附加数据）
        /// </summary>
        public object Auxiliary { get; set; }

        /// <summary>
        /// 该节点参与者
        /// </summary>
        public Participant Participant
        {
            get
            {
                return this.participant;
            }
        }        

        /// <summary>
        /// 审核结论
        /// </summary>
        public Conclusion Conclusion
        {
            get
            {
                return this.conclusion;
            }
        }
        /// <summary>
        /// 审核类型
        /// </summary>
        public AuditType AuditType
        {
            get
            {
                return this.conclusion.AuditType;
            }
            set
            {
                this.conclusion.AuditType = value;
            }
        }
        /// <summary>
        /// 审核人
        /// </summary>
        public long Auditer
        {
            get
            {
                return this.conclusion.Auditer;
            }
        }

        public DateTime? AuditDate
        {
            get
            {
                return this.conclusion.AuditDate;
            }
            set
            {
                this.conclusion.AuditDate = value;
            }
        }

        /// <summary>
        /// 审核意见
        /// </summary>
        public string AuditDesc
        {
            get
            {
                return this.conclusion.Description;
            }
            set
            {
                this.conclusion.Description = value;
            }
        }       
        #endregion

        #region Audit

        /// <summary>
        /// 设置未审核节点状态
        /// 主要用于辅助流程无效或退回
        /// </summary>
        /// <param name="audityType">审核状态</param>
        internal protected virtual void SetAuditType(AuditType audityType)
        {
            if (this.AuditType == WorkFlowEngine.AuditType.UnAudit)
            {
                this.conclusion.AuditType = audityType;
            }
        }

        /// <summary>
        /// 是否允许审核
        /// </summary>
        /// <param name="participant">参与者</param>
        /// <returns>true 允许 false 不允许</returns>
        public virtual bool CanAudit(Participant participant)
        {
            if ((int)this.conclusion.AuditType <= (int)AuditType.Disable)
            {
                return false;
            }

            return this.participant.CompareTo(participant) == 0;             
        }

        /// <summary>
        /// 执行审核
        /// </summary>
        /// <param name="conclusion">审核结论</param>        
        /// <param name="participant">参与者</param>
        /// <returns>true 审核 false 未审</returns>
        public virtual bool Audit(Conclusion conclusion, Participant participant)
        {
            if (this.participant.CompareTo(participant) == 0)
            {
                this.conclusion = conclusion;                           
                return true;
            }
            return false;         
        }
                 
        #endregion                
    }



   
}
