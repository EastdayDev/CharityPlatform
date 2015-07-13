using CharityPlatform.Data;
using CharityPlatform.Entity;
using CharityPlatform.WorkFlow;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CharityPlatformAPI.Controllers
{
    public class AuditController : ApiController
    {

        [HttpPost]
        public int Submit(ProjectEntity entity)
        {
            try
            {
                entity.D_Submit = DateTime.Now;
                DataHelper.ExecuteNonQuery("Usp_Project_Insert", entity);
                FlowHelper.Commit(entity.Id, entity.I_Creater, null, true);
                return 1;
            }
            catch(Exception ex)
            {
                return -1;
            }
        }
    }
}
