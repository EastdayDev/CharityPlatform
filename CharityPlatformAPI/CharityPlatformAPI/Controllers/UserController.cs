using CharityPlatform.Data;
using CharityPlatform.Entity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
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
            return DataHelper.FillDataTable("Usp_User_Login", new { C_Login = loginName, C_Password = SHA256(password) });
        }        

        [HttpPost]
        public int Usp_User_Insert(UserEntity user)
        {
            return DataHelper.ExecuteNonQuery("Usp_User_Insert", user);
        }

        [HttpPost]
        public int Usp_Org_Update(OrganizationEntity org)
        {
            return DataHelper.ExecuteNonQuery("Usp_Org_Update", org);
        }

        [HttpPost]
        public int Usp_Change_Pwd(ChangePwdEntity entity)
        {
            entity.C_OldPwd = SHA256(entity.C_OldPwd);
            entity.C_NewPwd = SHA256(entity.C_NewPwd);
            DataHelper.ExecuteNonQuery("Usp_Change_Pwd", entity);
            return entity.Result;
        }
        /// <summary>
        /// SHA256函数
        /// </summary>
        /// /// <param name="str">原始字符串</param>
        /// <returns>SHA256结果</returns>
        private static string SHA256(string str)
        {
            byte[] SHA256Data = Encoding.UTF8.GetBytes(str);
            SHA256Managed Sha256 = new SHA256Managed();
            byte[] Result = Sha256.ComputeHash(SHA256Data);
            return Convert.ToBase64String(Result);  //返回长度为44字节的字符串
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
            return DataHelper.FillDataTable("Usp_User_List", new { userId = userId, filter = string.IsNullOrEmpty(filterValue) ? "" : filterValue, pageIndex = pageIndex, pageSize = pageSize });
        }

        [HttpGet]
        public DataTable Usp_UserInfo_ById(int userId)
        {
            return DataHelper.FillDataTable("Usp_UserInfo_ById", new { userId = userId });
        }
    }
}
