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
        public int Usp_User_Register(UserEntity user)
        {
            using (AppBLL bll = new AppBLL())
            {
                return bll.ExecuteNonQuery("Usp_User_Insert", user);
            }
        }

        /// <summary>
        /// 机构用户注册
        /// </summary>
        /// <param name="login"></param>
        /// <param name="oldPwd"></param>
        /// <param name="newPwd"></param>
        /// <returns></returns>
        public int Usp_Org_Register(OrganizationEntity user)
        {
            using (AppBLL bll = new AppBLL())
            {
                return bll.ExecuteNonQuery("Usp_Org_Insert", user);
            }
        }

        /// <summary>
        /// 验证登录
        /// </summary>
        /// <returns>datatable</returns>
        public DataTable Usp_User_Login(string Name, string Password)
        {
            using (AppBLL bll = new AppBLL())
            {
                return bll.FillDataTable("Usp_User_Login", new { C_Login = Name, C_Password = Password });
            }
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
            using (AppBLL bll = new AppBLL())
            {
                DataTable table = bll.FillDataTable("Usp_User_ChangePwd", new { C_Login = login, C_NewPwd = newPwd, C_OldPwd = oldPwd });
                return int.Parse(table.Rows[0][0].ToString());
            }
        }

        /// <summary>
        /// 所有拥有该功能编号的用户
        /// </summary>
        /// <param name="fuctionId">功能编号</param>
        /// <returns>所有拥有该功能编号的用户</returns>
        public IList<UserEntity> Usp_User_ByFunc(int funcId)
        {
            using (AppBLL bll = new AppBLL())
            {
                return bll.FillList<UserEntity>("Usp_User_ByFunc", new { funcid = funcId });
            }
        }
    }
}
