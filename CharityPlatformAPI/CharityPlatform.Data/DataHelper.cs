using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CharityPlatform.Data
{
    public static class DataHelper
    {
        public static int ExecuteNonQuery(string proc, object inputParams)
        {
            using (AppBLL bll = new AppBLL())
            {
                return bll.ExecuteNonQuery(proc, inputParams);
            }
        }
        public static System.Data.DataTable FillDataTable(string proc, object inputParams)
        {
            using (AppBLL bll = new AppBLL())
            {
                return bll.FillDataTable(proc, inputParams);
            }
        }
        public static T GetDataItem<T>(string proc, object inputParams) where T : class, new()
        {
            using (AppBLL bll = new AppBLL())
            {
                return bll.GetDataItem<T>(proc, inputParams);
            }
        }
        public static List<T> FillList<T>(string proc, object inputParams) where T : class, new()
        {
            using (AppBLL bll = new AppBLL())
            {
                return bll.FillList<T>(proc, inputParams);
            }
        }
    }
}
