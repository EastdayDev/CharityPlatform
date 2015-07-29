using Eastday.PayCommon;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eastday.Upmp
{
    public class Pay : IPay<NetAppPayPackage>
    {
        public NetAppPayPackage ChoosePay(TradeModel trade)
        {
            NetAppPayPackage package = new NetAppPayPackage() { tn = "" };

            // 请求要素
            Dictionary<String, String> req = new Dictionary<String, String>();
            req["version"] = UpmpConfig.GetInstance().VERSION;// 版本号
            req["charset"] = UpmpConfig.GetInstance().CHARSET;// 字符编码
            req["transType"] = "01";// 交易类型
            req["merId"] = UpmpConfig.GetInstance().MER_ID;// 商户代码
            req["backEndUrl"] = UpmpConfig.GetInstance().MER_BACK_END_URL;// 通知URL
            req["frontEndUrl"] = UpmpConfig.GetInstance().MER_FRONT_END_URL;// 前台通知URL(可选)
            req["orderDescription"] = trade.Name;// 订单描述(可选)
            req["orderTime"] = trade.CreateTime.ToString("yyyyMMddHHmmss");// 交易开始日期时间yyyyMMddHHmmss                        
            //req["orderTimeout"] = trade.CreateTime.AddMinutes(SysConfig.OrderValidMins).ToString("yyyyMMddHHmmss");// 订单超时时间yyyyMMddHHmmss(可选)
            req["orderNumber"] = trade.TradeNO;// 订单号(商户根据自己需要生成订单号)
            req["orderAmount"] = trade.Payment.ToString("#0.00").Replace(".", "");// 订单金额
            req["orderCurrency"] = "156";// 交易币种(可选)
            req["reqReserved"] = "";// 请求方保留域(可选，用于透传商户信息)

            // 保留域填充方法
            //Dictionary<String, String> merReservedMap = new Dictionary<String, String>();
            //merReservedMap["account"] = order.Idcard + "-" + order.Bankcard;
            //req["merReserved"] = UpmpService.BuildReserved(merReservedMap);// 商户保留域(可选)

            Dictionary<String, String> resp = new Dictionary<String, String>();
            //logger.Debug("下单请求:" + string.Join(",", req.Keys) + "==>" + string.Join(",", req.Values));
            bool validResp = UpmpService.Trade(req, resp);
            //logger.Debug("下单应答:" + string.Join(",", resp.Keys) + "==>" + string.Join(",", resp.Values));
            // 验证通过
            if (validResp)
            {
                package.respCode = resp["respCode"];
                package.respMsg = resp.ContainsKey("respMsg") ? resp["respMsg"] : "";
                package.tn = resp["tn"];
                package.transType = resp["transType"];
                package.charset = resp["charset"];
                package.signature = resp["signature"];
                package.signMethod = resp["signMethod"];
            }
            return package;
        }

        public TradeResult PayQuery(TradeQueryRequest traderequest)
        {
            bool tradesuccess = false;

            // 请求要素
            Dictionary<String, String> req = new Dictionary<String, String>();
            req["version"] = UpmpConfig.GetInstance().VERSION;// 版本号
            req["charset"] = UpmpConfig.GetInstance().CHARSET;// 字符编码
            req["transType"] = "01";// 交易类型
            req["merId"] = UpmpConfig.GetInstance().MER_ID;// 商户代码
            req["orderTime"] = traderequest.TradeDate.ToString("yyyyMMddHHmmss");// 交易开始日期时间yyyyMMddHHmmss                        
            req["orderNumber"] = traderequest.TradeNO;// 订单号(商户根据自己需要生成订单号)
            Dictionary<String, String> resp = new Dictionary<String, String>();

            if (UpmpService.Query(req, resp))
            {
                // 服务器应答签名验证成功
                if (resp["respCode"] == "00" && resp.ContainsKey("transStatus") && resp["transStatus"] == "00")
                {
                    //StringBuilder rsinpfo = new StringBuilder();
                    //StringBuilder sbreq = new StringBuilder();
                    //foreach (var item in req.Keys)
                    //{
                    //    sbreq.Append(item + "=" + req[item] + "&");
                    //}

                    //StringBuilder sbresp = new StringBuilder();
                    //foreach (var item in resp.Keys)
                    //{
                    //    sbresp.Append(item + "=" + resp[item] + "&");
                    //}
                    //System.Diagnostics.Debug.WriteLine(sbreq.ToString());
                    //System.Diagnostics.Debug.WriteLine(sbresp.ToString());
                    tradesuccess = true;
                }
            }

            TradeResult t = new TradeResult()
            {
                Code = 1,
                TradeNO = traderequest.TradeNO,
                PayStatus = tradesuccess ? PayStatus.Paid : PayStatus.UnPaid
            };

            return t;
        }
    }
}
