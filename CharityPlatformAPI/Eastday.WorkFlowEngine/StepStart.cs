/* **************************************************************
  * Copyright(c) 2014 Eastday, All Rights Reserved.    
  * File             : StepStart.cs
  * Description      : 定义流程启动步骤，启动步骤只有一个特定节点
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
    /// 流程开始步骤 
    /// </summary>
    [Serializable]
    public class StepStart : StepSingle
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="StepStart"/> class.
        /// </summary>
        public StepStart()
            : base()
        {            
            //this.State = StepState.Finished;                        
            this.nodes.Add(new Node("启动", null));
        }
    }
}
