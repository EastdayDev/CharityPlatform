using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CharityPlatformAPI.Controllers
{
    public class BaseController : ApiController
    {
        internal protected const string APP_ID = "CharityPlatform";
        internal protected static readonly log4net.ILog InfoLog = log4net.LogManager.GetLogger("InfoLog");
        internal protected static readonly log4net.ILog ErrLog = log4net.LogManager.GetLogger("ErrLog");
        internal protected static readonly System.Web.SessionState.HttpSessionState SessionState = System.Web.HttpContext.Current.Session;

        public static void WriteLog(string opName, Object entity)
        {
            try
            {
                string loginName = SessionState != null && SessionState["C_Login"] != null ? SessionState["C_Login"].ToString() : "";
                InfoLog.Info(string.Format("登录名：{0}, {1}:{2}", loginName, opName, Newtonsoft.Json.JsonConvert.SerializeObject(entity)));
            }
            catch (Exception ex)
            {
                ErrLog.Error(ex);
            }
        }

        [HttpPost]
        public int PostEntity(CharityPlatform.Entity.PostParameter parameter)
        {
            try
            {
                using (CharityPlatform.Data.AppBLL bll = new CharityPlatform.Data.AppBLL())
                {
                    return bll.ExecuteNonQuery(parameter.proc, parameter.entity);
                }
            }
            catch (Exception ex)
            {
                return -1;
            }
        }

        [HttpPost]
        public System.Data.DataTable PostTable(CharityPlatform.Entity.PostParameter parameter)
        {
            try
            {
                using (CharityPlatform.Data.AppBLL bll = new CharityPlatform.Data.AppBLL())
                {
                    return bll.FillDataTable(parameter.proc, parameter.entity); 
                }
            }
            catch (Exception ex)
            {
                return null;
            }
        }
    }
}
