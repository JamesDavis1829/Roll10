import {IDbRecord} from "../interfaces/IDbRecord";

export interface IDSLEquation extends IDbRecord
{
  name: string;
  equation: string;
}
