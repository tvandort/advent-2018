import { IPoint } from './IPoint';
import { IBounds } from './IBounds';
import { manhattanDistanceBetween } from './chrono-coordinates';
import { findBoundingPoints } from './find-bounding-points';

type Distance = number;

export class Plane {
  public static Null = new Plane([{ X: 0, Y: 0 }]);
  public Bounds: IBounds;
  private Points: IPoint[];
  private AllPointsInside: IPoint[];
  private PointsInside: IPoint[];

  constructor(points: IPoint[]) {
    this.Bounds = findBoundingPoints(points);
    this.Points = points;
    this.AllPointsInside = this.Bounds.PointsInside();
    this.PointsInside = points.filter(point => this.Bounds.Contains(point));
  }

  public ClosestTo = (point: IPoint) => {
    if (!this.Bounds.Contains(point)) {
      return null;
    }
    const distanceMap = new Map<Distance, IPoint[]>();
    for (const containedPoint of this.Points) {
      const distance = manhattanDistanceBetween(containedPoint, point);
      const pointsAtDistance = distanceMap.get(distance) || [];
      pointsAtDistance.push(containedPoint);
      distanceMap.set(distance, pointsAtDistance);
    }
    const smallestDistance = Math.min(...Array.from(distanceMap.keys()));
    const pointsAtShortestDistance = distanceMap.get(
      smallestDistance
    ) as IPoint[];
    if (pointsAtShortestDistance.length > 1) {
      return null;
    } else {
      return pointsAtShortestDistance[0];
    }
  };

  public PointWithGreatestArea() {
    const pointsInside = this.AllPointsInside;
    const givenPointMap = this.PointsInside.reduce(
      (previosGivenPointsMap: Map<IPoint, number>, nextPoint: IPoint) => {
        previosGivenPointsMap.set(nextPoint, 0);
        return previosGivenPointsMap;
      },
      new Map<IPoint, number>()
    );
    for (const point of pointsInside) {
      const closestTo = this.ClosestTo(point);
      if (closestTo) {
        const count = givenPointMap.get(closestTo);
        if (count || count === 0) {
          givenPointMap.set(closestTo, count + 1);
        }
      }
      // const count = givenPointMap.get(closestTo);
      // if (closestTo && count) {
      //   givenPointMap.set(closestTo, (count || 0) + 1);
      // }
    }
    let greatestPointAndArea = { point: { X: 0, Y: 0 }, area: 0 };
    for (const [point, area] of givenPointMap) {
      if (area > greatestPointAndArea.area) {
        greatestPointAndArea = { point, area };
      }
      if (area === 3882 || area === 5105) {
        console.log(point, area);
      }
    }
    console.log(this.Bounds);
    console.log(Array.from(givenPointMap.values()).sort((a, b) => a - b));

    return greatestPointAndArea;
  }
}
