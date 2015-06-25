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
    public class SysController : ApiController
    {
        /// <summary>
        /// 获取词语列表
        /// </summary>
        /// <param name="flag">-1：全部</param>
        /// <returns></returns>
        [HttpGet]
        public IList<WordEntity> Usp_Words_List(int flag)
        {
            return DataHelper.FillList<WordEntity>("Usp_Words_List", new { I_Flag = flag });
        }


    }
}
