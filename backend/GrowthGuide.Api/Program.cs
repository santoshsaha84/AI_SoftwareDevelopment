using Microsoft.EntityFrameworkCore;
using GrowthGuide.Infra.Data;
using GrowthGuide.Core.Entities;
using GrowthGuide.Core.Interfaces;
using GrowthGuide.Infra.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
    });
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IAIGrowingService, MockAIService>();

var connectionString = Environment.GetEnvironmentVariable("DATABASE_URL");

if (!string.IsNullOrEmpty(connectionString))
{
    Console.WriteLine("Using DATABASE_URL from environment.");
    if (connectionString.StartsWith("postgres://") || connectionString.StartsWith("postgresql://"))
    {
        var uri = new Uri(connectionString);
        var userInfo = uri.UserInfo.Split(':');
        connectionString = $"Host={uri.Host};Database={uri.AbsolutePath.TrimStart('/')};Username={userInfo[0]};Password={userInfo[1]};Port={uri.Port};SSL Mode=Require;Trust Server Certificate=true;";
    }
}
else
{
    connectionString = builder.Configuration.GetConnectionString("DefaultConnection") 
                    ?? builder.Configuration.GetConnectionString("Default") // Fallback for guideline consistency
                    ?? Environment.GetEnvironmentVariable("ConnectionStrings__DefaultConnection")
                    ?? Environment.GetEnvironmentVariable("ConnectionStrings__Default");
    
    Console.WriteLine($"Using connection string from config folder/variables. Host check: {connectionString?.Contains("Host=")}");
}

if (string.IsNullOrEmpty(connectionString))
{
    throw new InvalidOperationException("Database connection string is not configured. Please set DATABASE_URL or ConnectionStrings__DefaultConnection.");
}

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddAuthorization();
builder.Services.AddIdentityApiEndpoints<ApplicationUser>()
    .AddEntityFrameworkStores<AppDbContext>();

builder.Services.AddAuthentication()
    .AddGoogle(options =>
    {
        options.ClientId = builder.Configuration["Authentication:Google:ClientId"] ?? "placeholder";
        options.ClientSecret = builder.Configuration["Authentication:Google:ClientSecret"] ?? "placeholder";
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseDefaultFiles();
app.UseStaticFiles();

app.MapGroup("/api/auth").MapIdentityApi<ApplicationUser>();
app.MapControllers();

app.MapFallbackToFile("index.html");

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<AppDbContext>();
    
    // Ensure database is migrated
    await context.Database.MigrateAsync();

    await DbInitializer.Initialize(context);
}

app.UseHttpsRedirection();

// app.UseAuthorization(); // Add if needed explicitly, though MapIdentityApi handles some. 


app.Run();


