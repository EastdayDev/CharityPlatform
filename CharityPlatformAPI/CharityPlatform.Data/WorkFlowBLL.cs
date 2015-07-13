/* **************************************************************
  * Copyright(c) 2014 Eastday, All Rights Reserved.    
  * File             : WorkFlowBLL.cs
  * Description      : 流程管理                     
  * Author           : zhaotianyu
  * Created          : 2014-03-19
  * Revision History : 
******************************************************************/
namespace CharityPlatform.Data
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using ClownFish;
    using System.Data;
    using CharityPlatform.Entity;

    /// <summary>
    /// 流程业务类
    /// </summary>
    public class WorkFlowBLL : AppBLL
    {
        /// <summary>
        /// 待审列表
        /// </summary>
        /// <param name="I_User">用户ID</param>
        /// <param name="PageIndex">当前页号</param>
        /// <param name="PageSize">页大小（每页显示多少个）</param>
        /// <returns></returns>
        public DataTable USP_Check_List(int userId, int pageIndex, int pageSize, string findValue)
        {
            return this.FillDataTable("USP_Check_List", new { UserId = userId, PageIndex = pageIndex, PageSize = pageSize, FindValue = findValue });
        }

        /// <summary>
        /// 已审列表
        /// </summary>
        /// <param name="I_User"></param>
        /// <param name="PageIndex"></param>
        /// <param name="PageSize"></param>
        /// <param name="findValue"></param>
        /// <returns></returns>
        public DataTable USP_Check_List_Over(int userId, int pageIndex, int pageSize, string findValue)
        {
            return this.FillDataTable("USP_Check_List_Over", new { UserId = userId, PageIndex = pageIndex, PageSize = pageSize, FindValue = findValue });
        }

        /// <summary>
        /// 获得流程模板
        /// </summary>
        /// <param name="flow">流程定义编号</param>
        /// <returns></returns>
        public FlowKinkEntity USP_Flow_Template(int id)
        {
            return this.GetDataItem<FlowKinkEntity>("USP_Flow_Template", new { Id = id });
        }
        /// <summary>
        /// 保存流程数据，会删除原有的所有参与者，再保存
        /// </summary>
        /// <param name="workFlowEntity">流程</param>
        /// <param name="participants">所有参与者</param>
        /// <returns></returns>
        /// <remarks></remarks>
        public int Usp_Flow_Insert(CharityPlatform.Entity.WorkFlowEntity workFlowEntity, List<CharityPlatform.Entity.ParticipantEntity> participants)
        {
            this.ExecuteNonQuery("Usp_Flow_Insert", workFlowEntity);

            foreach (var entity in participants)
            {
                entity.I_WorkFlow = workFlowEntity.Id;
                this.ExecuteNonQuery("Usp_Participant_Insert", entity);
            }

            return workFlowEntity.Id;
        }

        /// <summary>
        /// 更新数据
        /// </summary>
        /// <param name="entity">流程实体</param>
        /// <returns>影响的行数</returns>
        public int Usp_Flow_Update(Entity.WorkFlowEntity entity)
        {
            return this.ExecuteNonQuery("Usp_Flow_Update", entity);
        }

        /// <summary>
        /// 查找流程数据
        /// </summary>
        /// <param name="owner">流程属主</param>
        /// <returns>流程实体</returns>
        public Entity.WorkFlowEntity Usp_Flow_ByOwner(int owner)
        {
            return this.GetDataItem<Entity.WorkFlowEntity>("Usp_Flow_ByOwner", new { I_Owner = owner });
        } 

        public void USP_Flow_Confirm(int owner)
        {
            this.ExecuteNonQuery("USP_Flow_Confirm", new { I_Owner = owner });
        }

        /// <summary>
        /// 删除流程数据
        /// </summary>
        /// <param name="I_Owner"></param>
        public void Usp_Workflow_Delete(int I_Owner)
        {
            this.ExecuteNonQuery("Usp_Workflow_Delete", new { I_Owner = I_Owner });
        }
    }

    /// <summary>
    /// 参与者数据访问
    /// </summary>
    public class ParticipantBLL : AppBLL
    {
        /// <summary>
        /// 插入数据
        /// </summary>
        /// <param name="entities">实体列表</param>
        /// <returns>影响行数</returns>
        public int Usp_Participant_Insert(List<Entity.ParticipantEntity> entities)
        {
            foreach (var entity in entities)
            {
                this.ExecuteNonQuery("Usp_Participant_Insert", entity);
            }

            return entities.Count;
        }


        /// <summary>
        /// 流程参与者
        /// </summary>
        /// <param name="workFlow">流程编号</param>
        /// <returns>参与者列表</returns>
        //public List<Entity.ParticipantEntity> Usp_Participant_ByWorkFlow(int workFlow)
        //{
        //    return this.FillList<Entity.ParticipantEntity>("Usp_Participant_ByWorkFlow", new { IWorkFlow = workFlow });
        //}
    }
}
