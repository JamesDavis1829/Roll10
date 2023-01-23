using Microsoft.JSInterop;
using Roll10.Models;
using System.Text.Json;
using System.Text.Json.Nodes;

namespace Roll10.Services
{
    public record AuthOptions (
        string authUrl,
        string codeChallenge,
        string codeChallengeMethod,
        string codeVerifier,
        string name,
        string state
    );

    public class PocketbaseService 
    {
        private IJSRuntime JS;
        private bool IsInitialized = false;
        public static Dictionary<string, Action<string>> Callbacks = new Dictionary<string, Action<string>>();

        public PocketbaseService(IJSRuntime js)
        {
            JS = js;
        }

        private async Task CheckInitialization()
        {
            if(IsInitialized)
                return;
            await Initialize(ConfigurationService.Url);
            IsInitialized = true;
        } 

        private async Task Initialize(string url)
        {
            await JS.InvokeVoidAsync("initializePB", url);
        }

        private record AuthReply (
            bool usernamePassword,
            bool emailPassword,
            List<AuthOptions> authProviders
        );

        public async Task<List<AuthOptions>> GetAuthOptions()
        {
            await CheckInitialization();
            var results = await JS.InvokeAsync<AuthReply>("listAuth");
            
            return results.authProviders;
        }

        [JSInvokable]
        public static void HandleEvent(string eventMessage)
        {
            JsonNode data = JsonNode.Parse(eventMessage) ?? new JsonObject();
            var index = data.AsObject()?["record"]?.AsObject()?["collectionName"]?.ToString() ?? "";
            if(Callbacks.ContainsKey(index))
            {
                var record = data.AsObject()?["record"]?.ToJsonString() ?? "{}";
                Callbacks[index](record);
            }
        }

        public async Task SubscribeTo(string collection, string pattern, Action<string> callback)
        {
            await CheckInitialization();
            Callbacks[collection] = callback;
            await JS.InvokeVoidAsync("subscribeToStream",collection, pattern);
        }

        public async Task<bool> IsLoginValid()
        {
            await CheckInitialization();
            return await JS.InvokeAsync<bool>("isUserLoggedIn");
        }

        public async Task<User?> GetUser()
        {
            await CheckInitialization();
            var data = await JS.InvokeAsync<string>("getLoginInformation");
            return JsonSerializer.Deserialize<User>(data);
        }
    }
}