using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Eastday.Ali
{
    public class AliSign
    {
        public static string GetSign(SortedDictionary<string, string> sParaTemp)
        {
            //待签名请求参数数组
            Dictionary<string, string> sPara = new Dictionary<string, string>();
            //签名结果
            string mysign = "";

            //过滤签名参数数组
            sPara = Core.FilterPara(sParaTemp);

            //把数组所有元素，按照“参数=参数值”的模式用“&”字符拼接成字符串
            string prestr = Core.CreateLinkString(sPara);

            //把最终的字符串签名，获得签名结果
            mysign = AlipayMD5.Sign(prestr, Config.Key, Config.Input_charset);

            return mysign;
        }
    }
}
