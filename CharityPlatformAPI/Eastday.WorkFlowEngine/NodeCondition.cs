/* **************************************************************
  * Copyright(c) 2014 Eastday, All Rights Reserved.   
  * File             : NodeCondition.cs
  * Description      : 定义流程步骤的节点，每个节点表示一个审批环节
  * Author           : zhaotianyu
  * Created          : 2014-03-20
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
    /// 条件节点
    /// </summary>
    [Serializable]
    public class NodeCondition : Node
    { 
        /// <summary>
        /// Initializes a new instance of the <see cref="NodeCondition"/> class.
        /// </summary>        
        /// <param name="name">节点名称</param>
        /// <param name="participant">参与者</param>
        /// <param name="key">关注的消息键值</param>
        public NodeCondition(string name, Participant participant)
            : base(name, participant)
        {            
        }

        public INodeCondition Condition { get; set; }

        /// <summary>
        /// 期待值
        /// </summary>
        public int Expect { get; set; }
        
        #region override object.Equals

        /// <summary>
        /// 重载方法
        /// </summary>
        /// <returns>hasCode</returns>
        public override int GetHashCode()
        {
            return base.GetHashCode();
        }

        /// <summary>
        /// 重载方法
        /// </summary>
        /// <param name="obj">other nodeCondition</param>
        /// <returns>true 同一对象</returns>
        public override bool Equals(object obj)
        {
            if (obj != null && obj is NodeCondition)
            {
                NodeCondition other = (NodeCondition)obj;
                return this.Name == other.Name                    
                    && this.Expect == other.Expect
                    && this.participant.CompareTo(other.participant) > 0;
            }

            return base.Equals(obj);
        }

        #endregion

        #region Notification

        public override void Reset(FlowAttachment flowAttachment)
        {
            base.Reset(flowAttachment);
            if (this.Condition == null || this.AuditType != WorkFlowEngine.AuditType.UnAudit)
            {
                return;
            }
            if (this.Expect != this.Condition.FindExpect(flowAttachment))
            {
                this.conclusion.AuditType = WorkFlowEngine.AuditType.Disable;
            }
        }

        #endregion
    }
}
