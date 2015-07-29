using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Eastday.Upmp
{
    public class NetAppPayPackage
    {
        public string respCode { get; set; }

        public string tn { get; set; }

        public string respMsg { get; set; }

        public string version { get; set; }

        public string charset { get; set; }

        public string transType { get; set; }

        public string signMethod { get; set; }

        public string signature { get; set; }

        public string merReserved { get; set; }

        public string reqReserved { get; set; }

        public string sysReserved { get; set; }
    }
}
