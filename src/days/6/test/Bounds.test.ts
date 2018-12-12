import { findBoundingPoints } from '../chrono-coordinates';
import { IBounds } from '../IBounds';
import { Bounds } from '../Bounds';
import { points, D, E, A, B, C, F } from './data';

describe(Bounds, () => {
  describe('Contains', () => {
    describe('example', () => {
      let bounds: IBounds = Bounds.Null;
      beforeEach(() => {
        bounds = findBoundingPoints(points);
      });

      it.each([[D], [E]])('contains %p', point => {
        expect(bounds.Contains(point)).toBe(true);
      });

      it.each([[A], [B], [C], [F]])('does not contain %p', point => {
        expect(bounds.Contains(point)).toBe(false);
      });
    });

    describe('minimal', () => {
      let bounds: IBounds = Bounds.Null;
      beforeEach(() => {
        bounds = findBoundingPoints([{ X: 0, Y: 0 }, { X: 2, Y: 2 }]);
      });

      it('contains', () => {
        expect(bounds.Contains({ X: 1, Y: 1 })).toBe(true);
      });

      it.each([[{ X: 0, Y: 0 }], [{ X: 2, Y: 2 }]])(
        'does not contain point on edge %p',
        point => {
          expect(bounds.Contains(point)).toBe(false);
        }
      );

      it.each([
        [{ X: 100, Y: 100 }, { X: -1, Y: -1 }, { X: 1, Y: -1 }, { X: -1, Y: 1 }]
      ])('does not contain point outside bounds %p', point => {
        expect(bounds.Contains(point)).toBe(false);
      });
    });
  });

  describe('PointsInside', () => {
    let bounds: IBounds = Bounds.Null;
    beforeEach(() => {
      bounds = findBoundingPoints([{ X: 0, Y: 0 }, { X: 2, Y: 2 }]);
    });

    it('is {1, 1}', () => {
      expect(bounds.PointsInside()).toEqual([{ X: 1, Y: 1 }]);
    });
  });
});
