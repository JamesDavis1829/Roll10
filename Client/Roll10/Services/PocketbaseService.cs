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
        public PocketbaseService(IJSRuntime js)
        {
            JS = js;
        }

        private async Task CheckInitialization()
        {
            if(IsInitialized)
                return;
            await Initialize();
            IsInitialized = true;
        } 

        private async Task Initialize()
        {
            await JS.InvokeVoidAsync("initializePB", null);
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
    }
}