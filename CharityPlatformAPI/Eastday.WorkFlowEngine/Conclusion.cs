namespace Eastday.WorkFlowEngine
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    /// <summary>
    /// 审核结论
    /// </summary>
    [Serializable]
    public class Conclusion
    {
        private long auditer;

        /// <summary>
        /// Initializes a new instance of the <see cref="Conclusion"/> class.
        /// </summary>
        /// <param name="auditType">审核类型</param>
        /// <param name="auditer">审核人</param>
        /// <param name="auditDate">审核日期</param>
        public Conclusion(AuditType auditType, long auditer, DateTime? auditDate)
        {
            this.auditer = auditer;
            this.AuditType = auditType;
            this.AuditDate = auditDate;
        }

        /// <summary>
        /// 审核人
        /// </summary>
        public long Auditer
        {
            get
            {
                return this.auditer;
            }
            set
            {
                this.auditer = value;
            }
        }

        /// <summary>
        /// 审核类型
        /// </summary>
        public AuditType AuditType {get; set;}        

        /// <summary>
        /// 审核日期
        /// </summary>
        public DateTime? AuditDate { get; set; }

        /// <summary>
        /// 审核结论内容
        /// </summary>
        public string Description { get; set; }
    }
}
