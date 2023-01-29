using Roll10.Models;

namespace Roll10.Services;

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