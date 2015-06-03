using CharityPlatform.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CharityPlatform.Data
{
    public class ProjectBLL : AppBLL
    {
        public ProjectEntity USP_Project_Get(int id)
        {
            return this.GetDataItem<ProjectEntity>("USP_Project_Get", new { Id = id });
        }
    }
}
