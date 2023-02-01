module Roll10.Domain.Tests.RollableTests

open NUnit.Framework
open Roll10.Domain.Rollable

[<SetUp>]
let Setup () =
    ()
    
[<Test>]
let ShouldHideArmor () =
    let armor = { Item.Default with category = "armor" }
    let notArmor = { Item.Default with category = "notArmor" }
    
    let isHide = shouldHideDiceRoll armor
    let isNotHide = shouldHideDiceRoll notArmor
    
    Assert.True isHide
    Assert.False isNotHide