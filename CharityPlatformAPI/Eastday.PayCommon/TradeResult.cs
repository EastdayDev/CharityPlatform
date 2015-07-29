using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eastday.PayCommon
{
    public class TradeResult
    {
        /// <summary>
        /// 代码
        /// 1:发起请求成功；-1:发起请求失败
        /// </summary>
        public int Code { get; set; }

        /// <summary>
        /// 订单号
        /// </summary>
        public string TradeNO { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime CreateTime { get; set; }

        /// <summary>
        /// 支付状态
        /// </summary>
        public PayStatus PayStatus { get; set; }

        /// <summary>
        /// 支付时间
        /// </summary>
        public DateTime PayTime { get; set; }

        /// <summary>
        /// 付款金额
        /// </summary>
        public decimal PayAmount { get; set; }

        /// <summary>
        /// 付款人
        /// </summary>
        public string PayAccount { get; set; }
    }

    public enum PayStatus
    {
        Unavailable = -1,
        UnPaid = 0,
        Paid
    }
}
