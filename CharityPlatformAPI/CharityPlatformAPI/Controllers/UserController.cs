using CharityPlatform.Data;
using CharityPlatform.Entity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CharityPlatformAPI.Controllers
{
    public class UserController : BaseController
    {
        /// <summary>
        /// 普通用户注册
        /// </summary>
        /// <param name="login"></param>
        /// <param name="oldPwd"></param>
        /// <param name="newPwd"></param>
        /// <returns></returns>
        [HttpPost]
        public int Usp_User_Register(UserEntity user)
        {
            try
            {
                using (AppBLL bll = new AppBLL())
                {
                    DataTable table = bll.FillDataTable("Usp_User_GetByMobile", new { C_Mobile = user.C_Mobile });
                    /// 手机号码已经注册
                    if (table.Rows.Count > 0) return -2;

                    user.D_Create = DateTime.Now;
                    user.C_Login = user.C_Mobile;
                    user.I_Flag = 1;
                    return bll.ExecuteNonQuery("Usp_User_Insert", user);
                }
            }
            catch (Exception ex)
            {
                return -1;
            }
        }

        /// <summary>
        /// 机构用户注册
        /// </summary>
        /// <param name="login"></param>
        /// <param name="oldPwd"></param>
        /// <param name="newPwd"></param>
        /// <returns></returns>
        [HttpPost]
        public int Usp_Org_Register(OrganizationEntity user)
        {
            return DataHelper.ExecuteNonQuery("Usp_Org_Insert", user);
        }

        /// <summary>
        /// 验证登录
        /// </summary>
        /// <returns>datatable</returns>
        [HttpGet]
        public DataTable Usp_User_Login(string loginName, string password)
        {
            return DataHelper.FillDataTable("Usp_User_Login", new { C_Login = loginName, C_Password = password });
        }

        /// <summary>
        /// 修改密码
        /// </summary>
        /// <param name="login"></param>
        /// <param name="oldPwd"></param>
        /// <param name="newPwd"></param>
        /// <returns></returns>
        [HttpPost]
        public int Usp_User_ChangePwd(string login, string oldPwd, string newPwd)
        {
            DataTable table = DataHelper.FillDataTable("Usp_User_ChangePwd", new { C_Login = login, C_NewPwd = newPwd, C_OldPwd = oldPwd });
            return int.Parse(table.Rows[0][0].ToString());
        }

        [HttpPost]
        public int Usp_User_Update(UserEntity user)
        {
            return DataHelper.ExecuteNonQuery("Usp_User_Update", user);
        }

        [HttpPost]
        public int Usp_Org_Update(OrganizationEntity org)
        {
            return DataHelper.ExecuteNonQuery("Usp_Org_Update", org);
        }

        /// <summary>
        /// 所有拥有该功能编号的用户
        /// </summary>
        /// <param name="fuctionId">功能编号</param>
        /// <returns>所有拥有该功能编号的用户</returns>
        [HttpGet]
        public IList<UserEntity> Usp_User_ByFunc(int funcId)
        {
            return DataHelper.FillList<UserEntity>("Usp_User_ByFunc", new { funcid = funcId });
        }

        [HttpGet]
        public DataTable Usp_User_List(int userId, string filterValue, int pageIndex, int pageSize)
        {
            return DataHelper.FillDataTable("Usp_User_List", new { userId = userId, filter = filterValue, pageIndex = pageIndex, pageSize = pageSize });
        }
    }
}
