using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pictures.Api.Models;
using Pictures.Core.DTOs;
using Pictures.Core.Models;
using Pictures.Core.Services;
using Pictures.Service;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Pictures.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PhotoController : ControllerBase
    {
        private readonly IPhotoService _photoService;
        private readonly IMapper _mapper;

        public PhotoController(IPhotoService photoService, IMapper mapper)
        {
            _photoService = photoService;
            _mapper = mapper;
        }

        // GET: api/<UserController>
        [HttpGet]
        public async Task<IEnumerable<PhotoDto>> Get()
        {
            var list = await _photoService.GetAllPhotoAsync();
            return _mapper.Map<IEnumerable<PhotoDto>>(list);
        }

        // GET api/<PhotoController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PhotoDto>> Get(int id)
        {
            var photo = await _photoService.GetPhotoByIdAsync(id);
            var photoDto = _mapper.Map<PhotoDto>(photo);
            return Ok(photoDto);
        }

        [HttpPost("photo")]
        public async Task<ActionResult<PhotoDto>> Post([FromBody] PhotoPostModel photoPostModel)
        {
            if (photoPostModel == null)
                return BadRequest("Photo cannot be null.");

            // אפשר לבדוק שדות נוספים כאן
            if (string.IsNullOrEmpty(photoPostModel.Title) || photoPostModel.AlbumId <= 0)
                return BadRequest("Invalid photo data.");
            var photo = _mapper.Map<Photo>(photoPostModel); // המרת PhotoPostModel ל-Photo
            try
            {
                var createdPhoto = await _photoService.AddPhotoAsync(photo);
                var createdPhotoDto = _mapper.Map<PhotoDto>(createdPhoto); // המרת Photo ל-PhotoDto
                return CreatedAtAction(nameof(Get), new { id = createdPhotoDto.PhotoId }, createdPhotoDto);
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, "Error saving photo: " + ex.Message);
            }
        }


        // PUT api/<PhotoController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<PhotoDto>> Put(int id, [FromBody] PhotoPostModel photoPostModel)
        {
            if (photoPostModel == null)
                return BadRequest("Photo cannot be null.");

            var photo = _mapper.Map<Photo>(photoPostModel); // המרת PhotoPostModel ל-Photo

            var updatedPhoto = await _photoService.UpdatePhotoAsync(id, photo);
            if (updatedPhoto == null)
                return NotFound();

            return Ok(updatedPhoto);
        }

        // DELETE api/<PhotoController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _photoService.DeletePhotoAsync(id);
            return NoContent(); // מחזיר 204 No Content
        }
    }
}
