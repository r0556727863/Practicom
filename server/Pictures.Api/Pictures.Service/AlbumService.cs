using Pictures.Core.DTOs;
using Pictures.Core.Models;
using Pictures.Core.Repositories;
using Pictures.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pictures.Service
{
    public class AlbumService:IAlbumService
    {
        private readonly IManagerRepository _albumRepository;
        public AlbumService(IManagerRepository albumRepository)
        {
            _albumRepository = albumRepository;
        }
        public async Task<List<Album>> GetAllAlbumAsync()
        {
            //return await Task.Run(() => _albumRepository.Albums.GetListAlbumAsync());
            return await _albumRepository.Albums.GetListAlbumAsync();

        }
        public async Task<Album?> GetAlbumByIdAsync(int id)
        {
            //return await Task.Run(() => _albumRepository.Albums.SearchAlbumIdAsync(id));
            return await _albumRepository.Albums.SearchAlbumIdAsync(id);

        }
        public async Task<Album> AddAlbumAsync(Album album)
        {
            var createAlbum = await _albumRepository.Albums.AddAlbumAsync(album);
            await _albumRepository.SaveAsync();
            return createAlbum;
        }

        public async Task<Album> UpdateAlbumAsync(int id, Album album)
        {
            var UpdateAlbum = await _albumRepository.Albums.PutAlbumAsync(id, album);
            await _albumRepository.SaveAsync();
            return UpdateAlbum;
        }

        public async Task DeleteAlbumAsync(int id)
        {
            await _albumRepository.Albums.DeleteAlbumAsync(id);
            await _albumRepository.SaveAsync();
        }

        public async Task<List<AlbumsPerMonthDto>> GetAlbumsPerMonthAsync()
        {
            return await _albumRepository.Albums.GetAlbumsCountPerMonthAsync();
        }

    }
}
