/* **************************************************************
  * Copyright(c) 2014 Eastday, All Rights Reserved.    
  * File             : StepSingle.cs
  * Description      : 步骤内只存在一个节点
  * Author           : zhaotianyu
  * Created          : 2014-03-06
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
    /// 步骤内单节点
    /// </summary>
    [Serializable]
    public class StepSingle : Step
    {
        /// <summary>
        ///  Initializes a new instance of the <see cref="StepSingle"/> class.
        /// </summary> 
        public StepSingle()
            : base()
        {
        }

        /// <summary>
        /// 添加节点
        /// </summary>
        /// <param name="node">节点</param>
        public override void Add(Node node)
        {
            if (this.nodes.Count > 0)
            {
                throw new Exception("步骤内节点已经存在");
            }

            base.Add(node);
        }
    }
}
