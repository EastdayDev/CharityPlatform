using Eastday.Net;
using Eastday.PayCommon;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Eastday.PayNotify
{
    public partial class NetPayNotify : System.Web.UI.Page
    {
        static Logger logger = new Logger();
        protected void Page_Load(object sender, EventArgs e)
        {
            string MerId = Request["MerId"];//商户号
            string OrdId = Request["OrderNo"];//订单号
            string TransAmt = Request["Amount"];//订单金额
            string CuryId = Request["CurrencyCode"];//货币代码
            string TransDate = Request["TransDate"];//订单日期
            string TransType = Request["TransType"];//交易类型
            string Priv1 = Request["Priv1"];//备注
            string GateId = Request["GateId"];//网关
            string status = Request["status"];//status表示交易状态只有"1001"表示支付成功，其他状态均表示未成功的交易。因此验证签名数据通过后，还需要判定交易状态代码是否为"1001"

            string CheckValue = Request["checkvalue"];//签名数据   
            try
            {
                logger.Info(Request.UserHostAddress + "请求:" + Request.Form.ToString());
                bool res = SignData.check(MerId, OrdId, TransAmt, CuryId, TransDate, TransType, status, CheckValue);
                if (res)
                {
                    //验证签名数据通过后，一定要判定交易状态代码是否为"1001"，实现代码请商户自行编写
                    if (status.Equals("1001"))
                    {
                        logger.Info("订单支付成功,通知来自银联支付(订单号：" + OrdId + ")");
                        //TODO:支付成功后的处理                      
                    }
                    else
                    {
                        logger.Info("服务器签名验证成功,通知来自银联支付，未支付：" + OrdId);
                    }
                }
            }
            catch (Exception ex)
            {
                logger.Error("验证失败", ex);
                throw ex;
            }
            finally
            {
                logger.Flush();
            }
        }
    }
}