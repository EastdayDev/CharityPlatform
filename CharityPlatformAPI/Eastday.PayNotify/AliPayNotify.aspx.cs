using Eastday.Ali;
using Eastday.PayCommon;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Eastday.PayNotify
{
    public partial class AliPayNotify : System.Web.UI.Page
    {
        static Logger logger = new Logger();
        protected void Page_Load(object sender, EventArgs e)
        {
            logger.Debug("接收到支付宝回调,开始获取回调参数：" + this.Request.Form.ToString());
            SortedDictionary<string, string> sPara = GetRequestPost();

            if (sPara.Count > 0)//判断是否有带返回参数
            {
                Notify aliNotify = new Notify();
                logger.Debug("开始验证调用方是否为支付宝...");
                bool verifyResult = aliNotify.Verify(sPara, Request.Form["notify_id"], Request.Form["sign"]);

                if (verifyResult)//验证成功
                {
                    logger.Debug("验证通过");
                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
                    //请在这里加上商户的业务逻辑程序代码


                    //——请根据您的业务逻辑来编写程序（以下代码仅作参考）——
                    //获取支付宝的通知返回参数，可参考技术文档中服务器异步通知参数列表

                    //商户订单号

                    string out_trade_no = Request.Form["out_trade_no"];
                    logger.Debug("订单号:" + out_trade_no);
                    //支付宝交易号

                    string trade_no = Request.Form["trade_no"];
                    logger.Debug("交易号:" + trade_no);

                    //交易状态
                    string trade_status = Request.Form["trade_status"];
                    logger.Debug("交易状态:" + trade_status);

                    if (trade_status == "TRADE_FINISHED")
                    {
                        //TODO:支付成功后的处理
                    }
                    else if (trade_status == "TRADE_SUCCESS")
                    {
                        //TODO:支付成功后的处理
                    }
                    else
                    {
                        logger.Error("支付失败，订单号:" + out_trade_no + ",交易号：" + trade_no);
                    }

                    Response.Write("success");  //请不要修改或删除

                    /////////////////////////////////////////////////////////////////////////////////////////////////////////////
                }
                else//验证失败
                {
                    logger.Debug("验证失败");
                    Response.Write("fail");
                }
            }
            else
            {
                Response.Write("无通知参数");
            }
        }

        /// <summary>
        /// 获取支付宝POST过来通知消息，并以“参数名=参数值”的形式组成数组
        /// </summary>
        /// <returns>request回来的信息组成的数组</returns>
        private SortedDictionary<string, string> GetRequestPost()
        {
            int i = 0;
            SortedDictionary<string, string> sArray = new SortedDictionary<string, string>();
            NameValueCollection coll;
            //Load Form variables into NameValueCollection variable.
            coll = Request.Form;

            // Get names of all forms into a string array.
            String[] requestItem = coll.AllKeys;

            for (i = 0; i < requestItem.Length; i++)
            {
                sArray.Add(requestItem[i], Request.Form[requestItem[i]]);
            }

            return sArray;
        }
    }
}