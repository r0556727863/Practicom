using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pictures.Core.Models
{
    public class Roles
    {
        public int Id { get; set; }
        public string RoleName { get; set; }
        public string RoleDescription { get; set; }
        public DateTime Created_at { get; set; }
        public DateTime Update_at { get; set; }
        public List<User> Users { get; set; } // משתמשים עם תפקיד זה
        public List<Permissions> Permissions { get; set; } // הרשאות הקשורות לתפקיד
        public Roles()
        {
            
        }

        public Roles(int id, string roleName, string roleDescription, DateTime createdAt, DateTime updateAt)
        {
            Id = id;
            RoleName = roleName;
            RoleDescription = roleDescription;
            Created_at = createdAt;
            Update_at = updateAt;
        }


    }
}
