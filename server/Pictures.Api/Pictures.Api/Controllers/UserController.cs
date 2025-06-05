using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Pictures.Api.Models;
using Pictures.Core;
using Pictures.Core.DTOs;
using Pictures.Core.Models;
using Pictures.Core.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Pictures.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;
        public UserController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }
        // GET: api/<UserController>
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> Get()
        {
            var list =await _userService.GetAllAsync();
            var listDto = _mapper.Map<IEnumerable<UserDto>>(list);
            return Ok(listDto);
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> Get(int id)
        {
            var user =await _userService.GetByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            var userDto = _mapper.Map<UserDto>(user);
            return Ok(userDto);
        }

        // POST api/<UserController>
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Post([FromBody] UserPostModel user)
        {
            var userToAdd = new User { Email = user.Email, PassWord = user.PassWord, Phone = user.Phone, UserName = user.UserName };
            await _userService.AddValueAsync(userToAdd);

            var newUserDto = _mapper.Map<UserDto>(userToAdd); // מיפוי ל-DTO
            return CreatedAtAction(nameof(Get), new { id = userToAdd.UserId }, newUserDto);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<UserDto>> Put(int id, [FromBody] UserPostModel user)
        {
            var userToAdd = new User {UserId=id,Email = user.Email, PassWord = user.PassWord, Phone = user.Phone, UserName = user.UserName };
            var updatedUser =await _userService.PutValueAsync(id, userToAdd);
            return Ok(updatedUser);
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            await _userService.DeleteAsync(id);
            return NoContent(); // מחזיר 204 No Content
        }

    }
}
