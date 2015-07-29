using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Net;

namespace Eastday.Ali
{
    public class Config
    {

        #region 字段
        private static string partner = "";
        private static string key = "";
        private static string input_charset = "";
        private static string sign_type = "";
        #endregion

        static Config()
        {
            //↓↓↓↓↓↓↓↓↓↓请在这里配置您的基本信息↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓

            //合作身份者ID，以2088开头由16位纯数字组成的字符串
            partner = "2088911762482143";

            //交易安全检验码，由数字和字母组成的32位字符串
            key = "37maudxs8ffnw4sgoa022lgy4uluswl5";

            //↑↑↑↑↑↑↑↑↑↑请在这里配置您的基本信息↑↑↑↑↑↑↑↑↑↑↑↑↑↑↑


            //字符编码格式 目前支持 gbk 或 utf-8
            input_charset = "utf-8";

            //签名方式，选择项：RSA、DSA、MD5
            sign_type = "MD5";
        }

        #region 属性
        /// <summary>
        /// 获取或设置合作者身份ID
        /// </summary>
        public static string Partner
        {
            get { return partner; }
            set { partner = value; }
        }

        /// <summary>
        /// 获取或设交易安全校验码
        /// </summary>
        public static string Key
        {
            get { return key; }
            set { key = value; }
        }

        /// <summary>
        /// 获取字符编码格式
        /// </summary>
        public static string Input_charset
        {
            get { return input_charset; }
        }

        /// <summary>
        /// 获取签名方式
        /// </summary>
        public static string Sign_type
        {
            get { return sign_type; }
        }
        #endregion

        public static string SellerEmail
        {
            get
            {
                return "xiexiang@hpchou.com";
            }
        }

        /// <summary>
        /// 后台通知地址
        /// </summary>
        public static string NotifyUrl
        {
            get
            {
                return "";
            }
        }

        /// <summary>
        /// 支付完成后前台跳转地址
        /// </summary>
        public static string ReturnUrl
        {
            get
            {
                return "";
            }
        }
    }
}
