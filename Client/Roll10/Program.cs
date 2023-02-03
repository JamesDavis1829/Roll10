global using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using Microsoft.JSInterop;
using Roll10;
using Roll10.Domain.Services;
using Roll10.Services;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri($"{ConfigurationService.Url}/api/") });
builder.Services.AddScoped<GlobalRefreshService>(sp => new GlobalRefreshService());
builder.Services.AddScoped<ToastService>(sp => new ToastService(
    sp.GetService<GlobalRefreshService>() ?? new GlobalRefreshService()
));
builder.Services.AddScoped(sp => new PocketbaseService(sp.GetService<IJSRuntime>()!));
builder.Services.AddScoped(sp => new DiceLogService(sp.GetService<PocketbaseService>()!, sp.GetService<ToastService>()!));

await builder.Build().RunAsync();
