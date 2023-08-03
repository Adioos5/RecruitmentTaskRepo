using Backend.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using static Microsoft.Extensions.Logging.EventSource.LoggingEventSource;

namespace Backend.Controllers
{
    [ApiController]
    [Route("/api")]
    public class PostsController : ControllerBase
    {
        private readonly APIService _apiService;
        private readonly PostsDbContext _dbContext;

        public PostsController(APIService apiService, PostsDbContext dbContext)
        {
            _apiService = apiService;
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<IActionResult> GetPosts([FromQuery] string input, [FromQuery] bool showAll)
        {
            if (showAll)
            {
                return Ok(_dbContext.Posts.ToList().OrderByDescending(d => d.Title.Length));
            }

            List<Post> results = new List<Post>();
            foreach (var post in _dbContext.Posts.ToList())
            {
                if (post.Title.Contains(input, StringComparison.OrdinalIgnoreCase) ||
                    post.Body.Contains(input, StringComparison.OrdinalIgnoreCase))
                {
                    results.Add(post);
                }
            }

            return Ok(results.OrderByDescending(r=>r.Title.Length));
        }
    }

}
