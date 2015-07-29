using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eastday.PayCommon
{
    public class TradeModel
    {
        /// <summary>
        /// 订单ID
        /// </summary>
        public int ID { get; set; }

        /// <summary>
        /// 订单号
        /// </summary>
        public string TradeNO { get; set; }

        /// <summary>
        /// 订单名称（商品名称）
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 描述
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// 内容
        /// </summary>
        public string Detail { get; set; }

        /// <summary>
        /// 金额
        /// </summary>
        public decimal Payment { get; set; }

        /// <summary>
        /// 订单或产品展示地址
        /// </summary>
        public string Url { get; set; }

        /// <summary>
        /// 客户端地址
        /// </summary>
        public string ClientIP { get; set; }

        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime CreateTime { get; set; }
    }
}
