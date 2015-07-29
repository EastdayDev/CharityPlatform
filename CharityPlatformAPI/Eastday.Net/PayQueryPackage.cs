using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Eastday.Net
{
    public class PayQueryPackage
    {

        public string MerId { get; set; }

        public string Version { get; set; }

        public string OrdId { get; set; }       

        public string TransDate { get; set; }

        public string TransType { get; set; }

        public string Resv { get; set; }

        public string ChkValue { get; set; }
    }
}
