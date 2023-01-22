using Microsoft.JSInterop;
using System.Text.Json;

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
        public static Dictionary<string, Action<dynamic>> Callbacks = new Dictionary<string, Action<dynamic>>();

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
        public static void HandleEvent(dynamic eventMessage)
        {
            Console.WriteLine(eventMessage);
        }

        public async Task SubscribeTo(string collection, string pattern, Action<dynamic> callback)
        {
            await CheckInitialization();
            Callbacks[$"{collection}/{pattern}"] = callback;
            await JS.InvokeVoidAsync("subscribeToStream",collection, pattern);
        }
    }
}