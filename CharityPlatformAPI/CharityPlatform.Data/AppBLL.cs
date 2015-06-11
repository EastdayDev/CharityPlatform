/* **************************************************************
  * Copyright(c) 2014 Eastday, All Rights Reserved.    
  * File             : BaseBLL.cs
  * Description      : 流程管理  *                    
  * Author           : zhaotianyu
  * Created          : 2014-03-19
  * Revision History : 
******************************************************************/
namespace CharityPlatform.Data
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;
    using ClownFish;

    /// <summary>
    /// 数据访问底层类
    /// </summary> 
    public class AppBLL : DbContextHolderBase
    {
        /// <summary>
        /// ExecuteNonQuery
        /// </summary>
        /// <param name="proc">存储过程</param>
        /// <param name="inputParams">参数</param>
        /// <returns>返回影响行数</returns>        
        public int ExecuteNonQuery(string proc, object inputParams)
        {
            this.DbContext.CreateCommand(proc, System.Data.CommandType.StoredProcedure);
            this.DbContext.SetCommandParameters(inputParams);
            return this.DbContext.ExecuteNonQuery();
        }

        /// <summary>
        /// 数据访问方法
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="proc">存储过程名称</param>
        /// <param name="inputParams">参数列表</param>
        /// <returns>获取单个对象</returns>
        public T GetDataItem<T>(string proc, object inputParams) where T : class, new()
        {
            this.DbContext.CreateCommand(proc, System.Data.CommandType.StoredProcedure);
            this.DbContext.SetCommandParameters(inputParams);
            return this.DbContext.GetDataItem<T>();
        }

        /// <summary>
        /// 数据访问方法
        /// </summary>
        /// <param name="proc">存储过程名称</param>
        /// <param name="inputParams">参数列表</param>
        /// <returns>获得数据集</returns>
        public System.Data.DataSet FillDataSet(string proc, object inputParams)
        {
            this.DbContext.CreateCommand(proc, System.Data.CommandType.StoredProcedure);
            this.DbContext.SetCommandParameters(inputParams);
            return this.DbContext.FillDataSet();
        }

        /// <summary>
        /// 数据访问方法
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="proc">存储过程名称</param>
        /// <param name="inputParams">参数列表</param>
        /// <returns>获得对象列表</returns>
        public List<T> FillList<T>(string proc, object inputParams) where T : class, new()
        {
            this.DbContext.CreateCommand(proc, System.Data.CommandType.StoredProcedure);
            this.DbContext.SetCommandParameters(inputParams);
            return this.DbContext.FillList<T>();
        }

        /// <summary>
        /// 数据访问方法
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="sqlText">语句</param>
        /// <param name="inputParams">参数列表</param>
        /// <returns>获得对象列表</returns>
        public List<T> FillListByText<T>(string sqlText, object inputParams) where T : class, new()
        {
            this.DbContext.CreateCommand(sqlText, System.Data.CommandType.Text);
            this.DbContext.SetCommandParameters(inputParams);
            return this.DbContext.FillList<T>();
        }

        /// <summary>
        /// 数据访问方法
        /// </summary>
        /// <param name="proc">存储过程名称</param>
        /// <param name="inputParams">参数列表</param>
        /// <returns>获得数据表</returns>
        public System.Data.DataTable FillDataTable(string proc, object inputParams)
        {
            this.DbContext.CreateCommand(proc, System.Data.CommandType.StoredProcedure);
            this.DbContext.SetCommandParameters(inputParams);
            return this.DbContext.FillDataTable();
        }
    }
}
