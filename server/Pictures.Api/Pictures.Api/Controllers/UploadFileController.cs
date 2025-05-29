//using Amazon.S3;
//using Amazon.S3.Model;
//using Microsoft.AspNetCore.Mvc;

////// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

//namespace Pictures.Api.Controllers
//{
//    [Route("api/UploadFile")]
//    [ApiController]
//    public class UploadFileController : ControllerBase
//    {
//        private readonly IAmazonS3 _s3Client;
//        private readonly string _bucketName;

//        public UploadFileController(IAmazonS3 s3Client, IConfiguration configuration)
//        {
//            _s3Client = s3Client;
//            _bucketName = configuration["AWS:BucketName"];
//        }

//        [HttpGet("presigned-url")]
//        public async Task<IActionResult> GetPresignedUrl([FromQuery] string fileName, [FromQuery] string albumName)
//        {
//            if (string.IsNullOrEmpty(fileName) || string.IsNullOrEmpty(albumName))
//            {
//                fileName = "file";
//                albumName = "default-album"; // החלף בשם ברירת המחדל שתרצה
//            }
//            string fileExtension = Path.GetExtension(fileName).ToLower();
//            string contentType;

//            switch (fileExtension)
//            {
//                case ".jpg":
//                case ".jpeg":
//                    contentType = "image/jpeg";
//                    break;
//                case ".png":
//                    contentType = "image/png";
//                    break;
//                default:
//                    contentType = "application/octet-stream"; // סוג ברירת מחדל
//                    break;
//            }

//            var request = new GetPreSignedUrlRequest
//            {
//                BucketName = _bucketName,
//                Key = $"{albumName}/{fileName}",
//                Verb = HttpVerb.PUT,
//                Expires = DateTime.UtcNow.AddMinutes(10),
//                ContentType = contentType
//            };


//            //var request = new GetPreSignedUrlRequest
//            //{
//            //    BucketName = _bucketName,
//            //    Key = $"{albumName}/{fileName}", // קבצים נשמרים בתיקיית האלבום
//            //    Verb = HttpVerb.PUT,
//            //    Expires = DateTime.UtcNow.AddMinutes(10),
//            //    ContentType = "image/jpeg"
//            //};

//            request.Headers["x-amz-acl"] = "bucket-owner-full-control";

//            try
//            {

//                string url = _s3Client.GetPreSignedURL(request);
//                string fileUrl = $"https://{_bucketName}.s3.eu-north-1.amazonaws.com/{albumName}/{fileName}"; // URL להורדת התמונה

//                return Ok(new { uploadUrl = url, fileUrl = fileUrl });
//            }
//            catch (AmazonS3Exception ex)
//            {
//                return StatusCode(500, $"שגיאה ביצירת URL עם הרשאות: {ex.Message}");
//            }
//        }
//    }
//}

using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Mvc;

namespace Pictures.Api.Controllers
{
    [Route("api/UploadFile")]
    [ApiController]
    public class UploadFileController : ControllerBase
    {
        private readonly IAmazonS3 _s3Client;
        private readonly string _bucketName;

        public UploadFileController(IAmazonS3 s3Client, IConfiguration configuration)
        {
            _s3Client = s3Client;
            _bucketName = configuration["AWS:BucketName"];
        }

        [HttpGet("presigned-url")]
        public async Task<IActionResult> GetPresignedUrl([FromQuery] string fileName, [FromQuery] string albumName)
        {
            try
            {
                if (string.IsNullOrEmpty(fileName) || string.IsNullOrEmpty(albumName))
                {
                    fileName = "file";
                    albumName = "default-album"; // החלף בשם ברירת המחדל שתרצה
                }
                string fileExtension = Path.GetExtension(fileName).ToLower();
                string contentType;

                switch (fileExtension)
                {
                    case ".jpg":
                    case ".jpeg":
                        contentType = "image/jpeg";
                        break;
                    case ".png":
                        contentType = "image/png";
                        break;
                    default:
                        contentType = "application/octet-stream"; // סוג ברירת מחדל
                        break;
                }

                var request = new GetPreSignedUrlRequest
                {
                    BucketName = _bucketName,
                    Key = $"{albumName}/{fileName}",
                    Verb = HttpVerb.PUT,
                    Expires = DateTime.UtcNow.AddMinutes(10),
                    ContentType = contentType
                };

                request.Headers["x-amz-acl"] = "bucket-owner-full-control";

                string url = _s3Client.GetPreSignedURL(request);
                string fileUrl = $"https://{_bucketName}.s3.eu-north-1.amazonaws.com/{albumName}/{fileName}"; // URL להורדת התמונה

                return Ok(new { uploadUrl = url, fileUrl = fileUrl });
            }
            catch (AmazonS3Exception ex)
            {
                return StatusCode(500, $"שגיאה ביצירת URL עם הרשאות: {ex.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"שגיאה כללית: {ex.Message}");
            }
        }
    }
}