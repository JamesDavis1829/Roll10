using System.Text.RegularExpressions;
using NUnit.Framework;
using Roll10.Domain.Models;
using Roll10.Domain.Services;

namespace Roll10.Domain.Tests;

public class DiceServiceTests
{
    [SetUp]
    public void Setup()
    {
    }

    [Test]
    public void HumanReadableRollWorks()
    {
        var item = new Spell("", "", "+ 2d10;+ 12;", "+ sta;+ dur;", 0, "", "", "", true);

        var rollString = DiceService.HumanReadableRollString(item);
        
        Assert.That(rollString, Is.EqualTo("1d10 + 2d10 + 12 + STA + DUR"));
    }

    [Test]
    public void PerformRoll()
    {
        var character = new Character
        {
            agility = 10, durability = 11, hp = 11, current_stamina = 9, stamina = 9, caster_type = "quarter",
            insight = 12, intelligence = 13, strength = 14
        };

        var rollable = new Item
        {
            action_effect = "- CASTERMOD HP;", add_base_dice = false, dice_roll = "+ 3d8;", agility_requirement = 0,
            intelligence_requirement = 0,
            category = "weapon", description = "the description", id = "theid", modifiers = "+ STA;+ DUR;",
            name = "thename", range = "", strength_requirement = 0,
            weight = "", wield = new List<string>()
        };
        
        var (roll, rollString) = DiceService.PerformRoll(character, rollable);
        
        Assert.That(roll, Is.LessThanOrEqualTo(24).And.GreaterThanOrEqualTo(2));
        Assert.That(new Regex(@"3d8\(\d+\) \+ STA\(-1\) \+ DUR\(1\)").IsMatch(rollString), Is.True);
    }
}