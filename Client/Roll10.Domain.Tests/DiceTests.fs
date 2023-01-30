module Roll10.Domain.Tests.DiceTests

open System.Text.RegularExpressions
open NUnit.Framework
open Roll10.Domain.Dice
open Roll10.Domain.Character
open Roll10.Domain.Rollable

let rollableItem = Rollable.Item {Item.Default with dice_roll = "+ 1d10;+ 3;"; modifiers = "+ agi;"}
let rollableSpell = Rollable.Spell {Spell.Default with dice_roll = "+ 2d8;+ 6;"; modifiers="+ INT;"; add_base_dice = true}

let testChar = {
    agility=10
    current_stamina=10
    durability=11
    equipment=[]
    hp=11
    id="theid"
    insight=12
    intelligence=13
    inventory=[]
    name="theName"
    spells=[]
    stamina=14
    strength=15
}

[<SetUp>]
let Setup () =
    ()
    
[<Test>]
let CreateRollListWorks () =
    let itemRoll = createRollList rollableItem
    let spellRoll = createRollList rollableSpell
    
    Assert.AreEqual(itemRoll, ["+ 1d10";"+ 3";"+ AGI"])
    Assert.AreEqual(spellRoll, ["+ 2d8";"+ 6";"+ 1d10";"+ INT"])

[<Test>]
let HumanReadableWorks () =
    let humanReadableItem = humanReadableRollString rollableItem
    let humanReadableSpell = humanReadableRollString rollableSpell
    
    Assert.AreEqual("1d10 + 3 + AGI", humanReadableItem)
    Assert.AreEqual("2d8 + 6 + 1d10 + INT", humanReadableSpell)
    
[<Test>]
let DiceSubstituteWorks () =
    for x in [0..1000] do
        let roll2d8 = diceSubstitute "2d8"
        let roll1d10 = diceSubstitute "1d10"
        let roll1d100 = diceSubstitute "1d100"
        let roll3d16 = diceSubstitute "3d16"
        
        Assert.True(roll2d8 >= 2 && roll2d8 <= 16)
        Assert.True(roll1d10 >= 1 && roll1d10 <= 10)
        Assert.True(roll1d100 >= 1 && roll1d100 <= 100)
        Assert.True(roll3d16 >= 3 && roll3d16 <= 48)

//Also tested stat substitute here
[<Test>]
let PerformRollTest () =
    let character = {testChar with equipment=[{Item.Default with dice_roll="+ 3;";category="armor"}]}
    let item = Rollable.Item {Item.Default with add_base_dice=true;dice_roll="+ 1d8;";modifiers="+ str;+ AGI;+ dur;+ sta;+ int;+ INS;+ armor;"}
    for x in [0..1000] do
        let roll, text = performRoll character item
        Assert.True(roll >= 17 && roll <= 36)
        Assert.True(Regex("1d8\(\d+\) \+ 1d10\(\d+\) \+ STR\(5\) \+ AGI\(0\) \+ DUR\(1\) \+ STA\(4\) \+ INT\(3\) \+ INS\(2\) \+ ARMOR\(3\)").IsMatch(text))