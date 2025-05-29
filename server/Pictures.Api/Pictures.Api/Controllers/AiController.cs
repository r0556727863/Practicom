//using Microsoft.AspNetCore.Mvc;
//using Pictures.Core.Services;

//namespace Pictures.Api.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class AiController : ControllerBase
//    {
//        private readonly IAiService _aiService;

//        public AiController(IAiService aiService)
//        {
//            _aiService = aiService;
//        }

//        [HttpPost("generate")]
//        public async Task<IActionResult> GenerateText([FromBody] string prompt)
//        {
//            var result = await _aiService.GenerateTextAsync(prompt);
//            return Ok(result);
//        }
//    }
//}
