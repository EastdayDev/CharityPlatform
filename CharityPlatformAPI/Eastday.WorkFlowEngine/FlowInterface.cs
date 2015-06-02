

namespace Eastday.WorkFlowEngine
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    /// <summary>
    /// 确认审核部门接口
    /// </summary>
    public interface IActor
    {
        /// <summary>
        /// 查找用户所属部门中拥有reference的部门编号
        /// </summary>         
        /// <param name="participant">参与者</param>
        /// <param name="uid">流程创建人</param> 
        long Find(FlowAttachment flowAttachment, Participant participant);
    }

    /// <summary>
    /// 条件节点接口
    /// 由外部实现,节点自动调用,节点根据返回值与NodeCondition.Expect相关比较
    /// 若二者不相等,则将该节点的审核状态置为Disable
    /// </summary>
    public interface INodeCondition
    {
        /// <summary>
        /// 查询期待值
        /// </summary>
        /// <param name="flowAttachment">流程附属数据</param>
        int FindExpect(FlowAttachment flowAttachment);
    }

    
     
}
