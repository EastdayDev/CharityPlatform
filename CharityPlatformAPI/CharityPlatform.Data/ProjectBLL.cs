using CharityPlatform.Entity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CharityPlatform.Data
{
    public class ProjectBLL : AppBLL
    {
        /// <summary>
        /// 获取项目
        /// </summary>
        /// <param name="id">项目编号</param>
        /// <returns></returns>
        public ProjectEntity USP_Project_Get(int id)
        {
            return this.GetDataItem<ProjectEntity>("USP_Project_Get", new { Id = id });
        }

        /// <summary>
        /// 模糊查询、分页项目列表
        /// </summary>
        /// <param name="likeValue"></param>
        /// <param name="orderByField"></param>
        /// <param name="index"></param>
        /// <param name="size"></param>
        /// <returns></returns>
        public DataTable USP_Project_List(string likeValue, string orderByField, int index, int size) 
        {
            return this.FillDataTable("USP_Project_List", new { LikeValue = likeValue, OrderByField = orderByField, Index = index, Size = size });
        }

        /// <summary>
        /// 项目文件列表
        /// </summary>
        /// <returns></returns>
        public DataTable USP_Project_File_List(int project)
        {
            return this.FillDataTable("USP_Project_File_List", new { Project = project });
        }

        /// <summary>
        /// 项目捐款情况
        /// </summary>
        /// <returns></returns>
        public DataTable USP_Project_Donation_List(int project, string orderByField, int index, int size)
        {
            return this.FillDataTable("USP_Project_Donation_List", new { Project = project, OrderByField = orderByField, Index = index, Size = size });
        }
    }
}
