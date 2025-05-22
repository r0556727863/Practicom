using Pictures.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace Pictures.Core.Services
{
    public interface IUserService
    {
        Task<IEnumerable<User>> GetAllAsync();
        Task<User?> GetByIdAsync(int id);
        Task<User> AddValueAsync(User value);
        //Task<User> LoginAsync(Login login);
        Task<User> PutValueAsync(int id, User value);
        Task DeleteAsync(int id);
    }
}
