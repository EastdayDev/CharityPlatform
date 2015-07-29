namespace Eastday.PayCommon
{
    using System;
    using System.Configuration;
    using System.IO;
    using System.Text;

    /// <summary>
    /// 日志
    /// </summary>
    public class Logger:IDisposable
    {
        #region Local Variables
        /// <summary>
        /// 日志所属目录
        /// </summary>
        private string rootFolder = string.Empty;

        /// <summary>
        /// 日志名称
        /// </summary>
        private string logFileName = string.Empty;

        /// <summary>
        /// 日志缓存
        /// </summary>
        private StringBuilder contentBuilder = new StringBuilder();

        /// <summary>
        /// 缓存最大条数
        /// </summary>
        private int maxCacheLines = 10;

        /// <summary>
        /// 日志条数计数器
        /// </summary>
        private int cachedLines = 0;

        /// <summary>
        /// 日志类型
        /// </summary>
        public LogLevel Level { get; set; }

        /// <summary>
        /// 日志所属根目录
        /// </summary>
        protected string RootFolder
        {
            get
            {
                return this.rootFolder;
            }

            set
            {
                this.rootFolder = value;
            }
        }

        /// <summary>
        /// 日志名称
        /// </summary>
        protected string LogFileName
        {
            get
            {
                return this.logFileName;
            }

            set
            {
                this.logFileName = value;
            }
        }

        /// <summary>
        /// 缓存最大条数
        /// </summary>
        protected int MaxCacheLines
        {
            get
            {
                return this.maxCacheLines;
            }

            set
            {
                this.maxCacheLines = value;
            }
        }

        /// <summary>
        /// 日志条数计数器
        /// </summary>
        protected int CachedLines
        {
            get
            {
                return this.cachedLines;
            }

            set
            {
                this.cachedLines = value;
                if (this.cachedLines > this.maxCacheLines)
                {
                    this.Flush();
                }
            }
        }
        #endregion

        #region Constructor
        /// <summary>
        /// Initializes a new instance of the <see cref="Logger" /> class
        /// </summary>
        public Logger()
            : this(null)
        {
        }

        /// <summary>
        /// 指定日志目录的构造
        ///  Initializes a new instance of the <see cref="Logger" /> class
        /// </summary>
        /// <param name="root">日志的根目录</param>
        public Logger(string root)
        {
            this.Level = LogLevel.Info | LogLevel.Error;
            this.rootFolder = root;
            if (string.IsNullOrEmpty(this.rootFolder))
            {
                this.rootFolder = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "log");
            }

            if (!string.IsNullOrEmpty(ConfigurationManager.AppSettings["LogDebug"]))
            {
                bool enableDebug = false;
                bool.TryParse(ConfigurationManager.AppSettings["LogDebug"], out enableDebug);
                if (enableDebug)
                {
                    this.Level |= LogLevel.Debug;
                }
            }

            if (!Directory.Exists(this.rootFolder))
            {
                Directory.CreateDirectory(this.rootFolder);
            }

            this.logFileName = Path.Combine(this.rootFolder, DateTime.Now.ToString("yyyyMMdd") + ".log");
        }
        #endregion

        #region Info
        /// <summary>
        /// 输出信息日志
        /// </summary>
        /// <param name="message">文本信息</param>
        public void Info(string message)
        {
            this.Info(message, null);
        }

        /// <summary>
        /// 输出信息日志
        /// </summary>
        /// <param name="ex">异常信息</param>
        public void Info(Exception ex)
        {
            this.Info(ex.Message, ex);
        }

        /// <summary>
        /// 输出信息日志
        /// </summary>
        /// <param name="message">文本信息</param>
        /// <param name="ex">异常信息</param>
        public void Info(string message, Exception ex)
        {
            if ((this.Level & LogLevel.Info) == LogLevel.Info)
            {
                this.Append(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + " : INFO : " + message);
                if (ex != null)
                {
                    this.Append(ex.ToString());
                }
            }
        }
        #endregion

        #region Debug
        /// <summary>
        /// 输出调试日志
        /// </summary>
        /// <param name="message">文本信息</param>
        public void Debug(string message)
        {
            this.Debug(message, null);
        }

        /// <summary>
        /// 输出调试日志
        /// </summary>
        /// <param name="ex">异常信息</param>
        public void Debug(Exception ex)
        {
            this.Debug(ex.Message, ex);
        }

        /// <summary>
        /// 输出调试日志
        /// </summary>
        /// <param name="message">文本信息</param>
        /// <param name="ex">异常信息</param>
        public void Debug(string message, Exception ex)
        {
            if ((this.Level & LogLevel.Debug) == LogLevel.Debug)
            {
                this.Append(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + " : DEBUG : " + message);
                if (ex != null)
                {
                    this.Append(ex.ToString());
                }
            }
        }

        #endregion

        #region Error
        /// <summary>
        /// 输出错误日志
        /// </summary>
        /// <param name="message">文本信息</param>
        /// <param name="ex">异常信息</param>
        public void Error(string message, Exception ex)
        {
            if ((this.Level & LogLevel.Error) == LogLevel.Error)
            {
                this.Append(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss") + " : ERROR : " + message);
                if (ex != null)
                {
                    this.Append(ex.ToString());
                    if (ex.InnerException != null)
                    {
                        Error("InnerException:", ex.InnerException);
                    }
                }                
            }
        }

        /// <summary>
        /// 输出错误日志
        /// </summary>
        /// <param name="message">文本信息</param>
        public void Error(string message)
        {
            this.Error(message, null);
        }

        /// <summary>
        /// 输出错误日志
        /// </summary>
        /// <param name="ex">异常信息</param>
        public void Error(Exception ex)
        {
            this.Error(ex.Message, ex);
        }
        #endregion

        #region Operations
        /// <summary>
        /// 将缓存的日志信息写入文件
        /// </summary>
        public void Flush()
        {
            try
            {
                this.logFileName = Path.Combine(this.rootFolder, DateTime.Now.ToString("yyyyMMdd") + ".log");
                using (StreamWriter writer = new StreamWriter(this.logFileName, true))
                {
                    writer.Write(this.contentBuilder.ToString());
                    this.contentBuilder.Clear();
                    this.cachedLines = 0;
                }
            }
            catch
            {
            }
        }

        /// <summary>
        /// 将文本信息添加到缓存
        /// </summary>
        /// <param name="message">文本信息</param>
        private void Append(string message)
        {
            this.contentBuilder.AppendLine(message);
            this.CachedLines++;

            if (this.OnLogging != null)
            {
                try
                {
                    this.OnLogging(message);
                }
                catch
                {
                }
            }
        }
        #endregion

        #region Finalize
        /// <summary>
        /// 析构
        /// Finalizes an instance of the <see cref="Logger" /> class
        /// </summary>
        ~Logger()
        {
            //Console.WriteLine("~Logger");
            if (this.cachedLines > 0)
            {
                this.Flush();
            }
        }
        #endregion

        #region OnLogging
        /// <summary>
        /// 写日志事件，当写日志时触发
        /// </summary>
        public event Action<string> OnLogging;
        #endregion

        #region IDisposable 成员

        public void Dispose()
        {
            //Console.WriteLine("Dispose");
            if (this.cachedLines > 0)
            {
                this.Flush();
            };
        }

        #endregion
    }

    /// <summary>
    /// 日志类型
    /// </summary>
    [Flags]
    public enum LogLevel
    {
        /// <summary>
        /// 信息
        /// </summary>
        Info,

        /// <summary>
        /// 错误
        /// </summary>
        Error,

        /// <summary>
        /// 调试
        /// </summary>
        Debug
    }
}
