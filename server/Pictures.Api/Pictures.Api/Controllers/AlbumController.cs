//using Amazon.S3;
//using Amazon.S3.Model;
//using AutoMapper;
//using Microsoft.AspNetCore.Mvc;
//using Pictures.Api.Models;
//using Pictures.Core.DTOs;
//using Pictures.Core.Models;
//using Pictures.Core.Services;
//using Pictures.Service;
//using PutObjectRequest = Amazon.S3.Model.PutObjectRequest;

//// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

//namespace Pictures.Api.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class AlbumController : ControllerBase
//    {
//        private readonly IAlbumService _albumService;
//        private readonly IMapper _mapper;
//        private readonly IAmazonS3 _s3Client;
//        private readonly string _bucketName;

//        public AlbumController(IAlbumService albumService, IMapper mapper, IAmazonS3 s3Client, IConfiguration configuration)
//        {
//            _albumService = albumService;
//            _mapper = mapper;
//            _s3Client = s3Client;
//            _bucketName = configuration["AWS:BucketName"]; 
//        }

//        [HttpGet]
//        public async Task<IEnumerable<AlbumDto>> Get()
//        {
//            var albums = await _albumService.GetAllAlbumAsync();
//            return _mapper.Map<IEnumerable<AlbumDto>>(albums);
//        }

//        // GET api/<AlbumController>/5
//        [HttpGet("{id}")]
//        public async Task<ActionResult<AlbumDto>> Get(int id)
//        {
//            var album = await _albumService.GetAlbumByIdAsync(id);
//            var albumDto = _mapper.Map<AlbumDto>(album);
//            return Ok(albumDto);
//        }

//        [HttpPost("album")]
//        public async Task<ActionResult<AlbumDto>> Post([FromBody] AlbumPostModel albumPostModel)
//        {

//            if (albumPostModel == null)
//                return BadRequest("Album cannot be null.");

//            var album = _mapper.Map<Album>(albumPostModel);
//            var createdAlbum = await _albumService.AddAlbumAsync(album);
//            var createdAlbumDto = _mapper.Map<AlbumDto>(createdAlbum);

//            // הוספת לוגיקה ליצירת תיקיה ב-S3
//            var albumFolder = $"{createdAlbumDto.Title}/"; // תיקיית האלבום
//            var request = new PutObjectRequest
//            {
//                BucketName = _bucketName,
//                Key = albumFolder,
//                ContentBody = "", // תוכן ריק כדי ליצור את התיקיה
//                ContentType = "application/x-directory" // סוג תוכן של תיקיה
//            };

//            try
//            {
//                await _s3Client.PutObjectAsync(request);
//            }
//            catch (Exception ex)
//            {
//                return StatusCode(500, $"Error creating album folder: {ex.Message}");
//            }

//            return CreatedAtAction(nameof(Get), new { id = createdAlbumDto.AlbumId }, createdAlbumDto);
//        }


//        //PUT api/<AlbumController>/5
//        [HttpPut("{id}")]
//        public async Task<IActionResult> Put(int id, [FromBody] AlbumPostModel albumPostModel)
//        {
//            if (albumPostModel == null)
//                return BadRequest("Album cannot be null.");

//            var album = _mapper.Map<Album>(albumPostModel);
//            var updatedAlbum = await _albumService.UpdateAlbumAsync(id, album);
//            if (updatedAlbum == null)
//                return NotFound();

//            return NoContent();
//        }
//        //[HttpPut("{id}")]
//        //public async Task<IActionResult> Put(int id, [FromBody] AlbumPostModel albumPostModel)
//        //{
//        //    if (albumPostModel == null)
//        //        return BadRequest("Album cannot be null.");

//        //    // קבלת האלבום הקיים כדי לשמור את השם הקודם
//        //    var existingAlbum = await _albumService.GetAlbumByIdAsync(id);
//        //    if (existingAlbum == null)
//        //        return NotFound();

//        //    var album = _mapper.Map<Album>(albumPostModel);
//        //    var updatedAlbum = await _albumService.UpdateAlbumAsync(id, album);
//        //    if (updatedAlbum == null)
//        //        return NotFound();

//        //    // לוגיקה לשינוי שם תיקיה ב-S3
//        //    var oldAlbumFolder = $"{existingAlbum.Title}/"; // השם הקודם של התיקיה
//        //    var newAlbumFolder = $"{updatedAlbum.Title}/"; // השם החדש של התיקיה

