using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO.Compression;
using System.Net.Http;
using System.Threading.Tasks;

namespace Pictures.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DownloadController : ControllerBase
    {
        private readonly HttpClient _httpClient;

        public DownloadController()
        {
            _httpClient = new HttpClient();
        }

        [HttpGet("image")]
        public async Task<IActionResult> DownloadImage([FromQuery] string url, [FromQuery] string filename)
        {
            try
            {
                // וידוא שה-URL תקין
                if (string.IsNullOrEmpty(url) || !Uri.TryCreate(url, UriKind.Absolute, out Uri uri))
                {
                    return BadRequest("URL לא תקין");
                }

                // וידוא שה-URL מגיע מהמקור הנכון (S3)
                if (!uri.Host.Contains("albumspictures.s3"))
                {
                    return BadRequest("מקור לא מורשה");
                }

                // הורדת התמונה מ-S3
                var response = await _httpClient.GetAsync(uri);

                if (!response.IsSuccessStatusCode)
                {
                    return StatusCode((int)response.StatusCode, "שגיאה בהורדת התמונה");
                }

                // קבלת התוכן כמערך בייטים
                var imageBytes = await response.Content.ReadAsByteArrayAsync();

                // קביעת סוג התוכן לפי סיומת הקובץ
                string contentType = "application/octet-stream";
                if (filename != null)
                {
                    if (filename.EndsWith(".jpg") || filename.EndsWith(".jpeg"))
                        contentType = "image/jpeg";
                    else if (filename.EndsWith(".png"))
                        contentType = "image/png";
                    else if (filename.EndsWith(".gif"))
                        contentType = "image/gif";
                }

                // החזרת התמונה כקובץ להורדה
                return File(imageBytes, contentType, filename ?? "image.jpg");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"שגיאת שרת: {ex.Message}");
            }
        }

        [HttpPost("slideshow")]
        public async Task<IActionResult> DownloadSlideshow([FromBody] List<SlideImage> images, [FromQuery] string albumName = "slideshow")
        {
            try
            {
                if (images == null || images.Count == 0)
                {
                    return BadRequest("לא נשלחו תמונות להורדה");
                }

                // יצירת קובץ ZIP זמני
                var tempZipPath = Path.GetTempFileName();

                using (var zipArchive = ZipFile.Open(tempZipPath, ZipArchiveMode.Create))
                {
                    int imageIndex = 1;
                    foreach (var image in images)
                    {
                        // וידוא שה-URL תקין
                        if (string.IsNullOrEmpty(image.Url) || !Uri.TryCreate(image.Url, UriKind.Absolute, out Uri uri))
                        {
                            continue; // דילוג על תמונות לא תקינות
                        }

                        try
                        {
                            // הורדת התמונה
                            var response = await _httpClient.GetAsync(uri);
                            if (!response.IsSuccessStatusCode)
                            {
                                continue; // דילוג על תמונות שלא ניתן להוריד
                            }

                            // קבלת התוכן כמערך בייטים
                            var imageBytes = await response.Content.ReadAsByteArrayAsync();

                            // קביעת שם הקובץ בארכיון
                            string filename = !string.IsNullOrEmpty(image.Title) ?
                                              image.Title :
                                              $"image_{imageIndex}.jpg";

                            // הוספת התמונה לארכיון
                            var entry = zipArchive.CreateEntry(filename, CompressionLevel.Optimal);
                            using (var entryStream = entry.Open())
                            {
                                await entryStream.WriteAsync(imageBytes, 0, imageBytes.Length);
                            }
                        }
                        catch
                        {
                            // דילוג על תמונות שגורמות לשגיאה
                            continue;
                        }

                        imageIndex++;
                    }
                }

                // קריאת הקובץ לזיכרון
                var zipBytes = System.IO.File.ReadAllBytes(tempZipPath);

                // ניקוי הקובץ הזמני
                System.IO.File.Delete(tempZipPath);

                // החזרת הקובץ כתשובה
                return File(zipBytes, "application/zip", $"{albumName}.zip");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"שגיאת שרת: {ex.Message}");
            }
        }
    }

    public class SlideImage
    {
        public string Url { get; set; }
        public string Title { get; set; }
    }
}
