using Pictures.Core.Models;
using Pictures.Core.Repositories;
using Pictures.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;


namespace Pictures.Service
{
    public class UserService : IUserService
    {
        private readonly IManagerRepository _userRepository;
        public UserService(IManagerRepository userRepository)
        {
            _userRepository = userRepository;
        }
        public async Task<IEnumerable<User>> GetAllAsync()
        {
            //return await Task.Run(() => _userRepository.Users.GetListAsync());
            return await _userRepository.Users.GetListAsync();

        }
        public async Task<User?> GetByIdAsync(int id)
        {
            return await _userRepository.Users.SearchIdAsync(id);
        }
        public async Task<User> AddValueAsync(User user)
        {
            var createUser=await _userRepository.Users.AddValAsync(user);
            await _userRepository.SaveAsync();
            return createUser;
        }
        //public async Task<User> LoginAsync(Login login)
        //{
        //    var user = await _userRepository.Users.LoginAsync(login);
        //    await _userRepository.Users.LoginAsync(login);
        //    await _userRepository.SaveAsync();
        //    return user;
        //}

        public async Task<User> PutValueAsync(int id, User user)
        {
            var UpdateUser = await _userRepository.Users.PutValAsync(id, user);
            await _userRepository.SaveAsync();
            return UpdateUser;
        }

        public async Task DeleteAsync(int id)
        {
            await _userRepository.Users.DeleteValAsync(id);
            await _userRepository.SaveAsync();
        }
    }
}
