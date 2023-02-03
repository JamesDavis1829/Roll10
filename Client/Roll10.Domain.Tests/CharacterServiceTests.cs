using Roll10.Domain.Models;
using Roll10.Domain.Services;

namespace Roll10.Domain.Tests;

public class Tests
{
    [SetUp]
    public void Setup()
    {
    }

    [Test]
    public void CharacterMaxAndMinWorks()
    {
        var character = new Character();
        character = character with { current_stamina = -1, hp = 10, durability = 9 };

        var maxAndMinCharacter = CharacterService.ApplyMaxAndMinimums(character);

        Assert.That(maxAndMinCharacter.hp, Is.EqualTo(9));
        Assert.That(maxAndMinCharacter.current_stamina, Is.EqualTo(0));
    }

    [Test]
    public void ApplyEffectWithoutMaxAndMinWorks()
    {
        var character = new Character() with { durability = 10, stamina = 10 };

        var appliedHpEffect = CharacterService.ApplyEffect(character, 11, "hp", false);
        var appliedStaEffect = CharacterService.ApplyEffect(character, -9, "sta", false);
        
        Assert.That(appliedHpEffect.hp, Is.EqualTo(11));
        Assert.That(appliedStaEffect.current_stamina, Is.EqualTo(-9));
    }

    [Test]
    public void ApplyEffectWithMaxAndMinWorks()
    {
        var character = new Character { durability = 10, stamina = 10 };

        var appliedHpEffect = CharacterService.ApplyEffect(character, 11, "hp");
        var appliedStaEffect = CharacterService.ApplyEffect(character, -9, "sta");
        
        Assert.That(appliedHpEffect.hp, Is.EqualTo(10));
        Assert.That(appliedStaEffect.current_stamina, Is.EqualTo(0));
    }

    [Test]
    public void ApplyEffectsWorks()
    {
        var character = new Character { durability = 10, stamina = 10, caster_type = "full"};

        var appliedEffectCharacter = CharacterService.ApplyEffects(character, "+ 12 STA;- 1 HP;+ CASTERMOD HP;");
        
        Assert.That(appliedEffectCharacter.current_stamina, Is.EqualTo(10));
        Assert.That(appliedEffectCharacter.hp, Is.EqualTo(2));
    }
}