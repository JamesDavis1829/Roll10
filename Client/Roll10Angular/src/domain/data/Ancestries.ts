export const ancestryOptions  = ["Human","Dwarven","Halfling"] as const;
export type AncestryOption = typeof ancestryOptions[number];
