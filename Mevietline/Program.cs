using MevietLine.Data;
using Microsoft.EntityFrameworkCore;
using MevietLine.Services;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc.Razor.RuntimeCompilation;
using MevietLine.Hubs;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddSignalR(options =>
{
    options.EnableDetailedErrors = true;
    options.MaximumReceiveMessageSize = 102400000;
});
builder.Services.AddTransient<ICommon, Common>();
//builder.Services.AddRazorPages().AddRazorRuntimeCompilation();
builder.Services.AddRazorPages();
builder.Services.AddHttpContextAccessor();

builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
    .AddCookie(options =>
    {
        options.ExpireTimeSpan = TimeSpan.FromMinutes(20);
        options.SlidingExpiration = true;
        options.AccessDeniedPath = "/Forbidden/";
        options.LoginPath = "/AdminFb/Login";
        options.AccessDeniedPath = "/AdminFb/AccessDenied";
        options.SlidingExpiration = true;
    });
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidCastException(nameof(args));
builder.Services.AddDbContext<ApplicationDbContext>(options =>
options.UseSqlServer(connectionString));
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
app.UseSession();


app.UseAuthentication();
app.UseAuthorization();

app.UseMiddleware<SignalRReconnectMiddleware>();
app.UseEndpoints(endpoints =>
{
    endpoints.MapRazorPages();
    endpoints.MapHub<ChatHub>("/chatHub");
});





app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
    endpoints.MapAreaControllerRoute(
        name: "Areas",
      areaName: "Admin",
      pattern: "{controller=AdminFb}/{action=Index}/{id?}");
    endpoints.MapControllerRoute(
        name: "LoginUser",
        pattern: "Login",
        defaults: new { controller = "Home", action = "Login" });
    endpoints.MapControllerRoute(
          name: "Register",
        pattern: "Register",
        defaults: new { controller = "Home", action = "Register" });
    endpoints.MapControllerRoute(
        name: "Profile",
        pattern: "Profile",
        defaults: new { controller = "Home", action = "Support" });
   
});
app.Run();
