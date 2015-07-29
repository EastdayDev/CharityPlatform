using Eastday.PayCommon;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;

namespace Eastday.Ali
{
    public class Pay : IPay<AliPayPackage>
    {
        Logger logger = new Logger();

        public AliPayPackage ChoosePay(TradeModel trademode)
        {
            //订单名称
            string subject = trademode.Name;
            //必填

            //付款金额
            string total_fee = trademode.Payment.ToString("#0.00").Replace(".", "");
            //必填

            //卖家支付宝帐户
            string seller_email = Config.SellerEmail;
            //必填  

            //订单描述 
            string body = trademode.Detail;

            //商品展示地址
            string show_url = trademode.Url;

            //防钓鱼时间戳
            string anti_phishing_key = "";
            //若要使用请调用类文件submit中的query_timestamp函数        

            //客户端的IP地址
            string exter_invoke_ip = trademode.ClientIP;
            //外网IP地址，如：221.0.0.1

            ///////////////////////////////////////////////////////////////////////////////////////////////
            //把请求参数打包成数组
            SortedDictionary<string, string> sParaTemp = new SortedDictionary<string, string>();
            sParaTemp.Add("partner", Config.Partner);
            sParaTemp.Add("_input_charset", Config.Input_charset.ToLower());
            sParaTemp.Add("service", "create_direct_pay_by_user");
            sParaTemp.Add("payment_type", "1");
            sParaTemp.Add("notify_url", Config.NotifyUrl);
            sParaTemp.Add("return_url", Config.ReturnUrl);
            sParaTemp.Add("seller_email", seller_email);
            sParaTemp.Add("out_trade_no", trademode.TradeNO);
            sParaTemp.Add("subject", subject);
            sParaTemp.Add("total_fee", total_fee);
            sParaTemp.Add("body", body);
            sParaTemp.Add("show_url", show_url);
            sParaTemp.Add("anti_phishing_key", anti_phishing_key);
            sParaTemp.Add("exter_invoke_ip", exter_invoke_ip);
            string sign = AliSign.GetSign(sParaTemp);

            AliPayPackage package = new AliPayPackage()
            {
                partner = Config.Partner,
                _input_charset = Config.Input_charset,
                anti_phishing_key = anti_phishing_key,
                body = body,
                exter_invoke_ip = trademode.ClientIP,
                notify_url = Config.NotifyUrl,
                return_url = Config.ReturnUrl,
                out_trade_no = trademode.TradeNO,
                payment_type = "1",
                seller_email = seller_email,
                service = "create_direct_pay_by_user",
                show_url = show_url,
                subject = subject,
                total_fee = total_fee,
                sign = sign,
                sign_type = Config.Sign_type
            };

            return package;
        }


        public TradeResult PayQuery(TradeQueryRequest tradequeryreq)
        {
            ////////////////////////////////////////////////////////////////////////////////////////////////

            //把请求参数打包成数组
            SortedDictionary<string, string> sParaTemp = new SortedDictionary<string, string>();
            sParaTemp.Add("partner", Config.Partner);
            sParaTemp.Add("_input_charset", Config.Input_charset.ToLower());
            sParaTemp.Add("service", "single_trade_query");
            sParaTemp.Add("trade_no", null);
            sParaTemp.Add("out_trade_no", tradequeryreq.TradeNO);

            //建立请求
            string sHtmlText = Submit.BuildRequest(sParaTemp);

            //请在这里加上商户的业务逻辑程序代码

            //——请根据您的业务逻辑来编写程序（以下代码仅作参考）——

            XmlDocument xmlDoc = new XmlDocument();
            xmlDoc.LoadXml(sHtmlText);
            string strXmlResponse = xmlDoc.SelectSingleNode("/alipay").InnerText;
            logger.Debug(strXmlResponse);
            string successstr = xmlDoc.SelectSingleNode("/alipay/is_success").InnerText;
            var paystatus = successstr.ToUpper() == "T" ? PayStatus.Paid : PayStatus.UnPaid;
            string createtime = xmlDoc.SelectSingleNode("/alipay/response/trade/gmt_create").InnerText;
            if (string.IsNullOrEmpty(createtime))
            {
                paystatus = PayStatus.Unavailable;
            }

            string buyer = "";
            string total_fee = "";
            string paytime = "";
            if (paystatus == PayStatus.Paid)
            {
                buyer = xmlDoc.SelectSingleNode("/alipay/response/trade/buyer_email").InnerText;
                total_fee = xmlDoc.SelectSingleNode("/alipay/response/trade/total_fee").InnerText;
                paytime = xmlDoc.SelectSingleNode("/alipay/response/trade/gmt_payment").InnerText;
            }

            TradeResult t = new TradeResult()
            {
                Code = 1,
                TradeNO = tradequeryreq.TradeNO,
                PayStatus = paystatus,
                CreateTime = Convert.ToDateTime(createtime),
                PayAccount = buyer,
                PayAmount = Convert.ToDecimal(total_fee),
                PayTime = Convert.ToDateTime(paytime)
            };
            return t;
        }
    }
}
