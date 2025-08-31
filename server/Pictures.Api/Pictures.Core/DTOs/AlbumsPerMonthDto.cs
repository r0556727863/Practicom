using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pictures.Core.DTOs
{
    public class AlbumsPerMonthDto
    {
        public int Year { get; set; }
        public int Month { get; set; }
        public int AlbumCount { get; set; }
    }
}
