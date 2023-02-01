namespace Roll10.Domain

type IRollable =
    abstract GetDiceRoll: unit -> string
    abstract GetActionEffect: unit -> string
    abstract GetModifiers: unit -> string
    abstract GetBaseDice: unit -> bool
    abstract GetId: unit -> string
    
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

type CharacterAction = {
    id: string
    add_base_dice: bool
    action_effect: string
    dice_roll: string
    modifiers: string
    name: string
    description: string
    all_characters: bool
}
with
    static member Default = {id="";action_effect="";add_base_dice=false;all_characters=false;description="";dice_roll="";modifiers="";name=""}
    
type InlineRollable = {
    id: string
    add_base_dice: bool
    action_effect: string
    dice_roll: string
    modifiers: string
    name: string
}

type Rollable =
    Item of Item
    | Spell of Spell
    | CharacterAction of CharacterAction
    | InlineRollable of InlineRollable
    interface IRollable with
        member this.GetActionEffect() =
            match this with
            | Item i -> i.action_effect
            | Spell s -> s.action_effect
            | CharacterAction ca -> ca.action_effect
            | InlineRollable ir -> ir.action_effect
        member this.GetDiceRoll() =
            match this with
            | Item i -> i.dice_roll
            | Spell s -> s.dice_roll
            | CharacterAction ca -> ca.dice_roll
            | InlineRollable ir -> ir.dice_roll
        member this.GetModifiers() =
            match this with
            | Item i -> i.modifiers
            | Spell s -> s.modifiers
            | CharacterAction ca -> ca.modifiers
            | InlineRollable ir -> ir.modifiers

        member this.GetBaseDice() =
            match this with
            | Item i -> i.add_base_dice
            | Spell s -> s.add_base_dice
            | CharacterAction ca -> ca.add_base_dice
            | InlineRollable ir -> ir.add_base_dice

module Rollable =
    let shouldHideDiceRoll item =
        let category =
            match item with
            | Item i -> i.category
            | Spell s -> ""
            | CharacterAction a -> ""
            | InlineRollable ir -> ""
            
        match category with
        | "armor" -> true
        | _ -> false
        