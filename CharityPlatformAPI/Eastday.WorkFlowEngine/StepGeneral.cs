/* **************************************************************
  * Copyright(c) 2014 Eastday, All Rights Reserved.    
  * File             : StepGeneral.cs
  * Description      : 定义一般性流程步骤
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
    /// 一般步骤    
    /// </summary>
    [Serializable]
    public class StepGeneral : Step
    {
        /// <summary>
        ///  Initializes a new instance of the <see cref="StepGeneral"/> class.
        /// </summary>
        public StepGeneral()
            : base()
        { 
        }        
    }
}
