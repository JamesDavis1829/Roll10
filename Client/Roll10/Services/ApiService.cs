using System.Dynamic;
using System.Text.Json;
using System.Text.Json.Nodes;
using Roll10.Models;

namespace Roll10.Services
{
    public interface IApiService 
    {
        public Task<List<Character>> GetDefaultCharacters();
        public Task<List<Item>> GetItemsByIds(List<string> ids);
        public Task<List<Spell>> GetSpellsByIds(List<string> ids);
    }

    public class ApiService : IApiService
    {
        private HttpClient client;
        public ApiService()
        {
            client = new HttpClient { BaseAddress = new Uri("http://127.0.0.1:8090/api/") };
        }

        public async Task<List<Character>> GetDefaultCharacters()
        {
            var characters = new List<Character>();
            var request = await client.GetAsync("collections/characters/records?expand=items,spells,equipment");
            var data = await request.Content.ReadAsStringAsync();
            var dynamicData = JsonNode.Parse(data);
            if(dynamicData != null)
            {

                foreach(var item in dynamicData.AsObject()["items"].AsArray())
                {
                    if(item == null) continue;

                    item["items"] = JsonNode.Parse(
                        (item["expand"]?["items"] ?? item["items"] ?? new JsonArray()).ToJsonString()
                    );
                    item["spells"] = JsonNode.Parse(
                        (item["expand"]?["spells"] ?? item["spells"] ?? new JsonArray()).ToJsonString()
                    );
                    item["equipment"] = JsonNode.Parse(
                        (item["expand"]?["equipment"] ?? item["equipment"] ?? new JsonArray()).ToJsonString()
                    );

                    var character = JsonSerializer.Deserialize<Character>(item.ToJsonString());
                    if(character != null)
                        characters.Add(character);
                }
            }
            
            return characters;
        }

        public Task<List<Item>> GetItemsByIds(List<string> ids)
        {
            return Task.FromResult(new List<Item>());
        }

        public Task<List<Spell>> GetSpellsByIds(List<string> ids)
        {
            return Task.FromResult(new List<Spell>());
        }
    }
}