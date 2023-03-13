import { IRollable } from "./Rollable";

export interface IFeat extends IRollable
{
  tier: number;

  prerequisites: Array<IFeat>;

  maxApplications: number;
}
