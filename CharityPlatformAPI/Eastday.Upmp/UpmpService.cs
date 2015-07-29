﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Eastday.Upmp
{
    /// <summary>
    /// 接口处理核心类, 组转报文请求，发送报文，解析应答报文
    /// </summary>
    public class UpmpService
    {
        /// <summary>
        /// 交易接口处理
        /// </summary>
        /// <param name="req">请求要素</param>
        /// <param name="resp">应答要素</param>
        /// <returns>是否成功</returns>
        public static bool Trade(Dictionary<String, String> req, Dictionary<String, String> resp)
        {
            String nvp = BuildReq(req, resp);
            String respString = UpmpCore.Post(UpmpConfig.GetInstance().TRADE_URL, nvp);
            return VerifyResponse(respString, resp);

        }

        /// <summary>
        /// 交易查询处理
        /// </summary>
        /// <param name="req">请求要素</param>
        /// <param name="resp">应答要素</param>
        /// <returns>是否成功</returns>
        public static bool Query(Dictionary<String, String> req, Dictionary<String, String> resp)
        {
            String nvp = BuildReq(req, resp);
            String respString = UpmpCore.Post(UpmpConfig.GetInstance().QUERY_URL, nvp);
            return VerifyResponse(respString, resp);
        }

        /// <summary>
        /// 拼接保留域
        /// </summary>
        /// <param name="req">请求要素</param>
        /// <returns>保留域</returns>
        public static String BuildReserved(Dictionary<String, String> req)
        {
            StringBuilder merReserved = new StringBuilder();
            merReserved.Append("{");
            merReserved.Append(UpmpCore.CreateLinkString(req, false, true));
            merReserved.Append("}");
            return merReserved.ToString();
        }


        /// <summary>
        /// 拼接请求字符串
        /// </summary>
        /// <param name="req"></param>
        /// <param name="resp"></param>
        /// <returns></returns>
        private static String BuildReq(Dictionary<String, String> req, Dictionary<String, String> resp)
        {
            // 生成签名结果
            String signature = UpmpCore.BuildSignature(req);

            // 签名结果与签名方式加入请求提交参数组中
            req[UpmpConfig.GetInstance().SIGNATURE] = signature;
            req[UpmpConfig.GetInstance().SIGN_METHOD] = UpmpConfig.GetInstance().SIGN_TYPE;

            return UpmpCore.CreateLinkString(req, false, true);
        }

        /// <summary>
        /// 异步通知消息验证
        /// </summary>
        /// <param name="para">异步通知消息</param>
        /// <returns>验证结果</returns>
        public static bool VerifySignature(Dictionary<String, String> para)
        {
            String signature = UpmpCore.BuildSignature(para);
            String respSignature = para[UpmpConfig.GetInstance().SIGNATURE];
            if (null != respSignature && respSignature.Equals(signature))
            {
                return true;
            }
            return false;
        }

        /// <summary>
        /// 应答解析
        /// </summary>
        /// <param name="respString">应答报文</param>
        /// <param name="resp">应答要素</param>
        /// <returns>应答是否成功</returns>
        private static bool VerifyResponse(String respString, Dictionary<String, String> resp)
        {
            if (respString != null && !"".Equals(respString))
            {
                // 请求要素
                Dictionary<String, String> para;
                try
                {
                    para = UpmpCore.ParseQString(respString);
                }
                catch (Exception e)
                {
                    e.ToString();
                    return false;
                }
                bool signIsValid = VerifySignature(para);

                DictionaryPutAll(resp, para);

                if (signIsValid)
                {
                    return true;
                }
                else
                {
                    return false;
                }

            }
            return false;
        }

        private static void DictionaryPutAll(Dictionary<String, String> dest, Dictionary<String, String> source)
        {
            foreach (KeyValuePair<string, string> pair in source)
            {
                dest[pair.Key] = pair.Value;
            }
        }
    }
}
