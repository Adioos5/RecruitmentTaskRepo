using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Backend
{
    public class PostsDbContext : DbContext
    {
        public PostsDbContext(DbContextOptions<PostsDbContext> options) : base(options)
        {
        }

        public DbSet<Post> Posts { get; set; }
    }
}
