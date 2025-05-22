//using Microsoft.Extensions.Configuration;
//using OpenAI.Chat;
//using OpenAI.Interfaces;
//using OpenAI.Managers;
//using OpenAI.ObjectModels;
//using OpenAI.ObjectModels.RequestModels;
//using Pictures.Core.Services;

//namespace Pictures.Service.Services
//{
//    public class AiService : IAiService
//    {
//        private readonly IOpenAIService _openAiService;

//        public AiService(IConfiguration configuration)
//        {
//            var apiKey = configuration["OpenAI:ApiKey"];
//            _openAiService = new OpenAIService(new OpenAI.OpenAiOptions
//            {
//                ApiKey = apiKey
//            });

//        }

//        public async Task<string> GenerateTextAsync(string prompt)
//        {
//            var chatRequest = new ChatCompletionCreateRequest
//            {
//                Messages = new List<ChatMessage>
//                {
//                    ChatMessage.FromSystem("You are a helpful assistant."),
//                    ChatMessage.FromUser(prompt)
//                },
//                Model = Models.Gpt_3_5_Turbo,
//                MaxTokens = 200
//            };

//            var response = await _openAiService.ChatCompletion.CreateCompletion(chatRequest);

//            if (response.Successful)
//                return response.Choices.First().Message.Content;

//            return $"Error: {response.Error?.Message}";
//        }
//    }
//}
