import { IPoint } from './IPoint';
import { Bounds } from './Bounds';
import { IBounds } from './IBounds';

export const readPointFromLine = (pointString: string) => {
  const [X, Y] = pointString
    .split(',')
    .map(n => n.trim())
    .map(n => parseInt(n, 10));
  return {
    X,
    Y
  } as IPoint;
};

export const findBoundingPoints = (points: IPoint[]) => {
  if (points.length < 1) {
    throw new Error('Must have at least one point.');
  }
  const initialPoint = points[0];
  let top = initialPoint.Y;
  let right = initialPoint.X;
  let left = initialPoint.X;
  let bottom = initialPoint.Y;
  for (const point of points) {
    if (point.Y <= top) {
      top = point.Y;
    }
    if (point.Y >= bottom) {
      bottom = point.Y;
    }
    if (point.X <= left) {
      left = point.X;
    }
    if (point.X >= right) {
      right = point.X;
    }
  }
  return new Bounds(left, top, right, bottom);
};

const manhattanDistanceBetween = (a: IPoint, b: IPoint) =>
  Math.abs(a.X - b.X) + Math.abs(a.Y - b.Y);

type Distance = number;

export class Plane {
  public static Null = new Plane([{ X: 0, Y: 0 }]);

  private Bounds: IBounds;
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

  public PointWithGreatestArea(): IPoint {
    const pointsInside = this.Bounds.PointsInside();
    const givenPointMap = this.Points.filter(point =>
      this.Bounds.Contains(point)
    ).reduce(
      (previosGivenPointsMap: Map<IPoint, number>, nextPoint: IPoint) => {
        previosGivenPointsMap.set(nextPoint, 0);
        return previosGivenPointsMap;
      },
      new Map<IPoint, number>()
    );

    for (const point of pointsInside) {
      const closestTo = this.ClosestTo(point);
      // console.log(point, ' is closest to ', closestTo);
      if (closestTo) {
        const count = givenPointMap.get(closestTo);
        givenPointMap.set(closestTo, count! + 1);
      }
    }

    let greatestPointAndArea = { point: { X: 0, Y: 0 }, area: 0 };
    for (const [point, area] of givenPointMap) {
      if (area > greatestPointAndArea.area) {
        greatestPointAndArea = { point, area };
      }
    }

    // console.log('counts', givenPointMap);

    return greatestPointAndArea.point;
  }
}
