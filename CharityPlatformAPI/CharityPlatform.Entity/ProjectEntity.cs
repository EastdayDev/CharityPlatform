using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CharityPlatform.Entity
{
    public class PostParameter
    {
        public string proc;
        public Object entity;
    }

    public class ProjectEntity
    {
        public int Id;
        public int I_Flag = 1;
        public int I_Creater;
        public string C_Title;						// 项目名称
        public DateTime D_Create;
        public DateTime? D_Submit;
        public DateTime? D_Confirm;
        public string C_Business;
        public string C_Donation_Name;
        public int? I_FlowType;						// 流程编号
        public string C_Org_Contacter;				// 机构负责人
        public string C_Org_Contacter_Mobile;		// 机构负责人联系方式	
        public string C_Project_Contacter;			// 项目负责人
        public string C_Project_Contacter_Mobile;	// 项目负责人联系方式
        public string C_Address;					// 联系地址
        public string C_Email;						// 邮箱	
        public decimal M_Plan;						// 计划募款金额
        public DateTime? D_Start;					// 开始时间
        public DateTime? D_End;						// 结束时间
        public string C_Field;  					// 项目领域
        public string C_Remark;						// 简介
        public string C_Target;						// 目标
        public string C_Cycle;						// 周期
        public string C_Site;						// 实施地点
        public string C_People;						// 受益群体
        public int I_Person;						// 受益人数
        public int C_Publisher;						// 项目发布方
        public int I_Publisher;						// 发布人
        public DateTime? D_Publish;					// 发布时间
        public int I_State = 205;					        // 0 创建 1 已发布
    }

   

    public class DonationEntity
    {
        public int Id;
        public int I_Project;
        public int I_User;
        public int I_Method;
        public decimal M_Money;
        public int I_From;
        public string C_Transaction;
        public string C_Remark;
        public int I_Flag;
        public int I_RequiredReceipt;
        public string C_ReceiptTitle;
        public string C_ReceiptName;
        public string C_ReceiptMobile;
        public string C_ReceiptAddress;
    }
}
