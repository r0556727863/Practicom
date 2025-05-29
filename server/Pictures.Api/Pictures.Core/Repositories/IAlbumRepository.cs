using Pictures.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pictures.Core.Repositories
{
    public interface IAlbumRepository
    {
        Task<List<Album>> GetListAlbumAsync();
        Task<Album?> SearchAlbumIdAsync(int id);
        Task<Album> AddAlbumAsync(Album album);
        Task<Album> PutAlbumAsync(int id, Album album);
        Task DeleteAlbumAsync(int id);
    }
}