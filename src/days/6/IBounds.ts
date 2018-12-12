import { IPoint } from './IPoint';
export interface IBounds {
  Top: number;
  Left: number;
  Right: number;
  Bottom: number;

  Contains: (point: IPoint) => boolean;
  PointsInside(): IPoint[];
}
