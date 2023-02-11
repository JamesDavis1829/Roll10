export const BaseDice = 10;

export type Nullable<T> = T | null;

export const Clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

export const IsNotNull = (x:any) => (x != null && true);

export const GenerateId = () =>
{
    const chars = "abcdefghijklmopqrstuvwxyz";
    return [...Array(15).keys()].map(_ => {
        return chars.charAt(Math.random() * chars.length);
    }).join('');
}

export const RemoveTrailingOperation = (rollString: string) =>
{
    if(!rollString)
        return "";

    rollString = rollString.trim();
    if(["+","-"].includes(rollString.charAt(rollString.length - 1)))
    {
        rollString = rollString.substring(0, rollString.length - 1);
    }
    return rollString.trim();
}

export function ForceCast<T>(a: any)
{
    return (a as unknown) as T;
}
