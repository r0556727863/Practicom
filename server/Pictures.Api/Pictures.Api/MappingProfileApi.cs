using Amazon;
using Pictures.Api.Models;
using Pictures.Core.Models;
using AutoMapper;
using Profile = AutoMapper.Profile;


namespace Pictures.Api
{
    public class MappingProfileApi : Profile
    {
        public MappingProfileApi()
        {
            CreateMap<UserPostModel, User>().ReverseMap();
            CreateMap<AlbumPostModel, Album>().ReverseMap();
            CreateMap<PhotoPostModel, Photo>().ReverseMap();
        }      
    }
}
