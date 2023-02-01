namespace Roll10.Domain.Models;

public record DiceLogEntry(
    string title,
    string diceroll,
    int rolledamount,
    string id,
    string room_id = ""
);