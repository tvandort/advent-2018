import { readCleanLines } from 'fs-util';
import { IReactionResults } from './IReactionResults';

export const reactPolymerAndRemoveConfoundingUnitFromFile = async (
  file: string
) => reactPolymerAndRemoveConfoundingUnit((await readCleanLines(file))[0]);

export const reactPolymerFromFile = async (file: string) =>
  reactPolymer((await readCleanLines(file))[0]);

export const reactPolymerAndRemoveConfoundingUnit = (
  initialPolymer: string
) => {
  const firstReaction = reactPolymer(initialPolymer);
  const results: IReactionResults[] = [];
  for (const unit of firstReaction.ContainedUnits) {
    const removeUnits = new Set<string>([
      unit.toLowerCase(),
      unit.toUpperCase()
    ]);

    const newPolymer = firstReaction.ReactedPolymer.split('')
      .filter(char => removeUnits.has(char) === false)
      .join('');

    const result = reactPolymer(newPolymer);
    results.push(result);
  }
  let smallestChain = firstReaction;
  for (const result of results) {
    if (result.RemainingUnits < smallestChain.RemainingUnits) {
      smallestChain = result;
    }
  }
  return smallestChain;
};

export const reactPolymer = (initialPolymer: string) => {
  const containedUnits = new Set<string>();
  let newPolymer = initialPolymer;
  if (initialPolymer && initialPolymer.length > 1) {
    for (let index = 0; index < newPolymer.length; index++) {
      const { firstUnit, secondUnit } = getPairAt(newPolymer, index);
      containedUnits.add(firstUnit.toLowerCase());
      if (secondUnit) {
        containedUnits.add(secondUnit.toLowerCase());
      }

      if (pairAnnihilates(firstUnit, secondUnit)) {
        newPolymer = extractResultPolymer(newPolymer, index);
        index = -1;
      }
    }
  }
  return {
    ReactedPolymer: newPolymer,
    RemainingUnits: newPolymer.length,
    ContainedUnits: Array.from(containedUnits).sort()
  } as IReactionResults;
};

const CASE_DIFFERENCE = 32;
const pairAnnihilates = (char1: string, char2: string) =>
  Math.abs(getAscii(char1) - getAscii(char2)) === CASE_DIFFERENCE;
// tslint:disable-next-line:no-bitwise
const getAscii = (char: string) => char.charCodeAt(0) & 255;

const extractResultPolymer = (nextPolymer: string, pairStart: number) => {
  const pairEnd = pairStart + 1;
  return nextPolymer
    .slice(0, pairStart)
    .concat(nextPolymer.slice(pairEnd + 1, nextPolymer.length));
};

function getPairAt(nextPolymer: string, index: number) {
  const char1Location = index;
  const char2Location = index + 1;
  const firstUnit = nextPolymer.charAt(char1Location);
  const secondUnit = nextPolymer.charAt(char2Location);
  return { firstUnit, secondUnit };
}
