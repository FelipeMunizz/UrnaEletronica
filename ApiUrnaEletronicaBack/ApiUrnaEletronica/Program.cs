using ApiUrnaEletronica.Data;
using ApiUrnaEletronica.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using UrnaBackend.Dtos;
using UrnaBackend.Services;
using UrnaBackend.Services.Interfaces;

var builder = WebApplication.CreateBuilder(args);
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
string connectionstring = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<UrnaContext>(options =>
 options.UseSqlServer(connectionstring));
builder.Services.AddTransient<ICandidateService, CandidateService>();
builder.Services.AddTransient<IVoteService, VoteService>();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
        policy =>
        {
            policy.WithOrigins("http://localhost:3000")
                .AllowAnyMethod()
                .AllowAnyHeader();
        });
});

var mapperConfig = new MapperConfiguration(cfg =>
{
    cfg.CreateMap<Candidate, CandidateRegisterDto>().ReverseMap();
    cfg.CreateMap<Candidate, CandidateDashboardDto>().ReverseMap();
    cfg.CreateMap<Candidate, CandidateUrnDto>().ReverseMap();
});

IMapper mapper = mapperConfig.CreateMapper();
builder.Services.AddSingleton(mapper);

var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var context = services.GetRequiredService<UrnaContext>();
    context.Database.EnsureCreated();
}


app.UseHttpsRedirection();

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
