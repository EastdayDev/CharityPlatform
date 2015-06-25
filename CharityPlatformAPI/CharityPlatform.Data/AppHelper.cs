/* **************************************************************
  * Copyright(c) 2014 Eastday, All Rights Reserved.    
  * File             : FlowManager.cs
  * Description      : 流程管理  *                    
  * Author           : zhaotianyu
  * Created          : 2014-03-19
  * Revision History : 
******************************************************************/
namespace CharityPlatform.Data
{
    using System;
    using System.Collections.Generic;
    using System.Configuration;
    using System.IO;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using ClownFish;

    /// <summary>
    /// 数据底层访问
    /// </summary>
    public class AppHelper
    {
        /// <summary>
        /// 数据访问初始化
        /// </summary>
        public static void Init()
        {
            //// 设置配置参数：当成功执行数据库操作后，如果有输出参数，则自动获取返回值并赋值到实体对象的对应数据成员中。
            DbContextDefaultSetting.AutoRetrieveOutputValues = true;

            //// 注册编译失败事件，用于检查在编译实体加载器时有没有失败。
            BuildManager.OnBuildException += new BuildExceptionHandler(BuildManager_OnBuildException);

            //// 开始准备向ClownFishSQLProfiler发送所有的数据库访问操作日志
            Profiler.ApplicationName = "CharityPlatform";
            Profiler.TryStartClownFishProfiler();

            //// 注册SQLSERVER数据库连接字符串
            ConnectionStringSettings setting = ConfigurationManager.ConnectionStrings["sqldb"];
            DbContext.RegisterDbConnectionInfo("Sqlserver", setting.ProviderName, "@", setting.ConnectionString);

            //// 启动自动编译数据实体加载器的工作模式。
            //// 编译的触发条件：请求实体加载器超过2000次，或者，等待编译的类型数量超过100次
            BuildManager.StartAutoCompile(() => BuildManager.RequestCount > 2000 || BuildManager.WaitTypesCount > 100);

            //// 启动自动编译数据实体加载器的工作模式。每10秒【固定】启动一个编译过程。
            //// 注意：StartAutoCompile只能调用一次，第二次调用时，会引发异常。
            ////BuildManager.StartAutoCompile(() => true, 10000);

            //// 手动提交要编译加载器的数据实体类型。
            //// 说明：手动提交与自动编译不冲突，不论是同步还是异步。
            Type[] models = BuildManager.FindModelTypesFromCurrentApplication(t => t.FullName.StartsWith("CharityPlatform.Entity."));
            ////BuildManager.CompileModelTypesSync(models, true);
            BuildManager.CompileModelTypesAsync(models);
        }

        /// <summary>
        /// SafeLogException
        /// </summary>
        /// <param name="message">异常消息内容</param>
        public static void SafeLogException(string message)
        {
            try
            {
                string logfilePath = @"E:\ErroLogs\ErrorLog.txt";
                File.AppendAllText(logfilePath, "=========================================\r\n" + message, System.Text.Encoding.UTF8);
            }
            catch
            {
            }
        }

        /// <summary>
        /// OnBuildException
        /// </summary>
        /// <param name="ex">异常</param>
        private static void BuildManager_OnBuildException(Exception ex)
        {
            CompileException ce = ex as CompileException;
            if (ce != null)
            {
                SafeLogException(ce.GetDetailMessages());
            }
            else
            {
                //// 未知的异常类型
                SafeLogException(ex.ToString());
            }
        }
    }
}
