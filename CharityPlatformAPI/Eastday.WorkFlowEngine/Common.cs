/* **************************************************************
  * Copyright(c) 2014 Eastday, All Rights Reserved.   
  * File             : Common.cs
  * Description      : 基本信息及工具定义
  * Author           : zhaotianyu
  * Created          : 2014-03-11  
  * Revision History : 
******************************************************************/
namespace Eastday.WorkFlowEngine
{
    /// <summary>
    /// 审核类别
    /// </summary>
    public enum AuditType
    {
        /// <summary>
        /// 通过1
        /// </summary>
        Passed = 10,

        /// <summary>
        /// 通过并终止
        /// </summary>
        PassedAndAbort = 11,

        /// <summary>
        /// 传阅2
        /// </summary>
        Circulate = 20,

        /// <summary>
        /// 传阅并通过3
        /// </summary>
        CirculatePass = 21,
        /// <summary>
        /// 异议流转4
        /// </summary>
        Dissent = 22,
        /// <summary>        
        /// 传阅并有条件同意5
        /// </summary>
        CirculateDissent = 23,

        /// <summary>
        /// 退回6
        /// </summary>
        Returned = 30,

        /// <summary>
        /// 无效<禁止审核>
        /// </summary>
        Disable = 40,

        /// <summary>
        /// 未审7
        /// </summary>
        UnAudit = 50,
    }

    /// <summary>
    /// 流程状态
    /// </summary>
    public enum FlowState
    {
        /// <summary>
        /// 未提交
        /// </summary>
        Uncommitted = 0,

        /// <summary>
        /// 进行中
        /// </summary>
        Processing = 1,

        /// <summary>
        /// 退回
        /// </summary>
        Returned = 2,

        /// <summary>
        /// 结束
        /// </summary>
        Finished = 3,

        /// <summary>
        /// 等待本部门审核
        /// </summary>
        SelfWaiting = 4, 
    }
}
