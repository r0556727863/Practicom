using Pictures.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Pictures.Core.Repositories
{
    public interface IPhotoRepository
    {
        Task<List<Photo>> GetListPhotoAsync();
        Task<Photo?> SearchPhotoIdAsync(int id);
        Task<Photo> AddPhotoAsync(Photo photo);
        Task<Photo> PutPhotoAsync(int id, Photo photo);
        Task DeletePhotoAsync(int id);

    }
}
