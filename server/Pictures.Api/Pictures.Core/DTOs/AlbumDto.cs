namespace Pictures.Core.DTOs
{
    public class AlbumDto
    {
        public int AlbumId { get; set; }
        public int UserId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Created_at { get; set; }//תאריך יצירה
        public DateTime Updated_at { get; set; }//תאריך עדכון אחרון של האלבום
    }
}
