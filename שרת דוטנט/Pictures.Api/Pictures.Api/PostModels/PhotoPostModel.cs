namespace Pictures.Api.Models
{
    public class PhotoPostModel
    {
        public int AlbumId { get; set; }
        public int UserId { get; set; }
        public string Url { get; set; }
        public string Title { get; set; } // שם התמונה
        public DateTime Created_at { get; set; }//תאריך יצירה
        public DateTime Updated_at { get; set; }//תאריך עדכון אחרון של התמונה
    }
}
