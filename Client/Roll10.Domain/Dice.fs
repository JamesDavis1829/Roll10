module Roll10.Domain.Dice

open System
open System.Collections.Generic
open Microsoft.FSharp.Core
open Roll10.Domain.Rollable
open Roll10.Domain.Helpers
open Roll10.Domain.Character

let createRollList item =
    let dice_roll, modifiers, add_base_dice =
        match item with
        | Item i -> (i.dice_roll, i.modifiers, i.add_base_dice)
        | Spell s -> (s.dice_roll, s.modifiers, s.add_base_dice)
        
    let roll =
        dice_roll.Split(";")
        |> Array.toList
    let baseRoll =
        match add_base_dice with
        | true -> [$"+ 1d{BaseDice}"]
        | false -> [""]
    let modifiers =
        modifiers.Split(";")
        |> Array.toList
        |> List.map (fun x -> x.ToUpper())
        
    let fullRollList = List.concat [
        roll |> removeEmptyStrings
        baseRoll |> removeEmptyStrings
        modifiers |> removeEmptyStrings
    ]
    fullRollList
    
let humanReadableRollString item =
    let fullRollList = createRollList item
    let revRollList =
        fullRollList
        |> List.map (fun x -> String.Join(" ", x.Split(" ") |> Array.rev))
    let joinRollList = String.Join(" ", revRollList).Trim()
    joinRollList[0..joinRollList.Length-3]
    
let diceSubstitute (diceString:string) =
    let parts = diceString.Split("d")
    if parts.Length = 2 then
        let numberOfRolls = parts[0] |> int
        let die = parts[1] |> int
        let rec rollDie acc x =
            match x with
            | 0 -> acc
            | _ ->
                let roll = Random().Next(die) + 1
                rollDie (acc+roll) (x-1)
        rollDie numberOfRolls 0
    else
        failwith $"Dice should be two parts found {parts.Length}"

let statSubstitute character (stat:string) performRoll =
    match stat.ToUpper() with
    | "STR" -> character.strength - BaseDice
    | "AGI" -> character.agility - BaseDice
    | "DUR" -> character.agility - BaseDice
    | "STA" -> character.stamina - BaseDice
    | "INT" -> character.intelligence - BaseDice
    | "INS" -> character.insight - BaseDice
    | "ARMOR" ->
        let rolls = character.equipment |> List.filter(fun e -> e.category = "armor") |> List.map(fun e -> e.dice_roll)
        let rollString = String.Join(";", rolls |> removeEmptyStrings)
        let amount, _ = performRoll character (Rollable.Item {Item.Default with dice_roll = rollString})
        amount
    | _ -> 0
        
let rec performRoll character (item: Rollable) =
    //mutable string list for now
    let rollText = List<string>();
    let rec processRolls acc (x:string list) =
        match x with
        | [] -> 0
        | head :: tail -> 
            let parts = head.Split(" ")
            let subbedNumber =
                if parts[1].Contains("d") then
                    diceSubstitute parts[1]
                else if parts[1] |> Seq.forall Char.IsDigit then
                    parts[1] |> int
                else
                    statSubstitute character parts[1] performRoll
                    
            let accumulatedRoll =
                match parts[0] with
                | "+" -> acc + subbedNumber
                | "-" -> acc - subbedNumber
                | _ -> failwith $"Invalid operator ({parts[0]})"
            
            rollText.Add($"{parts[1]}({subbedNumber})")
            processRolls accumulatedRoll tail
    
    (processRolls 0 (createRollList item)), String.Join(" + ", rollText)