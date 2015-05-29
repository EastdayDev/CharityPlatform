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

namespace CharityPlatformAPI.Controllers
{
    public class FileController : ApiController
    {
        [HttpPost]
        public int FileUpload()
        {
            try
            {
                string title = HttpContext.Current.Request["title"];
                int category = Convert.ToInt32(HttpContext.Current.Request["category"]);
                string remark = HttpContext.Current.Request["remark"];
                int owner = Convert.ToInt32(HttpContext.Current.Request["owner"]);
                string userId = HttpContext.Current.Request["userId"];
                string loginName = HttpContext.Current.Request["loginName"];
                string filePath = ConfigurationManager.AppSettings["FileUpload"].ToString();

                int index = HttpContext.Current.Request.Files[0].FileName.LastIndexOf('.');
                if (index == -1) { index = 0; }
                string fileName = DateTime.Now.ToString("yyyyMMddHHmmssfff") + HttpContext.Current.Request.Files[0].FileName.Substring(index);

                string originalName = HttpContext.Current.Request.Files[0].FileName;
                if (HttpContext.Current.Request.Files[0].ContentLength > 0)
                {
                    if (!Directory.Exists(filePath))
                    {
                        Directory.CreateDirectory(filePath);
                    }
                    HttpContext.Current.Request.Files[0].SaveAs(filePath + "\\" + fileName);

                    //FileInsert(fileName, category, owner, title, remark, HttpContext.Current.Server.UrlEncode(originalName), userId);

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
        public void DownUpload(int category, string originalName, string fullName, string token)
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

                originalName = HttpContext.Current.Server.UrlDecode(originalName);

                string path = "";
                switch (category)
                {
                    case 1:
                        path = "Project/" + fullName;
                        break;
                    case 2:
                        path = "Budget/" + fullName;
                        break;
                    case 3:
                        path = "Contract/" + fullName;
                        break;
                    case 4:
                        path = "Expense/" + fullName;
                        break;
                    case 5:
                        path = "Receipt/" + fullName;
                        break;
                    case 6:
                        path = "Work/" + fullName;
                        break;
                    default: path = "";
                        break;
                }

                string newPath = ConfigurationManager.AppSettings["FileUpload"] + path;
                string HeaderName = path.Substring(path.LastIndexOf("/") + 1);
                FileInfo fileInfo = new FileInfo(newPath);


                HttpContext.Current.Response.Clear();
                HttpContext.Current.Response.ClearContent();
                HttpContext.Current.Response.ClearHeaders();

                HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment;filename=" + originalName);
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
        public int Download(int category, string fullName, string originalName)
        {
            originalName = HttpContext.Current.Server.UrlDecode(originalName);
            try
            {
                string path = "";
                switch (category)
                {
                    case 1:
                        path = "Project/" + fullName;
                        break;
                    case 2:
                        path = "Budget/" + fullName;
                        break;
                    case 3:
                        path = "Contract/" + fullName;
                        break;
                    case 4:
                        path = "Expense/" + fullName;
                        break;
                    case 5:
                        path = "Receipt/" + fullName;
                        break;
                    case 6:
                        path = "Work/" + fullName;
                        break;
                    default: path = "";
                        break;
                }
                string newPath = ConfigurationManager.AppSettings["FileUpload"] + path;
                string HeaderName = path.Substring(path.LastIndexOf("/") + 1);
                FileInfo fileInfo = new FileInfo(newPath);

                HttpContext.Current.Response.Clear();
                HttpContext.Current.Response.ClearContent();
                HttpContext.Current.Response.ClearHeaders();

                HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment;filename=" + originalName);
                HttpContext.Current.Response.AddHeader("Content-Length", fileInfo.Length.ToString());
                HttpContext.Current.Response.AddHeader("Content-Transfer-Encoding", "binary");
                HttpContext.Current.Response.AddHeader("Access-Control-Allow-Origin", "*");

                HttpContext.Current.Response.ContentType = "application/octet-stream";
                HttpContext.Current.Response.ContentEncoding = System.Text.Encoding.GetEncoding("gb2312");
                HttpContext.Current.Response.WriteFile(fileInfo.FullName);
                HttpContext.Current.Response.Flush();
                HttpContext.Current.Response.End();

                return 1;
            }
            catch
            {
                return -1;
            }
        }
    }
}