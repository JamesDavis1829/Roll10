namespace Roll10.Domain

open Roll10.Domain.Rollable

type Character = {
    id: string
    name: string
    strength: int
    agility: int
    durability: int
    hp: int
    stamina: int
    current_stamina: int
    intelligence: int
    insight: int
    spells: List<Spell>
    equipment: List<Item>
    inventory: List<Item>
}
with
    static member Default = { id="";name="";strength=0;agility=0;durability=0;hp=0;stamina=0;current_stamina=0;intelligence=0;insight=0;spells=[];equipment=[];inventory=[] }

module Character =
    open System
    open Roll10.Domain.Helpers
    let applyEffect character op (stat:string) =
        let upperStat = stat.ToUpper()
        match upperStat with
        | "STA" -> { character with current_stamina = Math.Clamp(character.current_stamina + op, 0, character.stamina)  }
        | "HP" -> { character with hp = Math.Clamp(character.hp + op, 0, character.durability)  }
        | _ -> failwith $"Invalid effect applicator ({upperStat})"
        
    let parseEffect (effectString:string) =
        let parts = effectString.Split(" ") |> Array.toList |> removeEmptyStrings
        if parts.Length = 3 then
            let op =
                match parts[0] with
                | "+" -> parts[1] |> int
                | "-" -> $"-{parts[1]}" |> int
                | _ -> failwith $"Invalid operand ({parts[0]})"
            (op, parts[2])
        else
            failwith $"Effect string must be three characters found {parts.Length}"
            
    let applyEffects character (effectString:string) =
        let effects = effectString.Split(";") |> Array.toList |> removeEmptyStrings
        let rec applyEffects character effects =
            match effects with
            | [] -> character
            | head :: tail ->
                let (op, stat) = parseEffect head
                applyEffects (applyEffect character op stat) tail
        
        applyEffects character effects