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
        public int Upload()
        {
            try
            {
                ProjectFileEntity projectFileEntity = new ProjectFileEntity();
                projectFileEntity.I_Project = int.Parse(HttpContext.Current.Request["projectId"]);
                projectFileEntity.I_Category = Convert.ToInt32(HttpContext.Current.Request["category"]);
                projectFileEntity.C_Remark = HttpContext.Current.Request["remark"];
                projectFileEntity.I_Uploader = Convert.ToInt32(HttpContext.Current.Request["userId"]);
                projectFileEntity.D_Upload = DateTime.Now;
                projectFileEntity.C_OriginName = HttpContext.Current.Request.Files[0].FileName;

                string filePath = ConfigurationManager.AppSettings["FileUpload"].ToString();

                int index = projectFileEntity.C_OriginName.LastIndexOf('.');
                if (index == -1) { index = 0; }
                projectFileEntity.C_FileName = DateTime.Now.ToString("yyyyMMddHHmmssfff") + projectFileEntity.C_OriginName.Substring(index);

                if (HttpContext.Current.Request.Files[0].ContentLength > 0)
                {
                    if (!Directory.Exists(filePath))
                    {
                        Directory.CreateDirectory(filePath);
                    }
                    HttpContext.Current.Request.Files[0].SaveAs(filePath + "\\" + projectFileEntity.C_FileName);
                    using (AppBLL bll = new AppBLL())
                    { 
                        bll.ExecuteNonQuery("Usp_Project_Files_Insert", projectFileEntity);
                    } 
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
        public void Download(int projectId, string fileName, string token)
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
                string fullName = System.IO.Path.Combine(fileUploadPath, projectId.ToString(), fileName);

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
    }
}