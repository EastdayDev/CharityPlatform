using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace Eastday.Net
{
    public class NetConfig
    {
        /// <summary>
        /// 私钥证书路径
        /// </summary>
        public static string priKeyPath = "";

        /// <summary>
        /// 公钥证书路径
        /// </summary>
        public static string pubKeyPath = "";

        /// <summary>
        /// 商户号
        /// </summary>
        public static string merId = "";

        /// <summary>
        /// 支付版本号
        /// </summary>
        public static string version = "20070129";

        /// <summary>
        /// 查询版本号
        /// </summary>
        public static string queryVersion = "20060831";

        /// <summary>
        /// 支付后台通知地址
        /// </summary>
        public static string backurl = "";

        /// <summary>
        /// 支付后前台跳转地址
        /// </summary>
        public static string returnurl = "";

        /// <summary>
        /// 网关
        /// </summary>
        public static string gateid = "";
    }
}
