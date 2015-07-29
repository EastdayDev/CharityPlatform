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
    public class DonationController : BaseController
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
                WriteLog("捐款", entity);
                return DataHelper.ExecuteNonQuery("Usp_Donation_Insert", entity);
            }
            catch (Exception ex)
            {
                return -1;
            }
        }

        [HttpPost]
        public int Usp_UserFund_Insert(UserFundEntity entity)
        {
            try
            {
                WriteLog("充值", entity);
                DataHelper.ExecuteNonQuery("Usp_UserFund_Insert", entity);
                return entity.Id;
            }
            catch (Exception ex)
            {
                return -1;
            }
        }

    }
}
