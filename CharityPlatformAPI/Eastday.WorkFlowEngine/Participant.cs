/* **************************************************************
  * Copyright(c) 2014 Eastday, All Rights Reserved.   
  * File             : Participant.cs
  * Description      : 流程参与对象, 供外应用标识流程参与对象
  * Author           : zhaotianyu
  * Created          : 2014-03-11
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
    /// 流程参与对象
    /// </summary>
    /// <remarks>内容完全由外部定义</remarks>
    [Serializable]
    public class Participant : IComparable, ICloneable
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="Participant"/> class.
        /// </summary>
        public Participant()
        {            
            this.Category = 1;
            this.Department = -1;
            this.Reference = -1;
        }       

        /// <summary>
        /// 节点部门或个人查找接口
        /// </summary>
        public IActor Actor { get; set; }

        /// <summary>
        /// 参与对象分类
        /// </summary>
        /// <remarks>0 具体到个人 1 功能编号</remarks>
        public int Category { get; set; }

        /// <summary>
        /// 部门
        /// </summary>
        public long Department { get; set; }

        /// <summary>
        /// 参与对象标识
        /// </summary>
        public long Reference { get; set; }

        /// <summary>
        /// 比较两个Participant对象
        /// </summary>
        /// <param name="obj">Participant对象</param>
        /// <returns>0 相同 1 不相同</returns>
        public int CompareTo(object obj)
        {
            Participant targetObj = (Participant)obj;
            if (this.Category == 1)
            {
                return this.Category == targetObj.Category
                    && this.Department == targetObj.Department
                    && this.Reference == targetObj.Reference ? 0 : 1;
            }
            else
            {
                return this.Category == targetObj.Category
                    && this.Department == targetObj.Department ? 0 : 1;
            }
        }

        /// <summary>
        /// override ToString()
        /// </summary>
        /// <returns>字符串</returns>
        public override string ToString()
        {
            if (this.Category == 1)
            {
                return string.Format("Department:{0} FunctionNo: {1}", this.Department, this.Reference);
            }
            else
            {
                return string.Format("Department:{0} Uid: {1}", this.Department, this.Reference);
            }
        }

        public void Reset(FlowAttachment flowAttachment)
        {
            if (this.Category == 1 && this.Department == -1 && this.Actor != null)
            {
                this.Department = this.Actor.Find(flowAttachment, this);
            }
        }

        public object Clone()
        {
            return new Participant() { Actor = this.Actor, Category = this.Category, Department = this.Department, Reference = this.Reference };
        }
    }
}
