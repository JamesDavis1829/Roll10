module Roll10.Domain.Rollable

type Item = {
    name: string
    strength_requirement: int
    agility_requirement: int
    intelligence_requirement: int
    wield: List<string>
    action_effect: string
    dice_roll: string
    modifiers: string
    category: string
    description: string
    range: string
    weight: string
    id: string
    add_base_dice: bool
}
with
    static member Default = {
        name="";strength_requirement= 0;agility_requirement=0;intelligence_requirement=0;wield=[];action_effect="";dice_roll=""
        modifiers="";category="";description="";range="";weight="";id="";add_base_dice=false
    }

type Spell = {
    name: string
    action_effect: string
    dice_roll: string
    modifiers: string
    intelligence_requirement: int
    range: string
    description: string
    id: string
    add_base_dice: bool
}
with
    static member Default = {name="";action_effect="";dice_roll="";modifiers="";intelligence_requirement=0;range="";description="";id="";add_base_dice=false}

type Rollable = Item | Equipment | Spell

let shouldHideDiceRoll item =
    match item.category with
    | "armor" -> true
    | _ -> false