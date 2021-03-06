﻿using CharityPlatform.Data;
using CharityPlatform.Entity;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CharityPlatformAPI.Controllers
{
    public class PartnerController : BaseController
    {
        [HttpGet]
        public DataTable Usp_Org_List(int userId, string filterValue, int pageIndex, int pageSize)
        {
            return DataHelper.FillDataTable("Usp_Org_List", new { userId = userId, filter = string.IsNullOrEmpty(filterValue) ? "" : filterValue, pageIndex = pageIndex, pageSize = pageSize });
        }

        [HttpGet]
        public DataTable Usp_Org_ById(int id)
        {
            return DataHelper.FillDataTable("Usp_Org_ById", new { Id = id });
        }

        [HttpPost]
        public int Usp_Org_Insert(OrganizationEntity entity)
        {
            if (entity.I_Audited == 190 || entity.I_Audited == 185)
            {
                ///设置审核日期
                entity.D_Confirm = DateTime.Now;
            }
            WriteLog("机构修改", entity);
            DataHelper.ExecuteNonQuery("Usp_Org_Insert", entity);
            return entity.Id;
        }

        [HttpGet]
        public int OrgSubmitAudit(int Id)
        {
            OrganizationEntity orgEntity = DataHelper.GetDataItem<OrganizationEntity>("Usp_Org_ById", new { Id = Id });
            orgEntity.D_Submit = DateTime.Now;
            orgEntity.I_Audited = 195;
            WriteLog("机构提交审核", orgEntity);
            return DataHelper.ExecuteNonQuery("Usp_Org_Insert", orgEntity);
        }

        [HttpPost]
        public int Usp_UserOrg_Insert(UserOrgEntity entity)
        {
            using (AppBLL bll = new AppBLL())
            {
                bll.DbContext = bll.CreateDbContext(true);
                try
                {
                    DataHelper.ExecuteNonQuery("Usp_User_Insert", entity.User);
                    if (entity.User.I_Category == 105 && !string.IsNullOrEmpty(entity.Org.C_Name))
                    {
                        /// 机构用户 190 审核未通过  185 审核通过 
                        OrganizationEntity orgEntity = bll.GetDataItem<OrganizationEntity>("Usp_Org_ById", new { Id = entity.Org.Id });
                        if (orgEntity!=null && orgEntity.I_Audited >190 && entity.Org.I_Audited <= 190)
                        {
                            ///设置审核日期
                            entity.Org.D_Confirm = DateTime.Now;
                        }
                        if (orgEntity == null)
                        {
                            entity.Org.Id = entity.User.Id;
                        }
                        DataHelper.ExecuteNonQuery("Usp_Org_Insert", entity.Org);
                        WriteLog("用户及机构资料编辑", entity);
                    }
                    bll.DbContext.CommitTransaction();
                    return 1;
                }
                catch (Exception ex)
                {
                    return -1;
                }
            } 
        }

        [HttpGet]
        public DataTable USP_Partner_Projects(int userId)
        {
            return DataHelper.FillDataTable("USP_Partner_Projects", new { userId = userId });
        }

        [HttpGet]
        public DataTable Usp_Partner_List(int userId)
        {
            return DataHelper.FillDataTable("Usp_Partner_List", new { userId = userId });
        }

    }
}
