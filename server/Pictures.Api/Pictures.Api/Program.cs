//using Amazon.Runtime;
//using Amazon;
//using Amazon.S3;
//using Microsoft.AspNetCore.Authentication.JwtBearer;
//using Microsoft.EntityFrameworkCore;
//using Microsoft.Extensions.DependencyInjection;
//using Microsoft.IdentityModel.Tokens;
//using Pictures.Core;
//using Pictures.Core.Repositories;
//using Pictures.Core.Services;
//using Pictures.Data;
//using Pictures.Data.Repositories;
//using Pictures.Service;
//using System.Text;
//using Pictures.Api;
//using Microsoft.Extensions.Configuration;
//using DotNetEnv;



//var builder = WebApplication.CreateBuilder(args);

//// Add services to the container.
//Env.Load();

//// רישום שירותי AWS
//builder.Services.AddDefaultAWSOptions(builder.Configuration.GetAWSOptions());
//builder.Services.AddAWSService<IAmazonS3>();

//builder.Services.AddControllers();
////Learn more about configuring OpenAPI at  https://aka.ms/aspnet/openapi
////builder.Services.AddOpenApi();
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

//builder.Services.AddCors(opt => opt.AddPolicy("MyPolicy", policy =>
//{
//    policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
//}));

//builder.Services.AddScoped<IUserService, UserService>();
//builder.Services.AddScoped<IUserRepository, UserRepository>();
//builder.Services.AddScoped<AuthService>();
//builder.Services.AddScoped<IPhotoService, PhotoService>();
//builder.Services.AddScoped<IPhotoRepository, PhotoRepository>();
//builder.Services.AddScoped<IAlbumService, AlbumService>();
//builder.Services.AddScoped<IAlbumRepository, AlbumRepository>();
//builder.Services.AddDbContext<DataContext>();
//builder.Services.AddScoped<IManagerRepository, ManagerRepository>();
//builder.Services.AddAutoMapper(typeof(MappingProfile));
//builder.Services.AddAutoMapper(typeof(MappingProfileApi));
////builder.Services.AddScoped<IAiService, AiService>();
//builder.Services.AddHttpClient<ITextGeneratorService, TextGeneratorService>();


//builder.Services.AddSingleton<IAmazonS3>(sp =>
//{
//    var configuration = sp.GetRequiredService<IConfiguration>();
//    var credentials = new BasicAWSCredentials(
//        configuration["AWS:AccessKey"],
//        configuration["AWS:SecretKey"]
//    );
//    var clientConfig = new AmazonS3Config
//    {
//        RegionEndpoint = RegionEndpoint.GetBySystemName(configuration["AWS:Region"])
//    };
//    return new AmazonS3Client(credentials, clientConfig);
//});
////builder.Services.AddSingleton<Mapping>();

//builder.Services.AddAuthentication(options =>
//{
//    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
//    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
//})
//.AddJwtBearer(options =>
//{
//    options.TokenValidationParameters = new TokenValidationParameters
//    {
//        ValidateIssuer = true,
//        ValidateAudience = true,
//        ValidateLifetime = true,
//        ValidateIssuerSigningKey = true,
//        ValidIssuer = builder.Configuration["JWT:Issuer"],
//        ValidAudience = builder.Configuration["JWT:Audience"],
//        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Key"]))
//    };
//});

//builder.Services.AddAuthorization(options =>
//{
//    options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
//    options.AddPolicy("EditorOrAdmin", policy => policy.RequireRole("Editor", "Admin"));
//    options.AddPolicy("ViewerOnly", policy => policy.RequireRole("Viewer"));
//});


//var app = builder.Build();

//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    app.UseSwaggerUI();

//}

//app.UseHttpsRedirection();
//app.UseCors("MyPolicy");
//app.UseAuthentication();
//app.UseAuthorization();

//app.MapControllers();

//app.Run();


using Amazon.Runtime;
using Amazon;
using Amazon.S3;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Pictures.Core;
using Pictures.Core.Repositories;
using Pictures.Core.Services;
using Pictures.Data;
using Pictures.Data.Repositories;
using Pictures.Service;
using System.Text;
using Pictures.Api;
using Microsoft.Extensions.Configuration;
using DotNetEnv;

var builder = WebApplication.CreateBuilder(args);

// טעינת משתני הסביבה מקובץ .env
Env.Load();

// הוספת תצורה מקובץ .env למערכת התצורה
builder.Configuration.AddEnvironmentVariables();

// רישום שירותי AWS
builder.Services.AddDefaultAWSOptions(new Amazon.Extensions.NETCore.Setup.AWSOptions
{
    Region = RegionEndpoint.GetBySystemName(builder.Configuration["AWS:Region"] ?? "eu-north-1")
});

// הגדרת שירות S3 עם אישורים מקובץ .env
builder.Services.AddSingleton<IAmazonS3>(sp =>
{
    var accessKey = Environment.GetEnvironmentVariable("AWS_ACCESS_KEY");
    var secretKey = Environment.GetEnvironmentVariable("AWS_SECRET_KEY");
    var region = builder.Configuration["AWS:Region"] ?? "eu-north-1";

    if (string.IsNullOrEmpty(accessKey) || string.IsNullOrEmpty(secretKey))
    {
        throw new InvalidOperationException("מפתחות AWS חסרים בקובץ .env");
    }

    var credentials = new BasicAWSCredentials(accessKey, secretKey);
    var config = new AmazonS3Config
    {
        RegionEndpoint = RegionEndpoint.GetBySystemName(region)
    };
    return new AmazonS3Client(credentials, config);
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(opt => opt.AddPolicy("MyPolicy", policy =>
{
    policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
}));

// רישום שירותים
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<IPhotoService, PhotoService>();
builder.Services.AddScoped<IPhotoRepository, PhotoRepository>();
builder.Services.AddScoped<IAlbumService, AlbumService>();
builder.Services.AddScoped<IAlbumRepository, AlbumRepository>();
builder.Services.AddDbContext<DataContext>();
builder.Services.AddScoped<IManagerRepository, ManagerRepository>();
builder.Services.AddAutoMapper(typeof(MappingProfile));
builder.Services.AddAutoMapper(typeof(MappingProfileApi));
builder.Services.AddHttpClient<ITextGeneratorService, TextGeneratorService>();

// הגדרת אימות JWT עם מפתחות מקובץ .env
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    var jwtKey = Environment.GetEnvironmentVariable("JWT_KEY");
    var jwtIssuer = Environment.GetEnvironmentVariable("JWT_ISSUER");
    var jwtAudience = Environment.GetEnvironmentVariable("JWT_AUDIENCE");

    if (string.IsNullOrEmpty(jwtKey) || string.IsNullOrEmpty(jwtIssuer) || string.IsNullOrEmpty(jwtAudience))
    {
        throw new InvalidOperationException("מפתחות JWT חסרים בקובץ .env");
    }

    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtIssuer,
        ValidAudience = jwtAudience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
    };
});

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
    options.AddPolicy("EditorOrAdmin", policy => policy.RequireRole("Editor", "Admin"));
    options.AddPolicy("ViewerOnly", policy => policy.RequireRole("Viewer"));
});

var app = builder.Build();

//if (app.Environment.IsDevelopment())
//{
    app.UseSwagger();
    app.UseSwaggerUI();
//}

app.UseHttpsRedirection();
app.UseCors("MyPolicy");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapGet("/",()=>"AlbumixServer api is running! ");
app.Run();