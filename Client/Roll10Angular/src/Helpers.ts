export const BaseDice = 10;

export const Clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

export const GenerateId = () => {
    const chars = "abcdefghijklmopqrstuvwxyz";
    return Array.from(Array(15).keys()).map(x => {
        return chars[Math.random() * chars.length]
    }).reduce((acc, val) => {
        return acc + val;
    })
}

export const RemoveTrailingOperation = (rollString: string) => {
    if(!rollString)
        return "";
    
    rollString = rollString.trim();
    if(["+","-"].includes(rollString))
    {
        rollString = rollString.substring(0, rollString.length - 1);
    }
    return rollString.trim();
}