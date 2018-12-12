import { IPoint } from './IPoint';
import { Bounds } from './Bounds';
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
