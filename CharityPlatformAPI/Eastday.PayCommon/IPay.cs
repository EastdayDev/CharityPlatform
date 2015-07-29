using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eastday.PayCommon
{
    /// <summary>
    /// 支付接口
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public interface IPay<T>
    {
        /// <summary>
        /// 发起支付，获取客户端支付数据
        /// </summary>
        /// <param name="trade">交易对象</param>
        /// <returns>客户端支付数据对象</returns>
        T ChoosePay(TradeModel trade);

        /// <summary>
        /// 根据订单号获取交易结果
        /// </summary>
        /// <param name="traderequest">订单信息</param>
        /// <returns>交易结果</returns>
        TradeResult PayQuery(TradeQueryRequest traderequest);
    } 
}
