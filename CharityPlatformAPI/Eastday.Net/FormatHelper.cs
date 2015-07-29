using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Eastday.Net
{
    public class FormatHelper
    {
        /// <summary>
        /// 补位算法
        /// </summary>
        /// <param name="data">真实数据</param>
        /// <param name="length">补位后长度</param>
        /// <param name="c">补位符</param>
        /// <param name="back">是否是在后面补位（默认是在前面补位）</param>
        /// <returns>补位后的字符串</returns>
        public static string AddZero(string data, int length, char c, bool back = false)
        {
            string truestring = data;
            if (back)
            {
                for (int i = 0; i < length - data.Length; i++)
                {
                    truestring = truestring + c;
                }
            }
            else
            {
                for (int i = 0; i < length - data.Length; i++)
                {
                    truestring = c + truestring;
                }
            }
            return truestring;
        }
    }
}
