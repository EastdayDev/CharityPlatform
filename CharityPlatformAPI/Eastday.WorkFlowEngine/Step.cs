/* **************************************************************
  * Copyright(c) 2014 Eastday, All Rights Reserved.    
  * File             : Step.cs
  * Description      : 流程由N多个步骤组成，步骤可以理解为流程步骤
 *                     分为：一般步骤、条件步骤、All步骤及Any步骤等
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
    /// 流程步骤
    /// 每个步骤可以包含一个或多个节点
    /// 步骤的状态会根据步骤类型及节点处理情况变化
    /// </summary>
    [Serializable]
    public abstract class Step
    {
        /// <summary>
        /// 步骤所有节点
        /// </summary>
        protected IList<Node> nodes;
        private string identification = string.Empty;

        /// <summary>
        /// Initializes a new instance of the <see cref="Step"/> class.
        /// </summary>        
        public Step()
        {
            this.nodes = new List<Node>();
            this.identification = Guid.NewGuid().ToString().Replace("-", "");
        }

        /// <summary>
        /// 重置数据
        /// </summary>
        public void Reset(FlowAttachment flowAttachment)
        {            
            foreach (var node in this.nodes)
            {
                node.Reset(flowAttachment);
            }
        }

        public void ResetIdentity()
        {
            this.identification = Guid.NewGuid().ToString().Replace("-", "");
            foreach (var node in this.nodes)
            {
                node.ResetIdentity();
            }
        }

        #region Property
        
        /// <summary>
        /// 获取有效节点总数
        /// </summary>
        public int NodeValidCount
        {
            get
            {
                int count = 0;
                foreach (var node in this.nodes)
                {
                    count += node.AuditType == AuditType.Disable ? 0 : 1;
                }
                return count;
            }
        }

        /// <summary>
        /// 该步骤内所有节点
        /// </summary>
        public IList<Node> Nodes
        {
            get
            {
                return this.nodes;
            }
        }

        /// <summary>
        /// 标识
        /// </summary>
        public string Identification
        {
            get { return this.identification; }
        }
        #endregion

        #region 节点操作

        /// <summary>
        /// 添加节点
        /// </summary>
        /// <param name="node">节点</param>
        public virtual void Add(Node node)
        {
            var nodes = this.nodes.Where(c => c.Identification == node.Identification);

            if (!nodes.Any())
            {
                this.nodes.Add(node);
            }
        }          

        public virtual IList<Node> GetCurrent()
        { 
            //var nodes = from value in this.nodes
            //            where value.AuditType == AuditType.UnAudit
            //            select value;
            //if (nodes != null && nodes.Any())
            //{
            //    IList<Node> list = new List<Node>();
            //    list.Add(nodes.FirstOrDefault());
            //    return list;
            //}
            //return new List<Node>();

            var nodes = from value in this.nodes
                        where value.AuditType == AuditType.UnAudit
                        select value;
            return nodes.ToList();
            
        }

        public Node FindByParticipant(Participant p)
        {
            var nodes = from node in this.nodes
                        where node.CanAudit(p)
                        select node;
            return nodes.Any() ? nodes.First() : null;
        }

        /// <summary>
        /// 查询特定节点
        /// </summary>
        /// <param name="identification">节点标识</param>
        /// <returns></returns>
        public Node Find(string identification)
        {
            foreach (var node in this.nodes)
            {
                if (node.Identification.Equals(identification))
                    return node;
            }
            return null;
        }

        #endregion

        #region Audit
        /// <summary>
        /// 是否允许审核
        /// </summary>
        /// <param name="participant">参与者</param>
        /// <returns>true 允许 false 不允许</returns>
        public virtual bool CanAudit(Participant participant)
        {
            var nodes = from node in this.nodes
                        where node.CanAudit(participant)
                        select node;
            return nodes.Any();
        }

        /// <summary>
        /// 执行审核
        /// </summary>
        /// <param name="conclusion">审核结论</param>
        /// <param name="participant">参与者</param>
        /// <returns>true 审核 false 未审</returns>
        public virtual bool Audit(Conclusion conclusion, Participant participant)
        {
            bool result = false;
            IList<Node> nodes = this.GetCurrent();
            foreach (var node in nodes)
            {
                if (node.Audit(conclusion, participant))
                {
                    result = true;
                }
            }
            return result;
        } 

        /// <summary>
        /// 步骤转换
        /// </summary>
        public virtual void Leave()
        {
        }

        #endregion

        #region Notification

        /// <summary>
        /// 设置节点审核状态
        /// 主要用于辅助流程无效或退回
        /// </summary>
        /// <param name="audityType">审核状态</param>
        public virtual void SetAudityType(AuditType audityType)
        {
            foreach (var node in this.nodes)
            {
                node.SetAuditType(audityType);
            }
        }

        #endregion
    }
}
