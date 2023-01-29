module Roll10.Domain.Tests.HelperTests

open System.Text.RegularExpressions
open Roll10.Domain.Helpers
open NUnit.Framework

[<SetUp>]
let Setup () =
    ()

[<Test>]
let GenerateIdTest () =
    let id = generateId
    let regexMatch = Regex("[a-z]+").IsMatch(id)
    Assert.AreEqual(15, id.Length)
    Assert.True(regexMatch)
    
[<Test>] 
let RemoveEmptyStringsFromList () =
    let list = ["one";"";"two"]
    let parsed = list |> removeEmptyStrings
    Assert.AreEqual(["one";"two"], parsed)
    