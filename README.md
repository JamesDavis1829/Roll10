# Roll10
Roll 10 is the VTT component of the D10 system.

## DSL
Roll 10 uses a domain specific language to apply effects and dice rolls.

### Modifier
For effects the recognized DSL commands are recognized

| Command     | Description |
| ----------- | ----------- |
| STR | Character strength - 10 |
| AGI | Character agility - 10 |
| DUR | Character durability - 10 |
| STA | Character stamina - 10 |
| INT | Character intelligence - 10 |
| INS | Character insight - 10 |
| ARMOR | Characters equipped armor |

#### Format
Here is an example roll for a few modifiers
`+ AGI;+ DUR;+ INS;`
which would result in a modifier that would add a characters agility, durability and insight to the roll.

### Effects
For effects the following commands are recognized

| Command     | Description |
| ----------- | ----------- |
| HP | effects characters HP |
| STA | effects character Current Stamina |

| Substitutable Values | Description |
| ----------|-------|
| CASTERMOD | Substitutes the caster modifier |

#### Format
Here is an example of an effect that would remove 1 stamina and add 2 hp
`- 1 STA;+ 2 HP;`

Here is a format with caster modifier
`- 5 STA;+ CASTERMOD STA;`
which would be evaluated to - 3 STA when the characters caseter modifier is 2

### Dice Rolls
Dice rolls can consists of any dice in the format XdX and any static number values.

#### Format
Here is an example of a dice roll
`+ 1d10;+ 2d6;+ 3;`
Which would result in rolling three dice, and then adding 3.
