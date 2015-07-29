using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Configuration;

namespace Eastday.Upmp
{
    /// <summary>
    /// 配置类
    /// </summary>
    public class UpmpConfig
    {
        #region 字段
        // 版本号
        public String VERSION;

        // 编码方式
        public String CHARSET;

        // 交易网址
        public String TRADE_URL;

        // 查询网址
        public String QUERY_URL;

        // 商户代码
        public String MER_ID;

        // 通知URL
        public String MER_BACK_END_URL;

        // 返回URL
        public String MER_FRONT_RETURN_URL;

        // 前台通知URL
        public String MER_FRONT_END_URL;

        // 返回URL

        // 加密方式
        public String SIGN_TYPE;

        // 商城密匙，需要和银联商户网站上配置的一样
        public String SECURITY_KEY;

        // 成功应答码
        public String RESPONSE_CODE_SUCCESS = "00";


        // 签名
        public String SIGNATURE = "signature";

        // 签名方法
        public String SIGN_METHOD = "signMethod";

        // 应答码
        public String RESPONSE_CODE = "respCode";

        // 应答信息
        public String RESPONSE_MSG = "respMsg";

        #endregion

        private UpmpConfig()
        {
            //↓↓↓↓↓↓↓↓↓↓请在这里配置您的基本信息↓↓↓↓↓↓↓↓↓↓↓↓↓↓↓
            MER_ID = "";
            SECURITY_KEY = "";

            MER_BACK_END_URL = "";
            MER_FRONT_END_URL = "";

            VERSION = "1.0.0";
            CHARSET = "";
            SIGN_TYPE = "MD5";

            TRADE_URL = "";
            QUERY_URL = "";
        }

        private static UpmpConfig _instance;

        /// <summary>
        /// 获取UpmpConfig单例
        /// </summary>
        /// <returns></returns>
        public static UpmpConfig GetInstance()
        {
            if (_instance == null)
            {
                _instance = new UpmpConfig();
            }

            return _instance;
        }
    }
}
