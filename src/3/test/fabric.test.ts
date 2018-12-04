import { join } from 'path';
import {
  countOverlaps,
  countOverlapsFromFile,
  fabricClaimFromLine,
  findFabricThatDoesNotOverlapFromFile
} from '../fabric';
import { FabricClaim } from '../FabricClaim';
import { OverlapMap } from '../OverlapMap';

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
      'irrelevant',
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
      'irrelevant',
      { top: 1, left: 1 },
      { width: 2, height: 2 }
    );
    expect(fabricClaim.points()).toContainEqual(point);
  });

  test('that two sets of fabric can overlap', () => {
    const first = new FabricClaim(
      'irrelevant',
      { top: 0, left: 0 },
      { width: 2, height: 2 }
    );
    const second = new FabricClaim(
      'irrelevant',
      { top: 1, left: 1 },
      { width: 2, height: 2 }
    );
    const claims = [first, second];

    const overlaps = countOverlaps(claims);

    expect(overlaps).toBe(1);
  });

  test('has overlaps', () => {
    const first = new FabricClaim(
      'irrelevant',
      { top: 0, left: 0 },
      { width: 2, height: 2 }
    );
    const second = new FabricClaim(
      'irrelevant',
      { top: 1, left: 1 },
      { width: 2, height: 2 }
    );
    const claims = [first, second];
    const overlapMap = new OverlapMap(claims);
    expect(overlapMap.HasOverlapWith(first)).toBe(true);
  });

  test('does not have overlaps', () => {
    const first = new FabricClaim(
      'irrelevant',
      { top: 0, left: 0 },
      { width: 2, height: 2 }
    );
    const second = new FabricClaim(
      'irrelevant',
      { top: 2, left: 2 },
      { width: 2, height: 2 }
    );
    const claims = [first];
    const overlapMap = new OverlapMap(claims);
    expect(overlapMap.HasOverlapWith(second)).toBe(false);
  });

  it('can call count find', async () => [
    expect(
      await countOverlapsFromFile(join(__dirname, './claims-test.txt'))
    ).not.toBeNull()
  ]);

  it('can call no overlaps', async () => [
    expect(
      await findFabricThatDoesNotOverlapFromFile(
        join(__dirname, './claims-test.txt')
      )
    ).not.toBeNull()
  ]);
});
