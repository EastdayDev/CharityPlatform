using Eastday.PayCommon;
using Eastday.Upmp;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace Eastday.PayNotify
{
    public partial class UpmpNotify : System.Web.UI.Page
    {
        static Logger logger = new Logger();
        protected void Page_Load(object sender, EventArgs e)
        {
            try
            {
                Dictionary<String, String> para = new Dictionary<String, String>();
                NameValueCollection coll;
                coll = Request.Form;
                String[] requestItem = coll.AllKeys;
                for (int i = 0; i < requestItem.Length; i++)
                {
                    para.Add(requestItem[i], Request.Form[requestItem[i]]);
                }
                logger.Info(Request.UserHostAddress + "请求:" + Request.Form.ToString());
                if (para.Count > 0)
                {
                    string OrdId = Request.Form["orderNumber"];
                    if (UpmpService.VerifySignature(para))
                    {
                        // 服务器签名验证成功
                        //请在这里加上商户的业务逻辑程序代码
                        //获取通知返回参数，可参考接口文档中通知参数列表(以下仅供参考)
                        String transStatus = Request.Form["transStatus"];// 交易状态                            
                        if ("" != transStatus && "00" == transStatus)
                        {
                            logger.Info("订单支付成功，通知来自银联移动支付(订单号：" + OrdId + ")");
                            //TODO:支付成功后的处理
                        }
                        else
                        {
                            logger.Info("服务器签名验证成功,通知来自银联移动支付，未支付：" + OrdId);
                        }

                        Response.Write("success");
                    }
                    else// 服务器签名验证失败
                    {
                        logger.Error("签名验证失败," + OrdId);
                        Response.Write("fail");
                    }
                }
                else
                {
                    Response.Write("通知参数为空");
                }
            }
            catch (Exception ex)
            {
                logger.Error("验证失败", ex);
            }
            finally
            {
                logger.Flush();
            }
        }
    }
}