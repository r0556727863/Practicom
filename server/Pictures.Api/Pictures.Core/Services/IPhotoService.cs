using Pictures.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pictures.Core.Services
{
    public interface IPhotoService
    {
        Task<List<Photo>> GetAllPhotoAsync();
        Task<Photo?> GetPhotoByIdAsync(int id);
        Task<Photo> AddPhotoAsync(Photo value);
        Task<Photo> UpdatePhotoAsync(int id, Photo value);
        Task DeletePhotoAsync(int id);
    }
}
