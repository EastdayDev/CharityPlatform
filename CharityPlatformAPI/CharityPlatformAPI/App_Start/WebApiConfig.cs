using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Cors;

namespace CharityPlatformAPI
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();
            var allowedMethods = ConfigurationManager.AppSettings["cors:allowedMethods"];
            var allowedOrigin = ConfigurationManager.AppSettings["cors:allowedOrigin"];
            var allowedHeaders = ConfigurationManager.AppSettings["cors:allowedHeaders"];
            var geduCors = new EnableCorsAttribute(allowedOrigin, allowedHeaders, allowedMethods)
            {
                SupportsCredentials = true,
                PreflightMaxAge = 600
            };
            config.EnableCors(geduCors);

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
