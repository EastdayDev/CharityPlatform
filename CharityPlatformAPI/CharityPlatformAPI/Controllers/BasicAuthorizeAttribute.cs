using Eastday.MsgManage.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CharityPlatformAPI.Controllers
{
    public class BasicAuthorizeAttribute : System.Web.Http.AuthorizeAttribute
    {
        public override void OnAuthorization(System.Web.Http.Controllers.HttpActionContext actionContext)
        {
            if (actionContext.Request.Headers.Authorization != null)
            {
                string token = actionContext.Request.Headers.Authorization.Parameter;
                token = token.Replace("$#@!", ",");
                TokenModel tokenModel = Newtonsoft.Json.JsonConvert.DeserializeObject<TokenModel>(token);

                //用户验证逻辑
                if (TokenHelper.CheckToken(tokenModel) == TokenValidateResult.PASS)
                {
                    IsAuthorized(actionContext);
                }
                else
                {
                    HandleUnauthorizedRequest(actionContext);
                }
            }
            else
            {
                HandleUnauthorizedRequest(actionContext);
            }
        }

        protected override void HandleUnauthorizedRequest(System.Web.Http.Controllers.HttpActionContext actionContext)
        {
            var challengeMessage = new System.Net.Http.HttpResponseMessage(System.Net.HttpStatusCode.Unauthorized);
            challengeMessage.Headers.Add("WWW-Authenticate", "Basic");
            throw new System.Web.Http.HttpResponseException(challengeMessage);
        }
    }
}