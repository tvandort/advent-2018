interface IOffset {
  top: number;
  left: number;
}

interface IDimensions {
  width: number;
  height: number;
}

interface IPoint {
  x: number;
  y: number;
}

interface IClaim {
  readonly id: string;
}

export class FabricClaim implements IClaim {
  public id: string;
  public offset: IOffset;
  public dimensions: IDimensions;

  constructor(id: string, offset: IOffset, dimensions: IDimensions) {
    this.id = id;
    this.offset = offset;
    this.dimensions = dimensions;
  }

  public points(): IPoint[] {
    const right = this.offset.left + this.dimensions.width;
    const bottom = this.offset.top + this.dimensions.height;
    const calculatedPoints: IPoint[] = [];
    for (let x = this.offset.left; x < right; x++) {
      for (let y = this.offset.top; y < bottom; y++) {
        calculatedPoints.push({ x, y });
      }
    }
    return calculatedPoints;
  }
}

export const fabricClaimFromLine = (line: string) => {
  const [rawId, rawPointDimension] = line.split('@');
  const id = rawId.trim();
  const [rawPoint, rawDimension] = rawPointDimension.split(':');
  const [left, top] = rawPoint
    .trim()
    .split(',')
    .map(n => parseInt(n, 10));
  const [width, height] = rawDimension
    .trim()
    .split('x')
    .map(n => parseInt(n, 10));
  return new FabricClaim(id, { left, top }, { width, height });
};
