namespace Roll10.Services;

public static class Constants
{
    public static readonly int DiceBase = 10;

    public static string GenerateId()
    {
        const string chars = "abcdefghijklmopqrstuvwxyz";
        return new string(Enumerable.Repeat(chars, 15)
            .Select(s => s[new Random().Next(s.Length)]).ToArray());
    }
}