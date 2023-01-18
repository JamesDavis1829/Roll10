using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Roll10;
using Roll10.Services;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
builder.Services.AddScoped<IApiService>(sp => new ApiService());
builder.Services.AddScoped<GlobalRefreshService>(sp => new GlobalRefreshService());
builder.Services.AddScoped<ToastService>(sp => new ToastService(
    sp.GetService<GlobalRefreshService>() ?? new GlobalRefreshService()
));

await builder.Build().RunAsync();
