namespace CharityPlatformAPI.Controllers
{
    using CharityPlatform.Data;
    using CharityPlatform.Entity;
    using Eastday.MsgManage.Common;
    using System;
    using System.Collections.Generic;
    using System.Configuration;
    using System.Data;
    using System.IO;
    using System.Linq;
    using System.Net;
    using System.Net.Http;
    using System.Net.Http.Headers;
    using System.Text;
    using System.Threading.Tasks;
    using System.Web;
    using System.Web.Http;
    public class FileController : ApiController
    {
        [HttpPost]
        public int UploadFiles()
        {
            try
            {
                FileEntity fileEntity = new FileEntity();
                fileEntity.I_Owner = int.Parse(HttpContext.Current.Request["I_Owner"]);
                fileEntity.I_Category = Convert.ToInt32(HttpContext.Current.Request["I_Category"]);
                fileEntity.C_Remark = HttpContext.Current.Request["C_Remark"];
                fileEntity.I_Uploader = Convert.ToInt32(HttpContext.Current.Request["I_Uploader"]);
                fileEntity.D_Upload = DateTime.Now;
                fileEntity.C_OriginName = HttpContext.Current.Request.Files[0].FileName;

                string fileUploadPath = ConfigurationManager.AppSettings["FileUpload"].ToString();

                int index = fileEntity.C_OriginName.LastIndexOf('.');
                if (index == -1) { index = 0; }
                fileEntity.C_FileName = DateTime.Now.ToString("yyyyMMddHHmmssfff") + fileEntity.C_OriginName.Substring(index);

                if (HttpContext.Current.Request.Files[0].ContentLength > 0)
                {
                    string path = System.IO.Path.Combine(fileUploadPath, fileEntity.I_Owner.ToString());
                    if (!Directory.Exists(path))
                    {
                        Directory.CreateDirectory(path);
                    }
                    HttpContext.Current.Request.Files[0].SaveAs(path + "\\" + fileEntity.C_FileName);
                    DataHelper.ExecuteNonQuery("Usp_File_Insert", fileEntity);
                    return 1;
                }
                return -1;
            }
            catch (Exception ex)
            {
                return -1;
            }
        }


        [HttpGet]
        public void DownloadFile(int owner, string fileName, string token)
        {
            try
            {
                var tokenValue = token.Replace("**", ",");
                TokenModel tokenModel = Newtonsoft.Json.JsonConvert.DeserializeObject<TokenModel>(tokenValue);

                //用户验证逻辑
                if (TokenHelper.CheckToken(tokenModel) != TokenValidateResult.PASS)
                {
                    return;
                }

                fileName = HttpContext.Current.Server.UrlDecode(fileName);
                string fileUploadPath = ConfigurationManager.AppSettings["FileUpload"];
                string fullName = System.IO.Path.Combine(fileUploadPath, owner.ToString(), fileName);

                FileInfo fileInfo = new FileInfo(fullName);

                HttpContext.Current.Response.Clear();
                HttpContext.Current.Response.ClearContent();
                HttpContext.Current.Response.ClearHeaders();

                HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment;filename=" + fileName);
                HttpContext.Current.Response.AddHeader("Content-Length", fileInfo.Length.ToString());
                HttpContext.Current.Response.AddHeader("Content-Transfer-Encoding", "binary");
                HttpContext.Current.Response.AddHeader("Access-Control-Allow-Origin", "*");

                HttpContext.Current.Response.ContentType = "application/octet-stream";
                HttpContext.Current.Response.ContentEncoding = System.Text.Encoding.GetEncoding("gb2312");
                HttpContext.Current.Response.WriteFile(fileInfo.FullName);
                HttpContext.Current.Response.Flush();
                HttpContext.Current.Response.End();

            }
            catch
            {
                return;
            }
        }


        [HttpGet]
        public DataTable Usp_File_List(int owner, int category, int uploader)
        {
            return DataHelper.FillDataTable("Usp_File_List", new { I_Owner = owner, I_Category = category, I_Uploader = uploader });
        }

        /// <summary>
        /// 初创项目时，项目保存后，修改原临时文件夹名称至最终的项目编号
        /// </summary>
        /// <param name="projectId"></param>
        /// <returns></returns>
        [HttpGet]
        public int DirectoryRename(int oldProjectId, int newProjectId)
        {
            string fileUploadPath = ConfigurationManager.AppSettings["FileUpload"].ToString(); 

            string srcPath = System.IO.Path.Combine(fileUploadPath, oldProjectId.ToString());
            string targetPath = System.IO.Path.Combine(fileUploadPath, newProjectId.ToString());
            if (Directory.Exists(srcPath))
            {
                Directory.Move(srcPath, targetPath);
            }

            return 1;
        }
    }
}