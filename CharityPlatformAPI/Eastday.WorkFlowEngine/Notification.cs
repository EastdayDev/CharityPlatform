/* **************************************************************
  * Copyright(c) 2014 Eastday, All Rights Reserved.   
  * File             : Notification.cs
  * Description      : 消息参数
  * Author           : zhaotianyu
  * Created          : 2014-03-11  
  * Revision History : 
******************************************************************/
namespace Eastday.WorkFlowEngine
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    /// <summary>
    /// 消息参数
    /// </summary>
    [Serializable]
    public class Notification
    {  
        /// <summary>
        /// Initializes a new instance of the <see cref="Notification"/> class.
        /// </summary>                 
        /// <param name="key">消息对应的键值</param>
        public Notification(string key)
        {
            this.Key = key;
            this.Parameter = new Dictionary<string, object>();            
        }

        /// <summary>
        /// 消息Key
        /// </summary>
        public string Key { get; set; }

        /// <summary>
        /// 定义携带参数
        /// </summary>
        /// <param name="key">参数键</param>
        /// <param name="value">参数值</param>
        public void Add(string key, object value)
        {
            if (!this.Parameter.ContainsKey(key))
            {
                this.Parameter.Add(key, value);
            }
            else
            {
                this.Parameter[key] = value;
            }
        }

        /// <summary>
        /// 移除一个参数
        /// </summary>
        /// <param name="key">参数key</param>
        public void Remove(string key)
        {
            this.Parameter.Remove(key);
        }

        /// <summary>
        /// 消息携带的参数
        /// </summary>
        internal Dictionary<string, object> Parameter { get; set; }
    }
}
