using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace Eastday.PayCommon
{
    public class HttpHelper
    {
        static Logger logger = new Logger();

        public static string HttpPost(string postdata, string url, Encoding encoding)
        {
            string str = "";
            try
            {
                HttpWebRequest hwr = WebRequest.Create(url) as HttpWebRequest;
                hwr.Method = "POST";
                hwr.ContentType = "application/x-www-form-urlencoded";
                byte[] data = encoding.GetBytes(postdata);
                using (Stream stream = hwr.GetRequestStream())
                {
                    stream.Write(data, 0, data.Length);
                }
                var result = hwr.GetResponse() as HttpWebResponse;
                Stream myResponseStream = result.GetResponseStream();
                StreamReader myStreamReader = new StreamReader(myResponseStream, encoding);
                str = myStreamReader.ReadToEnd();
            }
            catch (Exception ex)
            {
                logger.Error("调用newpush推送错误", ex);
                logger.Flush();
            }
            return str;
        }
    }
}
