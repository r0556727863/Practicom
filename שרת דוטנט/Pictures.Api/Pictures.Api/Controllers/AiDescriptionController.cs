using Microsoft.AspNetCore.Mvc;
using Pictures.Core.DTOs;
using Pictures.Core.Services;

namespace Pictures.Api.Controllers
{
    //[ApiController]
    //[Route("api/[controller]")]
    //public class AiDescriptionController : ControllerBase
    //{
    //    private readonly ITextGeneratorService _textGenerator;

    //    public AiDescriptionController(ITextGeneratorService textGenerator)
    //    {
    //        _textGenerator = textGenerator;
    //    }

    //    [HttpPost("aidescription")]

    //    public async Task<IActionResult> Generate([FromBody] HuggingFaceRequest request)
    //    {
    //        try
    //        {
    //            var result = await _textGenerator.GenerateTextAsync(request.GeneratedText);
    //            return Ok(new { description = result });
    //        }
    //        catch (Exception ex)
    //        {
    //            return StatusCode(500, $"AI error: {ex.Message}");
    //        }
    //    }
    //}
    [ApiController]
    [Route("api/[controller]")]
    public class AiDescriptionController : ControllerBase
    {
        private readonly ITextGeneratorService _textGenerator;

        public AiDescriptionController(ITextGeneratorService textGenerator)
        {
            _textGenerator = textGenerator;
        }

        // 🖼 תיאור לתמונה
        [HttpPost("describe")]
        public async Task<IActionResult> DescribeImage([FromBody] HuggingFaceRequest request)
        {
            try
            {
                var result = await _textGenerator.GenerateImageDescriptionAsync(request.GeneratedText);
                return Ok(new { description = result });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"AI error (describe): {ex.Message}");
            }
        }

        // 🤖 מענה לשאלות כלליות
        [HttpPost("chat")]
        public async Task<IActionResult> Chat([FromBody] HuggingFaceRequest request)
        {
            try
            {
                var result = await _textGenerator.AnswerUserQuestionAsync(request.GeneratedText);
                return Ok(new { answer = result });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"AI error (chat): {ex.Message}");
            }
        }
    }

}
