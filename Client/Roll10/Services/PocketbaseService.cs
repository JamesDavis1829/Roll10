using System.Reactive.Subjects;
using Microsoft.JSInterop;
using System.Text.Json;
using System.Text.Json.Nodes;
using Roll10.Domain.Models;

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
        private readonly IJSRuntime _js;
        private bool _isInitialized;
        private static readonly Dictionary<string, Func<string, Task>> Callbacks = new ();
        public BehaviorSubject<bool> LoginSubject { get; }
        public BehaviorSubject<User?> UserSubject { get; }

        public PocketbaseService(IJSRuntime js)
        {
            _js = js;
            _isInitialized = false;
            LoginSubject = new BehaviorSubject<bool>(false);
            UserSubject = new BehaviorSubject<User?>(null);
        }

        private async Task CheckInitialization()
        {
            if(_isInitialized)
                return;
            await Initialize(ConfigurationService.Url);
            _isInitialized = true;
        } 

        private async Task Initialize(string url)
        {
            await _js.InvokeVoidAsync("initializePB", url);
        }

        private record AuthReply (
            bool usernamePassword,
            bool emailPassword,
            List<AuthOptions> authProviders
        );

        public async Task<List<AuthOptions>> GetAuthOptions()
        {
            await CheckInitialization();
            var results = await _js.InvokeAsync<AuthReply>("listAuth");
            
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

        public async Task SubscribeTo(string collection, string pattern, Func<string, Task> callback)
        {
            await CheckInitialization();
            Callbacks[collection] = callback;
            await _js.InvokeVoidAsync("subscribeToStream",collection, pattern);
        }

        public async Task<bool> IsLoginValid()
        {
            await CheckInitialization();
            var isUserValid = await _js.InvokeAsync<bool>("isUserLoggedIn");
            LoginSubject.OnNext(isUserValid);
            return isUserValid;
        }

        public async Task<User?> GetUser()
        {
            await CheckInitialization();
            var data = await _js.InvokeAsync<string>("getLoginInformation");
            var user = JsonSerializer.Deserialize<User>(data);
            return user;
        }
        
        public async Task UpdateUser()
        {
            await CheckInitialization();
            await _js.InvokeVoidAsync("updateAuth");
            var user = await GetUser();
            UserSubject.OnNext(user);
        }

        public async Task<List<T>> GetFullList<T>(string collectionName, string sort = "+created", string filter = "", string expand = "")
        {
            await CheckInitialization();
            return await _js.InvokeAsync<List<T>>("getFullList", collectionName, sort, filter, expand);
        }

        public async Task<bool> CreateItem<T>(string collectionName, T item)
        {
            await CheckInitialization();
            return await _js.InvokeAsync<bool>("createItem", collectionName, item);
        }

        public async Task<bool> UpdateItem(string collectionName, string recordId, object patchParams)
        {
            await CheckInitialization();
            return await _js.InvokeAsync<bool>("patchItem", collectionName, recordId, patchParams);
        }

        public async Task LogOut()
        {
            await CheckInitialization();
            await _js.InvokeVoidAsync("logout");
            UserSubject.OnNext(null);
            LoginSubject.OnNext(false);
        }
    }
}