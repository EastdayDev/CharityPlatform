using CharityPlatform.Data;
using CharityPlatform.Entity;
using CharityPlatform.WorkFlow;
using Eastday.WorkFlow;
using Eastday.WorkFlowEngine;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CharityPlatformAPI.Controllers
{
    public class AuditController : ApiController
    {

        [HttpPost]
        public int Submit(ProjectEntity entity)
        {
            try
            {
                entity.D_Submit = DateTime.Now;
                FlowKinkEntity flowKinkEntity = DataHelper.GetDataItem<FlowKinkEntity>("Usp_Flow_Template", new { Id = entity.I_FlowType });
                FlowHelper.Commit(entity, flowKinkEntity, entity.I_Creater, true);
                DataHelper.ExecuteNonQuery("Usp_Project_Insert", entity);
                return 1;
            }
            catch (Exception ex)
            {
                return -1;
            }
        }

        [HttpPost]
        public int Audit(CheckObject entity)
        {
            try
            {
                FlowManager flowMgr = FlowManager.Instance();
                FlowEngine flowEngine = flowMgr.Load(entity.Id);
                if (flowEngine == null) return -1;
                if (entity.AuditType == (int)AuditType.Passed)
                {
                    flowMgr.Audit(flowEngine, (AuditType)entity.AuditType, entity.AuditDesc, entity.UserId);
                }
                else
                {
                    flowMgr.Returned(flowEngine, (AuditType)entity.AuditType, entity.AuditDesc, entity.UserId);
                    ProjectEntity project = DataHelper.GetDataItem<ProjectEntity>("Usp_Project_Get", new { Id = entity.Id });
                    project.I_State = 165;
                    DataHelper.ExecuteNonQuery("Usp_Project_Insert", project);
                }
                flowMgr.FlowSave(flowEngine);
                return 1;
            }
            catch (Exception ex)
            {
                return -1;
            }

        }

        [HttpGet]
        public DataTable Usp_Check_List(int userId, string filterValue, int pageIndex, int pageSize)
        {
            if (string.IsNullOrEmpty(filterValue)) filterValue = "";
            return DataHelper.FillDataTable("Usp_Check_List", new { userId = userId, filter = filterValue, pageIndex = pageIndex, pageSize = pageSize });
        }
    }
}
