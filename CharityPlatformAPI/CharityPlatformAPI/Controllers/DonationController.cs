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
    public class DonationController : ApiController
    {

        [HttpGet]
        public DataTable USP_Donation_Projects(int userId)
        {
            return DataHelper.FillDataTable("USP_Donation_Projects", new { userId = userId });
        }

        [HttpPost]
        public int Usp_Donation_Insert(DonationEntity entity)
        {
            try
            {
                return DataHelper.ExecuteNonQuery("Usp_Donation_Insert", entity);
            }
            catch (Exception ex)
            {
                return -1;
            }
        }
    }
}
