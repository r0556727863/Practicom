using Pictures.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace Pictures.Data.Repositories
{
    public class ManagerRepository: IManagerRepository
    {
        private readonly DataContext _context;
        public IUserRepository Users { get; }
        public IPhotoRepository Photos { get; }
        public IAlbumRepository Albums { get; }

        public ManagerRepository(DataContext context, IUserRepository userRepository, IPhotoRepository photoRepository, IAlbumRepository albumRepository)
        {
            _context = context;
            Users = userRepository;
            Photos = photoRepository;
            Albums = albumRepository;
        }

        public async Task SaveAsync()
        {
           await _context.SaveChangesAsync();
        }
    }
}
