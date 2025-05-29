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
    public class PhotoService : IPhotoService
    {
        private readonly IManagerRepository _photoRepository;
        public PhotoService(IManagerRepository photoRepository)
        {
            _photoRepository = photoRepository;
        }
        public async Task<List<Photo>> GetAllPhotoAsync()
        {
            //return await Task.Run(() => _photoRepository.Photos.GetListPhotoAsync());
            return await _photoRepository.Photos.GetListPhotoAsync();

        }
        public async Task<Photo?> GetPhotoByIdAsync(int id)
        {
            //return await Task.Run(() => _photoRepository.Photos.SearchPhotoIdAsync(id));
            return await _photoRepository.Photos.SearchPhotoIdAsync(id);

        }
        public async Task<Photo> AddPhotoAsync(Photo photo)
        {
            var createPhoto = await _photoRepository.Photos.AddPhotoAsync(photo);
            await _photoRepository.SaveAsync();
            return createPhoto;
        }

        public async Task<Photo> UpdatePhotoAsync(int id, Photo photo)
        {
            var UpdatePhoto = await _photoRepository.Photos.PutPhotoAsync(id, photo);
            await _photoRepository.SaveAsync();
            return UpdatePhoto;
        }

        public async Task DeletePhotoAsync(int id)
        {
            await _photoRepository.Photos.DeletePhotoAsync(id);
            await _photoRepository.SaveAsync();
        }
    }
}
