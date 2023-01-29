module Roll10.Domain.Helpers

open System
let BaseDice = 10
let generateId =
    let chars = "abcdefghijklmopqrstuvwxyz"
    let charList = [1..15] |> List.map (fun _ -> chars[Random().Next(chars.Length)])
    String.Concat(charList)

let removeEmptyStrings list =
    list |> List.filter (fun x -> String.IsNullOrWhiteSpace(x) |> not)