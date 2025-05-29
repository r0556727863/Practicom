using Pictures.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pictures.Core.Services
{
    public interface IAlbumService
    {
        Task<List<Album>> GetAllAlbumAsync();
        Task<Album?> GetAlbumByIdAsync(int id);
        Task<Album> AddAlbumAsync(Album value);
        Task<Album> UpdateAlbumAsync(int id, Album value);
        Task DeleteAlbumAsync(int id);
    }
}
