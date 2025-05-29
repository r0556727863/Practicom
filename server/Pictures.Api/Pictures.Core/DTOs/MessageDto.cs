using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pictures.Core.DTOs
{
    public class MessageDto
    {
        public string role { get; set; }    // "user" או "assistant"
        public string content { get; set; } // תוכן ההודעה
    }
}
