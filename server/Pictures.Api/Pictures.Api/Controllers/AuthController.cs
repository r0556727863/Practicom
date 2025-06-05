using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Pictures.Core.Models;
using Pictures.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Pictures.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly DataContext _dataContext;

        public AuthController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel loginModel)
        {
            try
            {
                if (string.IsNullOrEmpty(loginModel.Email) || string.IsNullOrEmpty(loginModel.Password))
                {
                    return BadRequest("Email and password must not be empty.");
                }

                var user = await _dataContext.Users.FirstOrDefaultAsync(u => u.Email == loginModel.Email);

                if (user != null && user.PassWord == loginModel.Password) // השוואת סיסמאות ללא Hash
                {
                    // ודא שה-Roles לא null
                    var roles = user.Roles?.Select(r => r.RoleName).ToArray() ?? new string[0]; // אם Roles null, תן מערך ריק
                    var token = CreateJWT(user, roles);
                    return Ok(new
                    {
                        Token = token,
                        User = new
                        {
                            Id = user.UserId,
                            userName = user.UserName,
                            email = user.Email,
                            phone = user.Phone
                        }
                    });
                }
                return Unauthorized();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"שגיאת שרת: {ex.Message}");
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] LoginModel loginModel)
        {
            try
            {
                if (string.IsNullOrEmpty(loginModel.Email) || string.IsNullOrEmpty(loginModel.Password))
                {
                    return BadRequest("Email and password must not be empty.");
                }

                var existingUser = await _dataContext.Users.FirstOrDefaultAsync(u => u.Email == loginModel.Email);
                if (existingUser != null)
                {
                    return Conflict("User already exists.");
                }

                // אין שימוש ב-HASH כאן
                var newUser = new User
                {
                    Email = loginModel.Email,
                    PassWord = loginModel.Password, // שמירת הסיסמה כפי שהיא
                    UserName = loginModel.Email.Split("@")[0],
                    Roles = new List<Roles> { new Roles { RoleName = "temp_user" } }
                };
                _dataContext.Users.Add(newUser);
                await _dataContext.SaveChangesAsync();

                var token = CreateJWT(newUser, new[] { "temp_user" });
                return Ok(new { Token = token });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"שגיאת שרת: {ex.Message}");
            }
        }

        private string CreateJWT(User user, string[] roles)
        {
            var jwtKey = Environment.GetEnvironmentVariable("JWT_KEY");
            var jwtIssuer = Environment.GetEnvironmentVariable("JWT_ISSUER");
            var jwtAudience = Environment.GetEnvironmentVariable("JWT_AUDIENCE");

            if (string.IsNullOrEmpty(jwtKey) || string.IsNullOrEmpty(jwtIssuer) || string.IsNullOrEmpty(jwtAudience))
            {
                throw new InvalidOperationException("מפתחות JWT חסרים בקובץ .env");
            }

            var claims = new List<Claim>
            {
                new Claim("id", user.UserId.ToString()),
                new Claim("name", user.UserName),
                new Claim("email", user.Email),
                new Claim("role", string.Join(",", roles))
            };

            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);
            var tokenOptions = new JwtSecurityToken(
                issuer: jwtIssuer,
                audience: jwtAudience,
                claims: claims,
                expires: DateTime.Now.AddDays(30),
                signingCredentials: signinCredentials
            );
            return new JwtSecurityTokenHandler().WriteToken(tokenOptions);
        }
    }

    public class LoginModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}