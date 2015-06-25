using CharityPlatform.Data;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CharityPlatformAPI.Controllers
{
    public class PartnerController : ApiController
    {
        [HttpGet]
        public DataTable Usp_Org_List(int userId, string filterValue, int pageIndex, int pageSize)
        {
            return DataHelper.FillDataTable("Usp_Org_List",new { userId = userId, filter = string.IsNullOrEmpty(filterValue) ? "" : filterValue, pageIndex = pageIndex, pageSize = pageSize });
        }
    }
}
