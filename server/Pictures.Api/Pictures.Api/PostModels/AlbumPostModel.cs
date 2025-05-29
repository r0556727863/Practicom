namespace Pictures.Api.Models
{
    public class AlbumPostModel
    {
        public int UserId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Created_at { get; set; }//תאריך יצירה
        public DateTime Updated_at { get; set; }//תאריך עדכון אחרון של האלבום
    }
}
