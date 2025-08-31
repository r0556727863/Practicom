using Microsoft.EntityFrameworkCore;
using Pictures.Core.Models;
using Pictures.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pictures.Data.Repositories
{
    public class AlbumRepository : IAlbumRepository
    {
        private readonly DataContext _context;

        public AlbumRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Album>> GetListAlbumAsync()
        {
            return await _context.Albums.ToListAsync();
        }

        public async Task<Album?> SearchAlbumIdAsync(int id)
        {
            return await _context.Albums.FirstOrDefaultAsync(x => x.AlbumId == id);
        }

        public async Task<Album> AddAlbumAsync(Album album)
        {
            album.Created_at = DateTime.UtcNow;
            album.Updated_at = DateTime.UtcNow;

            await _context.Albums.AddAsync(album);
            return album;
        }


        public async Task<Album> PutAlbumAsync(int id, Album album)
        {
            var existingAlbum = await SearchAlbumIdAsync(id);
            if (existingAlbum is null)
            {
                throw new Exception("Album not found");
            }
            existingAlbum.Title = album.Title;
            existingAlbum.Description = album.Description;
            existingAlbum.Updated_at = DateTime.UtcNow;
            existingAlbum.Created_at = album.Created_at;

            return existingAlbum;
        }

        public async Task DeleteAlbumAsync(int id)
        {

            var existingAlbum = await SearchAlbumIdAsync(id);
            if (existingAlbum is not null)
            {
                _context.Albums.Remove(existingAlbum);
            }
        }

    }
}
