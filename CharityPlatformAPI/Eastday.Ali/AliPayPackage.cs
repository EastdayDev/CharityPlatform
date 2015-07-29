using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Eastday.Ali
{
    public class AliPayPackage
    {
        /// <summary>
        /// 商户号
        /// </summary>
        public string partner { get; set; }

        /// <summary>
        /// 编码
        /// </summary>
        public string _input_charset { get; set; }

        /// <summary>
        /// 服务名称 即时到账：create_direct_pay_by_user
        /// </summary>
        public string service { get; set; }

        /// <summary>
        /// 支付类型
        /// </summary>
        public string payment_type { get; set; }

        /// <summary>
        /// 通知URL
        /// </summary>
        public string notify_url { get; set; }

        /// <summary>
        /// 支付跳转URL
        /// </summary>
        public string return_url { get; set; }

        /// <summary>
        /// 收款账号
        /// </summary>
        public string seller_email { get; set; }

        /// <summary>
        /// 订单号
        /// </summary>
        public string out_trade_no { get; set; }

        /// <summary>
        /// 名称
        /// </summary>
        public string subject { get; set; }

        /// <summary>
        /// 金额
        /// </summary>
        public string total_fee { get; set; }

        /// <summary>
        /// 订单详情
        /// </summary>
        public  string body { get; set; }

        /// <summary>
        /// 订单展示URL
        /// </summary>
        public string show_url { get; set; }

        /// <summary>
        /// 防钓鱼时间戳
        /// </summary>
        public string anti_phishing_key { get; set; }

        /// <summary>
        /// 客户端的IP地址
        /// </summary>
        public string exter_invoke_ip { get; set; }

        /// <summary>
        /// 签名
        /// </summary>
        public string sign { get; set; }

        /// <summary>
        /// 签名方式
        /// </summary>
        public string sign_type { get; set; }
    }
}
