import { IPoint } from './IPoint';
import { readCleanLines } from 'fs-util';
import { Plane } from './Plane';

export const findGreatestAreaFromFile = async (file: string) => {
  const data = (await readCleanLines(file)).map(readPointFromLine);
  const plane = new Plane(data);
  return plane.PointWithGreatestArea();
};

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

export const manhattanDistanceBetween = (a: IPoint, b: IPoint) =>
  Math.abs(a.X - b.X) + Math.abs(a.Y - b.Y);
