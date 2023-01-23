using System.Dynamic;
using System.Reactive.Linq;
using System.Reactive.Subjects;
using System.Text.Json;
using System.Text.Json.Nodes;
using Roll10.Models;

namespace Roll10.Services
{
    public interface IApiService 
    {
        public Task<List<Character>> GetDefaultCharacters();
        public Task<List<CharacterAction>> GetActions(bool allCharacters);
    }

    public class ApiService : IApiService
    {
        private readonly HttpClient _client;
        public ApiService(HttpClient client)
        {
            _client = client;
        }

        public async Task<List<CharacterAction>> GetActions(bool allCharacters)
        {
            var actions = new List<CharacterAction>();
            var request = await _client.GetAsync($"collections/actions/records?filter=(all_characters={allCharacters.ToString().ToLower()})");
            var data = await request.Content.ReadAsStringAsync();
            var dynamicData = JsonNode.Parse(data);
            return (dynamicData?.AsObject()["items"]).Deserialize<List<CharacterAction>>() ?? new List<CharacterAction>();
        }

        public async Task<List<Character>> GetDefaultCharacters()
        {
            var characters = new List<Character>();
            var request = await _client.GetAsync("collections/characters/records?expand=spells,equipment,inventory");
            var data = await request.Content.ReadAsStringAsync();
            var dynamicData = JsonNode.Parse(data);
            if (dynamicData == null) return characters;
            foreach(var item in dynamicData.AsObject()["items"]?.AsArray()!)
            {
                if(item == null) continue;

                item["inventory"] = JsonNode.Parse(
                    (item["expand"]?["inventory"] ?? item["inventory"] ?? new JsonArray()).ToJsonString()
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
                    
                characters.Last().current_stamina = characters.Last().stamina;
                characters.Last().hp = characters.Last().durability;
            }

            return characters;
        }
    }
}