import { FabricClaim } from './FabricClaim';
import { IPoint } from './IPoint';

export class OverlapMap {
  public overlapMap: Map<number, Map<number, number>>;

  constructor(claims: FabricClaim[]) {
    this.overlapMap = getOverlapMap(claims);
  }

  public Count = (): number =>
    Array.from(this.overlapMap.values())
      .reduce(toCounts, [])
      .filter(countsGreaterThan1).length;

  public HasOverlapWith = (claim: FabricClaim): boolean =>
    claim.points().some(point => {
      const xMap = this.overlapMap.get(point.x) || new Map<number, number>();
      const count = xMap.get(point.y) || 0;
      return count > 1;
    });
}

export const getOverlapMap = (claims: FabricClaim[]) =>
  claims
    .reduce(toPointsArray, [])
    .reduce(toMapOfXValues, new Map<number, Map<number, number>>());

const toCounts = (counts: number[], pointMap: Map<number, number>) =>
  counts.concat(Array.from(pointMap.values()));

const countsGreaterThan1 = (count: number) => count > 1;

const toPointsArray = (points: IPoint[], claim: FabricClaim) =>
  points.concat(claim.points());

const toMapOfXValues = (
  pointMap: Map<number, Map<number, number>>,
  point: IPoint
) => {
  const countMap: Map<number, number> =
    pointMap.get(point.x) || new Map<number, number>();

  countMap.set(point.y, (countMap.get(point.y) || 0) + 1);

  pointMap.set(point.x, countMap);
  return pointMap;
};
