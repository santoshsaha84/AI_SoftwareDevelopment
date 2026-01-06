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

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

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

app.MapGroup("/api/auth").MapIdentityApi<ApplicationUser>();
app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    var context = services.GetRequiredService<AppDbContext>();
    await DbInitializer.Initialize(context);
}

app.UseHttpsRedirection();

// app.UseAuthorization(); // Add if needed explicitly, though MapIdentityApi handles some. 


app.Run();


