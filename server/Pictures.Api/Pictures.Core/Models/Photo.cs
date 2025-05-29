using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pictures.Core.Models
{
    public class Photo
    {
        public int PhotoId { get; set; }
        public int AlbumId { get; set; }
        public int UserId { get; set; }
        public string Url { get; set; }
        public string Title { get; set; } // שם התמונה
        public DateTime Created_at { get; set; }//תאריך יצירה
        public DateTime Updated_at { get; set; }//תאריך עדכון אחרון של התמונה

        public Photo()
        {

        }

        public Photo(int photo_Id, int album_id, int user_id, string url, string title, DateTime created_at, DateTime updated_at)
        {
            PhotoId = photo_Id;
            AlbumId = album_id;
            UserId = user_id;
            Url = url;
            Title = title;
            Created_at = created_at;
            Updated_at = updated_at;
        }
    }
}
