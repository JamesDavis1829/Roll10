public interface IRollable
{
    bool add_base_dice {get; init;}
    string action_effect {get; init;}
    string dice_roll {get; init;}
    string modifiers {get; init;}
}