using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.JSInterop;
using Roll10;
using Roll10.Services;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri($"{ConfigurationService.Url}/api/") });
builder.Services.AddScoped<IApiService>(sp => new ApiService(sp.GetService<HttpClient>()));
builder.Services.AddScoped<GlobalRefreshService>(sp => new GlobalRefreshService());
builder.Services.AddScoped<ToastService>(sp => new ToastService(
    sp.GetService<GlobalRefreshService>() ?? new GlobalRefreshService()
));
builder.Services.AddScoped(sp => new PocketbaseService(sp.GetService<IJSRuntime>()));
builder.Services.AddScoped(sp => new DiceLogService(sp.GetService<IApiService>(), sp.GetService<PocketbaseService>(), sp.GetService<ToastService>()));
builder.Services.AddScoped(sp => new DiceService(sp.GetService<DiceLogService>()));

await builder.Build().RunAsync();
