using Roll10.Domain.Models;
using Roll10.Domain.Services;

namespace Roll10.Domain.Tests;

public class ItemServiceTests
{
    [SetUp]
    public void Setup()
    {
    }

    [Test]
    public void HideDiceRollWorks()
    {
        var nonArmorItem = new Item
        {
            action_effect = "- CASTERMOD HP;", add_base_dice = false, dice_roll = "+ 3d8;", agility_requirement = 0,
            intelligence_requirement = 0,
            category = "weapon", description = "the description", id = "theid", modifiers = "+ STA;+ DUR;",
            name = "thename", range = "", strength_requirement = 0,
            weight = "", wield = new List<string>()
        };

        var armorItem = nonArmorItem with { category = "armor" };
        
        Assert.That(ItemService.HideDiceRoll(nonArmorItem), Is.False);
        Assert.That(ItemService.HideDiceRoll(armorItem), Is.True);
    }
}