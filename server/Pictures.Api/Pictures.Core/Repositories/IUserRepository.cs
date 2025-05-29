using Pictures.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace Pictures.Core.Repositories
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetListAsync();
        Task<User?> SearchIdAsync(int id);
        Task<User> AddValAsync(User user);
        Task<User> PutValAsync(int id, User user);
        Task DeleteValAsync(int id);

    }
}
