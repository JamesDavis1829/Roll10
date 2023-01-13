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
            var request = await client.GetAsync("collections/characters/records");
            var data = await request.Content.ReadAsStringAsync();
            var dynamicData = JsonDocument.Parse(data);

            foreach(var item in dynamicData.RootElement.GetProperty("items").EnumerateArray())
            {
                var spells = await GetSpellsByIds(
                    item.GetProperty("spells").EnumerateArray().Select(s => s.GetString() ?? "").ToList()
                );
                var inventory = await GetItemsByIds(
                    item.GetProperty("inventory").EnumerateArray().Select(s => s.GetString() ?? "").ToList()
                );
                var equipement = await GetItemsByIds(
                    item.GetProperty("equipment").EnumerateArray().Select(s => s.GetString() ?? "").ToList()
                );

                characters.Add(new Character(
                    item.GetProperty("name").GetString() ?? "",
                    item.GetProperty("agility").GetInt32(),
                    item.GetProperty("durability").GetInt32(),
                    item.GetProperty("durability").GetInt32(),
                    item.GetProperty("durability").GetInt32(),
                    item.GetProperty("intelligence").GetInt32(),
                    item.GetProperty("insight").GetInt32(),
                    spells,
                    equipement,
                    inventory,
                    item.GetProperty("id").GetString() ?? "",
                    DateTime.Parse(item.GetProperty("created").GetString()),
                    DateTime.Parse(item.GetProperty("updated").GetString())
                ));
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