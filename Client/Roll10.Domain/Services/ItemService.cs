using Roll10.Domain.Models;

namespace Roll10.Domain.Services;

public static class ItemService 
{
    public static bool HideDiceRoll(Item item)
    {
        return item.category switch 
        {
            "armor" => true,
            _ => false
        };
    }
}