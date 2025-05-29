using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pictures.Core.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string PassWord { get; set; }
        public List<Roles> Roles { get; set; } // תפקידים של המשתמש
        public List<Album> Albums { get; set; }

        public User()
        {
            
        }

        public User(int userId, string userName, string email, string phone, string passWord, List<Album> albums)
        {
            UserId = userId;
            UserName = userName;
            Email = email;
            Phone = phone;
            PassWord = passWord;
            Albums = albums;
        }
    }
}
