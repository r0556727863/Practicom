////using Microsoft.Extensions.Configuration;
////using Microsoft.IdentityModel.Tokens;
////using System.IdentityModel.Tokens.Jwt;
////using System.Security.Claims;
////using System.Text;

////namespace Pictures.Service
////{
////    public class AuthService
////    {
////        private readonly IConfiguration _configuration;

////        public AuthService(IConfiguration configuration)
////        {
////            _configuration = configuration;
////        }

////        public string GenerateJwtToken(string username, string[] roles)
////        {
////            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
////            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

////            var claims = new List<Claim>
////        {
////            new Claim(ClaimTypes.Name, username)
////        };

////            // הוספת תפקידים כ-Claims
////            foreach (var role in roles)
////            {
////                claims.Add(new Claim(ClaimTypes.Role, role));
////            }

////            var token = new JwtSecurityToken(
////                issuer: _configuration["Jwt:Issuer"],
////                audience: _configuration["Jwt:Audience"],
////                claims: claims,
////                expires: DateTime.Now.AddMinutes(30),
////                signingCredentials: credentials
////            );

////            return new JwtSecurityTokenHandler().WriteToken(token);
////        }
////    }
////}
//using Microsoft.Extensions.Configuration;
//using Microsoft.IdentityModel.Tokens;
//using System.IdentityModel.Tokens.Jwt;
//using System.Security.Claims;
//using System.Text;

//namespace Pictures.Service
//{
//    public class AuthService
//    {
//        private readonly IConfiguration _configuration;

//        public AuthService(IConfiguration configuration)
//        {
//            _configuration = configuration;
//        }

//        public string GenerateJwtToken(string username, string[] roles)
//        {
//            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT_KEY"]));
//            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

//            var claims = new List<Claim>
//            {
//                new Claim(ClaimTypes.Name, username)
//            };

//            // הוספת תפקידים כ-Claims
//            foreach (var role in roles)
//            {
//                claims.Add(new Claim(ClaimTypes.Role, role));
//            }

//            var token = new JwtSecurityToken(
//                issuer: _configuration["JWT_ISSUER"],
//                audience: _configuration["JWT_AUDIENCE"],
//                claims: claims,
//                expires: DateTime.Now.AddMinutes(30),
//                signingCredentials: credentials
//            );

//            return new JwtSecurityTokenHandler().WriteToken(token);
//        }
//    }
//}


using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Pictures.Service
{
    public class AuthService
    {
        public string GenerateJwtToken(string username, string[] roles)
        {
            var jwtKey = Environment.GetEnvironmentVariable("JWT_KEY");
            var jwtIssuer = Environment.GetEnvironmentVariable("JWT_ISSUER");
            var jwtAudience = Environment.GetEnvironmentVariable("JWT_AUDIENCE");

            if (string.IsNullOrEmpty(jwtKey) || string.IsNullOrEmpty(jwtIssuer) || string.IsNullOrEmpty(jwtAudience))
            {
                throw new InvalidOperationException("מפתחות JWT חסרים בקובץ .env");
            }

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, username)
            };

            // הוספת תפקידים כ-Claims
            foreach (var role in roles)
            {
                claims.Add(new Claim(ClaimTypes.Role, role));
            }

            var token = new JwtSecurityToken(
                issuer: jwtIssuer,
                audience: jwtAudience,
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}