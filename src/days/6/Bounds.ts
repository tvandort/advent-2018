import { IPoint } from './IPoint';
import { IBounds } from './IBounds';

export class Bounds implements IBounds {
  public static Null = new Bounds(0, 0, 0, 0);
  public Top: number;
  public Left: number;
  public Right: number;
  public Bottom: number;

  constructor(left: number, top: number, right: number, bottom: number) {
    this.Top = top;
    this.Left = left;
    this.Right = right;
    this.Bottom = bottom;
  }

  public PointsInside = () => {
    const points: IPoint[] = [];
    for (let x = this.Left + 1; x < this.Right; x++) {
      for (let y = this.Top + 1; y < this.Bottom; y++) {
        points.push({ X: x, Y: y });
      }
    }
    return points;
  };

  public Contains = (point: IPoint) => {
    return (
      this.Top < point.Y &&
      this.Bottom > point.Y &&
      this.Left < point.X &&
      this.Right > point.X
    );
  };
}
