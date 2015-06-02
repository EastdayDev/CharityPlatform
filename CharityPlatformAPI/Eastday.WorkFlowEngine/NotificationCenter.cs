/* **************************************************************
  * Copyright(c) 2014 Eastday, All Rights Reserved.   
  * File             : NotificationCenter.cs
  * Description      : 消息中心
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
    /// 消息中心
    /// </summary>
    [Serializable]
    internal class NotificationCenter
    {
        private Dictionary<string, IList<INotification>> receivers;

        /// <summary>
        /// Initializes a new instance of the <see cref="NotificationCenter"/> class.
        /// </summary>
        public NotificationCenter()
        {
            this.receivers = new Dictionary<string, IList<INotification>>();
        }

        /// <summary>
        /// 注册消息实现
        /// </summary>
        /// <param name="key">消息键值</param>
        /// <param name="notifier">消息接口</param>
        public void Register(string key, INotification notifier)
        {
            IList<INotification> notifications;
            if (!this.receivers.ContainsKey(key))
            {
                notifications = new List<INotification>();
                this.receivers.Add(key, notifications);
            }
            else
            {
                notifications = this.receivers[key];
            }

            if (!notifications.Contains(notifier))
            {
                notifications.Add(notifier);
            }
        }

        /// <summary>
        /// 反注册
        /// </summary>
        /// <param name="notifier">消息接口</param>
        public void UnRegister(INotification notifier)
        {
            foreach (var de in this.receivers)
            {
                IList<INotification> notifications = this.receivers[de.Key];
                notifications.Remove(notifier);
            }
        }

        /// <summary>
        /// 触发消息
        /// </summary>
        /// <param name="notification">消息台数</param>
        public void Notify(Notification notification)
        {
            if (!this.receivers.ContainsKey(notification.Key))
            {
                throw new ArgumentException(string.Format("{0} not found", notification.Key));
            }

            IList<INotification> notifications = this.receivers[notification.Key];
            foreach (var receiver in notifications)
            {
                receiver.Execute(notification.Parameter);
            }
        }
    }

    /// <summary>
    /// 消息接口
    /// </summary>
    public interface INotification
    {
        /// <summary>
        /// 收到消息执行具体操作
        /// </summary>
        /// <param name="dict">具体参数类型由外部定义</param> 
        void Execute(Dictionary<string, object> dict);
    }    
}
