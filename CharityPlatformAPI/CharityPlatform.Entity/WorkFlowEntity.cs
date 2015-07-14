using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CharityPlatform.Entity
{
    /// <summary>
    /// ”√”⁄…Û∫À“≥√Ê
    /// </summary>
    public class CheckObject
    {
        public int Id;
        public int AuditType = 10;
        public int UserId = -1;
        public string AuditDesc = "";
    } 

    public class TransferEntry
    {
        public string Id;
        public string Name;
        public string Parent;
        public IList<TransferEntry> Children = new List<TransferEntry>();
    }

    public class WorkFlowEntity
    {
        public int Id { get; set; }
        public int? I_Flag { get; set; }
        public int? I_Owner { get; set; } 
        public int I_State { get; set; }
    }

    public class ParticipantEntity
    {
        public int Id { get; set; }
        public int? I_WorkFlow { get; set; }
        public int? I_Flag { get; set; }
        public int? I_Bind { get; set; }
        public int? I_Number { get; set; }
        public long? I_Reference { get; set; }
        public string C_Step { get; set; }
        public string C_Node { get; set; }
        public Int64 I_Auditer { get; set; }
        public DateTime? D_Audit { get; set; }
        public int I_Current { get; set; }
        
    }

}
