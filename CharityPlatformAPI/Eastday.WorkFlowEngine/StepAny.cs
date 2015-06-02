/* **************************************************************
  * Copyright(c) 2014 Eastday, All Rights Reserved.    
  * File             : StepAll.cs
  * Description      : Any类型步骤
 *                     任一有效节点审核完成即转至下一步骤
  * Author           : zhaotianyu
  * Created          : 2014-03-29
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
    /// ALL类型步骤,不允许传递
    /// </summary>
    [Serializable]
    public class StepAny : Step
    {
        public override IList<Node> GetCurrent()
        {
            var nodes = from value in this.nodes
                        where value.AuditType == AuditType.UnAudit
                        select value;
            return nodes.ToList();            
        }

        /// <summary>
        /// 本步骤任何节点审核通过，禁止其它节点审核
        /// </summary>
        public override void Leave()
        {
            base.Leave();
            foreach (var node in this.nodes)
            {
                node.SetAuditType(AuditType.Disable);
            }
        }
    }
}
