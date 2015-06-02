/* **************************************************************
  * Copyright(c) 2014 Eastday, All Rights Reserved.    
  * File             : WorkFlow.cs
  * Description      : 流程管理器
  * Author           : zhaotianyu
  * Created          : 2014-03-06
  * Revision History : 
******************************************************************/
namespace Eastday.WorkFlowEngine
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Runtime.Serialization.Formatters.Binary;
    using System.Text;
    using System.Threading.Tasks;
    
    /// <summary>
    /// 流程管理器
    /// </summary>
    [Serializable]
    public class FlowEngine
    {
        private LinkedList<Step> flowSteps;
        private FlowAttachment attachment;
        
        public delegate void FinishedEventHandler(object sender, EventArgs e);

        public event FinishedEventHandler FinishedHandler;

        /// <summary>
        /// Initializes a new instance of the <see cref="FlowEngine"/> class.
        /// </summary>
        /// <param name="designed">是否设计模式, 设计模式所有节点均接受流程变化消息</param>
        public FlowEngine()
        {            
            this.flowSteps = new LinkedList<Step>();
            this.FlowState = WorkFlowEngine.FlowState.SelfWaiting;
        }
        
        /// <summary>
        /// reset Guid from template loaded
        /// </summary>
        /// <param name="owner">流程属主</param>
        public void Reset(FlowAttachment flowAttachment)
        {
            this.attachment = flowAttachment;
            this.Reset();
        }

        public void Reset()
        {
            foreach (var step in this.flowSteps)
            {
                step.Reset(this.attachment);
            }
        }
        public virtual void ResetIdentity()
        {
            foreach (var step in this.flowSteps)
            {
                step.ResetIdentity();
            }
        }

        /// <summary>
        /// 获得流程所有部门
        /// </summary>
        /// <returns></returns>
        public IList<long> GetAllDepartments()
        {
            IList<long> departments = new List<long>();
            foreach (var step in this.flowSteps)
            {
                foreach (var node in step.Nodes)
                {
                    if (node.Participant.Department == -1) break;
                    if (!departments.Any(c => c == node.Participant.Department))
                    {
                        departments.Add(node.Participant.Department);
                    } 
                }
            }
            return departments;
        }

        #region Property

        /// <summary>
        /// 流程名称
        /// </summary>
        public string Name { get; set; }

        /// <summary>
        /// 流程描述
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// 附属数据
        /// </summary>
        public FlowAttachment Attachment
        {
            get
            {
                return this.attachment;
            }
            set
            {
                this.attachment = value;
            }
        }

        /// <summary>
        /// 有效步骤总数
        /// </summary>
        public int StepValidCount
        {
            get
            {
                int count = 0;
                foreach (var step in this.flowSteps)
                {
                    count += step.NodeValidCount > 0 ? 1 : 0;
                }
                return count;
            }
        }

        /// <summary>
        /// 流程状态
        /// </summary>
        public FlowState FlowState { get; set; }

        /// <summary>
        /// 流程步骤
        /// </summary>
        public LinkedList<Step> FlowSteps
        {
            get
            {
                return this.flowSteps;
            }
        }

        #endregion

        #region 序列化

        /// <summary>
        /// 序列化流程至文件 BinaryFormatter
        /// </summary>
        /// <param name="path">文件全路径名称</param>
        /// <param name="workFlow">流程对象</param>
        public static void Save(string path, FlowEngine workFlow)
        {
            try
            {
                if (!Directory.Exists(Path.GetDirectoryName(path)))
                {
                    Directory.CreateDirectory(Path.GetDirectoryName(path));
                }

                Stream sw = File.Create(path);
                BinaryFormatter bf = new BinaryFormatter();
                bf.Serialize(sw, workFlow);
                sw.Close();
            }
            catch (Exception ex)
            {
                throw new Exception("Exception save workflow file", ex);
            }
        }

        /// <summary>
        /// 反序列化加载流程 BinaryFormatter
        /// </summary>
        /// <param name="path">文件全路径名称</param>
        /// <returns>流程对象</returns>
        public static FlowEngine Load(string path)
        {
            if (!System.IO.File.Exists(path)) return null;
            try
            {
                BinaryFormatter bf = new BinaryFormatter();
                FileStream fs = new FileStream(path, FileMode.Open, FileAccess.Read, FileShare.Read);
                FlowEngine workFlow = (FlowEngine)bf.Deserialize(fs);
                fs.Close();
                return workFlow;
            }
            catch (Exception ex)
            {
                throw new Exception("Exception load workflow file", ex);
            }
        }

        #endregion

        #region Add flow Step

        /// <summary>
        /// 添加流程步骤
        /// </summary>
        /// <param name="step">步骤</param>
        public void Add(Step step)
        {
            this.flowSteps.AddLast(step);             
        }

        /// <summary>
        /// addAfter
        /// </summary>
        /// <param name="step"></param>
        /// <param name="newStep"></param>
        public void AddAfter(Step step, Step newStep)
        {
            this.flowSteps.AddAfter(this.flowSteps.Find(step), newStep);
        }

        

        /// <summary>
        /// 插入步骤
        /// </summary>
        /// <param name="newStep">新步骤</param>
        /// <param name="index">插入位置</param>
        public void Insert(Step newStep, int index)
        {
            if (index == this.flowSteps.Count())
            {
                this.flowSteps.AddLast(newStep);
                return;
            }
            if (index < 0 || index > this.flowSteps.Count)
            {
                throw new ArgumentException("Insert step overflow index");
            }
            if (!this.flowSteps.Contains(newStep))
            {
                Step step = this.flowSteps.ElementAt(index);
                LinkedListNode<Step> current = this.flowSteps.Find(step);
                this.flowSteps.AddBefore(current, newStep);                
            }
        }

        /// <summary>
        /// 移除步骤
        /// </summary>
        /// <param name="step">步骤</param>
        public void Remove(Step step)
        {
            if (this.flowSteps.Contains(step))
            {
                this.flowSteps.Remove(step);                
            }
        }

        private Step GetNext(Step current)
        {
            LinkedListNode<Step> aCurrent = this.flowSteps.Find(current);
            if (aCurrent.Next != null)
                return aCurrent.Next.Value;
            return null;
        }

        /// <summary>
        /// 查询特定步骤
        /// </summary>
        /// <param name="identification">步骤标识</param>
        /// <returns></returns>
        public Step Find(string identification)
        {
            foreach (var step in this.flowSteps)
            {
                if (step.Identification.Equals(identification))
                    return step;
            }
            return null;
        }
        #endregion

        #region Audit

        /// <summary>
        /// 获取当前流程步骤
        /// </summary>
        /// <returns>当前流程步骤</returns>
        public Step GetCurrent()
        {
            foreach (var step in this.flowSteps)
            {
                var nodes = from node in step.Nodes
                            where node.AuditType == AuditType.UnAudit
                            select node;
                if (nodes.Any()) return step;
            }
            return null;
        }

        /// <summary>
        /// 获取上一步骤
        /// </summary>
        /// <returns></returns>
        public Step GetPrevious()
        {
            Step current = this.GetCurrent(); 
            if (current == null) return null;
            var pre = this.flowSteps.Find(current).Previous;
            while (pre.Value.NodeValidCount == 0)
            {
                pre = this.flowSteps.Find(pre.Value).Previous;
                if (pre.Value.NodeValidCount > 0) break;
            }
            return pre != null ? pre.Value : null;
        }

        /// <summary>
        /// 流程步骤数量
        /// </summary>
        public int StepCount
        {
            get { return this.flowSteps.Count(); }
        }

        /// <summary>
        /// 流程审核
        /// </summary>
        /// <param name="conclusion">审核结论</param>
        /// <param name="participant">参与者,用于确定审核节点</param>
        /// <returns>true 审核成功 false 不允许审核</returns>
        public bool Audit(Conclusion conclusion, Participant participant)
        {
            Step aCurrent = this.GetCurrent();
            if (aCurrent == null)
            {
                return false;
            }
            if (aCurrent.Audit(conclusion, participant))
            {
                aCurrent.Leave();
                if (this.GetCurrent() == null)
                {
                    this.FlowState = WorkFlowEngine.FlowState.Finished;
                }
                else
                {
                    this.FlowState = WorkFlowEngine.FlowState.Processing;
                }
                if (conclusion.AuditType != AuditType.Returned && this.GetCurrent() == null && this.FinishedHandler != null)
                {
                    this.FinishedHandler(this, null);
                }
                return true;
            }            
            return false;
        }

        /// <summary>
        /// 流程退回
        /// </summary>        
        /// <returns></returns>
        public void Returned()
        {
            this.SetOtherStepDisable();
            this.FlowState = WorkFlowEngine.FlowState.Returned;            
        }

        /// <summary>
        /// 终止当前流程
        /// </summary>        
        /// <returns></returns>
        public void Abort()
        {
            this.SetOtherStepDisable();
            if (this.GetCurrent() == null && this.FinishedHandler != null)
            {
                this.FinishedHandler(this, null);
            }
            this.FlowState = WorkFlowEngine.FlowState.Finished;            
        }

        /// <summary>
        /// 设置未处理的步骤为 AuditType.Disable
        /// </summary>
        private void SetOtherStepDisable()
        {
            Step aCurrent = this.GetCurrent();
            while (aCurrent != null)
            {
                aCurrent.SetAudityType(AuditType.Disable);
                aCurrent = this.GetNext(aCurrent);
            }
        }

        #endregion 
    }

    [Serializable]
    public class FlowAttachment
    {
        /// <summary>
        /// 创建人
        /// </summary>
        public long Creater {get; set; }

        /// <summary>
        /// 流程属主 或项目编号 或预算编号 或合同编号等
        /// </summary>
        public int Owner {get; set;}

        /// <summary>
        /// 业务类型 BusinessKind.Id
        /// </summary>
        public int Kind { get; set; }

        /// <summary>
        /// 附属对象
        /// </summary>
        public object Auxiliary { get; set; }
             
    }
}
