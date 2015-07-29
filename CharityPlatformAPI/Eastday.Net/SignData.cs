using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Net;
using System.IO;

namespace Eastday.Net
{
    public class SignData
    {
        public SignData()
        {            
        }

        //签名
        public static string sign(string MerId, string plain)
        {
            NetPay netPay = new NetPay();
            Boolean flag = netPay.buildKey(MerId, 0, NetConfig.priKeyPath);
            string sign = null;
            if (flag)
            {
                if (netPay.PrivateKeyFlag)
                {
                    sign = netPay.Sign(plain);
                }
            }
            return sign;

        }

        //验签
        public static bool check(string MerId, string OrdId, string TransAmt, string CuryId, string TransDate, string TransType, string status, string ChkValue)
        {

            NetPay netPay = new NetPay();
            Boolean flag = netPay.buildKey("999999999999999", 0, NetConfig.pubKeyPath);
            if (flag)
            {
                if (netPay.PublicKeyFlag)
                {
                    flag = netPay.verifyTransResponse(MerId, OrdId, TransAmt, CuryId, TransDate, TransType, status, ChkValue);
                }
                else
                {
                    flag = false;
                }
            }
            else
            {
                flag = false;
            }

            return flag;

        }

    }
}
