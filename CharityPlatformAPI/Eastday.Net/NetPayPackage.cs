using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Eastday.Net
{
    public class NetPayPackage
    {
        public string MerId { get; set; }

        public string Version { get; set; }

        public string OrdId { get; set; }

        public string TransAmt { get; set; }

        public string CuryId { get; set; }

        public string TransDate { get; set; }

        public string TransType { get; set; }

        public string BgRetUrl { get; set; }

        public string PageRetUrl { get; set; }

        public string GateId { get; set; }

        public string Priv1 { get; set; }

        public string ChkValue { get; set; }
    }
}
