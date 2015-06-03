using Eastday.MsgManage.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CharityPlatform.Entity
{
    public class UserEntity
    {
        public string Id { get; set; }
        public String C_Name { get; set; }
        public Int32? I_Flag { get; set; }
        public String C_Login { get; set; }
        public String C_Password { get; set; }
        public String C_Remark { get; set; }
        public DateTime D_Create { get; set; }
        public int I_Category { get; set; }        
        public String C_Mobile { get; set; }
        public String C_Email { get; set; }
        public String C_Address { get; set; }
        public TokenModel Token { get; set; } 
        public override bool Equals(object obj)
        {
            return this.Id == ((UserEntity)obj).Id;
        }
    }
    public class OrganizationEntity : UserEntity
    {
        public String C_Contact { get; set; }
        public DateTime D_Submit { get; set; }
        public DateTime D_Confirm{ get; set; }
        public String C_Remark { get; set; }
        public Int32? I_Audited { get; set; }
        public Int32? I_Auditer { get; set; } 
    }
    public class UserRoleEntity
    {
        public int UserId { get; set; }

        public IList<RoleEntity> Roles = new List<RoleEntity>();
    }

    public class RoleEntity
    { 
        public Int32? Id { get; set; }
        public String C_Name { get; set; }
        public Int32? I_Flag { get; set; }
        public String C_Remark { get; set; }

        public IList<FunctionEntity> Funcs = new List<FunctionEntity>();

        public override bool Equals(object obj)
        {
            return this.Id == ((RoleEntity)obj).Id;
        }
    } 

    public class FunctionEntity
    {
        public Int32? Id { get; set; }
        public String C_Name { get; set; }
        public String C_Remark { get; set; }
        public Int32? I_Category { get; set; }
        public Int32? I_Flag { get; set; }

        public override bool Equals(object obj)
        {
            return this.Id == ((FunctionEntity)obj).Id;
        }
    }

    public class FlowKinkEntity
    {
        public int id { get; set; }
        public string C_Name { get; set; }
        public int? I_Flag { get; set; }
        public int? I_Parent { get; set; }
        public string C_Remark { get; set; }
        public int? I_Flow { get; set; }
        public string C_Template { get; set; }
    }

    public class WordEntity
    {
        public int Id { get; set; }
        public int I_Flag { get; set; }
        public int I_Category { get; set; }
        public string C_Name { get; set; }
        public string C_Value { get; set; }
        public string C_Remark { get; set; }
    }
    /// <summary>
    /// 传阅通用
    /// </summary>
    public class TransferTreeItem
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string I_Parent { get; set; }
        public int I_Level { get; set; }
        public int I_Sort { get; set; }
        /// <summary>
        /// 传阅对象类别： "DEPT" or "PERSON"
        /// </summary>
        public string Category { get; set; }
    }
}
