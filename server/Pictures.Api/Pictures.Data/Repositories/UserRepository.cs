using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Pictures.Core.Models;
using Pictures.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Reflection.Metadata;
using System.Runtime.InteropServices.Marshalling;
using System.Text;
using System.Threading.Tasks;

namespace Pictures.Data.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        public UserRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<User>> GetListAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User?> SearchIdAsync(int id)
        {
            return await _context.Users.FirstOrDefaultAsync(x => x.UserId == id);

        }

        public async Task<User> AddValAsync(User user)
        {
           await _context.Users.AddAsync(user);
            return user;
        }

        //public async Task<User> LoginAsync(Login login)
        //{
        //    var user = _context.Users.FirstOrDefault(x => x.Email == login.Email && x.PassWord == login.PassWord);
        //    if (user is null)
        //    {
        //        throw new Exception("User not found");
        //    }
        //    return user;
        //}

        public async Task<User> PutValAsync(int id, User user)
        {
        
            var existUser =await SearchIdAsync(id);
            existUser.Phone = user.Phone;
            existUser.Email = user.Email;
            existUser.PassWord = user.PassWord;
            existUser.UserName = user.UserName;

            return existUser;

        }

        public async Task DeleteValAsync(int id)
        {
            var existingUser = await SearchIdAsync(id);
            if (existingUser is not null)
            {
                _context.Users.Remove(existingUser);
            }
        }
    }
}
