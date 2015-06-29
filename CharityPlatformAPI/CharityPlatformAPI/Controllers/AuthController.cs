using CharityPlatform.Data;
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
    public class AuthController : ApiController
    {
        [HttpGet]
        public DataTable Usp_Role_List(int userId, string filterValue, int pageIndex, int pageSize)
        {
            return DataHelper.FillDataTable("Usp_Role_List", new { userId = userId, filter= filterValue == null ? "" : filterValue, pageIndex = pageIndex, pageSize = pageSize });
        }

        [HttpPost]
        public int Usp_Role_Insert(RoleEntity entity)
        {
            DataHelper.ExecuteNonQuery("Usp_Role_Insert", entity);
            return entity.Id;
        }

        [HttpPost]
        public bool Usp_RoleFunc_Insert(IList<RoleFuncEntity> entities)
        {
            if (!entities.Any()) return false;
            DataHelper.ExecuteNonQuery("Usp_RoleFunc_Delete", new { I_Role = entities[0].I_Role });
            foreach (var entity in entities)
            {
                DataHelper.ExecuteNonQuery("Usp_RoleFunc_Insert", entity); 
            }
            return true;
        }

        [HttpPost]
        public bool Usp_UserRole_Insert(IList<UserRoleEntity> entities)
        {
            if (!entities.Any()) return false;
            DataHelper.ExecuteNonQuery("Usp_UserRole_Delete", new { I_User = entities[0].I_User });
            foreach (var entity in entities)
            {
                DataHelper.ExecuteNonQuery("Usp_UserRole_Insert", entity);
            }
            return true;
        } 

        [HttpGet]
        public DataTable Usp_Func_List()
        {
            return DataHelper.FillDataTable("Usp_Func_List", null);
        }

        [HttpGet]
        public DataTable Usp_Funcs_ByRole(int roleId)
        {
            return DataHelper.FillDataTable("Usp_Funcs_ByRole", new { roleId = roleId });
        }
         [HttpGet]
        public DataTable Usp_Roles_ByUser(int userId)
        {
            return DataHelper.FillDataTable("Usp_Roles_ByUser", new { I_User = userId });
        }
        
    }
}
