using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pictures.Core.Models
{
    public class Album
    {
        public int AlbumId { get;private set; }
        public int UserId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Created_at { get; set; }=DateTime.Now;//תאריך יצירה
        public DateTime Updated_at { get; set; }= DateTime.Now;//תאריך עדכון אחרון של האלבום
        public List<Photo> Photos { get; set; }


        public Album()
        {

        }

        public Album(int album_Id, int user_Id, string title, string description, DateTime created_at, DateTime updated_at, List<Photo> photos)
        {
            AlbumId = album_Id;
            UserId = user_Id;
            Title = title;
            Description = description;
            Created_at = created_at;
            Updated_at = updated_at;
            Photos = photos;
        }
    }
}