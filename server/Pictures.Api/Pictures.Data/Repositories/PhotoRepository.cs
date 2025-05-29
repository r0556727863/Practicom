using Microsoft.EntityFrameworkCore;
using Pictures.Core.DTOs;
using Pictures.Core.Models;
using Pictures.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pictures.Data.Repositories
{
    public class PhotoRepository : IPhotoRepository
    {
        private readonly DataContext _context;

        public PhotoRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<List<Photo>> GetListPhotoAsync()
        {
            return await _context.Photos.ToListAsync();
        }

        public async Task<Photo?> SearchPhotoIdAsync(int id)
        {
            return await _context.Photos.FirstOrDefaultAsync(x => x.PhotoId == id);

        }

        public async Task<Photo> AddPhotoAsync(Photo photo)
        {
            await _context.Photos.AddAsync(photo);
            return photo;
        }


        public async Task<Photo> PutPhotoAsync(int id, Photo photo)
        {
            var existingPhoto = await SearchPhotoIdAsync(id);
            if (existingPhoto is null)
            {
                throw new Exception("Photo not found");
            }
            existingPhoto.AlbumId = photo.AlbumId;
            existingPhoto.AlbumId = photo.AlbumId;
            existingPhoto.Url = photo.Url;
            existingPhoto.Title = photo.Title;
            existingPhoto.Created_at = photo.Created_at;
            existingPhoto.Updated_at = photo.Updated_at;

            return existingPhoto;
        }

        public async Task DeletePhotoAsync(int id)
        {

            var existingPhoto = await SearchPhotoIdAsync(id);
            if (existingPhoto is not null)
            {
                _context.Photos.Remove(existingPhoto);
            }
        }
    }
}
