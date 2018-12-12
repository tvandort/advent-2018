import { readPointFromLine } from '../chrono-coordinates';
import { findBoundingPoints } from '../find-bounding-points';
import { Plane } from '../Plane';
import { points, E } from './data';

describe(readPointFromLine, () => {
  it('converts string to point', () => {
    expect(readPointFromLine('1, 1')).toEqual({
      X: 1,
      Y: 1
    });
  });
});

describe(findBoundingPoints, () => {
  it('finds bounding points from data set', () => {
    expect(findBoundingPoints(points)).toEqual({
      Top: 1,
      Left: 1,
      Right: 8,
      Bottom: 9,
      Contains: expect.any(Function),
      PointsInside: expect.any(Function)
    });
  });

  it('throws if empty points', () => {
    expect(() => findBoundingPoints([])).toThrowError(/at least one point/);
  });
});

describe(Plane, () => {
  describe('ClosestTo', () => {
    describe('minimal case', () => {
      let plane = Plane.Null;
      beforeEach(() => {
        plane = new Plane([{ X: 0, Y: 0 }, { X: 2, Y: 2 }]);
      });

      it('returns null for outside point', () => {
        expect(plane.ClosestTo({ X: 100, Y: 100 })).toBe(null);
      });

      it('returns null for equidistant point', () => {
        expect(plane.ClosestTo({ X: 1, Y: 1 })).toBe(null);
      });
    });

    describe('case with point that is close to another point and only that point', () => {
      let plane = Plane.Null;
      beforeEach(() => {
        plane = new Plane([{ X: 0, Y: 0 }, { X: 3, Y: 3 }]);
      });

      it('is closest to 0,0', () => {
        expect(plane.ClosestTo({ X: 1, Y: 1 })).toEqual({ X: 0, Y: 0 });
      });

      it('is closest to 3,3', () => {
        expect(plane.ClosestTo({ X: 2, Y: 2 })).toEqual({ X: 3, Y: 3 });
      });
    });
  });

  describe('PointWithLargestArea', () => {
    describe('minimal case', () => {
      let plane = Plane.Null;
      beforeEach(() => {
        plane = new Plane([
          { X: 0, Y: 0 },
          { X: 6, Y: 6 },
          { X: 1, Y: 1 },
          { X: 3, Y: 3 }
        ]);
      });

      it('returns point with greatest area', () => {
        expect(plane.PointWithGreatestArea()).toEqual({
          point: { X: 3, Y: 3 },
          area: 12
        });
      });
    });

    describe('example case', () => {
      let plane = Plane.Null;
      beforeEach(() => {
        plane = new Plane(points);
      });

      it('returns point with greatest area', () => {
        expect(plane.PointWithGreatestArea()).toEqual({
          point: E,
          area: 17
        });
      });
    });
  });
});
