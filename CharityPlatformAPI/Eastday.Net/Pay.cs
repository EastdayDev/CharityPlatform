using Eastday.PayCommon;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Eastday.Net
{
    public class Pay : IPay<NetPayPackage>
    {
        Logger logger = new Logger();

        public NetPayPackage ChoosePay(TradeModel trade)
        {
            NetPayPackage package = new NetPayPackage()
            {
                MerId = NetConfig.merId,
                GateId = NetConfig.gateid,
                BgRetUrl = NetConfig.backurl,
                CuryId = "156",
                PageRetUrl = NetConfig.returnurl,
                OrdId = trade.TradeNO,
                Priv1 = trade.Detail,
                TransAmt = FormatHelper.AddZero(trade.Payment.ToString("#0.00").Replace(".", ""), 12, '0'),
                TransDate = trade.CreateTime.ToString("yyyyMMdd"),
                TransType = "0001",
                Version = NetConfig.version
            };

            string plain = package.MerId + package.OrdId + package.TransAmt + package.CuryId + package.TransDate + package.TransType + package.Priv1;
            package.ChkValue = SignData.sign(package.MerId, plain);

            return package;
        }

        public TradeResult PayQuery(TradeQueryRequest traderequest)
        {
            PayQueryPackage queryP = new PayQueryPackage()
            {
                MerId = NetConfig.merId,
                OrdId = FormatHelper.AddZero(traderequest.TradeNO, 16, '0', false),
                Resv = "",
                TransDate = traderequest.TradeDate.ToString("yyyyMMdd"),
                TransType = "0001",
                Version = NetConfig.queryVersion
            };

            string plain = queryP.MerId + queryP.TransDate + queryP.OrdId + queryP.TransType;
            queryP.ChkValue = SignData.sign(queryP.MerId, plain);

            string reqStr = "MerId=" + queryP.MerId + "&TransType=" + queryP.TransType + "&OrdId=" + queryP.OrdId + "&TransDate=" + queryP.TransDate + "&Version=" + queryP.Version + "&Resv=" + queryP.Resv
+ "&ChkValue=" + queryP.ChkValue;
            logger.Debug("开始向银联发起交易查询请求," + reqStr);
            string netresponse = HttpHelper.HttpPost(reqStr, "http://console.chinapay.com/QueryWeb/processQuery.jsp", Encoding.GetEncoding("gb2312"));
            logger.Debug("银联查询应答:" + netresponse);
            //根据银联应答获取支付信息，并更新交易表
            int j = netresponse.IndexOf("ResponeseCode=");

            Regex r = new Regex(@"ResponeseCode=(?<code>\w*)&", RegexOptions.IgnoreCase | RegexOptions.Multiline);
            var m = r.Match(netresponse);
            string responseCode = "";
            TradeResult t = new TradeResult()
            {
                PayStatus = PayStatus.UnPaid
            };
            if (m.Success)
            {
                responseCode = m.Groups["code"].Value;
                if (responseCode == "0" || responseCode == "00")
                {
                    int statusindex = netresponse.IndexOf("status=");
                    var status = netresponse.Substring(statusindex + 7, 4);
                    if (status == "1001")
                    {
                        t.PayStatus = PayStatus.Paid;
                    }
                }
            }

            if (responseCode != "305")//没有超出银联的查询时间间隔时无法进行查询，此时不做处理，以确保下次查询可以再次查询该笔订单
            {
                t.Code = 1;
            }
            else
            {
                t.Code = -1;
                Console.WriteLine("[" + DateTime.Now + "]流量超限，稍后查询");
            }


            return t;
        }
    }
}