//        //    // מחיקת התיקיה הישנה
//        //    try
//        //    {
//        //        var deleteRequest = new Amazon.S3.Model.DeleteObjectRequest
//        //        {
//        //            BucketName = _bucketName,
//        //            Key = oldAlbumFolder
//        //        };
//        //        await _s3Client.DeleteObjectAsync(deleteRequest);
//        //    }
//        //    catch (Exception ex)
//        //    {
//        //        return StatusCode(500, $"Error deleting old album folder in AWS: {ex.Message}");
//        //    }

//        //    // יצירת תיקיה חדשה עם השם החדש
//        //    var request = new PutObjectRequest
//        //    {
//        //        BucketName = _bucketName,
//        //        Key = newAlbumFolder,
//        //        ContentBody = "", // תוכן ריק כדי ליצור את התיקיה
//        //        ContentType = "application/x-directory" // סוג תוכן של תיקיה
//        //    };

//        //    try
//        //    {
//        //        await _s3Client.PutObjectAsync(request);
//        //    }
//        //    catch (Exception ex)
//        //    {
//        //        return StatusCode(500, $"Error creating new album folder in AWS: {ex.Message}");
//        //    }

//        //    return NoContent();
//        //}



//        // DELETE api/<AlbumController>/5
//        [HttpDelete("{id}")]
//        public async Task<IActionResult> Delete(int id)
//        {
//            await _albumService.DeleteAlbumAsync(id);
//            return NoContent();
//        }
//    }
//}

using Amazon.S3;
using Amazon.S3.Model;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Pictures.Api.Models;
using Pictures.Core.DTOs;
using Pictures.Core.Models;
using Pictures.Core.Services;
using PutObjectRequest = Amazon.S3.Model.PutObjectRequest;

namespace Pictures.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlbumController : ControllerBase
    {
        private readonly IAlbumService _albumService;
        private readonly IMapper _mapper;
        private readonly IAmazonS3 _s3Client;
        private readonly string _bucketName;

        public AlbumController(IAlbumService albumService, IMapper mapper, IAmazonS3 s3Client, IConfiguration configuration)
        {
            _albumService = albumService;
            _mapper = mapper;
            _s3Client = s3Client;
            _bucketName = configuration["AWS:BucketName"];
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AlbumDto>>> Get()
        {
            try
            {
                var albums = await _albumService.GetAllAlbumAsync();
                return Ok(_mapper.Map<IEnumerable<AlbumDto>>(albums));
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"שגיאת שרת: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AlbumDto>> Get(int id)
        {
            try
            {
                var album = await _albumService.GetAlbumByIdAsync(id);
                if (album == null)
                {
                    return NotFound($"אלבום עם מזהה {id} לא נמצא");
                }
                var albumDto = _mapper.Map<AlbumDto>(album);
                return Ok(albumDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"שגיאת שרת: {ex.Message}");
            }
        }

        [HttpPost("album")]
        public async Task<ActionResult<AlbumDto>> Post([FromBody] AlbumPostModel albumPostModel)
        {
            try
            {
                if (albumPostModel == null)
                    return BadRequest("Album cannot be null.");

                var album = _mapper.Map<Album>(albumPostModel);
                var createdAlbum = await _albumService.AddAlbumAsync(album);
                var createdAlbumDto = _mapper.Map<AlbumDto>(createdAlbum);

                // הוספת לוגיקה ליצירת תיקיה ב-S3
                var albumFolder = $"{createdAlbumDto.AlbumId}/"; // תיקיית האלבום
                var request = new PutObjectRequest
                {
                    BucketName = _bucketName,
                    Key = albumFolder,
                    ContentBody = "", // תוכן ריק כדי ליצור את התיקיה
                    ContentType = "application/x-directory" // סוג תוכן של תיקיה
                };

                await _s3Client.PutObjectAsync(request);

                return CreatedAtAction(nameof(Get), new { id = createdAlbumDto.AlbumId }, createdAlbumDto);
            }
            catch (AmazonS3Exception ex)
            {
                return StatusCode(500, $"שגיאת S3: {ex.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"שגיאת שרת: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] AlbumPostModel albumPostModel)
        {
            try
            {
                if (albumPostModel == null)
                    return BadRequest("Album cannot be null.");

                var album = _mapper.Map<Album>(albumPostModel);
                var updatedAlbum = await _albumService.UpdateAlbumAsync(id, album);
                if (updatedAlbum == null)
                    return NotFound();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"שגיאת שרת: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await _albumService.DeleteAlbumAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"שגיאת שרת: {ex.Message}");
            }
        }

        [HttpGet("albums-per-month")]
        public async Task<IActionResult> GetAlbumsPerMonth()
        {
            var result = await _albumService.GetAlbumsPerMonthAsync();
            return Ok(result);
        }

    }
}