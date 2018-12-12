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

  constructor(points: IPoint[]) {
    this.Bounds = findBoundingPoints(points);
    this.Points = points;
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

    for (const [distance, points] of distanceMap) {
      if (points.length === 1) {
        return points[0];
      }
    }

    return null;
  };
}
