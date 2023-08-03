
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Backend;
using Backend.Services;

public class Program
{
    public static void Main(string[] args)
    {
        var host = CreateHostBuilder(args).Build();

        using (var scope = host.Services.CreateScope())
        {
            var services = scope.ServiceProvider;

            try
            {
                var dbContext = services.GetRequiredService<PostsDbContext>();
                dbContext.Database.Migrate();
            }
            catch (Exception ex)
            {
                // Obs³uga b³êdów
            }
        }

        host.Run();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Program>();
                webBuilder.ConfigureServices((hostContext, services) =>
                {
                    services.AddDbContext<PostsDbContext>(options =>
                        options.UseSqlite(hostContext.Configuration.GetConnectionString("DefaultConnection")));
                    services.AddScoped<DbContext, PostsDbContext>();
                    services.AddControllers();
                    services.AddCors(options =>
                    {
                        options.AddDefaultPolicy(builder =>
                        {
                            builder.AllowAnyOrigin() 
                                   .AllowAnyHeader()
                                   .AllowAnyMethod();
                        });
                    });
                    services.AddHttpClient<APIService>(client =>
                    {
                        client.BaseAddress = new Uri("https://jsonplaceholder.typicode.com/posts/"); // Replace with your actual API base URL
                    });
                });
                webBuilder.Configure(app =>
                {

                    app.UseRouting();

                    app.UseCors();

                    app.UseAuthorization();

                    app.UseEndpoints(endpoints =>
                    {
                        endpoints.MapControllers();
                    });
                });
            });
}


