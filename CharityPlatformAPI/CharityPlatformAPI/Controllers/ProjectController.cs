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
    public class ProjectController : ApiController
    {
        [HttpPost]
        public int Usp_Project_Insert(ProjectEntity entity)
        {
            try
            {
                if (entity.D_Create.Year == 1) entity.D_Create = DateTime.Now;
                DataHelper.ExecuteNonQuery("Usp_Project_Insert", entity);
                return entity.Id;
            }
            catch { return -1; }
        }

        [HttpGet]
        public DataTable USP_Project_Get(int id)
        {
            return DataHelper.FillDataTable("USP_Project_Get", new { Id = id });
        }

        [HttpGet]
        public DataTable USP_Project_List(int userId)
        {
            return DataHelper.FillDataTable("USP_Project_List", new { userId = userId });
        }

        [HttpGet]
        public DataTable USP_Project_View(int userId, int id)
        {
            return DataHelper.FillDataTable("USP_Project_View", new { userId = userId, Id = id });
        }
    }
}
