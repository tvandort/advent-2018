import { readCleanLines } from 'fs-util';
import { FabricClaim } from './FabricClaim';
import { OverlapMap } from './OverlapMap';

export const countOverlapsFromFile = async (file: string) =>
  countOverlaps(await getClaimsFromFile(file));

export const findFabricThatDoesNotOverlapFromFile = async (file: string) =>
  findFabricThatDoesNotOverlap(await getClaimsFromFile(file));

const getClaimsFromFile = async (file: string) =>
  (await readCleanLines(file)).map(fabricClaimFromLine);

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

export const countOverlaps = (claims: FabricClaim[]) => {
  const overlapCount = new OverlapMap(claims).Count();

  return overlapCount;
};

export const findFabricThatDoesNotOverlap = (claims: FabricClaim[]) => {
  const overlapMap = new OverlapMap(claims);
  return claims
    .filter(claim => !overlapMap.HasOverlapWith(claim))
    .map(claim => claim.id);
};
