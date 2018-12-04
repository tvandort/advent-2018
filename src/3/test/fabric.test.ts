import { FabricClaim, fabricClaimFromLine } from '../fabric';

describe(fabricClaimFromLine, () => {
  it('can convert line to fabric claim', () => {
    expect(fabricClaimFromLine('#1 @ 1,3: 4x2')).toEqual({
      id: '#1',
      offset: { left: 1, top: 3 },
      dimensions: { width: 4, height: 2 }
    });
  });

  test('claim with one point', () => {
    const fabricClaim = new FabricClaim(
      'irrevelent',
      { top: 0, left: 0 },
      { width: 1, height: 1 }
    );
    expect(fabricClaim.points()).toEqual([{ x: 0, y: 0 }]);
  });

  test.each([
    [{ x: 0, y: 0 }],
    [{ x: 0, y: 1 }],
    [{ x: 1, y: 0 }],
    [{ x: 1, y: 1 }]
  ])('offset: 1,1 width: 2,2 has point %p', point => {
    const fabricClaim = new FabricClaim(
      'irrevant',
      { top: 0, left: 0 },
      { width: 2, height: 2 }
    );
    expect(fabricClaim.points()).toContainEqual(point);
  });

  test.each([
    [{ x: 1, y: 1 }],
    [{ x: 1, y: 2 }],
    [{ x: 2, y: 1 }],
    [{ x: 2, y: 2 }]
  ])('offset: 1,1 width: 2,2 has point %p', point => {
    const fabricClaim = new FabricClaim(
      'irrevant',
      { top: 1, left: 1 },
      { width: 2, height: 2 }
    );
    expect(fabricClaim.points()).toContainEqual(point);
  });
});
