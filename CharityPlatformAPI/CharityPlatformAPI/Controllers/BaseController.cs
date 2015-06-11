namespace CharityPlatformAPI.Controllers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Web.Http;

    public class BaseController : ApiController
    {
        internal protected const string APP_ID = "CharityPlatform"; 

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

        [HttpGet]
        public System.Data.DataTable GetTable(CharityPlatform.Entity.PostParameter parameter)
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
