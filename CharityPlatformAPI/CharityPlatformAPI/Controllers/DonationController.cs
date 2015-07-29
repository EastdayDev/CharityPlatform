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

        private void PayAli(UserFundEntity entity, UserEntity user)
        {
            Eastday.Ali.Pay pay = new Eastday.Ali.Pay();
            var payinfo = pay.ChoosePay(new Eastday.PayCommon.TradeModel()
            {
                ClientIP = System.Web.HttpContext.Current.Request.UserHostAddress,
                CreateTime = DateTime.Now,
                ID = 1,
                TradeNO = entity.Id.ToString(),
                Description = string.Format("{0}充值", user.C_Name),
                Detail = string.Format("{0}充值", user.C_Name),
                Name = string.Format("{0}充值", user.C_Name),
                Payment = entity.M_Money,
                Url = ""
            });

            //把请求参数打包成数组
            SortedDictionary<string, string> sParaTemp = new SortedDictionary<string, string>();
            sParaTemp.Add("partner", payinfo.partner);
            sParaTemp.Add("_input_charset", payinfo._input_charset);
            sParaTemp.Add("service", payinfo.service);
            sParaTemp.Add("payment_type", payinfo.payment_type);
            sParaTemp.Add("notify_url", payinfo.notify_url);
            sParaTemp.Add("return_url", payinfo.return_url);
            sParaTemp.Add("seller_email", payinfo.seller_email);
            sParaTemp.Add("out_trade_no", payinfo.out_trade_no);
            sParaTemp.Add("subject", payinfo.subject);
            sParaTemp.Add("total_fee", payinfo.total_fee);
            sParaTemp.Add("body", payinfo.body);
            sParaTemp.Add("show_url", payinfo.show_url);
            sParaTemp.Add("anti_phishing_key", payinfo.anti_phishing_key);
            sParaTemp.Add("exter_invoke_ip", payinfo.exter_invoke_ip);

            //建立请求
            string sHtmlText = Eastday.Ali.Submit.BuildRequest(sParaTemp, "get", "确认");
            System.Web.HttpContext.Current.Response.Write(sHtmlText);
        }

        [HttpPost]
        public int Usp_UserFund_Insert(UserFundEntity entity)
        {
            try
            {
                WriteLog("充值", entity);
                DataHelper.ExecuteNonQuery("Usp_UserFund_Insert", entity);

                UserEntity user = DataHelper.GetDataItem<UserEntity>("Usp_UserInfo_ById", new { userId = entity.I_User });

                this.PayAli(entity, user);

                return entity.Id;
            }
            catch (Exception ex)
            {
                return -1;
            }
        }

    }
}
