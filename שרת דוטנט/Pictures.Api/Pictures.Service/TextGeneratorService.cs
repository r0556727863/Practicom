////using Microsoft.Extensions.Configuration;
////using Newtonsoft.Json;
////using Pictures.Core.Services;
////using System;
////using System.Collections.Generic;
////using System.Linq;
////using System.Net.Http.Headers;
////using System.Text;
////using System.Threading.Tasks;

////namespace Pictures.Service
////{
////    public class TextGeneratorService : ITextGeneratorService
////    {
////        private readonly HttpClient _httpClient;
////        private readonly string _apiKeyOpenrouter;

////        public TextGeneratorService(HttpClient httpClient, IConfiguration configuration)
////        {
////            _httpClient = httpClient;
////            _apiKeyOpenrouter = configuration["OpenRouter:ApiKey"];
////        }

////        public async Task<string> GenerateTextAsync(string topic)
////        {
////            var payload = new
////            {
////                model = "openai/gpt-3.5-turbo",
////                messages = new[]
////                {
////new { role = "user", content = $"תאר בקצרה בעברית בלבד את המונח הבא, בלי לחזור עליו או להוסיף הסברים: {topic}"}
////            }
////            };

////            var json = JsonConvert.SerializeObject(payload);
////            var content = new StringContent(json, Encoding.UTF8, "application/json");

////            _httpClient.DefaultRequestHeaders.Clear();
////            _httpClient.DefaultRequestHeaders.Authorization =
////                new AuthenticationHeaderValue("Bearer", _apiKeyOpenrouter);
////            _httpClient.DefaultRequestHeaders.Add("X-Title", "my-dotnet-app");

////            var response = await _httpClient.PostAsync("https://openrouter.ai/api/v1/chat/completions", content);
////            response.EnsureSuccessStatusCode();

////            var responseString = await response.Content.ReadAsStringAsync();
////            dynamic result = JsonConvert.DeserializeObject(responseString);
////            string generated = result?.choices?[0]?.message?.content;

////            return generated ?? "No description generated.";
////        }
////    }

////}
//using Microsoft.Extensions.Configuration;
//using Newtonsoft.Json;
//using Pictures.Core.Services;
//using System;
//using System.Net.Http.Headers;
//using System.Text;
//using System.Threading.Tasks;

//namespace Pictures.Service
//{
//    public class TextGeneratorService : ITextGeneratorService
//    {
//        private readonly HttpClient _httpClient;
//        private readonly string _apiKeyOpenrouter;

//        public TextGeneratorService(HttpClient httpClient, IConfiguration configuration)
//        {
//            _httpClient = httpClient;
//            _apiKeyOpenrouter = configuration["OpenRouter:ApiKey"];
//        }

//        public async Task<string> GenerateTextAsync(string topic)
//        {
//            var payload = new
//            {
//                model = "openai/gpt-3.5-turbo",
//                messages = new[]
//                {
//                    new { role = "user", content = $"תאר בקצרה בעברית בלבד את המונח הבא, בלי לחזור עליו או להוסיף הסברים: {topic}" }
//                }
//            };

//            var json = JsonConvert.SerializeObject(payload);
//            var content = new StringContent(json, Encoding.UTF8, "application/json");

//            _httpClient.DefaultRequestHeaders.Clear();
//            _httpClient.DefaultRequestHeaders.Authorization =
//                new AuthenticationHeaderValue("Bearer", _apiKeyOpenrouter);
//            _httpClient.DefaultRequestHeaders.Add("X-Title", "my-dotnet-app");

//            try
//            {
//                var response = await _httpClient.PostAsync("https://openrouter.ai/api/v1/chat/completions", content);

//                if (!response.IsSuccessStatusCode)
//                {
//                    // אפשר ללוג פה או להחזיר הודעה מתאימה
//                    return $"Error: Received HTTP {response.StatusCode}";
//                }

//                var responseString = await response.Content.ReadAsStringAsync();
//                dynamic result = JsonConvert.DeserializeObject(responseString);
//                string generated = result?.choices?[0]?.message?.content;

//                return generated ?? "No description generated.";
//            }
//            catch (Exception ex)
//            {
//                // אפשר ללוג את השגיאה אם יש מערכת לוגינג
//                return $"Exception: {ex.Message}";
//            }
//        }
//    }
//}

using Newtonsoft.Json;
using Pictures.Core.Services;
using System.Net.Http.Headers;
using System.Text;

namespace Pictures.Service
{
    public class TextGeneratorService : ITextGeneratorService
    {
        private readonly HttpClient _httpClient;

        public TextGeneratorService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<string> GenerateTextAsync(string topic)
        {
            var apiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY");
            if (string.IsNullOrEmpty(apiKey))
            {
                return "שגיאה: מפתח API של OpenAI חסר בקובץ .env";
            }

            var payload = new
            {
                model = "openai/gpt-3.5-turbo",
                messages = new[]
                {
                    new { role = "user", content = $"תאר בקצרה בעברית בלבד את המונח הבא, בלי לחזור עליו או להוסיף הסברים: {topic}" }
                }
            };

            var json = JsonConvert.SerializeObject(payload);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            _httpClient.DefaultRequestHeaders.Clear();
            _httpClient.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", apiKey);
            _httpClient.DefaultRequestHeaders.Add("X-Title", "my-dotnet-app");

            try
            {
                var response = await _httpClient.PostAsync("https://openrouter.ai/api/v1/chat/completions", content);

                if (!response.IsSuccessStatusCode)
                {
                    return $"שגיאה: התקבל קוד HTTP {response.StatusCode}";
                }

                var responseString = await response.Content.ReadAsStringAsync();
                dynamic result = JsonConvert.DeserializeObject(responseString);
                string generated = result?.choices?[0]?.message?.content;

                return generated ?? "לא נוצר תיאור.";
            }
            catch (Exception ex)
            {
                return $"שגיאה: {ex.Message}";
            }
        }
    }
}