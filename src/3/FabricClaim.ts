import { IClaim } from './IClaim';
import { IDimensions } from './IDimensions';
import { IOffset } from './IOffset';
import { IPoint } from './IPoint';
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
