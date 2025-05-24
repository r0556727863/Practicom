using Newtonsoft.Json;
using Pictures.Core.Services;
using System.Net.Http.Headers;
using System.Text;

namespace Pictures.Service
{
    //    public class TextGeneratorService : ITextGeneratorService
    //    {
    //        private readonly HttpClient _httpClient;

    //        public TextGeneratorService(HttpClient httpClient)
    //        {
    //            _httpClient = httpClient;
    //        }

    //        public async Task<string> GenerateTextAsync(string topic)
    //        {
    //            var apiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY");
    //            if (string.IsNullOrEmpty(apiKey))
    //            {
    //                return "שגיאה: מפתח API של OpenAI חסר בקובץ .env";
    //            }

    //            var payload = new
    //            {
    //                model = "openai/gpt-3.5-turbo",
    //                messages = new[]
    //                {
    //new { role = "user", content = $"כתוב משפט תיאורי קצר מאוד (עד 10 מילים) שמתאים לאלבום תמונות בשם \"{topic}\". אל תמציא תוכן. אל תוסיף מידע שלא קיים בשם האלבום. אל תשתמש בביטויים רגשיים או כללים." }
    //                }
    //            };

    //            var json = JsonConvert.SerializeObject(payload);
    //            var content = new StringContent(json, Encoding.UTF8, "application/json");

    //            _httpClient.DefaultRequestHeaders.Clear();
    //            _httpClient.DefaultRequestHeaders.Authorization =
    //                new AuthenticationHeaderValue("Bearer", apiKey);
    //            _httpClient.DefaultRequestHeaders.Add("X-Title", "my-dotnet-app");

    //            try
    //            {
    //                var response = await _httpClient.PostAsync("https://openrouter.ai/api/v1/chat/completions", content);

    //                if (!response.IsSuccessStatusCode)
    //                {
    //                    return $"שגיאה: התקבל קוד HTTP {response.StatusCode}";
    //                }

    //                var responseString = await response.Content.ReadAsStringAsync();
    //                dynamic result = JsonConvert.DeserializeObject(responseString);
    //                string generated = result?.choices?[0]?.message?.content;

    //                return generated ?? "לא נוצר תיאור.";
    //            }
    //            catch (Exception ex)
    //            {
    //                return $"שגיאה: {ex.Message}";
    //            }
    //        }
    //    }

    public class TextGeneratorService : ITextGeneratorService
    {
        private readonly HttpClient _httpClient;

        public TextGeneratorService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        private async Task<string> SendToOpenAIAsync(string prompt)
        {
            var apiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY");
            if (string.IsNullOrEmpty(apiKey))
                return "שגיאה: מפתח API של OpenAI חסר.";

            var payload = new
            {
                model = "openai/gpt-3.5-turbo",
                messages = new[]
                {
                new { role = "user", content = prompt }
            }
            };

            var json = JsonConvert.SerializeObject(payload);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            _httpClient.DefaultRequestHeaders.Clear();
            _httpClient.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", apiKey);

            try
            {
                var response = await _httpClient.PostAsync("https://openrouter.ai/api/v1/chat/completions", content);
                if (!response.IsSuccessStatusCode)
                    return $"שגיאה: קוד HTTP {response.StatusCode}";

                var responseString = await response.Content.ReadAsStringAsync();
                dynamic result = JsonConvert.DeserializeObject(responseString);
                return result?.choices?[0]?.message?.content ?? "לא התקבלה תשובה.";
            }
            catch (Exception ex)
            {
                return $"שגיאה: {ex.Message}";
            }
        }

        public async Task<string> GenerateImageDescriptionAsync(string albumName)
        {
            var prompt = $"כתוב משפט תיאורי קצר מאוד (עד 10 מילים) שמתאים לאלבום תמונות בשם \"{albumName}\". אל תמציא תוכן. אל תשתמש בביטויים כלליים.";
            return await SendToOpenAIAsync(prompt);
        }

        public async Task<string> AnswerUserQuestionAsync(string question)
        {
            return await SendToOpenAIAsync(question);
        }
    }

}