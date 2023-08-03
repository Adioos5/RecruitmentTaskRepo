using Newtonsoft.Json;

namespace Backend.Services
{
    public class APIService
    {
        private readonly HttpClient _httpClient;

        public APIService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<IEnumerable<Post>> GetDataFromAPI()
        {
            string apiUrl = "https://jsonplaceholder.typicode.com/posts/"; // Replace this with the actual API endpoint URL

            HttpResponseMessage response = await _httpClient.GetAsync(apiUrl);

            if (response.IsSuccessStatusCode)
            {
                string apiResponse = await response.Content.ReadAsStringAsync();
                var items = JsonConvert.DeserializeObject<IEnumerable<Post>>(apiResponse);
                return items;
            }
            else
            {
                throw new Exception("Failed to fetch data from the API.");
            }
        }
    }
}
