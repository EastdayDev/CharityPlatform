CREATE TABLE [dbo].[Sys_Function](
	[Id] [int] IDENTITY(10000,100) NOT NULL,
	[C_Name] [varchar](50) NULL,
	[C_Remark] [varchar](200) NULL,
	[I_Category] [int] NULL,
	[I_Flag] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

/*
	机构伙伴
*/
CREATE TABLE [dbo].[Sys_Organization](
	[Id] [int] NOT NULL,
	[C_Contact] [varchar](50) NULL,
	[D_Submit] [datetime] null,
	[D_Confirm] [datetime] null,
	[I_Audited] [int] NULL,			-- 机构账户审核
	[I_Auditer] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

CREATE TABLE [dbo].[Sys_Role](
	[Id] [int] IDENTITY(10000,1) NOT NULL,
	[C_Name] [varchar](50) NULL,
	[I_Flag] [int] NULL,
	[C_Remark] [varchar](100) NULL,
 CONSTRAINT [PK__Role__10566F31] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

CREATE TABLE [dbo].[Sys_Role_Func](
	[I_Role] [int] NOT NULL,
	[I_Function] [int] NOT NULL,
	[I_Flag] [int] NULL,
PRIMARY KEY CLUSTERED 
(
	[I_Role] ASC,
	[I_Function] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
/*
	普通用户 
*/ 
CREATE TABLE [dbo].[Sys_User](
	[Id] [int] IDENTITY(20150701,1) NOT NULL,
	[C_Login] [varchar](30) NULL,
	[C_Name] [varchar](50) NULL,
	[I_Flag] [int] NULL,
	[I_Category] [int] NOT NULL,		--用户类别
	[D_Create] [datetime] not null,
	[C_Password] [varchar](128) NULL,
	[C_Mobile] [varchar](30) NULL,
	[C_Email] [varchar](100) NULL,
	[C_Address] [varchar](500) NULL,
	[C_Remark] [varchar](100) NULL,
 CONSTRAINT [PK__Sys_user__2180FB33] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY],
 CONSTRAINT [User_Login] UNIQUE NONCLUSTERED 
(
	[C_Login] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

/*
	用户基金账户
*/
CREATE TABLE [dbo].[User_Fund](
	[Id] int identity(20150701, 1) not null,
	[I_User] [int] NOT NULL,
	[M_Money] [money] NOT NULL default(0),		-- 发生金额	
	[I_Category] int not null default(0),		-- 用户基金金额类别
	[I_From] int null default(0),				-- 资金来源
	[C_Transaction] varchar(200) null,			--交易编号
	[D_Create] datetime null,
	[I_Flag] [int] NULL default(1),
	[C_Remark] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

CREATE TABLE [dbo].[Sys_User_Role](
	[I_User] [int] NOT NULL,
	[I_Role] [int] NOT NULL,
	[I_Flag] [int] NULL,
	[C_Remark] [varchar](100) NULL,
PRIMARY KEY CLUSTERED 
(
	[I_User] ASC,
	[I_Role] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
ALTER TABLE [dbo].[Sys_Function] ADD  CONSTRAINT [DF_Sys_Function_I_Flag]  DEFAULT ((1)) FOR [I_Flag]
GO

ALTER TABLE [dbo].[Sys_Organization] ADD  DEFAULT ((0)) FOR [I_Audited]
GO

ALTER TABLE [dbo].[Sys_Role] ADD  CONSTRAINT [DF_Sys_Role_I_Flag]  DEFAULT ((1)) FOR [I_Flag]
GO

ALTER TABLE [dbo].[Sys_Role_Func] ADD  CONSTRAINT [DF_Sys_Role_Func_I_Flag]  DEFAULT ((1)) FOR [I_Flag]
GO

ALTER TABLE [dbo].[Sys_User] ADD  CONSTRAINT [DF_Sys_User_I_Flag]  DEFAULT ((1)) FOR [I_Flag]
GO
 

ALTER TABLE [dbo].[Sys_User_Role] ADD  CONSTRAINT [DF_Sys_User_Role_I_Flag]  DEFAULT ((1)) FOR [I_Flag]
go
 
CREATE TABLE [dbo].[Project](
	[Id] [int] identity(20150701, 1) NOT NULL,
	[I_Flag] int default(1),
	[I_Creater] int not null,							
	[C_Title] [varchar](200) NULL,						-- 项目名称
	[D_Create] [datetime] not null,
	[D_Submit] [datetime] null,
	[D_Confirm] [datetime] null,
	[C_Scope] varchar(200) null,
	[I_FlowType] int null,								-- 流程编号
	[C_Org_Contacter] varchar(100) null,				-- 机构负责人
	[C_Org_Contacter_Mobile] varchar(100) null,			-- 机构负责人联系方式	
	[C_Project_Contacter] varchar(100) null,			-- 项目负责人
	[C_Project_Contacter_Mobile] varchar(100) null,		-- 项目负责人联系方式
	[C_Address] [varchar](200) NULL,					-- 联系地址
	[C_Email] [varchar](100) NULL,						-- 邮箱	
	[M_Plan] [money] null,								-- 计划募款金额
	[D_Start] [datetime] null,							-- 开始时间
	[D_End] [datetime] null,							-- 结束时间
	[I_Field] int null,									-- 项目领域
	[C_Remark] [text] null,								-- 简介
	[C_Target] varchar(300) null,						-- 目标
	[C_Cycle] varchar(200) null,						-- 周期
	[C_Site] varchar(300) null,							-- 实施地点
	[C_People] varchar(200) null,						-- 受益群体
	[I_Person] varchar(300) null,						-- 受益人数
	[I_Publisher] int not null,							-- 发布人
	[D_Publish] [datetime] null,						-- 发布时间
	[I_State] int not null default(0)					-- 0 创建 1 已发布
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

go

CREATE TABLE [dbo].[Project_Files](
	[Id] [int] identity(20150701, 1) NOT NULL,
	[I_Uploader] int not null,							
	[I_Project] int not null,								
	[D_Upload] [datetime] not null,	 
	[I_Category] int null,								-- 文件类型
	[C_Remark] varchar(200) null,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]
 
  
 
CREATE TABLE [dbo].[Project_Donation](	
	[Id] int identity(20150701, 1) not null,
	[I_Project] int not null,		--  项目
	[I_User] int not null,			--  捐款人
	[I_Method] int not null,		--	方式
	[M_Money] money not null,		--	金额
	[D_Create] datetime not null, 
	[I_From] int null default(0),		-- 资金来源
	[C_Transaction] varchar(200) null,  --交易编号
	[C_Remark] varchar(200) null,
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

CREATE TABLE [dbo].[Receipt](	
	[Id] int identity(20150701, 1) not null,
	[I_Donation] int not null,			--  捐款		
	[C_Title] varchar(200) null,		--	发票台头
	[C_Name] varchar(200) null,			--  收件人
	[C_Mobile] varchar(30) not null,	--  联系方式
	[C_Address] varchar(300) not null,	--  收件地址	
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

CREATE TABLE [dbo].[Words](
	[Id] [int] NOT NULL,
	[I_Flag] [int] NULL,
	[I_Category] [int] NULL,
	[C_Value] [varchar](200) NULL,
	[C_Name] [varchar](200) NULL,
	[C_Remark] [nvarchar](200) NULL,
 CONSTRAINT [PK__Words__123] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

 
CREATE TABLE [dbo].[WorkFlow](
	[Id] [int] IDENTITY(10000,1) NOT NULL,	
	[D_Create] datetime not null,
	[I_Flag] [int] NULL default(1),
	[I_Owner] [int] NULL,					-- 流程属主			
	[I_State] [int] NULL default(1),		-- 流程状态  				
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY]

CREATE TABLE [dbo].[WorkFlow_Participant](
	[Id] [int] IDENTITY(10000,1) NOT NULL,
	[I_WorkFlow] [int] NULL,
	[I_Flag] [int] NULL default(1),
	[I_Bind] [int] NULL default(0),		--	绑定类型 
	[I_Number] [int] NULL,				-- 
	[I_Reference] [int] NULL,			--	功能编号 或 用户编号
	[C_Step] [varchar](50) NULL,		--	步骤
	[C_Node] [varchar](50) NULL,		--	节点
	[D_Audit] [datetime] null,			--	审核日期
	[I_Current] [int] NULL,				--	当前步骤
	[I_Auditer] [int] NULL,				--	审核人
PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX  = OFF, STATISTICS_NORECOMPUTE  = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS  = ON, ALLOW_PAGE_LOCKS  = ON) ON [PRIMARY]
) ON [PRIMARY] 

 
 CREATE TABLE [dbo].[FlowKind](
	[id] [int] identity(101, 1) NOT NULL,
	[C_Name] [varchar](50) NULL,
	[I_Flag] [int] NULL,
	[I_Parent] [int] NULL,
	[C_Remark] [varchar](200) NULL,
	[I_Flow] [int] NULL,
	[C_Template] [varchar](50) NULL 
) ON [PRIMARY]