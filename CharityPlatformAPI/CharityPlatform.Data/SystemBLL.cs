/* **************************************************************
  * Copyright(c) 2014 Eastday, All Rights Reserved.    
  * File             : SystemBLL.cs
  * Description      : 系统数据操作类(权限管理的所有业务类)
  * Author           : shujianhua
  * Created          : 2014-03-25
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
    /// 系统数据业务类
    /// </summary>
    public class SystemBLL : AppBLL
    {
        /// <summary>
        /// 验证登录
        /// </summary>
        /// <returns>datatable</returns>
        public DataTable Usp_User_Login(string Name, string Password)
        {
            return this.FillDataTable("Usp_User_Login", new { C_Login = Name, C_Password = Password });
        }

        /// <summary>
        /// 修改密码
        /// </summary>
        /// <param name="login"></param>
        /// <param name="oldPwd"></param>
        /// <param name="newPwd"></param>
        /// <returns></returns>
        public int Usp_User_ChangePwd(string login, string oldPwd, string newPwd)
        {
            DataTable table = this.FillDataTable("Usp_User_ChangePwd",  new { C_Login = login, C_NewPwd = newPwd, C_OldPwd = oldPwd });
            return int.Parse(table.Rows[0][0].ToString());
        }

        /// <summary>
        /// 查找用户功能
        /// </summary>        
        /// <param name="userId">Sys_User.Id</param>
        /// <returns>List<FunctionEntity></returns>
        public IList<FunctionEntity> Usp_User_Funcs(int userId)
        {
             return this.FillList<FunctionEntity>("Usp_User_Funcs", new { IUSER = userId });
        }

        /// <summary>
        /// 查找功能
        /// </summary>        
        /// <param name="Id"></param>
        /// <returns>List<FunctionEntity></returns>
        public FunctionEntity Usp_Func_Get(int id)
        {
            return this.GetDataItem<FunctionEntity>("Usp_Func_Get", new { Id = id });
        }
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
        /// 所有拥有该功能编号的用户
        /// </summary>
        /// <param name="fuctionId">功能编号</param>
        /// <returns>所有拥有该功能编号的用户</returns>
        public IList<Entity.UserEntity> Usp_User_ByFunc(int funcId)
        {
            return this.FillList<Entity.UserEntity>("Usp_User_ByFunc", new { funcid = funcId });
        }
        /***********************************************************************************************/
















        /// <summary>
        /// 权限分配列表
        /// </summary>
        /// <param name="PageIndex">当前页号</param>
        /// <param name="PageSize">页大小（每页显示多少个）</param>
        /// <returns></returns>
        public DataTable UserList(int PageIndex, int PageSize, long? DId)
        {
            object inputParams = new { PageIndex = PageIndex, PageSize = PageSize, DId = DId };
            return this.FillDataTable("usp_Power_UserList", inputParams);
        }

        public IList<UserEntity> GetUserList(int PageIndex, int PageSize, string keystr)
        {
            object inputParams = new { PageIndex = PageIndex, PageSize = PageSize, Keystr = keystr == null ? "" : keystr };
            return this.FillList<UserEntity>("usp_Power_UserList", inputParams);
        }

        public DataTable UserList(int PageIndex, int PageSize)
        {
            object inputParams = new { PageIndex = PageIndex, PageSize = PageSize };
            return this.FillDataTable("usp_Power_UserList", inputParams);
        }
        public DataTable UserList(int PageIndex, int PageSize, string keystr)
        {
            object inputParams = new { PageIndex = PageIndex, PageSize = PageSize, Keystr = keystr };
            return this.FillDataTable("usp_Power_UserList", inputParams);
        }

        public DataTable UserList(int PageIndex, int PageSize, long? DId, string keystr)
        {
            object inputParams = new { PageIndex = PageIndex, PageSize = PageSize, DId = DId, Keystr = keystr };
            return this.FillDataTable("usp_Power_UserList", inputParams);
        }

        /// <summary>
        /// 根据UID查找用户
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public DataTable UserByUId(Int64 uid)
        {
            object inputParams = new { Uid = uid };
            return this.FillDataTable("USP_Power_UserByUId", inputParams);
        }

        public DataTable GetRoleByUid(string id)
        {
            return this.FillDataTable("USP_Power_GetRoleByUid", new { id = id });
        }

        public DataTable GetDepartmentNameById(string id)
        {
            return this.FillDataTable("USP_Power_GetDepartmentNameById", new { id = id });
        }
        /// <summary>
        /// 根据部门ID获取该部门下拥有助理权限的人
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public DataTable GetAssistantByDepartment(long id)
        {
            return this.FillDataTable("USP_GetAssistantByDepartment", new { I_Department = id });
        }

        public DataTable GetCanExpenseOrReceiptByUID(long UID)
        {
            return this.FillDataTable("USP_GetCanExpenseOrReceiptByUID", new { UID = UID });
        }

        public DataTable GetDepartmentIdByUserId(long I_User)
        {
            return this.FillDataTable("USP_GetDepartmentIdByUserId", new { I_User = I_User });
        }


        public string GetCreateUserIdById(int id)
        {
            var param = new
            {
                id = id
            };
            return this.FillDataTable("USP_User_GetUserIdById", param).Rows[0][0].ToString();
        }

        public string GetFlowState(int id, int type)
        {
            var param = new
            {
                id = id,
                type = type
            };
            return this.FillDataTable("USP_Flow_GetFlowState", param).Rows[0][0].ToString();
        }
        public DataTable GetAllAuditList(int id)
        {
            return this.FillDataTable("USP_Flow_GetDeptFunc", new { id = id });
        }

        public string GetDataNameById(int id)
        {
            var param = new
            {
                id = id
            };
            return this.FillDataTable("USP_Feedback_GetDataNameById", param).Rows[0][0].ToString();
        }


        public string GetCurrentUserName(string id)
        {
            var param = new { UserId = id };
            return this.FillDataTable("USP_GetCurrentUser", param).Rows[0][0].ToString();
        }

        public int DeleteBaseDataById(int Id)
        {
            var param = new
            {
                Id = Id
            };
            return this.ExecuteNonQuery("USP_DeleteBaseDataById", param);
        }
    }
   
}
