module Roll10.Domain.Tests.CharacterTests

open NUnit.Framework
open Roll10.Domain.Character

[<SetUp>]
let Setup () =
    ()
    
[<Test>]
let ApplyEffectAddsToStats () =
    let character = { Character.Default with hp = 10; durability = 20; current_stamina = 10; stamina = 13 }
    let staminaCharacter = applyEffect character 2 "sta"
    let hpCharacter = applyEffect character -9 "HP"
    
    Assert.AreEqual(staminaCharacter.current_stamina, 12)
    Assert.AreEqual(hpCharacter.hp, 1)

[<Test>]
let StatsCantGoOver () =
    let character = { Character.Default with hp = 10; durability = 10; current_stamina = 10; stamina = 10 }
    let staminaCharacter = applyEffect character 2 "STA"
    let hpCharacter = applyEffect character 10 "HP"
    
    Assert.AreEqual(staminaCharacter.current_stamina, 10)
    Assert.AreEqual(hpCharacter.hp, 10)
    
[<Test>]
let StatsDontGoBelow0 () =
    let character = { Character.Default with hp = 10; durability = 10; current_stamina = 10; stamina = 10 }
    let staminaCharacter = applyEffect character -20 "STA"
    let hpCharacter = applyEffect character -20 "HP"
    
    Assert.AreEqual(staminaCharacter.current_stamina, 0)
    Assert.AreEqual(hpCharacter.hp, 0)