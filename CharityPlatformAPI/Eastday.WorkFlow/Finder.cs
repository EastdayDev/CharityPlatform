/* **************************************************************
  * Copyright(c) 2014 Eastday, All Rights Reserved.    
  * File             : Finder.cs
  * Description      : 查询对应的部门
  *                    实现IParticipant
  * Author           : zhaotianyu
  * Created          : 2014-03-15
  * Revision History : 
******************************************************************/
namespace Eastday.WorkFlow
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using Eastday.WorkFlowEngine;
    using Eastday.Data;
    using Eastday.Entity;

    /// <summary>
    /// 传递类型
    /// </summary>
    public enum TransferKind
    {
        /// <summary>
        /// 不传递
        /// </summary>
        None = -1, 

        /// <summary>
        /// 传递对象功能号：11700
        /// </summary>
        HeadOffice = 10,

        /// <summary>
        /// 传递对象功能号：14100
        /// </summary>
        SubOffice = 30,

        /// <summary>
        /// 传递对象功能号：11800
        /// </summary>
        Leader = 20,        

        /// <summary>
        /// 工单可传递对象功能号：11600
        /// </summary>
        Work = 60,        
    }

    /// <summary>
    /// 通过功能编码查询部门
    /// </summary>
    [Serializable]
    public class DepartmentActor : IActor
    {
        public long Find(FlowAttachment flowAttachment, Participant participant)
        {
            using (Eastday.Data.WorkFlowBLL bll = new Eastday.Data.WorkFlowBLL())
            {
                return bll.GetDepByFuction(Convert.ToInt64(participant.Reference), flowAttachment.Creater);
            }
        }
    }

    /// <summary>
    /// 按工单类型查找工单签收人部门
    /// </summary>
    public class WorkReceiverActor : IActor
    {
        /// <summary>
        /// 工单类型
        /// </summary>
        public int WorkType { get; set; }

        public long Find(FlowAttachment flowAttachment, Participant participant)
        {
            using (Eastday.Data.WorkFlowBLL bll = new Eastday.Data.WorkFlowBLL())
            {
                return bll.GetWorkDepByFuction(participant.Reference, this.WorkType);
            }
        }
    }

    /// <summary>
    /// 条件节点期望值接口实现
    /// </summary>
    [Serializable]
    public class RevenuCondition : INodeCondition
    {
        /// <summary>
        /// 返回条件节点的期望值
        /// </summary>
        /// <param name="flowAttachment"></param>
        /// <returns></returns>
        public int FindExpect(FlowAttachment flowAttachment)
        {
            using (SystemBLL bll = new SystemBLL())
            {
                return bll.GetKindFlow(flowAttachment.Kind);
            }
        }
    }


    public static class Transfer
    {
        /// <summary>
        /// 可被传阅接口实现(部门)
        /// </summary>
        public static IList<DepartmentEntity> GetHeadOfficeTransfers()
        {
            using (DepartmentBLL bll = new DepartmentBLL())
            {
                return bll.GetDepartmentAll(-1, -1, -1);
            }
        }

        /// <summary>
        /// 可被传阅接口实现(领导)
        /// </summary>
        //public static IList<DepartmentUserEntity> GetLeaderTransfers()
        //{
        //    using (DepartmentBLL bll = new DepartmentBLL())
        //    {
        //        return bll.GetUserListByFunc(11800);
        //    }
        //}

        /// <summary>
        /// 可被传阅接口实现(领导)
        /// </summary>
        public static IList<DepartmentUserEntity> GetLeaderTransfers()
        {
            using (DepartmentBLL bll = new DepartmentBLL())
            {
                return bll.GetUserTreeListByFunc(11800);
            }
        }

        /// <summary>
        /// 可被传阅接口实现(工单)
        /// </summary>
        public static IList<DepartmentUserEntity> GetWorkTransfers()
        {
            using (DepartmentBLL bll = new DepartmentBLL())
            {
                return bll.GetUserTreeWorkListByFunc(13200);
            }
        }        
    }


    /// <summary>
    /// 可被传阅接口实现(领导)
    /// </summary>
    [Serializable]
    public class LeaderTransfer : ITransfer<DepartmentUserEntity>
    {
        public IList<DepartmentUserEntity> GetTransfers()
        {
            using (DepartmentBLL bll = new DepartmentBLL())
            {
                return bll.GetUserListByFunc(11800);
            }
        }
    }

    /// <summary>
    /// 可被传阅接口实现(工单)
    /// </summary>
    [Serializable]
    public class WorkTransfer : ITransfer<DepartmentUserEntity>
    {
        public IList<DepartmentUserEntity> GetTransfers()
        {
            using (DepartmentBLL bll = new DepartmentBLL())
            {
                return bll.GetUserListByFunc(11600);
            }
        }
    }

    /// <summary>
    /// 可被传阅接口实现(部门)
    /// </summary>
    [Serializable]
    public class DepartmentTransfer : ITransfer<DepartmentEntity>
    {
        public IList<DepartmentEntity> GetTransfers()
        {
            using (DepartmentBLL bll = new DepartmentBLL())
            {
                return bll.GetDepartmentAll(-1, -1, -1);
            }
        }
    }



    /// <summary>
    /// 传阅接口
    /// </summary>
    /// <typeparam name="T"></typeparam>
    interface ITransfer<T>
    {
        IList<T> GetTransfers();
    }


}